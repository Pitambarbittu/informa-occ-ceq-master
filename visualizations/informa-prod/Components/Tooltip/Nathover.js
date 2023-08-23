import React, { useEffect, useState } from 'react'
import { getnatcounthover } from '../../queryModule'

const Nathover = () => {

    const[nathover, setnathover] =useState([])
    useEffect(async()=>{
        let natdetails= await getnatcounthover()
        setnathover(natdetails)
    })

    
  return (
    <div>
        <p style={{ color: 'black'}}></p>
        <table
        style={{ width: "auto", height: "auto", color: 'black' }}
        >
        <thead
            style={{ backgroundColor: "none", color: "black" }}
        >
            <tr>
                <th>Nat Gateway Id</th>
                <th>Nat Count</th>
            </tr>
        </thead>
        <tbody >
            {nathover && nathover.map((item, index) => {
              return (<>
                {item && <>
                <tr>
                  <td >{item.facet}</td>
                  <td >{item.Nat_Count}</td>
                </tr>
                  
                </>
               }
              </>
              )

            })
            }
          </tbody>
        </table>
  </div>
  )
}

export default Nathover