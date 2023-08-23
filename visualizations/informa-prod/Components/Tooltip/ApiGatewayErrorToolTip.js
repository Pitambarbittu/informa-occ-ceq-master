import React, { useEffect, useState } from 'react'

const Api_Gateway_ErrorToolTip = ({ data }) => {
    const [error_count,setError] = useState(0);
   
    
    useEffect(()=>{
        let errorCount = data.reduce((acc, cur) => acc + (cur['4XXError'] + cur['5XXError']), 0);
        setError(errorCount)
    },[])

    return (
        <>
                {error_count !== 0 && data.length && <><p style={{ color: "red" }}>ERRORS</p>
                <table
                    style={{ width: "auto", height: "auto" }}
                >
                    <thead
                        style={{ backgroundColor: "grey", color: "black" }}
                    >
                        <th style={{ width: "100px", textAlign: "left" }}>Host</th>
                        <th style={{ width: "50px", textAlign: "center" }}>4xError</th>
                        <th style={{ width: "50px", textAlign: "right" }}>5xError</th>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                if (item["4XXError"]!== 0 || item["5XXError"]!== 0 ) {
                                    return (
                                        <tr key={index}>
                                            <td style={{ width: "100px", textAlign: "left" }}>
                                                <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                    {item["entityName"]}
                                                </h5>
                                            </td>

                                            <td style={{ width: "50px", textAlign: "center" }}>
                                                <p style={{ color: "black" }}>
                                                    {item["4XXError"]}
                                                </p>
                                            </td>
                                            <td style={{ width: "50px", textAlign: "right" }}>
                                                <p style={{ color: "black" }}>{item["5XXError"]}</p>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                    </tbody>
                </table></>}
        </>
    );

}

export default Api_Gateway_ErrorToolTip