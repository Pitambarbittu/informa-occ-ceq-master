import React from 'react'

const APM_ErrorTooptip = ({data}) => {
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
                 
                    <th style={{ width: "100px" }}>Tasks Ern</th>
                    <th style={{ width: "50px" }}>Ecs Task Definition Family</th>
                    <th style={{ width: "70px" }}>Exited(1) Error Count</th>
                </thead>
                <tbody>
                    {
                        data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                
                                    <td style={{ width: "50px"}}>
                                        <p style={{ color: "black" }}>
                                            {item['facet'][3]}
                                        </p>
                                    </td>
                                    <td style={{ width: "50px"}}>
                                        <p style={{ color: "black" }}>
                                            {item['facet'][4]}
                                        </p>
                                    </td>    

                                    <td style={{ width: "100px"}}>
                                        <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                            {item["count"]}
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

export default APM_ErrorTooptip