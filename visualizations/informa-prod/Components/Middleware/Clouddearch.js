import React, { useEffect, useState } from 'react'
// import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import message_icon from "../../Assets/messageicon.svg"
import share_icon from "../../Assets/shareicon.svg"
import empty_message from "../../Assets/emptymessage.svg"
import delete_icon from "../../Assets/delete.svg"
import { cloudsearch, elasticsearchErrorHover } from '../../queryModule'
import { Backend_Disruption_Link, Backend_Error_Inbox_Link, Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from '../../LinksDetails'

const Cloudsearch = ({ middleware_Elastic_Search_Modal, unsetContent, disruptionData }) => {

    const [clouddata, setclouddata] = useState([])
    // const [errorDatas, setErrorData] = useState(0)
    // const [errorHover, setErrorHover] = useState([])

    useEffect(async () => {
        let cloudsearchresult = await cloudsearch()
        // let errorHoverData = await elasticsearchErrorHover()
        // let errorData = errorHoverData.reduce((acc, cur) => acc + (cur['3xxErrors'] + cur['4xxErrors'] + cur['5xxErrors']), 0)

        // console.log("error in cloud", errorHoverData)
        // console.log("cloudEq", cloudsearchresult)
        // setErrorHover(errorHoverData)
        // setErrorData(errorData)
        setclouddata(cloudsearchresult)
    }, []);

   
  return (
    <div style={{ height: "300px" }} className='tasks_container'>
       <div className='header'>
       <p>Cloud Search</p>
        {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
       </div>
        <div className='task_errors'>
            <div className='sli box' style={{"width": "52.33%"}}
             >
                <p>SUCESSFUL REQUEST</p>
                <span>{clouddata.length>0 && clouddata[0].Successful_Request? clouddata[0].Successful_Request :0 }</span>
            </div>
            <div className='sli box' style={{"width": "52.33%"}}>
                <p>PARTITIONS</p>
                <span>{clouddata.length>0 && clouddata[0].Cloudsearch_Partitions? clouddata[0].Cloudsearch_Partitions :0 }</span>
            </div>
            {/* <div className='disruption box' 
            onClick={() => window.open(Backend_Disruption_Link)}>
                <p className="main_heading">DISRUPTIONS</p>
                <span>0</span> */}
            {/* </div> */}
        </div>

            <div className='mainaws_container'>
                <div className='aws_counts'>

                    {/* <div className=' details'>
                    <span>Successful Request</span>
                    <span>{clouddata.length>0 && clouddata[0].Successful_Request? clouddata[0].Successful_Request.toFixed(2) :0 }</span>
                </div> */}
                    <div className=' details'>
                        <span>Searchable Documents</span>
                        <span>{clouddata.length > 0 && clouddata[0].Searchable_Documents ? clouddata[0].Searchable_Documents.toFixed(2) : 0}</span>
                    </div>
                </div>
                <div className='aws_counts'>
                    {/* <div className='aws details'>
                    <span>Cloudsearch Partitions</span>
                    <span>{clouddata.length>0 && clouddata[0].Cloudsearch_Partitions? clouddata[0].Cloudsearch_Partitions.toFixed(2) :0 }</span>
                </div> */}
                    <div className='aws details'>
                        <span>Elastic Index Utilizations</span>
                        <span>{clouddata.length > 0 && clouddata[0].Cloudsearch_Index ? clouddata[0].Cloudsearch_Index.toFixed(2) : 0}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cloudsearch