import React, { useEffect, useState } from 'react'

const Elastic_cache_sli = ({slidata}) => {
    const [data,setdata]=useState([]);
    useEffect(()=>{
        function extract() {
            const newArr = [];
      
            for (let i = 0; i < slidata.length; i++) {
             
              if (slidata[i].facet[0].includes("Evictions")) {
                const newfacet = slidata[i].facet[0].split(' ').slice(0, -1).join(" ")
                // slidata[i].facet[0] = newfacet
                const newObj = { status: "Evictions",newfacet, ...slidata[i] }
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

export default Elastic_cache_sli