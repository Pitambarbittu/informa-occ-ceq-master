
import React, { useEffect, useState } from "react";
// import empty_message from "../../Assets/emptymessage.svg";
// import { ecemicroservicethroughput } from '../../queryModule'
import { apmErrorHoverData, ecsMicro, ecstapdex, ecsterror, ecstrans, sliApmServices } from '../../queryModule'
import { Frontend_Disruption_Link, Frontend_Error_Inbox_Link, Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from "../../LinksDetails";


const Ecsmicroservice = ({ middleware_APMToolTip_Modal, unsetContent, disruptionData,apmIdEntity, serviceLevel }) => {

    // const [throughputdatas, setthroughputdatas] = useState([])
    // const [transcationdata, settranscationdata] = useState([])
    const [apdexdata, setapdexdata] = useState([])
    const [errordata, seterrordata] = useState([])
    const [errordatas, seterrordatas] = useState([])
    const [hoverData, setHoverData] = useState()
    const [disruptionCounts, setDisruptionCounts] = useState(0);
    const [sliApmCount, setSliApmCount] = useState('')
    const [slislo, setSliSLo] = useState([]);
    const [errorhover, setErrorHover] = useState()
    const[messagedata, setAllmessaged]=useState()

    // const fetchData = async () => {
    //     const slis1 = await sliApmServices();
    //     setSliSLo(slis1);
    // }

    useEffect(async () => {
        let apigatewayarray=[]
        let Throughput=0;
        let Average_duration=0;
        let Apdex_score=0;
        const sliString =       serviceLevel.map((cur,index) => "'" + cur.toString() + "'").join(",");
        const ecs  = apmIdEntity.map((cur,index) => "'" + cur.toString() + "'").join(",");
        let throughputresults = await ecsMicro()
        let transcationresults = await ecstrans()
        let apdexresult = await ecstapdex()
        let errorresult = await ecsterror()
        let sliData = await sliApmServices(sliString)
        let errorHover = await apmErrorHoverData(ecs)
        let errorData = errorHover.reduce((acc, cur) => acc + cur['Error_Inbox'], 0)

        let allECSData = [];
        async function getapidatas(){
            for(let i=0; i<apmIdEntity.length ; i++){
                let transcationresults = await ecstapdex(apmIdEntity[i]) 
                const datadetails=transcationresults[0]
                Throughput +=datadetails.Throughput
                Average_duration += datadetails.Average_duration
                Apdex_score += datadetails.Apdex_score.score
                apigatewayarray.push(datadetails)
            }
        }
        await getapidatas()
        setAllmessaged({
            Throughput:Throughput,
            Average_duration:Average_duration,
            Apdex_score:Apdex_score
        })
        async function disruptionAPM() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-APM-MICROSERVICE-POLICY") {
                    allECSData.push(disruptionData[index]);
                }
            }

        }

        disruptionAPM();
        let disruptionCounts = 0;
        allECSData.map(
            (val) => (disruptionCounts += val["count.conditionName"])
        );
        let hoverarr = [];
        allECSData.map(val => { hoverarr.push({ Timestamp: val["latest.timestamp"], policy_Id: val["facet"][0], policy_Name: val["facet"][1], condition_Name: val.facet[2], count: val["count.conditionName"] }) })

        setHoverData(hoverarr);
        setSliSLo(sliData);
        setErrorHover(errorHover)
        seterrordata(errorData)
        // setHoverData(errorHover)
        setDisruptionCounts(disruptionCounts);
        // setthroughputdatas(throughputresults)
        // settranscationdata(transcationresults)
        setapdexdata(apdexresult)
        seterrordatas(errorresult)
        setSliApmCount(sliData.length)
    }, [apmIdEntity,disruptionData, serviceLevel]);

    console.log("apdexdataapdexdata", apdexdata);

    return (
        <div className='tasks_container'>
            <div className='header'>
                <p 
                // onClick={() =>
                //     window.open(
                //         `https://onenr.io/0EjOXd84DQ6`
                //     )
                // }
                > APM-Microservices </p>
            </div>
            <div className='task_errors'>
                <div onClick={() => window.open(`https://onenr.io/01wZpbq1Xj6`)} className='error box' onMouseOver={() => middleware_APMToolTip_Modal(errorhover, "errors")} onMouseLeave={unsetContent}  >
                    <p className="main_heading"
                        onClick={() =>
                            window.open(Frontend_Error_Inbox_Link)
                        }
                    >ERROR INBOX</p>
                <span>{ errordata.length >0 ? <span style={{color:"#e0332a"}}>{ errordata.length >0 && errordata[0].errors ? errordata[0].errors:0 } </span> : <span style={{color:"black"}}> 0 </span>} </span>
                   {/* <span>   {errordata.length >0 ? <span style={{color:"#e0332a"}}>{errordata[0].errors ? errordata[0].errors : <span style={{color:"black"}}>{ errordata[0].errors ? errordata[0].errors:0 } </span> }</span> */}
                    {/* <span>{errordata.length > 0 && errordata[0].errors ? errordata[0].errors : 0}</span> */}
                </div>
                <div className="sli box"
                    onMouseOver={() => {
                        // fetchData();
                        sliApmCount>0 && middleware_APMToolTip_Modal(slislo, "slo")
                    }}
                    onMouseLeave={unsetContent}
                >
                    <p>SLI/SLO </p>
                    <span>{sliApmCount >0 ? <span style={{color:"#e0332a"}}>{sliApmCount }</span> : <span style={{color:"black"}}>{sliApmCount }</span>}</span>
                    {/* <span>{sliApmCount}</span> */}
                </div>

                <div onClick={() =>
                    window.open(Frontend_Disruption_Link)
                } className='disruption box'
                    onMouseOver={() => middleware_APMToolTip_Modal(hoverData, "disruptions")}
                    onMouseLeave={unsetContent}>
                    <p className="main_heading"

                    >DISRUPTIONS</p>
                    <span>{disruptionCounts}</span>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>

                    <div className=' details'>
                        <span>Throughput</span>
                        <span>{Math.floor(messagedata && messagedata.Throughput ? messagedata.Throughput : 0)}</span>
                    </div>
                    <div className=' details'>
                        <span>Average Duration</span>
                        <span >{messagedata && messagedata.Average_duration ? messagedata.Average_duration.toFixed(2) : 0} Sec</span>
                    </div>
                    {/* <div className=' details'>
            <span>Apdex score</span>
            <span className='aws_started'>40</span>
        </div> */}
                    {/* <div className='aws_timeout details'>
            <span>Executions TimedOut</span>
            <span>3</span>
        </div> */}
                </div>

                <div className='aws_counts'>
                    <div className='aws details'>
                        <span>Apdex Score</span>
                        <span className='aws_time'>{messagedata && messagedata.Apdex_score ? messagedata.Apdex_score : 0}</span>
                    </div>
                    {/* <div className='aws details'>
            <span>Total Requests</span>
            <span className='aws_time'>{cachehit.length>0 && cachehit[0].Total_Requests.toFixed()}</span>
        </div> */}
                    <div className='aws details'>
                        <span>Error rate</span>
                        <span>{errordatas.length > 0 && errordatas[0].error_rate ? errordatas[0].error_rate : 0}</span>
                    </div>
                </div>

            </div>
            <div className='modal_buttons'>
                <button className="view_modal_btns "
                    onClick={() => window.open(`https://onenr.io/0BQrxz8Y2RZ `)}
                >DISTRIBUTED TRACING</button>
                <button className="view_modal_btns "
                    onClick={() => window.open(`https://onenr.io/02wdZN31zjE  `)}>
                    SLI/SLO DETAILS</button>
            </div>
        </div>
        // <p>Hello</p>
    );
};

export default Ecsmicroservice;