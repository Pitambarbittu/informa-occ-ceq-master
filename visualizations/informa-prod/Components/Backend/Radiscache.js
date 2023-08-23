import React, { useEffect, useState } from 'react'
import empty_message from "../../Assets/emptymessage.svg"
import { ElasticSliData, getelasticcachedata, radiscachedata, redis_CacheData } from '../../queryModule';
import green from "../../Assets/greennetwork.svg"
import red from "../../Assets/rednetwork.svg"
import { Backend_Disruption_Link, Backend_Error_Inbox_Link } from '../../LinksDetails';

//error data is not coming

const Radiscache = ({ backend_Redis_CacheToolTip_Modal, unsetContent, disruptionData, elasticentity,serviceLevel }) => {

  
    const [elasticdata, setelasticdata] = useState()
    const [messagedetails, setmessagedetails] = useState()
    const [hoverData, setHoverData] = useState([]);
    const [disruptionCountss, setDisruptionCounts] = useState(0);
    const [sliError, setSliError] = useState(0);
    const [slislo, setSliSLo] = useState([]);

    useEffect(async () => {

        const sliString = serviceLevel.map((cur, index) => "'" + cur.toString() + "'").join(",");
        let slierror = await ElasticSliData(sliString);


        let elasticdataArray = []
        let CPU = 0;
        let Free_Memory = 0;
        let network_packet_in = 0;
        let network_packet_out = 0;
        let cache_hits_count = 0;
        let cache_misses_count = 0;
        let replicationlag = 0;
        let curr_connections = 0;
        let evictions = 0;

        async function getelasticdata() {
            for (let i = 0; i < elasticentity.length; i++) {
                const elasticdataresult = await getelasticcachedata(elasticentity[i])
           
                const dataobejcts = elasticdataresult[0]
                CPU += dataobejcts.CPU
                Free_Memory += dataobejcts.Free_Memory
                network_packet_in += dataobejcts.network_packet_in
                network_packet_out += dataobejcts.network_packet_out
                cache_hits_count += dataobejcts.cache_hits_count
                cache_misses_count += dataobejcts.cache_misses_count
                replicationlag += dataobejcts.replicationlag
                curr_connections += dataobejcts.curr_connections
                evictions += dataobejcts.evictions
                elasticdataArray.push(dataobejcts)
            }
        }
        await getelasticdata()

        let allLambdaData = [];
        async function disruptionLambda() {
          for (let index = 0; index < disruptionData.length; index++) {
            if (disruptionData[index].facet[1] === "P1-ELASTIC-CACHE-POLICY") {
             
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
    
        setmessagedetails({
            CPU: CPU,
            Free_Memory: Free_Memory,
            network_packet_in: network_packet_in,
            network_packet_out: network_packet_out,
            cache_hits_count: cache_hits_count,
            cache_misses_count: cache_misses_count,
            replicationlag: replicationlag,
            curr_connections: curr_connections,
            evictions: evictions,
        })
        setelasticdata([...elasticdataArray])
        setHoverData(hoverarr);
        setDisruptionCounts(disruptionCounts);
        setSliError(slierror.length);
        setSliSLo(slierror);
        
    }, [elasticentity, disruptionData,serviceLevel]);

    console.log("messagedetailsmessagedetailsin rds" , messagedetails);
   
    return (
        <div style={{ height: "300px" }} className='tasks_container'>
            <div className='header'>
                <p>Elasti Cache</p>
                {/* <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5> */}
            </div>
            <div className='task_errors'>
                <div className='error box' onClick={() =>
                    window.open(Backend_Error_Inbox_Link)
                } >
                    <p className="main_heading">EVICTIONS</p>
                    <span>{messagedetails ? messagedetails.evictions : 0}</span>
                </div>
                <div className='sli box' onMouseOver={() => {       
                    backend_Redis_CacheToolTip_Modal(slislo, "slo")
                }}
                    onMouseLeave={unsetContent}
                >
                    <p>SLI/SLO</p>
                   <span> {sliError >0 ? <span style={{color:"#e0332a"}}>{sliError }</span> : <span style={{color:"black"}}>{sliError }</span>}</span>
                    {/* <span>{ sliError }</span> */}
                </div>
                <div onClick={() =>
                    window.open(Backend_Disruption_Link)
                } className='disruption box' onMouseOver={() => backend_Redis_CacheToolTip_Modal(hoverData, "disruptions")} onMouseLeave={unsetContent}>
                    <p className="main_heading">DISRUPTIONS</p>
                    <span>{disruptionCountss}</span>
                </div>
            </div>
            <div className='mainaws_container single_line'>
                <div style={{ "height": "40px" }} className='aws_counts one_line'>

                    <div className=' details'>
                        <span>Network</span>
                        <span className='aws_time' style={{ background: "none" }}>
                            <span className='shared_tag'><img src={green} />{messagedetails ? messagedetails.network_packet_in.toFixed(2) : 0}mb/sec</span>
                            <span className='deleted_tag'><img src={red} />{messagedetails ? messagedetails.network_packet_out.toFixed(2) : 0}mb/sec</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='mainaws_container'>
                <div className='aws_counts'>
                    <div className=' details'>
                        <span>Cache Hit Count</span>
                        <span>{messagedetails ? messagedetails.cache_hits_count.toFixed(2) : 0}</span>
                    </div>
                    {/* <div className='details'>
                    <span>Evictions</span>
                    <span>{radisdata.length>0 && radisdata[0].evictions?radisdata[0].evictions.toFixed():0}</span>
                </div> */}
                    <div className=' details'>
                        <span>CPU</span>
                        <span >{messagedetails ? messagedetails.CPU.toFixed(2) : 0} %</span>
                    </div>
                    <div className='aws details'>
                        <span>Curr Connections</span>
                        <span >{messagedetails ? messagedetails.curr_connections : 0}</span>
                    </div>
                    {/* <div className=' details'>
                    <span>Cache Hit Rate</span>
                    <span className='aws_started'>{radisdata.length>0 && radisdata[0].cache_hit_rate?radisdata[0].cache_hit_rate.toFixed():0}</span>
                </div> */}
                </div>
                <div className='aws_counts'>
                    <div className='aws details'>
                        <span>Cache Miss Count</span>
                        <span>{ messagedetails?.cache_misses_count?.toFixed(2) || 0}</span>
                    </div>
                    <div className='aws details'>
                        <span>ReplicationLag</span>
                        <span >{messagedetails?.replicationlag?.toFixed(2) || 0}</span>
                    </div>
                    <div className='aws details'>
                        <span>Memory</span>
                        <span >{messagedetails ? (messagedetails.Free_Memory / 1000000).toFixed(2) : 0} MBs</span>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Radiscache