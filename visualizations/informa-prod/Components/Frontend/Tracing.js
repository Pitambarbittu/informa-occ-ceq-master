import React from 'react'

const Tracing = ({opentrace ,setOpenmodal }) => {

    const close = () => {
        setOpenmodal(false);
      };

      if (!opentrace) {
        return null;
      }
    return (
     
        <div className='tracing_modal' >
            <div className='griditem_container'>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>Partnering one</span>
                    
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/0oQDKN2Zajy `
                        )
                    }>https://onenr.io/0oQDKN2Zajy </span> 
                </div>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>Partnering one Admin</span>
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/00jl7KoWxRW`
                        )}>https://onenr.io/00jl7KoWxRW</span>
                </div>
            </div>

        </div>
        
    )
}

export default Tracing