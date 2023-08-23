
import React, { useEffect, useState } from "react";
// import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg";
import message_icon from "../../Assets/messageicon.svg";
import share_icon from "../../Assets/shareicon.svg";
import empty_message from "../../Assets/emptymessage.svg";
import delete_icon from "../../Assets/delete.svg";
import Lambdatracing from "./Lambdatracing";
import {
  lambdaHoverData,
  lambdaSliData,
  lambdadatas,
  lambdadedlettersdata,
  lambdathrottledata,
  traceIdData,
} from "../../queryModule";
import LambdaTrace from "./LambdaTrace";
import Lambdasli from "./Lambdasli";
import { Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from "../../LinksDetails";

const Lambda = ({
  lambdaentityid,
  showTipModalLambda,
  unsetContent,
  disruptionData,
  serviceLevel
}) => {
  const [lambdadata, setlambdadata] = useState([]);
  const [allmessagedetails, setallmessagedetails] = useState();
  const [sliError, setSliError] = useState(0);
  const [tooltip, setTooltip] = useState();
  const [hoverData, setHoverData] = useState([]);
  const [disruptionCounts, setDisruptionCounts] = useState(0);
  const [sumError, setSumError] = useState();
  const [opentracing, setopentracing] = useState(false);
  const [slislo, setSliSLo] = useState([]);
  const [Lambdaslio, setLambdaslio] = useState([]);
  const [openslidata, setopenslidata] = useState(false);

  const opendata = () => {
    setopentracing(!opentracing);
    
  };

  function close() {
    setopentracing(false)
  }

  // const fetchData = async (sliString) => {
  //   const slis1 = await lambdaSliData(sliString);
  //   setSliSLo(slis1);
  // }

  const slidats = () => {
    setopenslidata(!openslidata);

  };

  function closed() {
    setLambdaslio(false)
    setopenslidata(false)
  }

  useEffect(async () => {
    let lambdadataarray = [];
    let Invocation_success = 0;
    let Invocation_failed = 0;
    let average_duration = 0;
    let Throttles = 0;
    let Total_invocation = 0;
    let Dead_Letter_Errors = 0;
    // let error_count=0;


    

    const sliString = serviceLevel.map((cur, index) => "'" + cur.toString() + "'").join(",");
    const lambdaString = lambdaentityid.map((cur, index) => "'" + cur.toString() + "'").join(",");
    let slierror = await lambdaSliData(sliString);
   
    let errordata = await lambdaHoverData(lambdaString);
    let errordatas = errordata.reduce((acc, cur) => acc + cur["error_count"], 0);
    

    let allLambdaData = [];
    async function disruptionLambda() {
      for (let index = 0; index < disruptionData.length; index++) {
        if (disruptionData[index].facet[1] === "P1-LAMBDA-POLICY") {
          allLambdaData.push(disruptionData[index]);
        }
      }
    }

    disruptionLambda();
    let disruptionCounts = 0;
    allLambdaData.map(
      (val) => (disruptionCounts += val["count.conditionName"])
    );
    let hoverarr = [];
    allLambdaData.map(val => { hoverarr.push({ Timestamp: val["latest.timestamp"], policy_Id: val["facet"][0], policy_Name: val["facet"][1], condition_Name: val.facet[2], count: val["count.conditionName"] }) })

    async function getlambda() {
      for (let i = 0; i < lambdaentityid.length; i++) {
        const datadetails = await lambdadatas(lambdaentityid[i]);
        const throttleData = await lambdathrottledata(lambdaentityid[i]);
        // let hoverquery= await lambdaHoverData(lambdaentityid[i])
        // const deadletterData = await lambdadedlettersdata(lambdaentityid[i]);

        let dataobjects = datadetails[0];
        let throttleObj = throttleData[0];
        // let errorcount = hoverquery[0]

        let mydatadetils= await traceIdData()
        console.log("mytraceiddetails " ,mydatadetils);


        if (dataobjects !== undefined) {
          Invocation_success += dataobjects.Invocation_success;
          average_duration += dataobjects.average_duration;
          Invocation_failed += dataobjects.Invocation_failed;
          Total_invocation += dataobjects.Total_invocation;
        }
        if (throttleObj !== undefined) {
          Throttles += throttleObj.Throttles;
          Dead_Letter_Errors += throttleObj.Dead_Letter_Errors;
        }

        // error_count+=errorcount.error_count
        lambdadataarray.push(dataobjects);
     
      }
    }
    await getlambda();
    setallmessagedetails({
      Invocation_success: Invocation_success,
      average_duration: average_duration,
      Invocation_failed: Invocation_failed,
      Total_invocation: Total_invocation,
      Dead_Letter_Errors: Dead_Letter_Errors,
      Throttles: Throttles,
      // error_count:error_count
    });
    setSliSLo(slierror);
    setlambdadata([...lambdadataarray]);
    setSumError(errordatas);
    setTooltip(errordata);
    setSliError(slierror.length);
    setHoverData(hoverarr);
    setDisruptionCounts(disruptionCounts);
  }, [lambdaentityid, disruptionData, serviceLevel]);

  return (
    <>
      <div style={{ height: "281px" }} className="tasks_container">
        <div className="header">
          <p // onClick={() => window.open(`https://onenr.io/0vwBANa72Qp`)}
          >
            Lambda
          </p>
          {/* <div className="aws_timeout details"> */}
          <button className="aws_aborted view_modal_btn" style={{ padding: "5px", marginTop: "0px" }} onClick={() => opendata()}>
            DISTRIBUTED TRACING
          </button>

          {/* </div> */}
        </div>
        <div className="task_errors">
          <div
            onMouseOver={() => showTipModalLambda(tooltip, "errors")}
            onMouseLeave={unsetContent}
            className="error box" 
            onClick={() => window.open(Middleware_Error_Inbox_Link)}
          >
            <p
              className="main_heading"
             
            >
              ERROR INBOX
            </p>
            <span>{sumError >0 ? <span style={{color:"#e0332a"}}>{sumError }</span> : <span style={{color:"black"}}>{sumError }</span>}</span>
            {/* <span>{sumError}</span> */}
          </div>
          <div className="sli box"
            onMouseOver={() => {

              sliError > 0 && showTipModalLambda(slislo, "slo")
            }}
            onMouseLeave={unsetContent}
          >
            <p>SLI/SLO</p>
            <span>{sliError >0 ? <span style={{color:"#e0332a"}}>{sliError }</span> : <span style={{color:"black"}}>{sliError }</span>}</span>
            {/* <span>{sliError}</span> */}
          </div>
          <div
            className="disruption box"
            onMouseOver={() => showTipModalLambda(hoverData, "disruptions")}
            onMouseLeave={unsetContent}
          >
            <p
              className="main_heading"
              onClick={() => window.open(Middleware_Disruption_Link)}
            >
              DISRUPTIONS
            </p>
            <span>{disruptionCounts}</span>
          </div>
        </div>
        <div className='mainaws_container'>
          <div className='aws_counts'>

            <div className=' details'>
              <span>Invocations Success</span>
              <span>
                {allmessagedetails ? allmessagedetails.Invocation_success : 0}</span>
            </div>
            <div className=' details'>
              <span>Invocations Failed</span>
              <span>{allmessagedetails ? allmessagedetails.Invocation_failed : 0}</span>
            </div>
            <div className=' details'>
              <span>Durations</span>
              <span>{allmessagedetails ? (allmessagedetails.average_duration / 1000).toFixed(2) : 0} Sec</span>
            </div>
          </div>
          <div className='aws_counts'>
            <div className='aws details'>
              <span>Deadletters Error</span>
              <span>{allmessagedetails ? allmessagedetails.Dead_Letter_Errors.toFixed(2) : 0}</span>
            </div>
            <div className='aws details'>
              <span>Throttles</span>
              <span>{allmessagedetails ? allmessagedetails.Throttles.toFixed() : 0}</span>
            </div>
          </div>
        </div>
        <div className="modal_buttons" >
          {/* <button className='view_modal_btns' style={{ "marginleft": "10px !important" , "marginTop":"28px" }} onClick={() => slidats()}>ERROR INVESTIGATION</button> */}
          <button className='view_modal_btns' style={{ "marginleft": "20px !important" , "marginTop":"28px" }}   onClick={() => window.open(`https://onenr.io/08wpY5OLZRO`)}>SLI/SLO DETAILS</button>
        </div>

        {opentracing && (
          <>
            <div className="backdrop_tracing" onClick={() => close()} />
            <LambdaTrace
              opentracing={opentracing}
              setopentracing={setopentracing}
            />
          </>
        )}
        {openslidata &&
          <>
            <div className="backdrop_tracing" onClick={() => closed()} ></div>
            <Lambdasli
              openslidata={openslidata}
              setopenslidata={setopenslidata}
            />
          </>
        }
      </div>
    </>
  );
};

export default Lambda;