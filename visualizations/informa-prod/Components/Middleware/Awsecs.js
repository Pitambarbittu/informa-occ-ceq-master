import React, { useEffect, useState } from 'react'
import { awsecedata, awsecedata2, awsecedata3, ecsErrorData, ecsHoverData, getecshightestcpu, getheighestmemoryusage, getreceiveddata, getrunningstatusdata, getrunningtotalstopped, gettotalrunningdata, gettransmitteddata, sliEcsServices } from '../../queryModule';
import rdsmemory from "../../Assets/rdsmemory.svg"
import rdsarrow from "../../Assets/rdsarrow.svg"
import green from "../../Assets/greennetwork.svg"
import red from "../../Assets/rednetwork.svg"
import { Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from '../../LinksDetails';

const Awsecs = ({ middleware_ECSToolTip_Modal, unsetContent, disruptionData,serviceLevel,showTooltipMessages }) => {

    const [ecsdata, setecedata] = useState([])
    const [ecsdatas, setecsdats] = useState([])
    const [errorCount, setErrorCount] = useState(0)
    const [hoverdata, setHoverData] = useState('')
    const [dishover, setDisHover] = useState([])
    const [slislo, setSliSLo] = useState();
    const [disruptionCount, setDisruptionCounts] = useState(0)
    const [slihover, setSliHover] = useState();
    const[cpuusagedata , setcpuusagedata]=useState([])
    const[memoryusagedata , setmemoryusagedata] =useState([])
    const[transmitteddata, settransmitteddata] =useState([])
    const[receiveddata, setreceiveddata] =useState([])
    const[runningstatusdata, setrunningstatusdata]=useState([])
    const[totalrunningdata,settotalrunningdata]=useState([])
    const[totalstoppeddata, setstoppeddata]=useState([])
    useEffect(async()=>{
        let cpuusageresult= await getecshightestcpu()
        let memoryusageresult= await getheighestmemoryusage()
        let transmittedresult= await gettransmitteddata()
        let receivedresult= await getreceiveddata()
        let runningresult = await getrunningstatusdata()
        let totalrunningresult= await gettotalrunningdata()
        let totalstoppedresult= await getrunningtotalstopped()
        setcpuusagedata(cpuusageresult)
        setmemoryusagedata(memoryusageresult)
        settransmitteddata(transmittedresult)
        setreceiveddata(receivedresult)
        setrunningstatusdata(runningresult)
        settotalrunningdata(totalrunningresult)
        setstoppeddata(totalstoppedresult)
    // })

    // console.log("cpuusagedata", cpuusagedata);

    // const fetchData = async () => {
    //     const slis1 = await sliEcsServices();  
    //     setSliHover(slis1);
    // }

    // useEffect(async () => {
        let cpsdataresult = await awsecedata()
        let cpsdataresult2 = await awsecedata2()
        // let cpddataresult3 = await awsecedata3()
        // let ecsError = await ecsErrorData()
        let ecshoverData = await ecsHoverData()
        // const sliString =  serviceLevel.map((cur,index) => "'" + cur.toString() + "'").join(",");

    //     let slierror = await sliEcsServices(sliString)
    //     console.log("slierror",slierror)
    //     let errorCOunt = ecshoverData.reduce((acc,cur)=>acc+cur['Exited(1)Error'],0)
       
    //     // slierror = slierror.reduce((acc, cur) => acc + cur["error"], 0);
         
        let allEcsData = [];
        async function disruptionLambda() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-ECS-POLICY") {
                        
                    allEcsData.push(disruptionData[index]);
                }
            }
        }
        disruptionLambda();
        let disruptionCounts = 0;
        allEcsData.map(
            (val) => (disruptionCounts += val["count.conditionName"])
        );
        let hoverarr = [];
        allEcsData.map(val => { hoverarr.push({ Timestamp: val["latest.timestamp"], policy_Id: val["facet"][0], policy_Name: val["facet"][1], condition_Name: val.facet[2], count: val["count.conditionName"] }) })

    //     setecedata(cpsdataresult)
    //     setecsdats(cpsdataresult2)
    //     // setecsreporting(cpddataresult3)
    //     setErrorCount(errorCOunt)
        setHoverData(ecshoverData)
        setDisHover(hoverarr)
        setDisruptionCounts(disruptionCounts);
    //     setSliSLo(slierror.length)
    //     setSliHover(slierror);
    }, [disruptionData,serviceLevel]);

   
    return (
        <div style={{ height: "250px" }} className='tasks_container'>
            <div className='header'>
                <p>ECS-Fargate</p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div className='error box' onClick={() => window.open(Middleware_Error_Inbox_Link)}>
                    <p className="main_heading">STOPPED STATUS</p>
                    <span>{totalrunningdata.length > 0 && totalrunningdata[0].running_container ?totalrunningdata[0].running_container : 0}</span>
                </div>
                <div className='sli box' 
                // onMouseOver={() => {
                //     // fetchData();
                //     middleware_ECSToolTip_Modal(slihover, "slo")
                // }}
                    // onMouseLeave={unsetContent}
                >
                    <p>RUNNING STATUS</p>
                    <span>{totalstoppeddata.length > 0 && totalstoppeddata[0].Stopped_Containers ?totalstoppeddata[0].Stopped_Containers : 0}</span>
                </div>
                <div className='disruption box' onMouseOver={() => middleware_ECSToolTip_Modal(dishover, "disruptions")}
                    onMouseLeave={unsetContent}
                    onClick={() => window.open(Middleware_Disruption_Link)} >
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCount}</span>
                </div>
            </div>

            <div className='mainaws_container single_line'>
                {/* <div style={{ "height": "40px" }} className='aws_counts one_line'> */}
                    {/* <div className=' details'>
                        <span>Network</span>
                        <span style={{ background: "none" }} className='aws_time'>
                            <span className='shared_tag'><img src={green} alt="shareicon" />{ecsdata.length > 0 && ecsdata[0].network_recieve ? ecsdata[0].network_recieve.toFixed(2) : 0}mb/sec</span>
                            <span className='deleted_tag'><img src={red} alt='delete' />{ecsdata.length > 0 && ecsdata[0].networktransmit ? ecsdata[0].networktransmit.toFixed(2) : 0}mb/sec</span>
                        </span>
                    </div> */}
                {/* </div> */}
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>
                    <div className=' details'>
                        <span>Heighest CPU usage</span>
                        <span className='blackbackground' onMouseOver={()=>{showTooltipMessages (cpuusagedata.length ? "ContainerId - "+ cpuusagedata[0].containerId:0)}} onMouseLeave={()=>{unsetContent()}}>{cpuusagedata.length > 0 && cpuusagedata[0].cpuused ? cpuusagedata[0].cpuused.toFixed(2) : 0} %</span>
                    </div>
                    <div className=' details'>
                        <span>Heighest memory usage MB</span>
                        <span className='blackbackground' onMouseOver={()=>{showTooltipMessages (memoryusagedata.length ? "ContainerId - "+ memoryusagedata[0].containerId:0)}} onMouseLeave={()=>{unsetContent()}}>{memoryusagedata.length > 0 && memoryusagedata[0].usage ?( memoryusagedata[0].usage/1000).toFixed(2) : 0} </span>
                    </div>
                    <div className='aws_timeout details'>
                        <span>Tasks Running</span>
                        <span className='blackbackground'>{runningstatusdata.length > 0 && runningstatusdata[0].Task_Running ?runningstatusdata[0].Task_Running : 0} </span>
                    </div>
                </div>
                <div className='aws_counts'>
                    <div className='aws details'>
                        <span>Heighest transmitted MB</span>
                        <span className='blackbackground' onMouseOver={()=>{showTooltipMessages (transmitteddata.length ? "ContainerId - "+ transmitteddata[0].containerId:0)}} onMouseLeave={()=>{unsetContent()}}>{transmitteddata.length > 0 && transmitteddata[0].transmitted ?( transmitteddata[0].transmitted/1000).toFixed(2) : 0} </span>
                    </div>
                    <div className='aws details'>
                        <span>Heighest received MB</span>
                        <span className='blackbackground' onMouseOver={()=>{showTooltipMessages (receiveddata.length ? "ContainerId - "+ receiveddata[0].containerId:0)}} onMouseLeave={()=>{unsetContent()}}>{receiveddata.length > 0 && receiveddata[0].received ?( receiveddata[0].received/1000).toFixed(2) : 0} </span>
                    </div>
                    <div className='aws details'>
                        <span>Tasks Exited</span>
                        <span className='blackbackground'>{runningstatusdata.length > 0 && runningstatusdata[0].Task_Exited ?runningstatusdata[0].Task_Exited : 0} </span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Awsecs