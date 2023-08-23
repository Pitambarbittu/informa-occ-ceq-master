// import { data } from "./data";
import { Dendrogram } from "./Dendrogram";

export const DendrogramHorizontalDemo = ({data, width = 720, height = 200 }) => (
  <Dendrogram data={data}  width={width} height={height} />
  // <Dendrogram data={data}/>
);
