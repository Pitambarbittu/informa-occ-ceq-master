import { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {Button} from "nr1";
import {
  getBackEndGraphData,
  getFrontEndGraphData,
  getMiddlewareEndGraphData,
  getNetworkGraphData,
} from "../../queryModule";
import close from "../../Assets/close.svg"
// import frontend from './frontend.json';
// import backend from './backend.json';

const ModalComponent = ({ onClose, modalData }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <h3>INCIDENT TIMELINE DATA For <span style={{fontSize:"16px" , color:"green"}}>({modalData.readTime})</span></h3>
          <div style={{marginTop:"18px"}}>
          {<div style={{ display: "flex", justifyContent: "space-between", width:"100%"}} >
            <p style={{width:"100px"}}>Backend</p>
            <div style={{justifyContent:"space-between" , gap:"10px", display:"flex" ,flexDirection:"column"}}>
              {modalData.backendIncidentLink.length > 0 &&
                modalData.backendIncidentLink.map((cur) => <p className="hover" onClick={() => {
                  window.open(cur)
                }}>{cur}</p>)}
            </div>
          </div>}

         {modalData.frontendIncidentLink.length > 0 && <div style={{ display: "flex", justifyContent: "space-between", width:"100%" }}>
            <p style={{width:"100px"}}>Front end</p>
            <div style={{justifyContent:"space-between" , gap:"10px", display:"flex" ,flexDirection:"column"}}>
              {modalData.frontendIncidentLink.length > 0 &&
                modalData.frontendIncidentLink.map((cur) => <p  className="hover" onClick={() => window.open(cur)}>{cur}</p>)}
            </div>
          </div>}

          {modalData.middlewareIncidentLink.length > 0 && <div style={{ display: "flex", justifyContent: "space-between" , width:"100%"}}>
            <p style={{width:"100px"}}>Middleware</p>
            <div style={{justifyContent:"space-between" , gap:"10px", display:"flex" ,flexDirection:"column"}}>
              {modalData.middlewareIncidentLink.length > 0 &&
                modalData.middlewareIncidentLink.map((cur) => <p  className="hover" onClick={() => window.open(cur)}>{cur}</p>)}
            </div>
          </div>}

          {modalData.networkIncidentLink.length > 0 && <div style={{ display: "flex", justifyContent: "space-between" , width:"100%" }}>
            <p style={{width:"100px"}}>Middleware</p>
            <div style={{justifyContent:"space-between" , gap:"10px", display:"flex" ,flexDirection:"column"}}>
              {modalData.networkIncidentLink.length > 0 &&
                modalData.networkIncidentLink.map((cur) => <p  className="hover" onClick={() => {
                  console.log(cur);
                  window.open(cur)
                }}>{cur}</p>)}
            </div>
          </div>}
          </div>
    
      
        </div>
        {/* <Button className="close-button" onClick={onClose} type={Button.TYPE.PRIMARY} style={{marginTop :"20px"}}>Click me</Button> */}
        <img  src={close} className="close-button" onClick={onClose} alt="cross" />

        
      </div>
    </div>
  );
};

function CustomTooltip({ payload }) {
  console.log("tooltip");
  if (!payload[0]) {
    return <p>No data</p>;
  }
  function RemoveFalseAndTransformToArray(obj) {
    console.log("obj1", obj);

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === 0) {
        delete obj[key];
      }
      delete obj["time"];
      delete obj["Front-end"];
      delete obj["Backend"];
      delete obj["Middleware"];
      delete obj["Network"];
    }

    return obj;

    console.log("obj2", obj);
  }

  console.log("payload", payload[0].payload);

  const finalData = RemoveFalseAndTransformToArray(payload[0].payload);
  const objectKeys = Object.keys(finalData);
  const objectValues = Object.values(finalData);
  console.log("finalData", finalData);
  return (
    <>
      <table>
        <thead>
          {objectKeys.length > 0 && objectKeys.map((cur) => <th>{cur}</th>)}
        </thead>

        <tbody>
          {objectValues.length > 0 && objectValues.map((cur) => <td>{cur}</td>)}
        </tbody>
      </table>
    </>
  );
}

