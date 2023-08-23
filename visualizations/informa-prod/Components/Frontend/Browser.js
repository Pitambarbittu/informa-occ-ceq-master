import React, { useEffect, useState } from 'react';
import { Grid, GridItem } from 'nr1';
import infos from '../../Assets/info.svg';
import Table from '../Tablecomponent/Table';
import Pagecalls from './Pagecalls';
import Slislopages from './Slislopages';
import Tracing from './Tracing';
import ProgressBar from './ProgressBar';
import FIDbar from './FIDbar';
import ClSbar from './ClSbar';
import { broserHoverData, broserHoverData2, browserErrorData, getDisruption, getErroRate, getErrorInoxBrowser, getGeographyData, getUserTime, browserentity, sliBroserData, getsliBrowserData } from '../../queryModule';
import { Frontend_Disruption_Link, Frontend_Error_Inbox_Link } from '../../LinksDetails';
import GraphSection from './GraphSection';
import Ecsmicroservice from '../Middleware/Ecsmicroservice';
import Webvitals from './Webvitals';


const Browser = ({
  frontEnd_BrowserToolTip_Modal,
  disruptionData,
  unsetContent,
  showTooltipMessages,
  errorInboxTooltip,
  serviceLevel,
  browserentity,
  apmIdEntity,
  middleware_APMToolTip_Modal,
//   errorInboxTooltip
}) => {

  console.log("browserentityid" , browserentity);

  const [errorInboxData, setErrorInboxData] = useState([]);
  const [totalErrorCount, setTotalErrorCount] = useState(0);
  const [disruptionResultData, setDisruptionResultData] = useState([]);
  const [disruptionResultCount, setDisruptionResultCount] = useState(0);
  const [otherError, setOtherError] = useState([])
  const [openmodal, setOpenmodal] = useState(false);
  const [opentrace, setopentrace] = useState(false);
  const [openslidetails, setopenslidetails] = useState(false);
  const [opencalls, setopencalls] = useState();
  const [geographyData, setGeographyData] = useState([])
  const [geographyCount, setGeographyCount] = useState(0);
  const [sliData, setSliData] = useState([]);
  const [userTimeData, setUserTimeData] = useState([])
  const [avgUserTime, setTotalAvgUserTime] = useState(0);
  const [errorRateData, setErrorRateData] = useState([])
  const [hoverData, setHoverData] = useState()
  const [disruptionCount, setDisruptionCounts] = useState(0)
  const [slislo, setSliSLo] = useState([]);
  const [otherCount, setOtherCount] = useState([])
  const [error, seterror] = useState(0)
  const [sliError, setSliError] = useState(0)
  const[openvitals, setopenvitals] =useState(false)


  const open = () => {
    setOpenmodal(!openmodal)
  
  }

  const opened = () => {
    setopentrace(!opentrace)
  
  }

  const vitalsopened=()=>{
    setopenvitals(!openvitals)
  }
  const sliopened = () => {
    setopenslidetails(!openslidetails)
  }

  const openedcalls = () => {
    setopencalls(!opencalls)
   
  }


  useEffect(async () => {
    const browserString = browserentity.map((cur, index) => "'" + cur.toString() + "'").join(",") ;
    const serviceLevelString = serviceLevel.map((cur, index) => "'" + cur.toString() + "'").join(",") ;

    let data = await getErrorInoxBrowser(browserString);
    setErrorInboxData(data);

    const errorCount = data.reduce((acc, cur) => acc + cur.errorCount, 0);
    

    const disruptionResult = await getDisruption(
        browserString
    );
    setDisruptionResultData(disruptionResult);


    const errorRate = await getErroRate(browserString)

    setErrorRateData(errorRate);
    const disruptionCount = disruptionResult.reduce(
      (acc, cur) => acc + cur.count,
      0
    );
    setDisruptionResultCount(disruptionCount);


    const geographyResult = await getGeographyData(browserString);
    setGeographyData(geographyResult);

    const geoCount = geographyResult.reduce((acc, cur) =>acc + cur.count, 0);
    setGeographyCount(geoCount)

    const userTimeResult = await getUserTime(browserString);
    setUserTimeData(userTimeResult)
    const totalAvgUsertimeResult = userTimeResult.reduce((acc , cur) =>cur.avgDuration +acc  , 0);
    setTotalAvgUserTime(totalAvgUsertimeResult)

    const sliResult =await getsliBrowserData(serviceLevelString);
    setSliData(sliResult);


    let errorData = await browserErrorData(browserString)
   
    let otherErrorCount = errorData.reduce((acc,cur)=>acc+cur['count.httpResponseCode'],0)
    // let {sumTotal} = otherErrorCount+errorCount
    setOtherError(errorData)
    setOtherCount(otherErrorCount)
    setTotalErrorCount(errorCount);
  }, [disruptionData,serviceLevel,browserentity]);

  return (
    <div className="browser_container">
      <div className="tasks_container" style={{ border: "none" }}>
        <div className="header">
          <p className="main_header">Browser</p>
          <span>
            <button
              onClick={() => open()}
              className="view_modal_btn"
              style={{ height: 'fit-content' }}
            >
              VIEW EDT
            </button>
            {openmodal ? (
              <Table openmodal={openmodal} setOpenmodal={setOpenmodal} browserentity={browserentity} />
            ) : null}
          </span>
        </div>
        <div className="task_errors ">
        <div
          className="error box m-6"
          onClick={() => window.open(Frontend_Error_Inbox_Link)}
          onMouseOver={() =>
            totalErrorCount  && errorInboxTooltip(errorInboxData,otherError, 'errors')
          }
          onMouseLeave={unsetContent}
          style={{cursor:"pointer"}}
        >
          <p className="main_heading">ERROR INBOX</p>
         <span> {totalErrorCount + otherCount >0 ? <span style={{color:"#e0332a"}}>{totalErrorCount + otherCount }</span> : <span style={{color:"black"}}>{totalErrorCount + otherCount }</span>}</span>
          {/* <span>{totalErrorCount + otherCount}</span> */}
        </div>

        <div
          className="sli box m-6"
            onMouseOver={() => {
             frontEnd_BrowserToolTip_Modal(sliData, 'slo');
            }}
            onMouseLeave={unsetContent}
        >
          <p>SLI/SLO</p>
         <span> {sliData.length >0 ? <span style={{color:"#e0332a"}}>{sliData.length }</span> : <span style={{color:"black"}}>{sliData.length }</span>}</span>
          {/* <span>{sliData.length}</span> */}
        </div>
        <div
          onClick={() => window.open(Frontend_Disruption_Link)}
          style={{cursor:"pointer"}}
          className="disruption box m-6"
          onMouseOver={() =>
            frontEnd_BrowserToolTip_Modal(disruptionResultData, 'disruptions')
          }
          onMouseLeave={unsetContent}
        >
          <p className="main_heading">DISRUPTIONS</p>
          <span>{disruptionResultCount}</span>
        </div>
      </div>
        <>
          <div className="mainaws_container">
            <div className="aws_counts_three">
              <div className=" details">
                <span>Error rate</span>
                {errorRateData.length > 0 && errorRateData[0].errorRate ? (
                  <span className="aws_started">
                    {errorRateData[0].errorRate.toFixed(2)}%
                  </span>
                ) : (
                  <span className="aws_time">0%</span>
                )}

              </div>

              <div className="aws details" style={{ cursor: "pointer" }} onClick={() => window.open("getWebVitalLink(selectedObj.facet[1])")}>
                <span>
                  LCP{' '}
                  <img
                    style={{ position: 'relative', bottom: '-2px', cursor: "pointer" }}
                    src={infos}
                    alt="info"
                    onMouseOver={() => { showTooltipMessages("LCP measures the time from when the page starts loading to when the largest text block or image element is rendered on the screen.") }}
                    onMouseLeave={unsetContent}
                  />
                </span>
                <ProgressBar browserentity={browserentity} frontEnd_BrowserToolTip_Modal={frontEnd_BrowserToolTip_Modal} unsetContent={unsetContent}/>
              </div>
            </div>

            <div className="aws_counts_three">
              <div className=" details">
                <span>
                  User time on the site
                  <img
                    style={{ position: 'relative', bottom: '-2px' }}
                    src={infos}
                    alt="info"
                    onMouseOver={() => frontEnd_BrowserToolTip_Modal(userTimeData, "user_time")}
                    onMouseLeave={unsetContent}
                  />
                </span>

                <span className="brown_color">{userTimeData.length > 0 ? avgUserTime.toFixed(2) : 0} s</span>

              </div>

              <div className="aws details" onClick={() => window.open("getWebVitalLink(selectedObj.facet[1])")} style={{ cursor: "pointer" }}>
                <span>FID
                  <img
                    style={{ position: 'relative', bottom: '-2px' }}
                    src={infos}
                    alt="info"
                    onMouseOver={() => { showTooltipMessages("FID measures the time from when a user first interacts with your site to the time when the browser is actually able to respond to that interaction.") }}
                    onMouseLeave={unsetContent}
                  />
                </span>
                <FIDbar browserentity={browserentity} frontEnd_BrowserToolTip_Modal={frontEnd_BrowserToolTip_Modal} unsetContent={unsetContent}/>
              </div>

            </div>
            <div className="aws_counts_three">
              <div className="aws details">
                <span>
                  Page Views
                  <img
                    style={{ position: 'relative', bottom: '-2px' }}
                    src={infos}
                    alt="info"
                    onMouseOver={() => frontEnd_BrowserToolTip_Modal(geographyData, "geography")}
                    onMouseLeave={unsetContent}
                  />
                </span>
                <span className="aws_started">{geographyCount}</span>
              </div>

              <div className="aws details" onClick={() => window.open(getWebVitalLink(selectedObj.facet[1]))} style={{ cursor: "pointer" }}>
                <span>
                  CLS
                  <img
                    style={{ position: 'relative', bottom: '-2px' }}
                    src={infos}
                    alt="info"
                    onMouseOver={() => { showTooltipMessages("CLS measures the cumulative score of all unexpected layout shifts that occur between when the page starts loading and when its lifecycle state changes to hidden.") }}
                    onMouseLeave={unsetContent}
                  />
                </span>

                <ClSbar browserentity={browserentity} frontEnd_BrowserToolTip_Modal={frontEnd_BrowserToolTip_Modal} unsetContent={unsetContent} />
              </div>
            </div>
          </div>
          <div className='modal_buttons'>
            <button className='view_modal_btns' onClick={() => opened()}>DISTRIBUTED TRACING</button>
            <button className='view_modal_btns' onClick={() => vitalsopened()}>WEB VITALS</button>
            <button className='view_modal_btns' style={{ "marginleft": "10px !important" }}><span onClick={() => sliopened()}>SLI/SLO DETAILS</span>

            </button>
            {opentrace ? (
              <>
                <div
                  className="backdrop_tracing"
                  onClick={() => setopentrace(false)}
                ></div>
                <Tracing opentrace={opentrace} setopentrace={setopentrace} />
              </>
            ) : null}
             {openvitals ? (
              <>
                <div
                  className="backdrop_tracing"
                  onClick={() => setopenvitals(false)}
                ></div>
                <Webvitals openvitals={openvitals} setopenvitals={setopenvitals} />
              </>
            ) : null}
            {openslidetails ? (
              <>
                <div className="backdrop_tracing" onClick={() => setopenslidetails(false)}></div>
                <Slislopages openslidetails={openslidetails} setopenslidetails={setopenslidetails} />
              </>
            ) : null}
          </div>
        </>

        {opencalls ? <>
          <div className="backdrop_tracing" onClick={() => openedcalls(false)}></div>
          <Pagecalls opencalls={opencalls} setopencalls={setopencalls} />
        </>
          : null}
      </div>

      <Grid className="p-16">
        <GridItem columnSpan ={6}>
          <GraphSection heading="Response Time" apmIdEntity={apmIdEntity}/>
          </GridItem>
          <GridItem columnSpan ={6}>
          <GraphSection heading="Throughput"  apmIdEntity={apmIdEntity}/>
          </GridItem>
        </Grid>

        <Grid style={{marginBottom:"12px"}} className="p-16">
        <GridItem columnSpan={5}>
        <Ecsmicroservice middleware_APMToolTip_Modal={middleware_APMToolTip_Modal} unsetContent={unsetContent} disruptionData={disruptionData} apmIdEntity ={apmIdEntity} serviceLevel={serviceLevel} />
        </GridItem>
        </Grid>


    </div>
  );
};

export default Browser;
