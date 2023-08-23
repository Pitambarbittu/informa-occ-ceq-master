import React, { useEffect, useState } from 'react'
// import { LineChart } from 'nr1';
import ping_stat from "../../Assets/ellipse_green.svg"
import { stepfunctiondata } from '../../queryModule';

const Cloudfront = () => {
    const [stepdata, setstepdata] = useState([]);
    // const [errorData, setErrorData] = useState()

    useEffect(async () => {
        let stepfunctionresult = await stepfunctiondata()
        let stepErrorData = await stepfunctiondata()
      
        // setErrorData(stepErrorData)
        setstepdata(stepfunctionresult)
    }, []);


    return (
        <div className='tasks_container' style={{"height":"250px"}}>
            <div className='header'>
                <p>Step Function</p>

            </div>
            <div className='task_errors'>
                <div onClick={() =>
                    window.open(
                        `https://onenr.io/01wZpbq1Xj6`
                    )
                } className='error box'>
                    <p className="main_heading"

                    >ERROR INBOX</p>
                    <span>{0}</span>
                
                </div>
                <div className='sli box'>
                    <p>EXECUTION FAILED</p>
                    <span>{stepdata.length && stepdata[0].execution_failed ? stepdata[0].execution_failed :0}</span>
                </div>
                <div onClick={() =>
                    window.open(
                        `https://onenr.io/0yw48olmaw3`
                    )
                } className='disruption box'>
                    <p className="main_heading"

                    >DISRUPTIONS</p>
                    <span>{0}</span>
                </div>
            </div> 

 
            {stepdata && stepdata.map((item) => {
                return (
                    // <div className='mainaws_container single_line'>
                    //     <div className='aws_counts one_line'>

                    //         <div className=' details'>
                    //             <span>Execution Aborted</span>
                    //             <span style={{ background: "none" }} className='aws_time'>
                    //                 <span className='empty_tag'>{item.execution_aborted}</span></span>
                    //         </div>
                           
                    //         <div className='details'>
                    //             <span>Execution Throttled</span>
                    //             <span>{item.execution_throttled}</span>
                    //         </div>
                    //         <div className='aws_timeout details'>
                    //             <span>Execution Time</span>
                    //             <span className='aws_aborted'>{item.execution_time_ms/1000}Sec</span>
                    //         </div>
                    //         <div className='aws_timeout details'>
                    //             <span>Execution Timed Out</span>
                    //             <span>{item.execution_timed_out}</span>
                    //         </div>


                    //     </div>
                    // </div>

                    <div className='mainaws_container'>
                    <div className='aws_counts'>
            
                    <div className=' details'>
                        <span>Execution Aborted</span>
                        <span>{item.execution_aborted}</span>
                    </div>
                    <div className=' details'>
                        <span>Execution Throttled</span>
                        <span>{item.execution_throttled}</span>
                    </div>
                    </div>
            
                <div className='aws_counts'>
                    <div className='aws details'>
                        <span>Execution Time</span>
                        <span className='aws_time'>{item.execution_time_ms/1000}Sec</span>
                    </div>
                        <div className='aws details'>
                            <span>Execution Timed Out</span>
                            <span>{item.execution_timed_out}</span>
                        </div>
                    </div>
            
                </div>
                )
            })}

        </div>

    )
}

export default Cloudfront