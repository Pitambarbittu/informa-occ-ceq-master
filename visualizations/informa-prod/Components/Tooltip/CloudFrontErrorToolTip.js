import React from 'react'

const CloudFrontError = ({ data }) => {
    return (
        <>
            <div >
            <p style={{ color: "red" }}>ERRORS</p>
                <table
                    style={{ width: "auto", height: "auto" }}
                >
                    <thead
                        style={{ backgroundColor: "grey", color: "black" }}
                    >
                        <th style={{width:"100px",textAlign:"left"}}>Type</th>
                        <th style={{width:"50px",textAlign:"center"}}>Status</th>
                        <th style={{width:"50px",textAlign:"center"}}>Request Uri</th> 
                        <th style={{width:"50px",textAlign:"center"}}>Host</th> 
                        <th style={{width:"50px",textAlign:"center"}}>error type</th>
                        <th style={{width:"50px",textAlign:"right"}}>Error Count</th>
                    </thead>
                    <tbody>
                    {
                        data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                    <tr key={index}>
                                        <td style={{width:"100px",textAlign:"left"}}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item.facet[0] && item.facet[0]}
                                            </h5>
                                        </td>

                                        <td style={{width:"50px",textAlign:"center"}}>
                                            <p style={{ color: "black" }}>
                                                {item.facet[1] && item.facet[1]}
                                            </p>
                                        </td>
                                        <td style={{width:"50px",textAlign:"center"}}>
                                            <p style={{ color: "black" }}>
                                                {item.facet[2] && item.facet[2]}
                                            </p>
                                        </td>
                                        <td style={{width:"50px",textAlign:"center"}}>
                                            <p style={{ color: "black" }}>
                                                {item.facet[3] && item.facet[3]}
                                            </p>
                                        </td>
                                        <td style={{width:"50px",textAlign:"center"}}>
                                            <p style={{ color: "black" }}>
                                                {item.facet[4] && item.facet[4]}
                                            </p>
                                        </td>
                                        <td style={{width:"50px",textAlign:"right"}}>
                                            <p style={{ color: "black" }}>{item.error && item.error}</p>
                                        </td>
                                    </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CloudFrontError