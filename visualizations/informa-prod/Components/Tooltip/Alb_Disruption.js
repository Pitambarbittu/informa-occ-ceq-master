import React from 'react'

const Alb_Disruption = ({ data }) => {
  return (
    <>
     <div >
        <p >ERRORS</p>
        <table
          style={{ width: "auto", height: "auto" }}
        >
          <thead
            style={{ backgroundColor: "none", color: "red" }}
          >
            <th>Timestamp</th>
            <th>Policy ID</th>
            <th>policy_Name</th>
            <th>condition_Name</th>
            <th>count</th>
          </thead>
          <tbody>
            {
              data.length > 0 &&
              data.map((item, index) => {
                 let date = new Date(item.Timestamp);

                return (
                
                  <tr key={index}>
                    <td style={{ width: "30px" }}>
                      <h5 style={{ wordWrap: "break-word", color: "black" }}>
                        {date.toLocaleString()}
                      </h5>
                    </td>
                    <td style={{ width: "30px" }}>
                      <h5 style={{ wordWrap: "break-word", color: "black" }}>
                        {/* {item["facet"][0]} */}
                        {item.policy_Id}


                      </h5>
                    </td>
                    <td style={{ width: "30px" }}>
                      <h5 style={{ wordWrap: "break-word", color: "black" }}>
                        {item.policy_Name}
                      </h5>
                    </td>
                    <td style={{ width: "30px" }}>
                      <h5 style={{ wordWrap: "break-word", color: "black" }}>
                        {item.condition_Name}
                      </h5>
                    </td>


                    <td style={{ width: "30px" }}>
                      <p style={{ color: "black" }}>
                        {item.count}
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

export default Alb_Disruption