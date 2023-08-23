import React from 'react'
import { LineChart } from 'nr1';
import ping_stat from "../Assets/ellipse_green.svg"
import cpu from '../Assets/memory.svg'
import memory from '../Assets/cpu.svg'

const Cpumemory = () => {
  return (
    <div className='networkheader_container'>
        <div>
            <p>CPU & Memory Utilization</p>
            <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5>
            {/* <span> <img src={ping_stat} alt="status"/> Ping Status</span> */}
        </div>
        <div className='line_graph_container'>
            <div className='cpuheader_container'>
            <h5><img style={{width:"15px" , height:"11px"}} src={cpu} alt="status"/>Cpu Utilization</h5>
                {/* <span><img src={cpu} alt="cpu"/> &nbsp; CPU Utilization</span> */}
                <span>4%</span>
            </div>
            <LineChart
            accountId={3884245}
            query="FROM Metric SELECT  average(k8s.container.cpuCoresUtilization) AS 'CPU'  WHERE k8s.clusterName in ('Microservices_cluster_ceq') AND k8s.namespaceName = 'default' limit max Timeseries"
            style={{
                height:"64px"
            }}
            />
        </div>
        <div className='line_graph_container'>
            <div className='cpuheader_container'>
            <h5><img style={{width:"15px" , height:"11px"}} src={memory} alt="status"/> Memory Utilization</h5>
                {/* <span><img src={memory} alt="cpu"/> &nbsp; Memory Utilization</span> */}
                <span>5%</span>
            </div>
            <LineChart
            accountId={3884245}
            query="FROM Metric SELECT  average(k8s.container.cpuCoresUtilization) AS 'CPU'  WHERE k8s.clusterName in ('Microservices_cluster_ceq') AND k8s.namespaceName = 'default' limit max Timeseries since 7 days ago"
            style={{
                height:"64px"
            }}
            />
        </div>
    </div>
  )
}

export default Cpumemory