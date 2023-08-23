import { useMemo, useState } from "react";
import { Tree } from "./data";
import * as d3 from "d3";

// import TableModal from "./TableModal";

const MARGIN = { top: 100, right: -100, bottom: -50, left: 100 };

export const Dendrogram = ({ width, height, data }) => {



 
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  // const[Tabledata , setTableData] = useState()

  // const tableContentModal = () => {
  //   let htmldata = <TableModal />;
  //   setTableData(htmldata);
  // };







  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const hierarchy = useMemo(() => {
    return d3.hierarchy(data).sum((d) => d.value);
  }, [data]);
  const dendrogram = useMemo(() => {
    const dendrogramGenerator = d3.cluster().size([boundsHeight, boundsWidth]);
    return dendrogramGenerator(hierarchy);
  }, [hierarchy, width, height]);




  const allNodes = dendrogram.descendants().map((node) => {

   
    return (
      <g key={node.id}>
        <polygon
          points={`${node.y},${node.x - 10} ${node.y},${node.x + 10} ${node.y + 16},${node.x + 20} ${node.y + 32},${node.x + 10} ${node.y + 32},${node.x - 10} ${node.y + 16},${node.x - 20}`}
          // fill="green"
          stroke="curve"
          markerEnd="url(#arrowhead)"
          // onMouseOver={() => tableContentModal()} 
          // fill={node.data.error?"Red" :"Green"}

          onMouseOver={(event) => {
            const { clientX, clientY } = event;
            setHoveredNode(node);
            setTooltipPosition({ x: clientX - 90, y: clientY });
          }}
          onMouseOut={() => {
            setHoveredNode(null);
            setTooltipPosition({ x: 0, y: 0 });
          }}
          fill={node.data.error ? "Red" : "#56BE3B"}
        />

        {!node.name && (
          <>
            <text
              x={node.y - 40}
              y={node.x + 30}
              fontSize={12}
              textAnchor="left"
              //  textAnchor="middle"
              alignmentBaseline="middle"
            >
              {node.data.name}

            </text>
            <text
              x={node.y - 40}
              y={node.x + 50}
              fontSize={12}
              textAnchor="left"
              //  textAnchor="middle"
              alignmentBaseline="middle"
            >
              {node.data.request_domain}

            </text>
          </>
        )
        }
        {/* {!node.children && (
          <text
            x={node.y - 40}
            y={node.x + 50}
            fontSize={12}
            textAnchor="left"
            alignmentBaseline="middle"
          >
            {node.data.name}
          </text>
        )} */}
      </g>
    );
  });

  const horizontalLinkGenerator = d3.linkHorizontal();

  const allEdges = dendrogram.descendants().map((node) => {
    if (!node.parent) {
      return null;
    }
    return (
      <>



        <path
          key={node.id}
          fill="none"
          stroke="#000"
          stroke-width="2"
          markerEnd="url(#triangle)"
          d={horizontalLinkGenerator({
            source: [node.parent.y + 30, node.parent.x], // to reduce or increase the length of the line
            target: [node.y - 10, node.x]

          })}

        />

        <defs>
          <filter id="boxShadow" x="-10%" y="-20%" width="150%" height="140%">
            <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        {/* <> */}

        {/* <rect
  x={(node.parent.y + 30 + node.y - 10) / 2 - 30} // Adjust the x-coordinate based on desired box width
  y={(node.parent.x + node.x) / 2 - 15} // Adjust the y-coordinate based on desired box height
  width="60" // Adjust the width of the box as needed
  height="30" // Adjust the height of the box as needed
  fill="#fff" // Adjust the fill color of the box
  filter="url(#boxShadow)" // Apply the shadow effect using the defined filter
/>



      <text
        x={(node.parent.y + 49 + node.y - 20) / 2} // Calculates the midpoint of x coordinates
        y={(node.parent.x + node.x) / 2} // Calculates the midpoint of y coordinates
        textAnchor="middle" // Centers the text horizontally
        dominantBaseline="middle" // Centers the text vertically
        fill="#000"
        fontSize="16px"
      >
        {node.data.count}calls
      </text>

      <text
        x={(node.parent.y + 5 + node.y - 130) / 2} // Calculates the midpoint of x coordinates
        y={(node.parent.x + node.x) / 2} // Calculates the midpoint of y coordinates
        textAnchor="middle" // Centers the text horizontally
        dominantBaseline="middle" // Centers the text vertically
        fill="#000"
        fontSize="16px"
      >
        {node.data.durations.toFixed(2)}ms
      </text> */}
        {/* </> */}


        <rect
          x={(node.parent.y + 30 + node.y - 10) / 2 - 30}
          y={(node.parent.x + node.x) / 2 - 15}
          width="60"
          height="30"
          fill="#fff"
          filter="url(#boxShadow)"
        />

        <text
          x={(node.parent.y + 49 + node.y - 20) / 2}
          y={(node.parent.x + node.x) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#000"
          fontSize="16px"
          filter="url(#boxShadow)" // Apply the same filter as the first text
        >
          {node.data.count} calls
        </text>

        <text
          x={(node.parent.y + 15 + node.y - 130) / 2}
          y={(node.parent.x - 20 + node.x) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#000"
          fontSize="16px"
          filter="url(#boxShadow)" // Apply the same filter as the first text
        >
          {node.data.durations.toFixed(2)} ms
        </text>
      </>


    );
  });

  const Tooltip = ({ position, message }) => {
    const style = {
      position: "absolute",
      left: `${position.x - 60}px`,
      top: `${position.y}px`,
      backgroundColor: "#fff",
      padding: "5px",
    };

    return <div style={style}>{message}</div>;
  };

 

  return (
    <div>
      <svg width={width} height={height} viewBox="250 -10 400 300">
        <defs>
          <marker
            id="triangle"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="5"
            markerHeight="5"
            orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
          </marker>
        </defs>



        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allNodes}
          {allEdges}
        </g>
      </svg>
      {hoveredNode && (
        <Tooltip
          position={tooltipPosition}
          message={
            // <table style={{width:"200px"}}>

            // <tr>
            //   <th>Page Url</th>
            //   <th>RequestUrl</th>
            //   <th>Request URI</th>
            //   <th>Error Message</th>
            // </tr>

            // <tr>
            //   <td>{hoveredNode.data.pageUrl}</td>
            //   <td>{hoveredNode.data.request_url}</td>
            //   <td>{hoveredNode.data.request_uri}</td>
            //   <td>{hoveredNode.data.error}</td>
            // </tr>
            // </table>
            <div className='griditem_container'>

              {hoveredNode.data.pageUrl &&
                <div className='borders'>

                  <span className="title">Page URL</span>
                  <span className="url_message">{`${hoveredNode.data.pageUrl}`}</span>
                </div>
              }
              {hoveredNode.data.request_url &&
                <div className='borders'>

                  <span className="title">Request URl</span>
                  <span className="url_message">{`${hoveredNode.data.request_url}`}</span>

                </div>
              }

              {hoveredNode.data.request_uri &&
                <div className='borders'>
                  <span className="title">Request URI</span>
                  <span className="url_message">{`${hoveredNode.data.request_uri}`}</span>
                </div>
              }

              {hoveredNode.data.error &&
                <div className='borders'>

                  <span className="title">Error Message</span>
                  <span className="url_message">{`${hoveredNode.data.error}`}</span>

                </div>
              }

            </div>

            // <div className='griditem_container' style={{padding:"10px",boxSizing:'border-box',width:"400px",height:"800px"}}>
            //                     <span className="griditem_head" style={{color:"black",margin:"10px auto",fontFamily:"Inter",fontStyle:"normal",fontWeight:"500",fontSize:"14px",lineHeight:"22px",marginBottom:"20px"}}>Details of the Events</span>
            //                     <div className='borders' style={{paddingBottom:"8px",marginTop:"12px",borderBottom:"0.1px solid #50565a",display:"flex",justifyContent:"space-between"}}>
            //                         <span className="title">Page URL</span>
            //                         <span className="url_message">{`${hoveredNode.data.pageUrl}`}</span>
            //                     </div>
            //                     <div className='borders' style={{paddingBottom:"8px",marginTop:"12px",borderBottom:"0.1px solid #50565a",display:"flex",justifyContent:""}}>
            //                         <span className="title">Request URl</span>
            //                         <span className="url_message">{`${hoveredNode.data.request_url}`}</span>
            //                     </div>
            //                     <div className='borders' style={{paddingBottom:"8px",marginTop:"12px",borderBottom:"0.1px solid #50565a",display:"flex",justifyContent:""}}>
            //                         <span className="title">Request URI</span>   
            //                         <span className="url_message">{`${hoveredNode.data.request_uri}`}</span>
            //                     </div>

            //                     <div className='borders' style={{paddingBottom:"8px",marginTop:"12px",borderBottom:"0.1px solid #50565a",display:"flex",justifyContent:""}}>
            //                         <span className="title">Error Message</span>   
            //                         <span className="url_message">{`${hoveredNode.data.error}`}</span>
            //                     </div>
            //         </div>

          }
        />


      )}
    </div>
  );
};
