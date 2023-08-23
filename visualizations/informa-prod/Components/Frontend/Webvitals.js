import React from 'react'

const Webvitals = ({openvitals ,setOpenmodal }) => {

    const close = () => {
        setOpenmodal(false);
      };

      if (!openvitals) {
        return null;
      }
    return (
     
        <div className='tracing_modal' style={{"left":"322px"}}>
            <div className='griditem_container'>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>partneringONE</span>
                    
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/0dQeZolD5we `
                        )
                    }>https://onenr.io/0dQeZolD5we </span> 
                </div>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>partneringONE [Admin Panel]</span>
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/0VjY6Y7lNQ0`
                        )}>https://onenr.io/0VjY6Y7lNQ0</span>
                </div>
            </div>

        </div>
        
    )
}

export default Webvitals