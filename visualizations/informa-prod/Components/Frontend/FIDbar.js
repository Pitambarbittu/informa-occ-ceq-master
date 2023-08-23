import React ,{useEffect, useState} from 'react';
// import { getFIDData } from '../queryModule';
import { Icon } from 'nr1';
import { getFIDData } from '../../queryModule';



const FIDbar = ({browserentity,frontEnd_BrowserToolTip_Modal,unsetContent}) => {
  const [fidData ,setFidData] = useState([]);

    useEffect(async() =>{
    const browserString = browserentity.map((cur, index) => "'" + cur.toString() + "'").join(",") ;

        const data = await getFIDData(browserString);

       
        setFidData(data)
    },[browserentity])
  return (
    <>
    { fidData.length > 0 &&
    <>
    <div className="progress-bar aws_started bg-color" 
    onMouseEnter={
      () =>frontEnd_BrowserToolTip_Modal(fidData, "fid")}
       onMouseLeave={unsetContent}
        >
        <p className="count" style={{left:"75%", color:"black"}}>{fidData[0].cls ?fidData[0].cls["75"].toFixed(2) :0}<Icon type={Icon.TYPE.INTERFACE__CARET__CARET_BOTTOM__WEIGHT_BOLD} /></p>
        {<div className="progress-layer" style={{backgroundColor:"green" ,width:`${fidData[0].good ? fidData[0].good :0}%`}}></div>}
        {<div className="progress-layer"  style={{backgroundColor:"yellow",width:`${fidData[0]["NEEDS IMPROVEMENT"] ? fidData[0]["NEEDS IMPROVEMENT"] : 0}%`}}></div>}
        {<div className="progress-layer" style={{backgroundColor:"red",width:`${fidData[0].Poor ? fidData[0].Poor : 0}%`}}></div>}
    
    </div>
    </>
    }
    </>
  )
}

export default FIDbar;