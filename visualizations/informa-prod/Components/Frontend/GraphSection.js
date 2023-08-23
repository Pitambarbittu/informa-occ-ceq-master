import React,{useState,useEffect} from 'react';
import { Grid, GridItem, LineChart } from 'nr1';
import infos from '../../Assets/info.svg';


const GraphSection = ({heading,apmIdEntity}) => {
    const[dataQuery,setDataQuery] =useState("")

    useEffect(() =>{
        const apmIdEntityString = apmIdEntity.map((cur, index) => "'" + cur.toString() + "'").join(",") ;
        let responsiveGraphQuery= `From Transaction SELECT average(duration) where entity.guid IN (${apmIdEntityString}) and transactionType = 'Web' since 1 day ago compare with 1 hour ago TIMESERIES`
        let throughGraphQuery= `From Transaction SELECT count(*) where entity.guid IN (${apmIdEntityString}) and transactionType = 'Web' since 1 day ago compare with 1 hour ago TIMESERIES`

        if(heading ==="Throughput"){
            setDataQuery(throughGraphQuery)
        }
        if(heading ==="Response Time"){
            setDataQuery(responsiveGraphQuery)
        }
    },[heading,apmIdEntity])
    // const apmIdEntityString = 





  return (
    <>
        <div className="tasks_container">
          <div className="header_graph">
            <p className="capitial">{heading}</p>
            {heading ==="Throughput" && <span>(Page views per minute) </span>}
            <img
                src={infos}
                  alt="info"
                  // onMouseOver ={() =>{showTooltipMessages("CLS measures the cumulative score of all unexpected layout shifts that occur between when the page starts loading and when its lifecycle state changes to hidden.")}}
                  // onMouseLeave ={unsetContent}
                />
          </div>

          {/* <Nr */}


          <div>
          <LineChart
          accountId={3961333}
          query={dataQuery}
          fullWidth
          // fullHeight
          />
          </div>
      
        </div>
    </>

    
  );
};

export default GraphSection;
