import React from 'react';

const LCPToolTip = ({ data }) => {
 
  return (
    <>
    
    {  data.length > 0 &&
    <div style={{width:"400px"}}>
    <p style={{color:"red"}}>Largest Contentful paint</p>


    <div className="aws details">
        <span className="color">Good</span>
        <span className="color">{'(<=2.5s)'}</span>
        <span className="color">{data[0].Good ? data[0].Good.toFixed(2):0}%</span>
      </div>
      <div className="aws details">
        <span className="color"> Needs Improvement</span>
        <span className="color">(2.5s -4s)</span>
        <span className="color">{data[0]["NEEDS IMPROVEMENT"] ? data[0]["NEEDS IMPROVEMENT"].toFixed(2) :0}%</span>
      </div>
      <div className="aws details">
        <span className="color">Poor</span>
        <span className="color">{'(>4s)'}</span>
        <span className="color">{data[0].Poor ? data[0].Poor.toFixed(2):0}%</span>
      </div>
      </div>
      }
      {/* <div>
      <p>Largest Contentful Pain(LCP)</p>



      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{'(<=2.5s)'}</td>
            <td>71%</td>
          </tr>
          <tr>
            <td>Needs Improvement</td>
            <td>(2.5s -4s)</td>
            <td>18%</td>
          </tr>

          <tr>
            <td>Poor</td>
            <td>{'(>4s)'}</td>
            <td>18%</td>
          </tr>
        </tbody>
      </table>
    </div> */}
    </>
  );
};

export default LCPToolTip;
