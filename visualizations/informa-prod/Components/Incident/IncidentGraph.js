import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Button } from 'nr1';
import {
  getBackEndGraphData,
  getFrontEndGraphData,
  getMiddlewareEndGraphData,
  getNetworkGraphData,
} from '../../queryModule';
import close from '../../Assets/close.svg';
import ModalComponent from './ModalComponent';

const IncidentGraph = ({ containerRef }) => {
  const [graphdata, setGraphdata] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const groupItems = (array, property) => {
    return array.reduce(function (groups, item) {
      var date = item[property];
      const d = new Date(date).setSeconds(0, 0);

      const min = new Date(d).getMinutes();
   
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
      group.push(item);
      return groups;
    }, {});
  };

  function timeConversion(getDate) {
    var data = new Date(getDate);
    var hours = ('0' + data.getHours()).slice(-2);
    var minutes = ('0' + data.getMinutes()).slice(-2);
    var newDate = data.getDay();
    return `${hours}:${minutes}`;
  }

  const mergeDataNew = (data) => {
    let final = [];

    for (let element in data) {
      let cur = data[element];
      let frontendCount = 0;
      let backendCount = 0;
      let middlewareCount = 0;
      let networkCount = 0;

      let policyObj = {};

      let mapData = data[element].map((v, index) => {
        if (v.type === 'Front-end') {
          frontendCount += 1;
        }
        if (v.type === 'Backend') {
          backendCount += 1;
        }
        if (v.type === 'Middleware') {
          middlewareCount += 1;
        }

        if (v.type === 'Network') {
          networkCount += 1;
        }

        const mainData = cur.reduce((acc, v) => {
          if (acc[v.policyName]) {
            acc[v.policyName].push(v);
          } else {
            acc[v.policyName] = [v];
          }
          return acc;
        }, {});

        policyObj = { ...mainData };
      });
      final.push({
        'Front-end': frontendCount,
        Backend: backendCount,
        Middleware: middlewareCount,
        Network: networkCount,
        readTime: timeConversion(cur[0].time),
        time: cur[0].time,
        policyObj,
      });
    }
    return final;
  };

  useEffect(async () => {
    let frontendData = await getFrontEndGraphData();
    let backendData = await getBackEndGraphData();
    let middlewareData = await getMiddlewareEndGraphData();
    let networkData = await getNetworkGraphData();

    const frontendArr = frontendData.map((v) => ({ ...v, type: 'Front-end' }));
    const backendArr = backendData.map((v) => ({ ...v, type: 'Backend' }));
    const networkArr = networkData.map((v) => ({ ...v, type: 'Network' }));

    const middlewareArr = middlewareData.map((v) => ({
      ...v,
      type: 'Middleware',
    }));

    let a = [...frontendArr,...middlewareArr, ...networkArr];

    let sortedData = a.sort((a, b) => a.timestamp - b.timestamp);

    let data = groupItems(sortedData, 'timestamp');

    let finaldata = mergeDataNew(data);

    setGraphdata(finaldata);
  }, []);

  function redirect(param, data) {
    setModalData(data);
    setModalOpen(true);
  }

  return (
    <div className="main_graph_container">
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
          {/* <Tooltip/> */}
          <Legend />
          <Bar
            dataKey="Front-end"
            stackId="a"
            fill="#70ADAC"
            onClick={(data) => redirect('front', data)}
          />
          <Bar
            dataKey="Middleware"
            stackId="c"
            fill="#FEBE40"
            onClick={(data) => redirect('middleware', data)}
          />
          <Bar
            dataKey="Backend"
            stackId="b"
            fill="#E57437"
            onClick={(data) => redirect('backend', data)}
          />
          <Bar
            dataKey="Network"
            stackId="d"
            fill="#7E7BCC"
            onClick={(data) => redirect('network', data)}
          />
        </BarChart>
      )}
      {isModalOpen && (
        <ModalComponent
          onClose={() => setModalOpen(false)}
          modalData={modalData}
          height={containerRef.current.getBoundingClientRect().height}
        />
      )}
    </div>
  );
};

export default IncidentGraph;
