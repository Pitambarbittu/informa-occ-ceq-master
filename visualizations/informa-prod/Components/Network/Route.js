import React from 'react'
import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"

const Route = () => {
  return (
    <div className='tasks_container'>
       <div className='header'>
        <p>Route53</p>
        <h5><img style={{width:"15px" , height:"11px"}}src={ping_stat} alt="status"/>Ping Status</h5>
       </div>
        <div className='task_errors'>
            <div className='error box'>
                <p>ERROR INBOX</p>
                <span>4</span>
            </div>
            <div className='sli box'>
                <p>SLI/SLO</p>
                <span>00</span>
            </div>
            <div className='disruption box'>
                <p>DISRUPTIONS</p>
                <span>15</span>
            </div>
        </div>
        <div className='mainaws_container'>
            <div className='aws_counts'>

                <div className=' details'>
                    <span>Health check status</span>
                    <span className='aws_time'>5.21 ms</span>
                </div>
                <div className=' details'>
                    <span>Healthy checkers(%)</span>
                    <span className='aws_aborted'>5</span>
                </div>
                <div className=' details'>
                    <span>Connection time</span>
                    <span className='aws_started'> 21 </span>
                </div>
                {/* <div className='aws_timeout details'>
                    <span>Executions TimedOut</span>
                    <span>3</span>
                </div> */}
            </div>

            <div className='aws_counts'>
                <div className='aws details'>
                    <span>SSL handshake time</span>
                    <span>5.21 ms</span>
                </div>
                <div className='aws details'>
                    <span>Time to first byte</span>
                    <span>5</span>
                </div>
                {/* <div className='aws details'>
                    <span>5xx Error Rate</span>
                    <span>21 </span>
                </div> */}
            </div>

        </div>

    </div>
)
}

export default Route