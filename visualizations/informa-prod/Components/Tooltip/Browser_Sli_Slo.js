import React, { useEffect, useState } from 'react'


const Browser_Sli_Slo = ({slidata}) => {
    const [data,setdata]=useState([]);
    useEffect(()=>{
        function extract() {
            const newArr = [];
      
            for (let i = 0; i < slidata.length; i++) {
             
              if (slidata[i].facet[0].includes("Cumulative")) {
                const newfacet = slidata[i].facet[0].split(' ').slice(0, -3).join(" ")
                // slidata[i].facet[0] = newfacet
                const newObj = { status: "Cumulative Layout Shift",newfacet, ...slidata[i] }
                newArr.push(newObj)
              }
              else if (slidata[i].facet[0].includes("Largest")) {
                const newfacet =slidata[i].facet[0].split(' ').slice(0, -3).join(" ")
                // slidata[i].facet[0] = newfacet
                const newObj = { status: "Largest Contentful Paint",newfacet, ...slidata[i] }
                newArr.push(newObj)
              }
              else if (slidata[i].facet[0].includes("Latency")) {
                const newfacet =slidata[i].facet[0].split(' ').slice(0, -1).join(" ")
                const newObj = { status: "Latency",newfacet, ...slidata[i] }
                newArr.push(newObj)
              }
            }
            return newArr
          }
          const slisArr = extract();
         
          setdata(slisArr);
    },[slidata])
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
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: "100px", textAlign: "left" }}>
                                            <h5 style={{ textAlign: "left", wordWrap: "break-word", color: "black" }}>
                                                {item['facet'][0]}
                                            </h5>
                                        </td>

                                        <td style={{ width: "50px", textAlign: "center" }}>
                                            <p style={{ color: "black" }}>
                                                {item['status']}
                                            </p>
                                        </td>
                                        <td style={{ width: "50px", textAlign: "right" }}>
                                          {/* {item["facet"][1]<0 ? <p style={{ color: "green" }}>{item["facet"][1]}</p>:<p style={{ color: "red" }}>{item["latest.sliCompliance"]}</p>}    */}
                                          { <p style={{ color: "red" }}>{item["latest.sliCompliance"]}</p>}
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

export default Browser_Sli_Slo