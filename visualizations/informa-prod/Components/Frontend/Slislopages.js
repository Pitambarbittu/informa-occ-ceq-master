import React from 'react'

const Slislopages = ({openslidetails ,setOpenmodal }) => {

    const close = () => {
        setOpenmodal(false);
      };

      if (!openslidetails) {
        return null;
      }
    return (
     
        <div className='tracing_modal' style={{"left": "697px"}}>
            <div className='griditem_container'>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>Partnering one</span>
                    
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/0ZQWglBraQW`
                        )
                    }>https://onenr.io/0ZQWglBraQW</span> 
                </div>
                <div className='borders' style={{"borderbottom":"none"}}>
                    <span className="title" style={{ "color": "black" }}>Partnering one Admin</span>
                    <span className="url_message" style={{color:"blue"}} onClick={() =>
                        window.open(
                            `https://onenr.io/07wkqXV5GjL`
                        )}>https://onenr.io/07wkqXV5GjL</span>
                </div>
            </div>

        </div>
        
    )
}

export default Slislopages