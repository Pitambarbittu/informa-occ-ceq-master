import React, { useEffect, useState } from 'react'
import ping_stat from "../../Assets/ellipse_green.svg"
import message_icon from "../../Assets/messageicon.svg"
import share_icon from "../../Assets/shareicon.svg"
import empty_message from "../../Assets/emptymessage.svg"
import delete_icon from "../../Assets/delete.svg"
import { awssqsData, sqsMessageDelayed } from "../../queryModule"
import Sqsmodal from '../Modal/Sqsmodal'
import { Middleware_Disruption_Link, Middleware_Error_Inbox_Link } from '../../LinksDetails'

const Awssqs = ({ sqsentityid, showTipModal, middleware_SQSToolTip_Modal, unsetContent, disruptionData }) => {

    const [sqsData, setsqsData] = useState([]);
    const [allMessages, setAllMessages] = useState()
    const [tooltip, setTooltip] = useState()
    const [delayed,setDelayed] = useState([])
    const [hoverData, setHoverData] = useState([])
    const [disruptionCounts, setDisruptionCounts] = useState(0)
    useEffect(async () => {
        let sqsDataArray = []
        let delayed_message = 0
        let deleted_message = 0;
        let empty_messages = 0
        let notVisible_message = 0
        // let oldest_message = 0
        let received_message = 0
        let sent_message = 0
        let visible_message = 0
        const sqsentityidString =  sqsentityid.map((cur,index) => "'" + cur.toString() + "'").join(",");

         const sqsdelayed = await sqsMessageDelayed(sqsentityidString)
    
         setDelayed(sqsdelayed)


        let allSQSData = []
        async function disruptionSQS() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-SQS-POLICY") {
                    allSQSData.push(disruptionData[index])
                }
            }
        }

        disruptionSQS()
        let disruptionCounts = 0
        allSQSData.map(val => disruptionCounts += val["count.conditionName"])
        let hoverarr = []
        allSQSData.map(val => { hoverarr.push({ Timestamp: val["latest.timestamp"], policy_Id: val["facet"][0], policy_Name: val["facet"][1], condition_Name: val.facet[2], count: val["count.conditionName"] }) })

        setHoverData(hoverarr)
        setDisruptionCounts(disruptionCounts)

        async function getSqs() {
            for (let i = 0; i < sqsentityid.length; i++) {
                const dataArray = await awssqsData(sqsentityid[i])
                const dataObj = dataArray[0]
                delayed_message += dataObj.delayed_message
                deleted_message += dataObj.deleted_message
                empty_messages += dataObj.empty_messages
                notVisible_message += dataObj.notVisible_message
                // oldest_message += dataObj.oldest_message
                received_message += dataObj.received_message
                sent_message += dataObj.sent_message
                visible_message += dataObj.visible_message
                sqsDataArray.push(dataObj)
            }
        }
        await getSqs()
        setAllMessages({
            delayed_message: delayed_message,
            deleted_message: deleted_message,
            empty_messages: empty_messages,
            notVisible_message: notVisible_message,
            // oldest_message: oldest_message,
            received_message: received_message,
            sent_message: sent_message,
            visible_message: visible_message,
        })
        setsqsData([...sqsDataArray])

    }, [sqsentityid]);
   

    function showsqsmodal(param) {
        if (param === "enter") {
            let htmldata = <Sqsmodal sqsData={sqsData} />
            showTipModal(htmldata)
        } else {
            showTipModal("leave")
        }
    }
    return (
        <div className='tasks_container' style={{"height":"281px"}}>
            <div className='header'>
                <p>AWS SQS</p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div onClick={() =>
                    window.open(Middleware_Error_Inbox_Link)
                } className='error box'>
                    <p className="main_heading"

                    >MESSAGES NOT VISIBLE</p>
                    <span>{allMessages ? allMessages.notVisible_message : 0}</span>
                </div>
                <div className='sli box'>
                    <p>MESSAGE DELAYED</p>
                    <span>{delayed["Number Of Messages Delayed"]?delayed["Number Of Messages Delayed"]:0}</span>
                </div>
                <div onClick={() =>
                    window.open(Middleware_Disruption_Link)
                } className='disruption box' onMouseOver={() => middleware_SQSToolTip_Modal(hoverData, "disruptions")} onMouseLeave={unsetContent}>
                    <p className="main_heading"

                    >DISRUPTIONS</p>
                    <span>{disruptionCounts}</span>
                </div>
            </div>
{/* 
            <div className='mainaws_container single_line'>
                <div className='aws_counts one_line'>
                    <div className=' details'>
                        <span>Messages</span>
                        <span style={{ background: "none" }} className='aws_time'>
                            <span className='messages_tag'><img src={message_icon} alt="messages" />{allMessages ? allMessages.received_message : 0}</span>
                            <span className='shared_tag'><img src={share_icon} alt="shareicon" />{allMessages ? allMessages.sent_message : 0}</span>
                            <span className='deleted_tag'><img src={delete_icon} alt='delete' />{allMessages ? allMessages.deleted_message : 0}</span>
                            <span className='empty_tag'><img src={empty_message} />{allMessages ? allMessages.empty_messages : 0}</span></span>
                    </div>
                    <div className=' details'>
                        <span>Oldest Messages</span>
                        <span>{allMessages ? allMessages.oldest_message : 0}</span>
                    </div>
                    <div className=' details'>
                        <span>Messages Not Visible</span>
                        <span>{allMessages ? allMessages.notVisible_message : 0} </span>
                    </div>
                    <div className=' details'>
                        <span>Messages Visible</span>
                        <span>{allMessages ? allMessages.visible_message : 0}</span>
                    </div>
                </div>
            </div> */}


<div className='mainaws_container single_line'>
                <div style={{ "height": "40px" }} className='aws_counts one_line'>

                    <div className=' details'>
                        <span>Messages</span>
                        <span style={{ background: "none" }} className='aws_time'>
                        <span className='messages_tag'><img src={message_icon} alt="messages" />{allMessages ? allMessages.received_message : 0}</span>
                            <span className='shared_tag'><img src={share_icon} alt="shareicon" />{allMessages ? allMessages.sent_message : 0}</span>
                            <span className='deleted_tag'><img src={delete_icon} alt='delete' />{allMessages ? allMessages.deleted_message : 0}</span>
                            <span className='empty_tag'><img src={empty_message} />{allMessages ? allMessages.empty_messages : 0}</span></span>
                       
                    </div>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>
                    {/* <div className=' details'>
                        <span>Oldest Messages</span>
                        <span>{allMessages ? allMessages.oldest_message : 0}</span>
                    </div> */}
                    {/* <div className=' details'>
                        <span>Reporting agent</span>
                        <span className='aws_started'>{ecsdata.length > 0 && ecsdata[0]["Agents Reporting"] ? ecsdata[0]["Agents Reporting"].toFixed(2) : 0}</span>
                    </div> */}
                    <div className='aws_timeout details'>
                        <span>Messages Visible</span>
                        <span>{allMessages ? allMessages.visible_message : 0}</span>
                       
                    </div>
                </div>
                <div className='aws_counts'>
                    {/* <div className='aws details'>
                        <span>Messages Visible</span>
                        <span>{allMessages ? allMessages.visible_message : 0}</span>
                    </div> */}
                    {/* <div className='aws details'>
                        <span>Tasks Exited</span>
                        <span>{ecsdatas.length > 0 && ecsdatas[0].Exited ? ecsdatas[0].Exited.toFixed(2) : 0}</span>
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default Awssqs