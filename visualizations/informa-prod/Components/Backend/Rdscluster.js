import React, { useEffect, useState } from 'react'
import { getrdsclusterdata, rdsData, rdsquerydatas, rdsreceivedata, rdsutilization } from '../../queryModule';
import rdsmemory from "../../Assets/rdsmemory.svg"
import rdsarrow from "../../Assets/rdsarrow.svg"
import green from "../../Assets/greennetwork.svg"
import red from "../../Assets/rednetwork.svg"
import { func } from 'prop-types';
import { Backend_Disruption_Link, Backend_Error_Inbox_Link } from '../../LinksDetails';

const Rdscluster = ({ rdsentityid, backend_RDS_ClusterToolTip_Modal, unsetContent, disruptionData }) => {
    const [rdsdatas, setrdadata] = useState()
    const [messagedetailsdata, setmessagedetailsdata] = useState()
    const [hoverData, setHoverData] = useState([]);
    const [disruptionCountss, setDisruptionCounts] = useState(0);
    const [deadlocks,setDeadLocks] = useState(0)
    const [block,setBlock] = useState(0)
    useEffect(async () => {


    const rdsentityids = rdsentityid.map((cur, index) => "'" + cur.toString() + "'").join(",");
       let rds =await rdsData(rdsentityids)
       console.log("rds",rds)
       
       setDeadLocks(rds[0].Deadlocks)
       setBlock(rds[0].blockedTransactions)

        let rdsDataarray = []
        let Receive = 0;
        let Transmit = 0;
        let cpu_utilization = 0;
        let db_connection = 0;
        let read_latency = 0;
        let write_latency = 0;
        let write_throughput = 0;
        let read_throughput = 0;

        let allLambdaData = [];
        async function disruptionLambda() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-RDS-POLICY") {
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


        async function getRds() {
            for (let i = 0; i < rdsentityid.length; i++) {
                const rdsclusterdata = await getrdsclusterdata(rdsentityid[i])
                console.log("rdsdata",rdsclusterdata)
                const dataobjects = rdsclusterdata[0]
                Receive += dataobjects.Receive
                Transmit += dataobjects.Transmit
                cpu_utilization += dataobjects.cpu_utilization
                db_connection += dataobjects.db_connection
                read_latency += dataobjects.read_latency
                write_latency += dataobjects.write_latency
                write_throughput += dataobjects.write_throughput
                read_throughput += dataobjects.read_throughput
                rdsDataarray.push(dataobjects)
            }
        }

        await getRds()
        setmessagedetailsdata({
            Receive: Receive,
            Transmit: Transmit,
            cpu_utilization: cpu_utilization,
            db_connection: db_connection,
            read_latency: read_latency,
            write_latency: write_latency,
            write_throughput: write_throughput,
            read_throughput: read_throughput,

        })
        setrdadata([...rdsDataarray])
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
    }, [rdsentityid,disruptionData])

    return (
        <div style={{ height: "300px" }} className='tasks_container'>
            <div className='header'>
                <p>RDS </p>
                {/* {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div className='error box' onClick={() =>
                    window.open(Backend_Error_Inbox_Link)
                } >
                    <p className="main_heading">DEADLOCKS</p>
                    <span>{deadlocks >0 ? <span style={{color:"#e0332a"}}>{deadlocks }</span> : <span style={{color:"black"}}>{deadlocks }</span>}</span>
                    
                </div>
                <div className='sli box'>
                    <p>BLOCKED TRANSCATIONS</p>
                    <span>{block}</span>
                </div>
                <div onClick={() =>
                    window.open(Backend_Disruption_Link)
                } className='disruption box'onMouseOver={() => backend_RDS_ClusterToolTip_Modal(hoverData, "disruptions")} onMouseLeave={unsetContent}>
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCountss}</span>
                </div>
            </div>

            <div className='mainaws_container single_line'>
                <div style={{ "height": "40px" }} className='aws_counts one_line'>

                    <div className=' details'>
                        <span>Network</span>
                        <span style={{ background: "none" }} className='aws_time'>
                            <span className='shared_tag'><img src={green} alt="shareicon" />{messagedetailsdata ? messagedetailsdata.Receive.toFixed(2) : 0}mb/sec</span>
                            <span className='deleted_tag'><img src={red} alt='delete' />{messagedetailsdata ? messagedetailsdata.Transmit.toFixed(2) : 0}mb/sec</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>
                    <div className=' details'>
                        <span>Cpu Utilization</span>
                        <span className='aws_started'> {messagedetailsdata ? messagedetailsdata.cpu_utilization.toFixed(2) : 0}%</span>
                    </div>
                    <div className=' details'>
                        <span>Read latency</span>
                        <span> {messagedetailsdata ? messagedetailsdata.read_latency.toFixed(2) : 0}ms</span>
                    </div>
                    <div className='aws_timeout details'>
                        <span>Write throughput</span>
                        <span>{messagedetailsdata ? (messagedetailsdata.write_throughput / 1000000).toFixed(2) : 0}MBs/sec</span>
                    </div>
                    {/* <div className='aws_timeout details'>
                    <span>Login failure</span>
                    <span>20</span>
                </div> */}
                </div>

                <div className='aws_counts'>
                    <div className='aws details'>
                        <span>DB connections</span>
                        <span>{messagedetailsdata ? messagedetailsdata.db_connection.toFixed(2) : 0}</span>
                    </div>
                    <div className='aws details'>
                        <span>Write latency</span>
                        <span > {messagedetailsdata ? (messagedetailsdata.write_latency / 1000000).toFixed(2) : 0}ms</span>
                    </div>
                    <div className='aws details'>
                        <span>Read throughput</span>
                        <span> {messagedetailsdata ? (messagedetailsdata.read_throughput / 1000000).toFixed(2) : 0} MBs/sec</span>
                    </div>
                    {/* <div className='aws details'>
                    <span>Queries</span>
                    <span>20</span>
                </div> */}
                </div>

            </div>

        </div>
    )
}

export default Rdscluster