const IncidentGraph = ({ containerRef }) => {
  const [graphdata, setGraphdata] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const targetRef = useRef();

  const groupItems = (array, property) => {
    return array.reduce(function (groups, item) {
      var date = item[property];
      const d = new Date(date).setSeconds(0, 0);
    
      // const dataKey = new Date(date).setMinutes(0, 0);
      const min = new Date(d).getMinutes();
      console.log("min", min);
      let finalDate = 0;
      if (min > 0 && min <= 15) {
        finalDate = new Date(d).setMinutes(0);
      } else if (min > 15 && min <= 30) {
        finalDate = new Date(d).setMinutes(15);
      } else if (min > 30 && min < 45) {
        finalDate = new Date(d).setMinutes(30);
      } else if (min > 45 && min < 60) {
        finalDate = new Date(d).setMinutes(45);
      } else if (min >= 60) {
        finalDate = new Date(d).setMinutes(0);
      }
      var group = groups[finalDate] || (groups[finalDate] = []);
      item.time = finalDate;
      //   item.type = type;
      group.push(item);
      return groups;
    }, {});
  };

  function timeConversion(getDate) {
    // console.log("hey" , getDate)
    var data = new Date(getDate);
    // var hours = `${data.getHours() }`;
    var hours = ("0" + data.getHours()).slice(-2);
    var minutes = ("0" + data.getMinutes()).slice(-2);
    var newDate = data.getDay();
    return `${hours}:${minutes}`;
  }

  const mergeDataNew = (data) => {
    console.log("lets check that", data);
    for (let element in data) {
      console.log("element", element);
      let cur = data[element];
    
     
      const mainData = cur.reduce((acc, v) =>{
        console.log("362" , data[element])
        // console.log("rohit" ,v)
        if(acc[v.policyName]){
          console.log("hii" , acc[v]);

          acc[v.policyName].push(v)

        }else{
          console.log("hii" , v);
          acc[v.policyName] = [v]
        }
        return acc
      },{});

      // cur.element = mainData
    }

    return data

    console.log("praveen" , data);
  };

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(async () => {
    let frontendData = await getFrontEndGraphData();
    let backendData = await getBackEndGraphData();
    let middlewareData = await getMiddlewareEndGraphData();
    let networkData = await getNetworkGraphData();

    const frontendArr = frontendData.map((v) => ({ ...v, type: "Front-end" }));
    const backendArr = backendData.map((v) => ({ ...v, type: "Backend" }));
    const networkArr = networkData.map((v) => ({ ...v, type: "Network" }));

    const middlewareArr = middlewareData.map((v) => ({
      ...v,
      type: "Middleware",
    }));

    let a = [...frontendArr, ...backendArr, ...middlewareArr, ...networkArr];
    let sortedData = a.sort((a, b) => a.timestamp - b.timestamp);
    console.log("sortedData", sortedData);
    let data = groupItems(sortedData, "timestamp");
    console.log("you" , data)

    let finaldata = mergeDataNew(data);
    console.log("finaldataaaaa", finaldata);
    setGraphdata(finaldata);
  }, []);

  function redirect(param, data) {
    setModalData(data);

    setModalOpen(true);

    // console.log("click" ,data);
    // console.log("param" , data.payload[`${param}IncidentLink`]);
    // window.open(data.payload[`${param}IncidentLink`])
  }


  return (
    <div ref={targetRef}>
     <>{console.log("graphData" , graphdata)}</>

      {graphdata.length > 0 && (
        <BarChart
          width={containerRef.current.getBoundingClientRect().width}
          height={232}
          barCategoryGap={30}
          data={graphdata}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="readTime" />
          <YAxis />
    
          <Legend />
          <Bar
            dataKey="Front-end"
            stackId="a"
            fill="#70ADAC"
            onClick={(data) => redirect("front", data)}
          />
          <Bar
            dataKey="Middleware"
            stackId="c"
            fill="#FEBE40"
            onClick={(data) => redirect("middleware", data)}
          />
          <Bar
            dataKey="Backend"
            stackId="b"
            fill="#E57437"
            onClick={(data) => redirect("backend", data)}
          />
          <Bar
            dataKey="Network"
            stackId="d"
            fill="#7E7BCC"
            onClick={(data) => redirect("network", data)}
          />
        </BarChart>
      )}
      {isModalOpen && (
        

        <ModalComponent
          onClose={() => setModalOpen(false)}
          modalData={modalData}
        />
      )}
    </div>
  );
};

export default IncidentGraph;