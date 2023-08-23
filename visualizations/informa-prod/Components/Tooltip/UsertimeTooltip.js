import React from 'react'

const UsertimeTooltip = ({data}) => {

  return (
    <div>
        <table
                style={{ width: "auto", height: "auto" }}
            >
                <thead
                    style={{ backgroundColor: "grey", color: "black" }}
                >
                 
                    <th style={{ width: "100px" }}>Timestamp</th>
                    <th style={{ width: "50px" }}>Page Url</th>
                    <th style={{ width: "70px" }}>Average Duration</th>
                </thead>
                <tbody>
                    {
                        data.length > 0 &&
                        data.map((item, index) => {
                            let date=new Date(Number(item["latest.timestamp"]))
                            return (
                                <tr key={index}>
                                    <td style={{ width: "100px"}}>
                                        <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                        {date.toLocaleString()}
                                        </h5>
                                    </td>
                                    <td style={{ width: "50px"}}>
                                        <p style={{ color: "black" }}>
                                        {item["latest.pageUrl"]}
                                        </p>
                                    </td>
                                    <td style={{ width: "50px"}}>
                                        <p style={{ color: "black" }}>
                                            {item["avgDuration"] && item["avgDuration"].toFixed(2)}
                                        </p>
                                    </td>          
                                </tr>
                            );
                        })}
                </tbody>
            </table>
    </div>
  )
}

export default UsertimeTooltip