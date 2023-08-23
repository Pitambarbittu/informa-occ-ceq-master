import React, { useState, useEffect} from 'react'
// import { getflowData } from '../../../queryModule';
import { DendrogramHorizontalDemo } from './DendrogramHorizontal';
import { flowData } from './data';

const Workflow = ({workflowData}) => {
  
  
  return (
    <>
    <DendrogramHorizontalDemo data={workflowData}/>
    </>
  )
}

export default Workflow