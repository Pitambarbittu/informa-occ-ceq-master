import React, { useEffect, useState } from 'react'
import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import { apigatewayErrordata, apigatewayHover, apigatewayHovers, apigatewaydata, getapigatewaydata, gettotalcounterror, sliApiGatewayData } from '../../queryModule';
import Application from '../Application';
import { func } from 'prop-types';
import { Frontend_Disruption_Link, Frontend_Error_Inbox_Link, Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from '../../LinksDetails';

const Apigateway = ({ frontEnd_Api_GatewayToolTip_Modal, unsetContent, disruptionData, apientitydata, serviceLevel }) => {


    const [apidata, setapidata] = useState([])
    const [messageData, setAllsnsMessagesdata] = useState()

    const [hoverData, setHoverData] = useState([])
    const [sliCount, setSliCount] = useState([])
    const [sliHover, setSliHover] = useState([])
    const [sumError, setSumError] = useState(0)
    const [fxerror, setFxerror] = useState(0)
    const [fiveError, setFive] = useState(0)
    const [tooltip, setToolTip] = useState([])
    const [disruptionCounts, setDisruptionCounts] = useState(0);

    useEffect(async () => {


        const sliString = serviceLevel.map((cur, index) => "'" + cur.toString() + "'").join(",");
        const apigatewayString = apientitydata.map((cur, index) => "'" + cur.toString() + "'").join(",");
        const sliApiGatewayDatas = await sliApiGatewayData(sliString);
        const apiErrorData = await apigatewayHovers(apigatewayString)
     

        let totalError = apiErrorData.reduce((acc, cur) => acc + (cur['4XXError'] + cur['5XXError']), 0)
        let fx = apiErrorData.reduce((acc, cur) => acc + (cur['4XXError']), 0)
        let fivex = apiErrorData.reduce((acc, cur) => acc + (cur['5XXError']), 0)
        

        let allapiData = [];
        async function disruptionApiGateway() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-API-GATEWAY-POLICY") {
                    allapiData.push(disruptionData[index]);
                }
            }
        }

        disruptionApiGateway();
        let disruptionCounts = 0;
        allapiData.map(
            (val) => (disruptionCounts += val["count.conditionName"])
        );
        let hoverarr = [];
        allapiData.map(val => { hoverarr.push({ Timestamp: val["latest.timestamp"], policy_Id: val["facet"][0], policy_Name: val["facet"][1], condition_Name: val.facet[2], count: val["count.conditionName"] }) })
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
        setFive(fivex)
        setFxerror(fx)
        setSumError(totalError)
        setToolTip(apiErrorData)
        setSliCount(sliApiGatewayDatas.length)
        setSliHover(sliApiGatewayDatas)

        let apidataarray = []
        let Total_Requests=0;
        let Latency=0;
        async function getapidata() {
           
            for (let i = 0; i < apientitydata.length; i++) {
                const dataarray = await gettotalcounterror(apientitydata[i])
             
                const dataobjects = dataarray[0]
                if(dataobjects){
                Total_Requests += dataobjects.Total_Requests
                Latency += dataobjects.Latency
                apidataarray.push(dataobjects)
                }
            }
        }
        await getapidata()
        setAllsnsMessagesdata({
            Total_Requests:Total_Requests,
            Latency:Latency
        })
        setapidata([...apidataarray])
    }, [apientitydata, disruptionData, serviceLevel])


   

    return (
        <div className='tasks_container' style={{ height: "281px" }}>
            <div className='header'>
                <p>API Gateway</p>
            </div>
            <div className='task_errors'>
                <div onClick={() =>
                    window.open(Middleware_Error_Inbox_Link)
                } className='error box' onMouseOver={() => sumError && frontEnd_Api_GatewayToolTip_Modal(tooltip, "errors")} onMouseLeave={unsetContent}>
                    <p className="main_heading"

                    >ERROR INBOX</p>
                    {sumError >0 ? <span style={{color:"#e0332a"}}>{sumError }</span> : <span style={{color:"black"}}>{sumError }</span>}
                    {/* <span style={{color:"#e0332a"}}>{sumError }</span> */}
                </div>
                <div className='sli box' onMouseOver={() => sliCount > 0 && frontEnd_Api_GatewayToolTip_Modal(sliHover, "slo")} onMouseLeave={unsetContent}>
                    <p>SLI/SLO</p>
                    {sliCount >0 ? <span style={{color:"#e0332a"}}>{sliCount }</span> : <span style={{color:"black"}}>{sliCount }</span>}
                    {/* <span>{sliCount}</span> */}
                </div>
                <div onClick={() =>
                    window.open(Middleware_Disruption_Link)
                } className='disruption box'
                    onMouseOver={() => disruptionCounts > 0 && frontEnd_Api_GatewayToolTip_Modal(hoverData, "disruptions")} onMouseLeave={unsetContent}
                >
                    <p className="main_heading"

                    >DISRUPTIONS</p>
                    <span>{disruptionCounts}</span>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>
                    <div className=' details'>
                        <span>4xx error count</span>
                        {/* <span className='aws_started'>{messageData ? messageData.xx4_error : 0}</span> */}
                        <span className='aws_started'>{fxerror}</span>

                    </div>
                    <div className='details'>
                        <span>Latency</span>
                        <span className='aws_time'>{messageData && messageData.Latency ? messageData.Latency.toFixed(2) : 0}</span>
                    </div>
                    {/* <div className='aws_timeout details'>
                    <span>Executions TimedOut</span>
                    <span>3</span>
                </div> */}
                </div>

                <div className='aws_counts'>

                    <div className='aws details'>
                        <span>5xx error count</span>
                        {/* <span className='aws_started'>{messageData ? messageData.xx5_error : 0}</span>
                         */}
                        <span className='aws_started'>{fiveError}</span>
                    </div>
                    <div className='aws details'>
                        <span>Total Requests</span>
                        <span className='aws_started'>{messageData && messageData.Total_Requests ? messageData.Total_Requests.toFixed(2) : 0}</span>
                    </div>
                    {/* <div className='aws details'>
            <div className='aws_counts'>
               
                <div className='aws details'>
                    <span>5xx error rate</span>
                    <span className='aws_aborted'>{apidata && apidata[0]["5xx_error"]? apidata[0]["5xx_error"] :0} %</span>
                </div>
                {/* <div className='aws details'>
                    <span>5xx Error Rate</span>
                    <span>21 </span>
                </div> */}
                </div>

            </div>
            <div>    
            <button className='view_modal_btns' style={{ "marginleft": "20px !important" , "marginTop":"35px" }}   onClick={() => window.open(`https://onenr.io/0gR706pxWjo`)}>SLI/SLO DETAILS</button>
        </div>
        </div>

    )
}

export default Apigateway