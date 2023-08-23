import React, { useEffect, useState } from 'react'
import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import { getnatErrorHover, getnatgatewaydata, getvpnnatdata, vpsgateway } from '../../queryModule';
import { Network_Disruption_Link, Network_Error_Inbox_Link } from '../../LinksDetails';

const Vpcnat = ({ network_Natgateway_ToolTip_Modal,  disruptionData, unsetContent ,nathoverdata}) => {

    // const [vpcnatdata, setvpsdatas] = useState()
    const [hover, setHover] = useState()
    const [hoverData, setHoverData] = useState([])
    const [tooltip, setToolTip] = useState([])
    const [disruptionCounts, setDisruptionCounts] = useState(0);
    const [errorCount, setErrorCount] = useState()
    const[vpcnatdata , setvpcdata]=useState([])
    useEffect(async () => {
        let errorHover = await getnatErrorHover()
        let vpcdataresult= await getvpnnatdata()
      
        let errordata = errorHover.reduce((acc, cur) => acc + cur['error_Port_count'], 0)
        let allapiData = [];
        async function disruptionApiGateway() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-NATGATEWAY-POLICY") {
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
        setErrorCount(errordata)
        setHover(errorHover)
        setvpcdata(vpcdataresult)
        // setvpsdatas(cpsdataresult)
    }, [disruptionData]);


    return (
        <div className='tasks_container'>
            <div className='header'>
                <p>VPC NAT Gateway</p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div className='error box' onMouseOver={() => errorCount && network_Natgateway_ToolTip_Modal(hover, "errors")} onMouseLeave={unsetContent}
                 onClick={() =>
                    window.open(Network_Error_Inbox_Link)
                }>
                    <p className="main_heading">EROR PORT ALLOCATION</p>
                   <span> {errorCount >0 ? <span style={{color:"#e0332a"}}>{errorCount }</span> : <span style={{color:"black"}}>{errorCount }</span>}</span>
                    {/* <span>{errorCount}</span> */}
                </div>
                <div className='sli box'>
                    <p>ACTIVE CONNECTION</p>
                    <span>{Math.floor(vpcnatdata.length>0 && vpcnatdata[0].active_connection ? vpcnatdata[0].active_connection :0)}</span>
                </div>
                <div className='disruption box'
                 onMouseOver={() =>  network_Natgateway_ToolTip_Modal(hoverData, "disruptions")} onMouseLeave={unsetContent}
                 onClick={() =>
                    window.open(Network_Disruption_Link)}>
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCounts}</span>
                </div>
            </div>
            <div className='mainaws_container single_line'>
                <div className='aws_counts one_line'>

                    <div className=' details'>
                        <span>Nat count</span>
                        <span 
                            className='ash_color' 
                            onMouseOver={()=> nathoverdata()} 
                            onMouseLeave={()=>{unsetContent()}
                        }>
                            <span>{vpcnatdata.length>0 && vpcnatdata[0].Nat_Count ? vpcnatdata[0].Nat_Count :0}</span>
                        </span>
                    </div>
                    <div className=' details'>
                        <span>IdleTimeout</span>
                        <span className='ash_color'>{vpcnatdata.length>0 && vpcnatdata[0].idle_timeout ? vpcnatdata[0].idle_timeout :0}</span>
                    </div>
                    <div className='details'>
                        <span>Connection Established</span>
                        <span className='ash_color'>{vpcnatdata.length>0  && vpcnatdata[0].connection_established ? vpcnatdata[0].connection_established:0}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Vpcnat