import React from 'react'

const Browser_Error_Tooltip = ({ data, data2 }) => {
  
    return (
        <>
            <div>
                <p style={{ color: "red" }}>ERRORS</p>
                <table
                    style={{ width: "600px", height: "auto" }}
                >
                    <thead
                        style={{ backgroundColor: "grey", color: "black" }}
                    >
                        <th style={{ width: "70px", textAlign: "left" }}>Type</th>
                        <th style={{ width: "200px", textAlign: "center" }}>Error Message</th>
                        <th style={{ width: "100px", textAlign: "right" }}>Error Count</th>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 &&
                            data.slice(0, 4).map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: "200px", textAlign: "left", margin: 0 }}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item["facet"][0]}
                                            </h5>
                                        </td>

                                        <td style={{ width: "10px", textAlign: "left", margin: 0 }}>
                                            <p style={{ color: "black", wordWrap: "break-word" }}>
                                                {item["facet"][1]}
                                            </p>
                                        </td>
                                        <td style={{ width: "10px", textAlign: "right", margin: 0 }}>
                                            <p style={{ color: "black" }}>{item.errorCount}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <div>
                {data2.length > 0 &&
                    <table
                        style={{ width: "600px", height: "auto" }}
                    >
                        <thead
                            style={{ backgroundColor: "grey", color: "black" }}
                        >
                            <th style={{ width: "70px", textAlign: "left" }}>Type</th>
                            <th style={{ width: "70px", textAlign: "center" }}>Error Code</th>
                            <th style={{ width: "70px", textAlign: "right" }}>Error Count</th>
                        </thead>
                        <tbody>
                            {
                                data2.length > 0 &&
                                data2.slice(0, 4).map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ width: "25px", textAlign: "left", margin: 0 }}>
                                                <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                    {item["facet"][2]}
                                                </h5>
                                            </td>

                                            <td style={{ width: "50px", textAlign: "center", margin: 0 }}>
                                                <p style={{ color: "black",textAlign: "center" }}>
                                                    {item["facet"][1]}
                                                </p>
                                            </td>
                                            <td style={{ width: "50px", textAlign: "right", margin: 0 }}>
                                                <p style={{ color: "black" }}>{item["count.httpResponseCode"]}</p>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
}

export default Browser_Error_Tooltip