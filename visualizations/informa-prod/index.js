import React, { useEffect, useState } from "react";
// import ReactTooltip from "react-tooltip"
import ReactTooltip from "react-tooltip";
import Application from "./Components/Application";
import Container from "./Components/Servicescontainer";
import { allDisruption, relationshipdata, traceIdData } from "./queryModule";
import Table from "./Components/Tablecomponent/Table";
import ErrorInboxTooltip from "./Components/Tooltip/ErrorInboxTooltip";
// import ErrorInboxTooltipc from "./Components/Tooltip/ErrorInboxTooltipc";
import ErrorInboxLambdaTooltip from "./Components/Tooltip/ErrorInboxLambdaTooltip";
import ErrorInboxNetworkTooltip from "./Components/Tooltip/ErrorInboxNetworkTooltip";
import DisruptionLambdaTooltip from "./Components/Tooltip/DisruptionLambdaTooltip";
import Browser_Sli_Slo from "./Components/Tooltip/Browser_Sli_Slo";
import Browser_Disruption from "./Components/Tooltip/Browser_Disruption";
import Redis_Cache_Disruption from "./Components/Tooltip/Redis_Cache_Disruption";
import Alb_Disruption from "./Components/Tooltip/Alb_Disruption";
import Sqs_Disruption from "./Components/Tooltip/Sqs_Disruption";
import Api_Gateway_Disruption from "./Components/Tooltip/Api_Gateway_Disruption";
import Lambda_Sli_Slo from "./Components/Tooltip/Lambda_Sli_Slo";
import RDS_Custer_Disruption from "./Components/Tooltip/RDS_Custer_Disruption";
import CloudFrontError from "./Components/Tooltip/CloudFrontErrorToolTip";
import Api_Gateway_ErrorToolTip from "./Components/Tooltip/ApiGatewayErrorToolTip";
import Browser_Error_Tooltip from "./Components/Tooltip/Browser_Error_Tooltip";
import Ecs_Error from "./Components/Tooltip/Ecs_Error"
import APM_ErrorTooptip from "./Components/Tooltip/APM_ErrorTooptip";
import ECS_Sli_Slo from "./Components/Tooltip/ECS_Sli_Slo";
import APM_Sli_slo from "./Components/Tooltip/APM_Sli_slo";
import VPC_errro from "./Components/Tooltip/VPC_errro";
import API_Gateway_Sli_Slo from "./Components/Tooltip/API_Gateway_Sli_Slo";
import CloudSearch_Tooltip from "./Components/Tooltip/CloudSearch_Tooltip";
import MessageTooltip from "./Components/Tooltip/MessageTooltip";
import GeographyToolTip from "./Components/Tooltip/GeographyToolTip";
import UsertimeTooltip from "./Components/Tooltip/UsertimeTooltip";
import Nathover from "./Components/Tooltip/Nathover";
import Elastic_cache_sli from "./Components/Tooltip/Elastic_cache_sli";
import FidTooltip from "./Components/Tooltip/FidTooltip";
import ClsTooltip from "./Components/Tooltip/ClsTooltip";
import LCPToolTip from "./Components/Tooltip/LCPToolTip";
// import MessageTooltip from "./Components/Tooltip/MessageTooltip";


import UpdateMiddleware from "./Components/Mydashboard/UpdateMiddleware";

