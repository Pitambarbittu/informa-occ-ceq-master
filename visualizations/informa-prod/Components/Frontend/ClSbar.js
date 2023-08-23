import React ,{useEffect, useState} from 'react';
// import { getCLSData} from '../queryModule';
import { Icon } from 'nr1';
import { getCLSData } from '../../queryModule';
const ClSbar = ({browserentity,frontEnd_BrowserToolTip_Modal ,unsetContent}) => {
    const [clsData ,setClsData] = useState([]);

    useEffect(async() =>{
    const browserString = browserentity.map((cur, index) => "'" + cur.toString() + "'").join(",") ;

        const data = await getCLSData(browserString);

   
        setClsData(data)
    },[browserentity])
  return (
    <>
    { clsData.length > 0 &&
    <>
    <div className="progress-bar aws_started bg-color" 
    onMouseEnter={() =>frontEnd_BrowserToolTip_Modal(clsData, "cls")} 
    onMouseLeave={unsetContent}
    >
        <p className="count" style={{left:"75%", color:"black"}}>{clsData[0].cls && clsData[0].cls["75"] ?clsData[0].cls["75"].toFixed(2):0}<Icon type={Icon.TYPE.INTERFACE__CARET__CARET_BOTTOM__WEIGHT_BOLD} /></p>
        {<div className="progress-layer" style={{backgroundColor:"green" ,width:`${clsData[0].good ? clsData[0].good :0}%`}}></div>}
        {<div className="progress-layer"  style={{backgroundColor:"yellow",width:`${clsData[0]["NEEDS IMPROVEMENT"] ? clsData[0]["NEEDS IMPROVEMENT"] : 0}%`}}></div>}
        {<div className="progress-layer" style={{backgroundColor:"red",width:`${clsData[0].Poor ? clsData[0].Poor : 0}%`}}></div>}
    
    </div>
    </>
    }
    </>
  )
}

export default ClSbar