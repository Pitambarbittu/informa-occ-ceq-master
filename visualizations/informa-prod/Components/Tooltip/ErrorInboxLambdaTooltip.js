import React from 'react'

const ErrorInboxLambdaTooltip = ({ data }) => {
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
                        <th style={{ width: "100px" }}>Function Name</th>
                        <th style={{ width: "50px" }}>Status code</th>
                        <th style={{ width: "50px" }}>Error Count</th>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: "100px"}}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['facet'][0]}
                                            </h5>
                                        </td>

                                        <td style={{ width: "100px"}}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['facet'][1]}
                                            </h5>
                                        </td>

                                        <td style={{ width: "50px"}}>
                                            <p style={{ color: "black" }}>
                                                {item["error_count"]}
                                            </p>
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

export default ErrorInboxLambdaTooltip