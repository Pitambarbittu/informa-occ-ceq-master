import React from 'react'

const VPC_errro = ({data}) => {
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
                 
                    <th style={{ width: "100px" }}>Aws NatGateWay </th>
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
                                            {item['aws.natgateway.NatGatewayId']}
                                        </h5>
                                    </td>

                                    <td style={{ width: "50px"}}>
                                        <p style={{ color: "black" }}>
                                            {item["error_Port_count"]}
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

export default VPC_errro