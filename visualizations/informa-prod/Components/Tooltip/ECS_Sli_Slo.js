import React from 'react'

const ECS_Sli_Slo = ({ slidata }) => {

    return (
        <>
            <div >
                <p >ERRORS</p>
                <table
                    style={{ width: "auto", height: "auto" }}
                >
                    <thead
                        style={{ backgroundColor: "grey", color: "black" }}
                    >
                        <th >Entity Name</th>
                        <th >Sli Patterns</th>
                        <th >Sli Compliance</th>
                    </thead>
                    <tbody>
                        {
                            slidata &&
                            slidata.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: "100px", textAlign: "left" }}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['facet'][0]}
                                            </h5>
                                        </td>

                                        <td style={{ width: "50px", textAlign: "center" }}>
                                            <p style={{ color: "black" }}>
                                                {item['facet'][1]}
                                            </p>
                                        </td>
                                        <td style={{ width: "50px", textAlign: "right" }}>
                                            {<p style={{ color: "red" }}>{item["latest.sliCompliance"]}</p>}                                    </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ECS_Sli_Slo