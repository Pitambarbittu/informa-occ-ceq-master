import React, { useEffect , useState } from 'react';
// import { getLCPData } from '../queryModule';
import { Icon } from 'nr1'
import { getLCPData } from '../../queryModule';

const ProgressBar = ({browserentity ,frontEnd_BrowserToolTip_Modal , unsetContent}) => {
    const [lcpData ,setLCPData] = useState([]);

    useEffect(async() =>{
    const browserString = browserentity.map((cur, index) => "'" + cur.toString() + "'").join(",") ;

        const data = await getLCPData(browserString);
        setLCPData(data)
    },[browserentity])
  
  return (
    <>
  
    { lcpData.length > 0 &&
  
    <div className="progress-bar aws_started bg-color"
     onMouseEnter={() =>frontEnd_BrowserToolTip_Modal(lcpData, "lcp")} onMouseLeave={unsetContent}
     >
        <div><p className="count" style={{left:"75%", color:"black"}}>{lcpData[0]["percentile.largestContentfulPaint"]["75"] ?lcpData[0]["percentile.largestContentfulPaint"]["75"].toFixed(2) :0}  <Icon type={Icon.TYPE.INTERFACE__CARET__CARET_BOTTOM__WEIGHT_BOLD} /></p></div>
        {<div className="progress-layer" style={{backgroundColor:"green" ,width:`${lcpData[0].Good ? lcpData[0].Good :0}%`}}></div>}
        {<div className="progress-layer"  style={{backgroundColor:"yellow",width:`${lcpData[0]["NEEDS IMPROVEMENT"] ? lcpData[0]["NEEDS IMPROVEMENT"] : 0}%`}}></div>}
        {<div className="progress-layer" style={{backgroundColor:"red",width:`${lcpData[0].Poor ? lcpData[0].Poor : 0}%`}}></div>}
    </div>
    }
  </>

  );
};

export default ProgressBar;
