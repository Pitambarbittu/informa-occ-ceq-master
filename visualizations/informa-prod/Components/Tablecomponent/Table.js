import React, { useState, useEffect } from 'react'
// import { averageTime, countData, getflowData, gettableData } from '../../../queryModule';
import Workflow from './Workflow';
import { flowData } from './data';
import Loader from './Loader'
import { averageTime, countData, getEntityCount, getflowData, gettableData, gettabletracedata, gettraceiddata } from '../../queryModule';
import axios from "axios"

const Table = ({ traceidS, setOpenmodal, openmodal, browserentity }) => {
  console.log("browserentitybrowserentityin table" , browserentity);
  const [maintable, setmainTable] = useState([]);
  const [workflow, setWorkflow] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [entityCounts, setEntityCounts] = useState([])
  const [loader,setLoader] = useState(false)

  const close = () => {
    setOpenmodal(false);
  };

  useEffect(async() => {
   
    setLoader(true)
      let browserEntity = browserentity?.length>0 && browserentity.map((val)=>`'${val}'`)
      console.log("BrowserEntity29",browserEntity)
      let newTraceIdData = await gettraceiddata(browserEntity);
      console.log("newTraceIdData",newTraceIdData)
      let traceIds = newTraceIdData[0]["uniques.trace.id"]
   
      let arrayOfTraceIds = [];
      arrayOfTraceIds = traceIds.map((item) => `'${item}'`)
      // const endpointdata= await getfilterdata(selectedDomain)
    

      // setArrayOfRoutes(endpointdata)
      // console.log("endpointss" , endpointdata);

      // console.log("tabletrace arrayOfTraceIds", arrayOfTraceIds)
      console.log("tabletrace arrayOfTraceIds", arrayOfTraceIds.join(","))
      console.log("tabletrace arrayofTraceIds2",arrayOfTraceIds)
      const getTraceData = await gettabletracedata(arrayOfTraceIds)
      let entity = []
   
      for (let index = 0; index < getTraceData.length; index++) {
        const element = await getEntityCount(getTraceData[index].facet[3]);
       
        entity[index] = element[0]["uniques.entity.name"].length
      }
      setmainTable(getTraceData)
      setEntityCounts(entity)
      setLoader(false)
  }, []);

  


  async function handleSessionId(traceId, index) {
    setSelectedRow(index)
    const workflowData = await getflowData(traceId)
    const countdatas = await countData(traceId)
    const avverageDatas = await averageTime(traceId)
    const processedData = await flowData(workflowData, countdatas, avverageDatas)
    let htmlData = <Workflow workflowData={processedData} />
    setWorkflow(htmlData);
  }
  if (!openmodal) {
    return null;
  }

  return (
    <>
      <div className="backdrop" onClick={close}></div>
      <div className='table_modal_container' style={{"boxshadow": "0px 0px 40px rgba(0, 0, 0, 0.45)"}}>
        <table>

          <thead>

            <tr>
            <th>Time Stamp</th>
              <th>Trace ID</th>
              <th>Duration s</th>
              <th>Error Message </th>
              <th>Group Error Message</th>
              <th>Entity Count</th>
            </tr>

          </thead>
       
          <tbody >
            {maintable && maintable.map((item, index) => {

              return (<>
                {item &&
                
                <><tr className={selectedRow === index ? 'selected_row' : index % 2 ? 'grey_row' : "white_row"}>
                <td >{new Date(Number(item.facet[0])).toLocaleString()}</td>
                  <td onClick={() => handleSessionId(item.facet[3], index)}>{item.facet[3]}</td>
                  <td>{item.facet[2]/1000}</td>
                  <td>{item.facet[1]}</td>
                  <td>{item.facet[6]}</td>
                  {entityCounts.length>0 && <>
                      <td>{entityCounts[index]}</td>
                  </>}
                </tr>
                  {((selectedRow === index) && workflow) ? <tr><td colSpan="4">{workflow}</td></tr> : null}
                </>
                }
              </>
              )
            })

            }

          </tbody>
          <button style={{ marginRight: '12px' }} onClick={() => close()}>
            Cancel
          </button>
        </table>
        {/* {workflow ? workflow : null} */}
        {loader && <Loader/>}
      </div>
    </>
  )
}

export default Table