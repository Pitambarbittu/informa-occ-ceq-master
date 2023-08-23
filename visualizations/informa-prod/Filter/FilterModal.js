import React, {useState} from 'react'
import arrow from "../Assets/arrow.svg"

const FilterModal = ({setOpenmodal, openmodal}) => {

    // const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setOpenmodal(false);
  };

  // if (!isOpen) {
  //   return null; 
  // }
  return (
   <>

   <div className='filter_modal'>
               {/* <div className='serach_icon'> <input type='search'  placeholder='search'/></div>
              <div className='filter_content'>
              <div>Account.ID  <img src={arrow}/></div>
                <div>Aggregation Duration  <img src={arrow}/></div>
                <div>Condition.ID  <img src={arrow}/></div>
                <div>Condition Name  <img src={arrow}/></div>
                <div> Event <img src={arrow}/></div>
              </div> */}
        {/* <button style={{marginRight:"12px"}}>Cancle</button> */}
        <div className='filter_heading'>
          <h5 style={{color:"black"}}>Add Filters</h5>
        <select style={{backgroundColor:"white" , color:"black"}}>
          <option>
            Select Metric
          </option>
          <div className='serach_icon'> <input type='search'  placeholder='search'/></div>
        </select>
        </div>
        <button style={{ marginRight: '12px' }} onClick={closeModal}>
          Cancel
        </button>
        <button style={{backgroundColor:"#2263E5"}}>Confirm</button>
   </div>
   </>
  )
}

export default FilterModal