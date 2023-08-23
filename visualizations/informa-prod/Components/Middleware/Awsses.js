import React, { useEffect, useState } from 'react'
// import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import message_icon from "../../Assets/messageicon.svg"
import share_icon from "../../Assets/shareicon.svg"
import empty_message from "../../Assets/emptymessage.svg"
import delete_icon from "../../Assets/delete.svg"
import { getawssesdata, sesData } from '../../queryModule'
import { Backend_Disruption_Link, Backend_Error_Inbox_Link } from '../../LinksDetails'

const Awsses = ({ awssesentity, middleware_Elastic_Search_Modal, unsetContent, disruptionData }) => {
   
    const [awssesdata, setawssesdata] = useState()
    const [messagedetails, setmessagedetails] = useState()
    const [bounce, setBounce] = useState(0)
    const[Complaint,setComplaint] = useState(0)
    // const []
    const [hoverData, setHoverData] = useState([]);
    const [disruptionCounts, setDisruptionCounts] = useState(0);

    useEffect(async () => {
        const awsEntityString = awssesentity.map((cur, index) => "'" + cur.toString() + "'").join(",");
        // console.log("awsEntityString" , awsEntityString);
        // let sesDatas = await sesData(awsEntityString);
    //     console.log("sesData", sesDatas)
    //    setBounce(sesData[0].Bounce_Rate  )

        let allLambdaData = [];
        async function disruptionLambda() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-SES-POLICY") {
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


        let awssesdataArray = []
        let Bounce_Rate = 0;
        let Complaint_rate = 0
        let Delivery = 0
        let Send = 0;
        async function getses() {
            for (let i = 0; i < awssesentity.length; i++) {
                const awssesdata = await sesData(awssesentity[i])
                const dataobjects = awssesdata[0]
                if(dataobjects){
                    Bounce_Rate += dataobjects.Bounce_Rate
                Complaint_rate += dataobjects.Complaint_rate
                Delivery += dataobjects.Delivery
                Send += dataobjects.Send
                awssesdataArray.push(dataobjects)

                }
                
            }
        }
        await getses()
        setmessagedetails({
            Bounce_Rate: Bounce_Rate,
            Complaint_rate: Complaint_rate,
            Delivery: Delivery,
            Send: Send
        })
        setawssesdata([...awssesdataArray])
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
    }, [awssesentity, disruptionData]);

  

    return (
        <div style={{ height: "300px" }} className='tasks_container'>
            <div className='header'>
                <p>AWS SES</p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div onClick={() =>
                    window.open(Backend_Error_Inbox_Link)
                } className='error box'>
                    <p className="main_heading">COMPLAINT RATE</p>
                    <span>{ messagedetails?.Complaint_rate?.toFixed(2) || 0}</span>
                </div>
                <div className='sli box'>
                    <p>BOUNCE RATE</p>
                    <span>{messagedetails?.Bounce_Rate?.toFixed(2) || 0}</span>
                </div>
                <div onClick={() =>
                    window.open(Backend_Disruption_Link)
                } className='disruption box' onMouseOver={() => middleware_Elastic_Search_Modal(hoverData, "disruptions")}
                    onMouseLeave={unsetContent}>
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCounts}</span>
                </div>
            </div>
            <div className='mainaws_container single_line'>
                <div className='aws_counts one_line'>

                    {/* <div className=' details'>
                        <span>Complaint rate</span>
                        <span style={{ background: "none" }} className='aws_time'>
                            <span>{messagedetails ? messagedetails.Complaint_rate : 0}</span></span>
                    </div> */}
                    <div className=' details'>
                        <span>Delivery</span>
                        <span>{ messagedetails?.Delivery?.toFixed(2) || 0}</span>
                    </div>
                    <div className='details'>
                        <span>Send</span>
                        <span >{messagedetails?.Send?.toFixed(2) || 0}</span>
                    </div>
                </div>

                {/* <div className='aws_counts'>
                <div className='aws details'>
                    <span>Execution Throttled</span>
                    <span>5.21 ms</span>
                </div>
                <div className='aws details'>
                    <span>Executions Failed</span>
                    <span>5</span>
                </div>
                <div className='aws details'>
                    <span>Executions Succeeded</span>
                    <span>21 </span>
                </div>
            </div> */}

            </div>

        </div>
    )
}

export default Awsses