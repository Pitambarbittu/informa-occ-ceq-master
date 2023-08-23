import React, { useEffect, useState } from 'react'
// import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import { snsDatas, snsFailed } from '../../queryModule';
import { Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from '../../LinksDetails';

const Awssns = ({ snsentityid,middleware_Elastic_Search_Modal,unsetContent,disruptionData }) => {

    const [snsData, setsnsData] = useState();
    const [messageData, setAllsnsMessagesdata] = useState([])
    const [failed,setFailed] =useState([])
    const [hoverData, setHoverData] = useState([]);
    const [disruptionCounts, setDisruptionCounts] = useState(0);

    useEffect(async () => {


        let allLambdaData = [];
        async function disruptionLambda() {
          for (let index = 0; index < disruptionData.length; index++) {
            if (disruptionData[index].facet[1] === "P1-SNS-POLICY") {
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

        let snsDataArray = []
        let messsages_published = 0;
        let notifications_delivered = 0;
        let notifications_failed = 0;
        const snsentityidString =   snsentityid .map((cur,index) => "'" + cur.toString() + "'").join(",");
        let failedMessagess = await snsFailed(snsentityidString)

        setFailed(failedMessagess)
        async function getSns() {
            for (let i = 0; i < snsentityid.length; i++) {
                const dataArraysns = await snsDatas(snsentityid[i])
                const dataobject = dataArraysns[0]
                messsages_published += dataobject.messsages_published
                notifications_delivered += dataobject.notifications_delivered
                notifications_failed += dataobject.notifications_failed
                snsDataArray.push(dataobject)
            }
        }
        await getSns()
        setAllsnsMessagesdata({
            messsages_published: messsages_published,
            notifications_delivered: notifications_delivered,
            notifications_failed: notifications_failed,
        })
        setsnsData([...snsDataArray])
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
    }, [snsentityid,disruptionData]);
    return (
        <div className='tasks_container' style={{ "height": "281px" }}>
            <div className='header'>
                <p >SNS</p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div className='error box' onClick={() => window.open(Middleware_Error_Inbox_Link)}>
                    <p className='main_heading'>NOTIFICATIONS FAILED</p>
                    <span>{failed["Number Of Notifications Failed"]&& failed["Number Of Notifications Failed"]?failed["Number Of Notifications Failed"]:0}</span>
                   
                </div>
                <div className='sli box' style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <p style={{textalign: "center !important"}}>NOTIFICATION 
                                 DELIVERED </p>
                                 <span>{messageData ? messageData.notifications_delivered : 0}</span>
                </div>
                <div onClick={() =>
                    window.open(Middleware_Disruption_Link)
                } className='disruption box'  onMouseOver={() => middleware_Elastic_Search_Modal(hoverData, "disruptions")}
                onMouseLeave={unsetContent}>
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCounts}</span>
                </div>
            </div>
            <>

                <div className='mainaws_container single_line'>
                    <div className='aws_counts one_line'>

                        <div className=' details'>
                            <span>Messages Published</span>
                            <span >{messageData ? messageData.messsages_published : 0}</span>
                        </div>
                        {/* <div className=' details'>
                            <span>Notifications Delivered</span>
                            <span >{messageData ? messageData.notifications_delivered : 0}</span>
                        </div> */}
                        {/* <div className=' details'>
                            <span>Notifications Failed</span>
                            <span>{messageData ? messageData.notifications_failed : 0}</span>
                        </div> */}
                    </div>

                </div>


            </>
        </div>
    )
}

export default Awssns