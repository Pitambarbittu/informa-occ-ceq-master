import React from 'react'

const CloudSearch_Tooltip = ({ data }) => {
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
                        <th style={{ width: "50px" }}>Entity Name</th>
                        <th style={{ width: "50px" }}>3xx_errors</th>
                        <th style={{ width: "50px" }}>4xx_errors</th>
                        <th style={{ width: "50px" }}>5xx_errors</th>

                    </thead>
                    <tbody>
                        {
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td style={{ width: "50px" }}>
                                            <p style={{ color: "black" }}>
                                                {item['entityName']}
                                            </p>
                                        </td>

                                        <td style={{ width: "50px" }}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['3xxErrors']}
                                            </h5>
                                        </td>

                                        <td style={{ width: "50px" }}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['4xxErrors']}
                                            </h5>
                                        </td>
                                        <td style={{ width: "50px" }}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['5xxErrors']}
                                            </h5>
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

export default CloudSearch_Tooltip