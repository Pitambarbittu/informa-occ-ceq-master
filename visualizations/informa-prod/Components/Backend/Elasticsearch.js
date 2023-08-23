import React, { useEffect, useState } from 'react'
import empty_message from "../../Assets/emptymessage.svg"
import { elasticsearchErrorHover, getelasticcachedata, getelasticsearchdataa, radiscachedata, redis_CacheData } from '../../queryModule';
import green from "../../Assets/greennetwork.svg"
import red from "../../Assets/rednetwork.svg"
import { Backend_Disruption_Link, Backend_Error_Inbox_Link } from '../../LinksDetails';

//error data is not coming

const Elasticsearch = ({ backend_Redis_CacheToolTip_Modal, unsetContent, disruptionData, elasticentity, elasticsearchentity }) => {

    const[elasticdata, setelasticdata]=useState([])
    const[messagedetails, setmessagedetails]=useState([])
    const [errorDatas,setErrorData] = useState(0)
    const [errorHover,setErrorHover] = useState([])
    const [hoverData, setHoverData] = useState([]);
    const [disruptionCountss, setDisruptionCounts] = useState(0);

    useEffect(async () => {

        const elasticId =elasticsearchentity.map((cur,index) => "'" + cur.toString() + "'").join(",");
       let errorHoverData = await elasticsearchErrorHover(elasticId)
        let errorData = errorHoverData.reduce((acc,cur)=>acc+(cur['3xxErrors']+cur['4xxErrors']+cur['5xxErrors']),0)
        setErrorHover(errorHoverData)
        setErrorData(errorData)
        let allLambdaData = [];
        async function disruptionLambda() {
            for (let index = 0; index < disruptionData.length; index++) {
                if (disruptionData[index].facet[1] === "P1-ELASTIC-SEARCH-POLICY") {
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
   
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
        let elasticsearcharray = []
       let Cluster_Used_Space=0;
       let Read_Iops=0;
       let Write_Iops=0;
       let CPU_Utilization=0;
       let Average_Read_Latency=0;
       let Write_Latency=0;
       let Write_Throughput=0;
       let Read_Throughput=0;

        async function getelasticsearchdata() {
            for (let i = 0; i < elasticsearchentity.length; i++) {
                const elasticdataresult = await getelasticsearchdataa(elasticsearchentity[i])
                const dataobjectdetails = elasticdataresult[0]
                if(dataobjectdetails){
                    Cluster_Used_Space+=dataobjectdetails.Cluster_Used_Space
                    Read_Iops += dataobjectdetails.Read_Iops
                    Write_Iops += dataobjectdetails.Write_Iops
                    CPU_Utilization += dataobjectdetails.CPU_Utilization
                    Average_Read_Latency += dataobjectdetails.Average_Read_Latency
                    Write_Latency +=dataobjectdetails.Write_Latency
                    Write_Throughput +=dataobjectdetails.Write_Throughput
                    Read_Throughput += dataobjectdetails.Read_Throughput
                    elasticsearcharray.push(dataobjectdetails)
                }
              
            }
        }
        await getelasticsearchdata()
        setmessagedetails({
            Cluster_Used_Space:Cluster_Used_Space,
            Read_Iops:Read_Iops,
            Write_Iops:Write_Iops,
            CPU_Utilization:CPU_Utilization,
            Average_Read_Latency:Average_Read_Latency,
            Write_Latency:Write_Latency,
            Write_Throughput:Write_Throughput,
            Read_Throughput:Read_Throughput
        })
        setelasticdata([...elasticsearcharray])
    }, [elasticsearchentity,disruptionData,elasticentity]);

    return (
        <div style={{ height: "300px" }} className='tasks_container'>
            <div className='header'>
                <p>Elastic Search </p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div className='error box' onClick={() =>
                    window.open(Backend_Error_Inbox_Link)
                } onMouseOver={() => errorDatas && backend_Redis_CacheToolTip_Modal(errorHover,"errors")} onMouseLeave={unsetContent}>
                    <p className="main_heading">ERROR INBOX</p>
                    <span>{errorDatas >0 ? <span style={{color:"#e0332a"}}>{errorDatas }</span> : <span style={{color:"black"}}>{errorDatas }</span>}</span>
                    {/* <span>{errorDatas}</span> */}
                </div>
                <div className='sli box'>
                    <p>CPU UTILIZATION</p>
                    <span>{messagedetails.CPU_Utilization?.toFixed(2) || 0}</span>
                </div>
                <div onClick={() =>
                    window.open(Backend_Disruption_Link)
                } className='disruption box' 
                onMouseOver={() => backend_Redis_CacheToolTip_Modal(hoverData, "disruptions")} onMouseLeave={unsetContent}
                >
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCountss}</span>
                </div>
            </div>
            <div className='mainaws_container single_line'>
                <div style={{ "height": "40px" }} className='aws_counts one_line'>

                    <div className=' details'>
                        <span>IOPS</span>
                        <span className='aws_time' style={{ background: "none" }}>
                            <span className='shared_tag'>Read { messagedetails.Read_Iops?.toFixed(2) || 0}mb/sec</span>
                            <span className='deleted_tag'>Write {messagedetails.Write_Iops?.toFixed(2) || 0}mb/sec</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>
                    <div className=' details'>
                        <span>Read latency</span>
                        <span>{messagedetails.Average_Read_Latency?.toFixed(2) || 0}ms</span>
                    </div>
                    {/* <div className='details'>
                    <span>Evictions</span>
                    <span>{radisdata.length>0 && radisdata[0].evictions?radisdata[0].evictions.toFixed():0}</span>
                </div> */}
                    <div className=' details'>
                        <span>Write throughput</span>
                        <span >{ messagedetails.Write_Throughput?.toFixed(2)|| 0} bytes/sec</span>
                    </div>
                    <div className='aws details'>
                        <span>Read throughput</span>
                        <span >{ messagedetails.Read_Throughput?.toFixed(2) || 0} bytes/sec</span>
                    </div>
                    {/* <div className=' details'>
                    <span>Cache Hit Rate</span>
                    <span className='aws_started'>{radisdata.length>0 && radisdata[0].cache_hit_rate?radisdata[0].cache_hit_rate.toFixed():0}</span>
                </div> */}
                </div>
                <div className='aws_counts'>
                    <div className='aws details'>
                        <span>Cluster used space</span>
                        <span>{ messagedetails.Cluster_Used_Space?.toFixed(2) || 0}</span>
                    </div>
                    <div className='aws details'>
                        <span>Write latency</span>
                        <span >{ messagedetails.Write_Latency?.toFixed(2) || 0}</span>
                    </div>
                    {/* <div className='aws details'>
                        <span>Memory</span>
                        <span >{messagedetails ? (messagedetails.Free_Memory / 1000000).toFixed(2) : 0} MBs</span>
                    </div> */}

                </div>
            </div>
        </div>


    )
}

export default Elasticsearch