import React from 'react'

const Sqsmodal = ({ sqsData }) => {
  return (
    <table>
      <thead>
        <th >
          Received Message
        </th>
        <th>
          Count
        </th>
      </thead>
      {sqsData > 0 &&
        sqsData.map((item) => (
          <tr>
            <td>
              {<h5 style={{ textAlign: "left" , maxWidth:"500px" ,wordWrap:"break-word"}}> Heading </h5>}
            </td>
            <td>
              {<h5> {item.received_message}</h5>}
            </td>
          </tr>
        ))}
    </table>
  )
}

export default Sqsmodal