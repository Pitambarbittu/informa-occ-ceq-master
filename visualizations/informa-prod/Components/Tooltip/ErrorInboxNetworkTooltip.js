import React from 'react'

const ErrorInboxNetworkTooltip = (data) => {
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
                        <th style={{ width: "100px" }}>Entity Name</th>
                        <th style={{ width: "50px" }}>4xx_errors</th>
                        <th style={{ width: "50px"}}>5xx_errors</th>
                        <th style={{ width: "50px" }}>ELB_auth_error</th>
                        <th style={{ width: "50px" }}>auth_failures</th>
                       
                    </thead>
                    <tbody>
                        {
                            data.data.length > 0 &&
                            data.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                         <td style={{ width: "100px",wordWrap: "break-word" }}>
                                            <p style={{ color: "black" }}>{item['entity.name']}</p>
                                        </td>
                                        <td style={{ width: "50px" }}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['4xx_errors']}
                                            </h5>
                                        </td>

                                        <td style={{ width: "50px" }}>
                                            <p style={{ color: "black" }}>
                                                {item['5xx_errors']}
                                            </p>
                                        </td>
                                        <td style={{ width: "50px" }}>
                                            <p style={{ color: "black" }}>{item['ELB_auth_error']}</p>
                                        </td>
                                        <td style={{ width: "50px" }}>
                                            <p style={{ color: "black" }}>{item['auth_failures']}</p>
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

export default ErrorInboxNetworkTooltip