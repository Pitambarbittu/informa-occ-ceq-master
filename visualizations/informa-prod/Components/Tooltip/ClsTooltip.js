import React from 'react';

const ClsTooltip = ({ data }) => {

  return (
    <>
    
    {  data.length > 0 &&
    <div style={{width:"400px"}}>
    <p style={{color:"red"}}>Cumulative Layout shift</p>
    <div className="aws details">
        <span className="color">Good</span>
        <span className="color">{'(<=0.1)'}</span>
        <span className="color">{data[0].good ? data[0].good.toFixed(2):0}%</span>
      </div>
      <div className="aws details">
        <span className="color"> Needs Improvement</span>
        <span className="color">(0.1 -0.25)</span>
        <span className="color">{data[0]["NEEDS IMPROVEMENT"] ? data[0]["NEEDS IMPROVEMENT"].toFixed(2) :0}%</span>
      </div>
      <div className="aws details">
        <span className="color">Poor</span>
        <span className="color">{'(>0.25)'}</span>
        <span className="color">{data[0].Poor ? data[0].Poor.toFixed(2):0}%</span>
      </div>
      </div>
      }
    
    </>
  );
};

export default ClsTooltip;
