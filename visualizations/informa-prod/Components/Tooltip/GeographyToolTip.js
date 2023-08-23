import React from 'react'

const GeographyToolTip = ({data}) => {
  
  return (
    <div><table
    style={{ width: "300px", height: "auto" }}
  >
    <thead
    //   style={{ backgroundColor: "none", color: "red" }}
    >
      <th style={{width:"80px"}}>Country code</th>
      <th>Count</th>
    </thead>
    <tbody>
      {
        data.length > 0 &&
        data.slice(0, 5).map((item, index) => {
          return (
          
            <tr key={index}>
              <td>
                <h5 style={{ wordWrap: "break-word", color: "black" }}>
                  {item.countryCode}
                </h5>
              </td>
              <td style={{ width: "30px" }}>
                <h5 style={{ wordWrap: "break-word", color: "black" }}>
              
                  {item.count}


                </h5>
              </td>
            </tr>
          );
        })}
    </tbody>
  </table></div>
  )
}

export default GeographyToolTip