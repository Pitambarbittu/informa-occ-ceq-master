import React, { useEffect, useState } from "react";
import nrdbQuery from "../../query";

const GraphText = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(async () => {
    const frontEndQuery =
      "From NrAiIncident SELECT timestamp,conditionName,incidentLink ,policyId   where tags.policyId IN ('1089184','1089186') and event='open'   limit max since 12 hours ago";
    let frontEndQueryData = await nrdbQuery(3936349, frontEndQuery);

    const backendEndQuery =
      "From NrAiIncident SELECT timestamp,conditionName,incidentLink ,policyId   where tags.policyId IN ('1089183','1089185') and event='open'   limit max since 12 hours   ago";
    let backendEndQueryData = await nrdbQuery(3936349, backendEndQuery);
  
  }, []);
  return (
    <div>
      <h1>data is here</h1>
    </div>
  );
};

export default GraphText;
