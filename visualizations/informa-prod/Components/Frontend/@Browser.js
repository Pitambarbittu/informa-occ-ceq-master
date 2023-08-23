import React, { useEffect, useState } from 'react'
import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import { broserdatas, browserdata, broserHoverData, sliBroserData, browserfid, getbrowserjsdata, getbrowserlcpdata } from '../../queryModule';
import Table from '../Tablecomponent/Table';
import Tracing from './tracing';
import Pagecalls from './Pagecalls';
import Slislopages from './Slislopages';

const Browser = ({ frontEnd_BrowserToolTip_Modal, unsetContent , distributeddata, disruptionData , browserentity,serviceLevel}) => {

    const [openmodal, setOpenmodal] = useState(false)
    const[opentrace , setopentrace] =useState(false)
    const[openslidetails, setopenslidetails] =useState(false)
    const [sliError, setSliError] = useState()
    const [hoverData, setHoverData] = useState()
    const [disruptionCount, setDisruptionCounts] = useState(0)
    const [jserror, setjserror] = useState([])
    const [browsererror, setbrowsererror] = useState()
    const [loadtime, setloadtime] = useState(0)
    const [tooltip, setTooltip] = useState()
    const [slitool, setSlitool] = useState()
    const [error, seterror] = useState(0)
    const[info , infoUpdate] = useState(false)
    const[siddata , setsiddata] = useState([])
    const[opencalls , setopencalls] = useState()
    const [slislo, setSliSLo] = useState([]);
    const[jserrordata , setjserrordata] =useState()
    const [messagedetails, setmessagedetails] =useState()
//    const fetchData = async () => {
//     const slihover = await sliBroserData();
//     console.log("hoverdata",slihover)
//     setSliSLo(slihover);
//     }
    const open = () => {
        setOpenmodal(!openmodal)

    }

    const opened = () => {
        setopentrace(!opentrace)

    }

    const sliopened=() =>{
        setopenslidetails(!openslidetails)
    }

    const openedcalls = () => {
        setopencalls(!opencalls)

    }

    const closeModal =()=>{
   
        setOpenmodal(false)
    }

    function hover(param) {
        if(param === 'enter'){
          infoUpdate(true)
       
        }else{
          infoUpdate(false)
        }
      }
      
      useEffect(async () =>{
        const sliString =       serviceLevel.map((cur,index) => "'" + cur.toString() + "'").join(",");

        const slihover = await sliBroserData(sliString);
       
        setSliSLo(slihover);
        setSliError(slihover.length)


        let errordata = await broserHoverData();
        setTooltip(errordata)
        let errordatas = errordata.reduce((acc, cur) => acc + (cur['error']), 0);
         seterror(errordatas)
         let allbrowserData = []
         async function disruptionBrowser() {
             for (let index = 0; index < disruptionData.length; index++) {
                 if (disruptionData[index].facet[1] === "P1-BROWSER-POLICY") {
                     allbrowserData.push(disruptionData[index])
                 }
             }
         }
 
         disruptionBrowser()
         let disruptionCounts = 0
         allbrowserData.map(val => disruptionCounts += val["count.conditionName"])
 
         let hoverarr = []
         allbrowserData.map(val => { hoverarr.push({ Timestamp: val["latest.timestamp"], policy_Id: val["facet"][0], policy_Name: val["facet"][1], condition_Name: val.facet[2], count: val["count.conditionName"] }) })
 
 
         setHoverData(hoverarr)
         setDisruptionCounts(disruptionCounts)
        let jserrordata =[]
        let error_message=0;
        let LCP=0;
        let FID=0;
        let CLS=0;
        async function getjserror(){
            for(let i=0; i<browserentity.length ;i++){
                const dataarraydetails= await getbrowserjsdata(browserentity[i])
                const lcpdetails = await getbrowserlcpdata(browserentity[i])
              
                const dataobjects= dataarraydetails[0]
                const lcpobject=lcpdetails[0]
                error_message += dataobjects.error_message
                LCP += lcpobject.LCP
                FID += lcpobject.FID
                CLS += lcpobject.CLS
                jserrordata.push(dataobjects)
            }
        }
        await getjserror()
        setmessagedetails({
            error_message:error_message,
            LCP:LCP,
            FID:FID,
            CLS:CLS
        })
        setjserrordata([...jserrordata])
      },[browserentity,disruptionData,serviceLevel]);
   

    return (
        <div className='tasks_container'>
            <div className='header'>
                <p>Browser</p>
                <h5 onClick={() => open()} className='view_modal_btn' style={{height:"fit-content"}}>EDT</h5>
                {/* <button onClick={open}>EDT</button> */}
                {openmodal ? <Table openmodal={openmodal} setOpenmodal={setOpenmodal} /> : null}  
            </div>
            <div className='task_errors' >
                <div onClick={() =>
                    window.open(
                        `https://onenr.io/0nQxPZkDXQV`
                    )
                } className='error box' onMouseOver={() => frontEnd_BrowserToolTip_Modal(tooltip, "errors")} onMouseLeave={unsetContent}>
                    <p className="main_heading"

                    >ERROR INBOX</p>
                    <span>{error}</span>
                </div>
                <div className='sli box' 
                onMouseOver={() => {
                
                    sliError>0&& frontEnd_BrowserToolTip_Modal(slislo, "slo")
                }}
                    onMouseLeave={unsetContent}
                >               
                    <p>SLI/SLO</p>
                    <span>{sliError}</span>
                    {/* <span>{0}</span> */}
                </div>
                <div onClick={() =>
                    window.open(
                        `https://onenr.io/08jqaDM0ljl`
                    )
                } className='disruption box' onMouseOver={() => frontEnd_BrowserToolTip_Modal(hoverData, "disruptions")} onMouseLeave={unsetContent}>
                    <p className="main_heading"

                    >DISRUPTIONS</p>
                    <span>{disruptionCount}</span>
                </div>
            </div>
            <>

                <div className='mainaws_container'>
                    <div className='aws_counts'>
                        <div className=' details'>
                            <span>JS error count</span>
                            <span>{messagedetails ? messagedetails.error_message : 0}</span>
                            {/* <span className={jserror.length > 0 && jserror[0].JavaScript_error_rate ? 'aws_aborted':'aws_time' } >{jserror.length > 0 && jserror[0].JavaScript_error_rate ? jserror[0].JavaScript_error_rate.toFixed(2) : 0}%</span> */}
                        </div>
                        {/* <div className=' details'>
                            <span>Pageload time</span>
                            <span className='aws_time'>{loadtime.toFixed()/1000}Sec</span>
                        </div> */}
                        <div className='aws details'>
                    <span>CLS</span>
                    <span >{messagedetails ? messagedetails.CLS.toFixed(2) : 0}</span>
                    
                </div>
                        <div className=' details'>
                            <span>FID</span>
                            <span >{messagedetails ? (messagedetails.FID/1000).toFixed(2): 0} Sec</span>
                        </div>
                    </div>

            <div className='aws_counts'>
                <div className='aws details'>
                    <span>Slowest calls</span>
                    <span className='blue_tag' onClick={() => openedcalls(false)}> 10
                    </span>
                </div>
                <div className='aws details'>
                    <span>LCP</span>
                    <span >{messagedetails ? messagedetails.LCP.toFixed(2) : 0}Sec</span>
                    {/* <span className='aws_aborted'>{browsererror && browsererror[0].throughput?browsererror[0].throughput.toFixed():0}</span> */}
                </div>
                {/* <div className='aws details'>
                    <span>CLS</span>
                    <span className='aws_time'>{siddata.length>0 && siddata[0].CLS?siddata[0].CLS.toFixed()/1000:0}Sec</span>
                   
                </div> */}
            </div>

        </div>

        <div className='modal_buttons'>
            <span className='view_modal_btns' onClick={()=>opened()}>Distrubuted tracing</span>
            <span className='view_modal_btns' style={{"marginleft": "10px !important"}} onClick={()=>sliopened()}>SLI/SLO details</span>
        </div>
  
        {opentrace  ? (
            <>
                <div className="backdrop_tracing" onClick={() => setopentrace(false)}></div>
                <Tracing opentrace={opentrace} setopentrace={setopentrace}/>
            </>
        ):null }
        {openslidetails  ? (
            <>
                <div className="backdrop_tracing" onClick={() => setopenslidetails(false)}></div>
                <Slislopages openslidetails={openslidetails} setopenslidetails={setopenslidetails}/>
            </>
        ):null }

        {opencalls  ? <>
                        <div className="backdrop_tracing" onClick={() => openedcalls(false)}></div>
                        <Pagecalls opencalls={opencalls} setopencalls={setopencalls}/>
                    </>
                    :null }
   </>

        </div>
    )
}

export default Browser