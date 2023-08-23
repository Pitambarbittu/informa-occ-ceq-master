import React, { useEffect, useState } from 'react'
import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import { cloudfrontHover, cloudfrontend, getcloudfrontdetails } from '../../queryModule';
import { Frontend_Disruption_Link, Frontend_Error_Inbox_Link, Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from '../../LinksDetails';

const Cloudfront = ({ showTipModal, param, unsetContent, cloudfrontentity, disruptionData }) => {
   
    const [cachehit, setcachehit] = useState([])
    const [sumError, setSumError] = useState([])
    const [tooltip, setTooltip] = useState([])
    const [clouddata, setclouddata] = useState([])
    const [messagedetails, setmessagedetails] = useState([])
    const [hoverData, setHoverData] = useState([]);
    const [disruptionCountss, setDisruptionCounts] = useState(0);

    useEffect(async () => {
        let cloudfrontendresult = await cloudfrontend();

        let errorData = await cloudfrontHover()
        console.log("cloudfront",errorData)
        let errorDatas = errorData.reduce((acc, cur) => acc + (cur['error']), 0);
        let allCloudData = [];
        async function disruptionCloud() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-CLOUDFRONT-POLICY") {
                    allCloudData.push(disruptionData[index]);
                }

            }
        }
        disruptionCloud();
        let disruptionCounts = 0;
        allCloudData.map(
            (val) => (disruptionCounts += val["count.conditionName"])
        );
        let hoverarr = [];
        allCloudData.map(val => { hoverarr.push({ Timestamp: val["latest.timestamp"], policy_Id: val["facet"][0], policy_Name: val["facet"][1], condition_Name: val.facet[2], count: val["count.conditionName"] }) })
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
        setTooltip(errorData)
        setSumError(errorDatas)
        setcachehit(cloudfrontendresult)

        let cloudfrontarray = []
        let Requests = 0;
        let Error_rate = 0;
        let Client_received_bytes = 0;
        let Client_sent_bytes = 0;

        async function getcloudfront() {
            for (let i = 0; i < cloudfrontentity.length; i++) {
                const cloudfrontendresult = await getcloudfrontdetails(cloudfrontentity[i])
                console.log("Cloudfrontresult", cloudfrontendresult)
                const datadetails = cloudfrontendresult[0]
                if (datadetails !== undefined) {
                    Requests += datadetails.Requests
                    Error_rate += datadetails.Error_rate
                    Client_received_bytes += datadetails.Client_received_bytes
                    Client_sent_bytes += datadetails.Client_sent_bytes
                }
                cloudfrontarray.push(datadetails)
            }
        }
        await getcloudfront()
        setmessagedetails({
            Requests: Requests,
            Error_rate: Error_rate,
            Client_received_bytes: Client_received_bytes,
            Client_sent_bytes: Client_sent_bytes
        })
        setclouddata([...cloudfrontarray])
    }, [cloudfrontentity, disruptionData]);


console.log("messagedetailsmessagedetailsincloudfront", messagedetails);

    return (
        <div className='tasks_container' style={{"height":"281px"}}>
            <div className='header'>
                <p
                > Cloudfront </p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div onClick={() =>
                    window.open(Middleware_Error_Inbox_Link)
                } className='error box' onMouseOver={() => showTipModal(tooltip, "error")} onMouseLeave={unsetContent}>
                    <p className="main_heading"

                    >ERROR INBOX</p>
                      {sumError >0 ? <span style={{color:"#e0332a"}}>{sumError }</span> : <span style={{color:"black"}}>{sumError }</span>}
                    {/* <span>{sumError}</span> */}
                </div>
                <div className='sli box'>
                    <p>REQUESTS</p>
                    <span>{cachehit.length > 0 && cachehit[0].Total_Requests ? cachehit[0].Total_Requests : 0}</span>
                </div>
                <div onClick={() =>
                    window.open(Middleware_Disruption_Link)
                } className='disruption box' onMouseOver={() => showTipModal(hoverData, "disruptions")}
                    onMouseLeave={unsetContent}>
                    <p className="main_heading"

                    >DISRUPTIONS</p>
                    {/* <span>{0}</span> */}
                    <span>{disruptionCountss}</span>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>

                    <div className=' details'>
                        <span>Cache Hit Ratio</span>
                        <span >{cachehit.length > 0 && cachehit[0].cache_Hit_Ratio ? cachehit[0].cache_Hit_Ratio.toFixed(2) : 0}</span>
                    </div>
                    <div className=' details'>
                        <span>Error Rate</span>
                        <span className='aws_started'>{cachehit.length > 0 && cachehit[0].Error_Rate ? cachehit[0].Error_Rate.toFixed(2) : 0} %</span>
                    </div>
                    <div className=' details'>
                        <span>Client Sent MBs</span>
                        <span >{cachehit.length > 0 && cachehit[0].Client_Bytes ? (cachehit[0].Client_Bytes/1000000).toFixed(2) : 0} </span>
                    </div>
                    {/* <div className='aws_timeout details'>
                    <span>Executions TimedOut</span>
                    <span>3</span>
                </div> */}
                </div>

                <div className='aws_counts'>
                    <div className='aws details'>
                        <span>Success Rate</span>
                        <span >{cachehit.length > 0 && (cachehit[0].Success_Rate?.toFixed(2) || 0)} %</span>
                    </div>
                    {/* <div className='aws details'>
                    <span>Total Requests</span>
                    <span className='aws_time'>{cachehit.length>0 && cachehit[0].Total_Requests.toFixed()}</span>
                </div> */}
                    <div className='aws details'>
                        <span>Client Received MBs</span>
                        <span>{cachehit.length > 0 && cachehit[0].Content_Bytes ? (cachehit[0].Content_Bytes/1000000).toFixed(2) : 0}</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Cloudfront