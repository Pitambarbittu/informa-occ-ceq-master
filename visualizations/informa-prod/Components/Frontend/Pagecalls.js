import React from 'react'

const Pagecalls = ({opencalls ,setopencalls }) => {

    const close = () => {
        setOpenmodal(false);
      };

      if (!opencalls) {
        return null;
      }
    return (
        <div className='tracing_modaldata'>
            <div className='griditem_container'>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>Partnering one</span>
                    
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/0bRKpNeWljE`
                        )
                    }>https://onenr.io/0bRKpNeWljE</span> 
                </div>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>Partnering one Admin</span>
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/0LREgNnz5Qa`
                        )}>https://onenr.io/0LREgNnz5Qa</span>
                </div>
            </div>

        </div>
    )
}

export default Pagecalls