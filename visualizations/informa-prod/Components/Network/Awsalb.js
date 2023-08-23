import React, { useEffect, useState } from 'react'
import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import { albp1HoverData, elbdata, getawsalbdata } from '../../queryModule';
import { Network_Disruption_Link, Network_Error_Inbox_Link } from '../../LinksDetails';

const Awsalb = ({ awsalbentity, showTipModalNetwork, unsetContent, disruptionData }) => {

   
    const [awsdata, setawsdata] = useState();
    const [hoverData, setHoverData] = useState([])
    const [messagedata, setmessagedata] = useState()
    const [sumError, setSumError] = useState()
    const [tooltip, setTooltip] = useState([]);
    const [disruptionCounts, setDisruptionCounts] = useState(0);


    useEffect(async () => {
        const albString = awsalbentity.map((cur, index) => "'" + cur.toString() + "'").join(",");
        let errordata = await albp1HoverData(albString)
   
        let errorCount = errordata.reduce((acc, cur) => acc + (cur["4xx_errors"] + cur['5xx_errors'] +cur['auth_failures']+cur['ELB_auth_error']), 0)
        let allapiData = [];
        async function disruptionApiGateway() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-ALB-POLICY") {
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


        let awsalbarray = []
        let Total_Requests = 0;
        let Http_errors = 0;
        let Active_connections = 0;
        let Authorization_errors = 0;
        let TLS_Negotiation_error = 0;
        async function getawsalb() {
            for (let i = 0; i < awsalbentity.length; i++) {
                const dataarraydetails = await getawsalbdata(awsalbentity[i])
                // const errorData = await albp1HoverData(awsalbentity[i])
                const dataobjects = dataarraydetails[0]
                Total_Requests += dataobjects.Total_Requests
                Http_errors += dataobjects.Http_errors
                Active_connections += dataobjects.Active_connections
                Authorization_errors += dataobjects.Authorization_errors
                TLS_Negotiation_error += dataobjects.TLS_Negotiation_error
            }
        }
        await getawsalb()
        setmessagedata({
            Total_Requests: Total_Requests,
            Http_errors: Http_errors,
            Active_connections: Active_connections,
            Authorization_errors: Authorization_errors,
            TLS_Negotiation_error: TLS_Negotiation_error
        })
        setawsdata([...awsalbarray])
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
        setSumError(errorCount)
        setTooltip(errordata)
    }, [awsalbentity]);

   
    return (
        <div className='tasks_container'>
            <div className='header'>
                <p> AWS ALB</p>
            </div>
            <div className='task_errors'>
                <div className='error box' onMouseOver={() => showTipModalNetwork(tooltip, "errors")} onMouseLeave={unsetContent} onClick={() =>
                    window.open(Network_Error_Inbox_Link)
                } >
                    <p className="main_heading" >ERROR INBOX</p>
                   <span> {sumError >0 ? <span style={{color:"#e0332a"}}>{sumError }</span> : <span style={{color:"black"}}>{sumError }</span>}</span>
                    {/* <span>{sumError}</span> */}
                </div>
                <div className='sli box'>
                    <p>TOTAL REQUESTS</p>
                    <span>{messagedata ? messagedata.Total_Requests : 0}</span>
                </div>
                <div className='disruption box' onMouseOver={() => showTipModalNetwork(hoverData, "disruptions")} onMouseLeave={unsetContent}
                  onClick={() =>
                    window.open( Network_Disruption_Link)
                }>
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCounts}</span>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>

                    {/* <div className=' details'>
                    <span>Requests-count</span>
                    <span>{awsalbdata.length>0 && awsalbdata[0].Requests_counts.toFixed()}</span>
                </div> */}
                    <div className=' details'>
                        <span>HTTP errors</span>
                        <span className='aws_started'>{messagedata ? messagedata.Http_errors : 0}</span>
                    </div>
                    <div className='details'>
                        <span>Connections</span>
                        <span>{messagedata ? messagedata.Active_connections : 0}</span>
                    </div>
                    {/* <div className='aws_timeout details'>
                    <span>Executions TimedOut</span>
                    <span>3</span>
                </div> */}
                </div>

                <div className='aws_counts'>
                    {/* <div className='aws details'>
                        <span>TLS negotiation</span>
                        <span>{messagedata ? messagedata.TLS_Negotiation_error : 0}</span>
                    </div> */}
                    <div className='aws details'>
                        <span>Authentication errors</span>
                        <span>{messagedata ? messagedata.Authorization_errors : 0}</span>
                    </div>
                    {/* <div className='aws details'>
                    <span>5xx Error Rate</span>
                    <span>21 </span>
                </div> */}
                </div>

            </div>

        </div>
    )
}

export default Awsalb