const index = () => {
  const [sqsentityid, setsqsentityid] = useState([]);
  const [snsentityid, setsnsentityid] = useState([]);
  const [rdsentityid, setrdsentityid] = useState([]);
  const [lambdaentityid, setlambdaentityid] = useState([]);
  const [disruptionData, setDisruptionData] = useState([])
  const [content, setContent] = useState("");
  const[apientity, setapientity] =useState()
  // // const [apiGatewayId , setApiGateWayId] = ([]);
  const[awsalbentity, setawsalbentity] =useState([])
  const [apientitydata , setapientitydata] =useState([])
  const[browserentity, setbrowserentity] =useState([])
  const[cloudfrontentity, setcloudfrontentity] =useState([])
  const[serviceLevel,setServiceLevel]= useState([])
  const [loader, setloader] =useState()
  const[elasticentity , setelasticentity] =useState([])
  const[awssesentity , setawssesentity] =useState([])
  const[elasticsearchentity, setelasticsearchentity] =useState([])
  const[apmIdEntity , setApmIdEntity] = useState([])
  // useEffect(async () => {
  //   const relationshipresult = await relationshipdata();
  //   const disruption = await allDisruption()
  //   setDisruptionData(disruption)
  //   // setData(relationshipresult)
  //   entityrelation(relationshipresult);
  // }, []);
  const entityrelation = (relationshipresult) => {
    console.log("relationshipresult" ,relationshipresult);
    let sqsentity = [];
    let snsentity = [];
    let rdsentity = [];
    let lambdaentity = [];
    let apigatewayEntity = [];
    let awsalbentity=[];
    let apientity=[]
    let browserentitys=[];
    let cloudfrontentity=[]
    let serviceLevelEntity =[]
    let elasticcacheentity=[]
    let awssesentity=[]
    let elasticsearchentity=[]
    let apmEntity=[]

    for (let i = 0; i < relationshipresult.length; i++) {
  
      if (relationshipresult[i].facet[3] === "AWSSQSQUEUE") {
        sqsentity.push(relationshipresult[i].facet[0]);
      }
      if (relationshipresult[i].facet[3] === "AWSSNSTOPIC") {
        snsentity.push(relationshipresult[i].facet[0]);
      }

      if (relationshipresult[i].facet[3] === "AWSRDSDBINSTANCE") {
        rdsentity.push(relationshipresult[i].facet[0]);
      }

      if (relationshipresult[i].facet[3] === "AWSLAMBDAFUNCTION") {
        lambdaentity.push(relationshipresult[i].facet[0]);
      }

      if (relationshipresult[i].facet[3] === "AWSAPIGATEWAYAPI") {
        apigatewayEntity.push(relationshipresult[i].facet[0])
      }
      if(relationshipresult[i].facet[3] === "AWSALB"){
        awsalbentity.push(relationshipresult[i].facet[0])
      }
      if(relationshipresult[i].facet[3] === "AWSAPIGATEWAYAPI"){
        apientity.push(relationshipresult[i].facet[0])
      }
      if(relationshipresult[i].facet[2] === "BROWSER"){
        browserentitys.push(relationshipresult[i].facet[0])
        console.log("111",relationshipresult[i].facet[0])
      }
      if(relationshipresult[i].facet[2] === "APM"){
        apmEntity.push(relationshipresult[i].facet[0])
      }
      if(relationshipresult[i].facet[3] === "AWSCLOUDFRONTDISTRIBUTION"){
        cloudfrontentity.push(relationshipresult[i].facet[0])
      } 
      if(relationshipresult[i].facet[3] === "SERVICE_LEVEL"){
        serviceLevelEntity.push(relationshipresult[i].facet[0])
      } 

      if(relationshipresult[i].facet[3] === "AWSELASTICACHEREDISNODE"){
        elasticcacheentity.push(relationshipresult[i].facet[0])
      } 
      if(relationshipresult[i].facet[3] === "AWSSESREGION"){
        awssesentity.push(relationshipresult[i].facet[0])
      } 
      if(relationshipresult[i].facet[3] === "AWSELASTICSEARCHCLUSTER"){
        elasticsearchentity.push(relationshipresult[i].facet[0])
      } 
     
    }

    setsqsentityid(sqsentity);
    setsnsentityid(snsentity);
    setrdsentityid(rdsentity);
    setlambdaentityid(lambdaentity);
    setawsalbentity(awsalbentity)
    setapientitydata(apientity)
    setbrowserentity(browserentitys)
    setcloudfrontentity(cloudfrontentity)
    setServiceLevel(serviceLevelEntity)
    setelasticentity(elasticcacheentity)
    setawssesentity(awssesentity)
    setelasticsearchentity(elasticsearchentity)
    setApmIdEntity(apmEntity)
    
  };


  
console.log("browserentitybrowserentity" , browserentity);
  function filterRelationshipIds(relationshipdata) {
    let apm = [];
    let apmAll = [];
    let aiops = [];
    let aiopsAll = [];
    let synth = [];
    let synthAll = [];
    let extAll = [];
    let infraAll = [];
    let browserAll = [];


    for (let index = 0; index < relationshipdata.length; index++) {
      const element = relationshipdata[index];

      if (element.facet[2] === "APM") {
        apm.push(element.facet[0]);
        apmAll.push(element);
      }

      if (element.facet[2] === "AIOPS") {
        aiops.push(element.facet[0]);
        aiopsAll.push(element);
      }

      if (element.facet[2] === "SYNTH") {
        synthAll.push(element);
        synth.push(element.facet[0]);
        
      }

      if (element.facet[2] === "EXT") {
        extAll.push(element);
      }

      if (element.facet[2] === "INFRA") {
        infraAll.push(element);
      }
      if (element.facet[2] === "BROWSER") {
        browserAll.push(element);
      }
    }
    return {
      apmAll: apmAll,
      aiopsAll: aiopsAll,
      synthAll: synthAll,
      extAll: extAll,
      infraAll: infraAll,
      browserAll: browserAll
    };
  }

  const showTipModal = (data, param) => {

    if (data.length > 0  && param === "error") {
      const htmlContent = <CloudFrontError data={data} />
      setContent(htmlContent);
    }

    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <DisruptionLambdaTooltip data={data} />
      setContent(htmlContent);
    }
  };
  const showTipModalLambda = (data, param) => {
    if (data.length > 0 && param === "errors") {
      const htmlContent = <ErrorInboxLambdaTooltip data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "slo") {

      const htmlContent = <Lambda_Sli_Slo slidata={data} />
      setContent(htmlContent)
    }
    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <DisruptionLambdaTooltip data={data} />
      setContent(htmlContent);
    }

  };

  const frontEnd_BrowserToolTip_Modal = (data, param) => {
    if (data.length > 0 && param === "slo") {
      const htmlContent = <Browser_Sli_Slo slidata={data} />
      setContent(htmlContent)
    }
    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Browser_Disruption data={data} />
      setContent(htmlContent)
    }
    else if (data && data.length > 0 && param === "geography") {
      const htmlContent = <GeographyToolTip data={data}   />
      setContent(htmlContent);
    }
    else if(data && data.length > 0 && param === "user_time"){
      const htmlContent = <UsertimeTooltip data={data}   />
      setContent(htmlContent);
    }else if(data && data.length > 0 && param === "lcp"){
      const htmlContent = <LCPToolTip data={data}   />
      setContent(htmlContent);

    }else if(data && data.length > 0 && param === "cls"){
      const htmlContent = <ClsTooltip data={data}   />
      setContent(htmlContent);

    }else if(data && data.length > 0 && param === "fid"){
      const htmlContent = <FidTooltip data={data}   />
      setContent(htmlContent);
    }
    // else if (data2.length > 0&& data.length > 0 && param === "errors") {
    //   const htmlContent = <Browser_Error_Tooltip data={data} data2={data2} />
    //   setContent(htmlContent)
    // }
  }

  // const showTooltipMessages = (message) => {
  //   const htmlContent = <MessageTooltip message={message}/>
  //   setContent(htmlContent)

  // }

  const frontEnd_Api_GatewayToolTip_Modal = (data, param) => {
    if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Api_Gateway_Disruption data={data} />
      setContent(htmlContent)
    }
    else if (data.length > 0 && param === "slo") {
      const htmlContent = <API_Gateway_Sli_Slo slidata={data} />
      setContent(htmlContent)
    }
    else if (data.length > 0 && param === "errors") {
      const htmlContent = <Api_Gateway_ErrorToolTip data={data} />
      setContent(htmlContent)
    }
  }

    const backend_Redis_CacheToolTip_Modal = (data, param) => {
      if (data.length > 0 && param === "slo") {
        const htmlContent = <Elastic_cache_sli slidata={data} />
        setContent(htmlContent);
      }
      else if (data.length > 0 && param === "errors") {
        const htmlContent = <CloudSearch_Tooltip data={data} />
        setContent(htmlContent);
      }
      else if (data.length > 0 && param === "disruptions") {
        const htmlContent = <Alb_Disruption data={data} />
        setContent(htmlContent)
      }

    }
  // backend_Redis_CacheToolTip_Modal
 
  const backend_RDS_ClusterToolTip_Modal = (data, param) => {
    if (data.length > 0 && param === "disruptions") {
      const htmlContent = <RDS_Custer_Disruption data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "errors") {
      const htmlContent = <RDS_Custer_Disruption data={data} />
      setContent(htmlContent);
    }
  }

  const showTipModalNetwork = (data, param) => {
    if (data.length > 0 && param === "errors") {
      const htmlContent = <ErrorInboxNetworkTooltip data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Alb_Disruption data={data} />
      setContent(htmlContent)
    }
  }

  const middleware_SQSToolTip_Modal = (data, param) => {
    if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Sqs_Disruption data={data} />
      setContent(htmlContent);
    }
  }

  const middleware_ECSToolTip_Modal = (data, param) => {
    if (data.length > 0 && param === "errors") {
      const htmlContent = <Ecs_Error data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Sqs_Disruption data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "slo") {
      const htmlContent = <ECS_Sli_Slo slidata={data} />
      setContent(htmlContent)
    }
  }

  const middleware_APMToolTip_Modal = (data, param) => {
    if (data.length > 0 && param === "errors") {
      const htmlContent = <APM_ErrorTooptip data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Sqs_Disruption data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "slo") {
      const htmlContent = <APM_Sli_slo slidata={data} />
      setContent(htmlContent)
    }
  }

  const middleware_Elastic_Search_Modal = (data, param) => {
    if (data.length > 0 && param === "errors") {
      const htmlContent = <CloudSearch_Tooltip data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Sqs_Disruption data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "slo") {
      const htmlContent = <APM_Sli_slo slidata={data} />
      setContent(htmlContent)
    }
  }

  const network_Natgateway_ToolTip_Modal = (data, param) => {
    if (data.length > 0 && param === "errors") {
      const htmlContent = <VPC_errro data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "disruptions") {
      const htmlContent = <Sqs_Disruption data={data} />
      setContent(htmlContent);
    }
    else if (data.length > 0 && param === "slo") {
      const htmlContent = <APM_Sli_slo slidata={data} />
      setContent(htmlContent)
    }
  }
  
  const errorInboxTooltip = (data, data2 ,param) =>{
    if (data && data.length > 0 && param === "errors") {
      const htmlContent = <Browser_Error_Tooltip data={data} data2={data2}/>
      setContent(htmlContent);
    }

  }

  const distributeddata = () => {
    const htmlContent = <Tracing />
    setContent(htmlContent)
  }

  const nathoverdata =() =>{
    const htmlContent =<Nathover/>
    setContent(htmlContent)
  }

  const showTooltipMessages = (message) => {
    const htmlContent = <MessageTooltip message={message}/>
    setContent(htmlContent)

  }

  const unsetContent = () => {
    setContent("");
  }

  const [traceIDvalues, settraceIDvalues] = useState([]); // to get the traceid from query and set it
  const [traceidS, settraceids] = useState(); // to set the looped traceid

  const processData = async (traceIDvalues) => {
    let traceIDresults = []; // to store the traceid
    for (let i = 0; i < traceIDvalues.length; i++) {
      traceIDresults[i] = traceIDvalues[i]["trace.id"];
    }
    settraceids(traceIDresults);
  };

  // const updateDashboard = async () =>{
  //   let traceIDresult = await traceIdData();
  //   const relationshipresult = await relationshipdata();
  //   console.log("relationshipdatainmain", relationshipresult);
  //   const disruption = await allDisruption()
  //   setDisruptionData(disruption)
  //   // setData(relationshipresult)
  //   entityrelation(relationshipresult);
  //   settraceIDvalues(traceIDresult);
  //   processData(traceIDresult);
  // }
  useEffect(async () => {
    let traceIDresult = await traceIdData();
    const relationshipresult = await relationshipdata();
    console.log("relationshipdatainmain", relationshipresult);
    const disruption = await allDisruption()
    setDisruptionData(disruption)
    // setData(relationshipresult)
    entityrelation(relationshipresult);
    settraceIDvalues(traceIDresult);
    processData(traceIDresult);
  }, []);

  return (
    <div>
      <div data-tip="">
        <Application />
        <Container
          unsetContent={unsetContent}
          disruptionData={disruptionData}
          showTipModal={showTipModal}
          showTipModalLambda={showTipModalLambda}
          showTipModalNetwork={showTipModalNetwork}
          backend_Redis_CacheToolTip_Modal={backend_Redis_CacheToolTip_Modal}
          frontEnd_Api_GatewayToolTip_Modal={frontEnd_Api_GatewayToolTip_Modal}
          frontEnd_BrowserToolTip_Modal={frontEnd_BrowserToolTip_Modal}
          middleware_SQSToolTip_Modal={middleware_SQSToolTip_Modal}
          backend_RDS_ClusterToolTip_Modal={backend_RDS_ClusterToolTip_Modal}
          middleware_ECSToolTip_Modal={middleware_ECSToolTip_Modal}
          middleware_APMToolTip_Modal={middleware_APMToolTip_Modal}
          network_Natgateway_ToolTip_Modal={network_Natgateway_ToolTip_Modal}
          middleware_Elastic_Search_Modal ={middleware_Elastic_Search_Modal}
          sqsentityid={sqsentityid}
          snsentityid={snsentityid}
          rdsentityid={rdsentityid}
          lambdaentityid={lambdaentityid}
          distributeddata={distributeddata}
          awsalbentity={awsalbentity}
          apientitydata={apientitydata}
          browserentity={browserentity}
          cloudfrontentity={cloudfrontentity}
          serviceLevel={serviceLevel}
          elasticentity={elasticentity}
          awssesentity={awssesentity}
          elasticsearchentity={elasticsearchentity}
          nathoverdata={nathoverdata}
          showTooltipMessages={showTooltipMessages}
          apmIdEntity={apmIdEntity}
          errorInboxTooltip={errorInboxTooltip}
          // showTooltipMessages={showTooltipMessages}
        />
      </div>

      <div className="main_container">
        <Table traceidS={traceidS} />
      </div>

      <ReactTooltip
        position="fixed"
        backgroundColor="#FFFFFF"
        arrowColor=" red"
        className="opaque"
      >
        {content}
      </ReactTooltip>
      {/* {loader && <Load} */}


     
       

    </div>

    
  );
};

export default index;
