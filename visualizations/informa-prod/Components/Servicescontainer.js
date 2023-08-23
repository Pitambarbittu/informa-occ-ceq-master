// import React from 'react'
import { Grid, GridItem, Card, CardHeader, CardBody } from "nr1";
import blue from "../Assets/bluecircle.svg"
import backend from "../Assets/backendellipse.svg"
import middlewares from "../Assets/middlewareellipse.svg"
import Network from "../Assets/Networkellipse.svg"
import NetworkUtil from "./Frontend/Cloudfront";
import Cpumemory from "./Cpumemory";
import Tasks from "./Tasks";
import Awsfunction from "./Middleware/Awsfunction";
import middleware from "../Assets/middleware.svg"
import Cloudfront from "./Frontend/Cloudfront";
import Apigateway from "./Frontend/Apigateway";
import Awssqs from "./Middleware/Awssqs";
import Awssns from "./Middleware/Awssns";
import Lambda from "./Backend/Lambda";
import Radiscache from "./Backend/Radiscache";
import Rdscluster from "./Backend/Rdscluster";
import Vpcnat from "./Network/Vpcnat";
import Awsalb from "./Network/Awsalb";
import Cloudsearch from "./Middleware/Clouddearch";
import Awsses from "./Middleware/Awsses";
import Awsecs from "./Middleware/Awsecs";
import Ecsmicroservice from "./Middleware/Ecsmicroservice";
import Elasticsearch from "./Backend/Elasticsearch";
import Browser from "./Frontend/Browser";
import UpdateMiddleware from "./Mydashboard/UpdateMiddleware";

const Container = ({showTipModal,showTipModalLambda,showTipModalNetwork, backend_Redis_CacheToolTip_Modal,frontEnd_Api_GatewayToolTip_Modal,frontEnd_BrowserToolTip_Modal,middleware_SQSToolTip_Modal,backend_RDS_ClusterToolTip_Modal,middleware_ECSToolTip_Modal,middleware_APMToolTip_Modal,network_Natgateway_ToolTip_Modal,middleware_Elastic_Search_Modal ,unsetContent,sqsentityid, snsentityid ,rdsentityid , lambdaentityid, disruptionData , distributeddata, awsalbentity,apientitydata, browserentity, cloudfrontentity,serviceLevel, elasticentity, awssesentity,elasticsearchentity ,apmIdEntity,errorInboxTooltip,showTooltipMessages,nathoverdata}) => {
  return (
    <>
      <div className='service_container'>
        <div className="service_containerheading frontend">
          <h5> <img src={blue} alt="img" /> Front-end </h5>
        </div>

        <Grid>
        <GridItem columnSpan={12}>
           
            <Browser  middleware_APMToolTip_Modal={middleware_APMToolTip_Modal} unsetContent={unsetContent} disruptionData={disruptionData} serviceLevel={serviceLevel}  frontEnd_BrowserToolTip_Modal={frontEnd_BrowserToolTip_Modal}  param={"browser"}  distributeddata={distributeddata} browserentity={browserentity} apmIdEntity={apmIdEntity} errorInboxTooltip={errorInboxTooltip} showTooltipMessages={showTooltipMessages}/>
          </GridItem>
          
         
          
        </Grid>
      </div>


      <div className='service_container'>
        <div className="service_containerheading middleware">
          <h5> <img src={middlewares} alt="img" /> Middleware </h5>
          {/* <span className="tags" >AWS Step Function</span> 
          <span className="tags" >AWS SQS</span> 
          <span className="tags" >AWS SNS</span>
          <span className="tags" >Cloud Search</span> */}
        </div>
        <Grid>
          {/* <GridItem columnSpan={4}  >
            <Awsfunction />
          </GridItem> */}
            <GridItem columnSpan ={6}>
         <Lambda lambdaentityid={lambdaentityid} showTipModalLambda={showTipModalLambda} unsetContent={unsetContent} disruptionData={disruptionData} serviceLevel={serviceLevel} />
         </GridItem>
          <GridItem columnSpan={6}>
            <Apigateway frontEnd_Api_GatewayToolTip_Modal={frontEnd_Api_GatewayToolTip_Modal} param={"apiGateWay"} unsetContent={unsetContent} disruptionData={disruptionData} apientitydata={apientitydata}  serviceLevel={serviceLevel}/>
          </GridItem>
        
         <GridItem columnSpan={4}  >
            <Cloudfront showTipModal={showTipModal} param={"cloudFront"} unsetContent={unsetContent} cloudfrontentity={cloudfrontentity} disruptionData={disruptionData} />
          </GridItem>
          <GridItem columnSpan={4}>
            <Awssqs sqsentityid={sqsentityid} showTipModal={showTipModal} middleware_SQSToolTip_Modal ={middleware_SQSToolTip_Modal } unsetContent={unsetContent} disruptionData={disruptionData} />
          </GridItem>
          <GridItem columnSpan={4}>
            <Awssns middleware_Elastic_Search_Modal={middleware_Elastic_Search_Modal} unsetContent={unsetContent} snsentityid={snsentityid} disruptionData={disruptionData}/>
          </GridItem>
        
         
        
          <GridItem columnSpan ={6}>
             <Awsecs middleware_ECSToolTip_Modal={middleware_ECSToolTip_Modal} unsetContent={unsetContent} disruptionData={disruptionData} serviceLevel={serviceLevel} showTooltipMessages={showTooltipMessages}/>
          </GridItem>
          
        </Grid>
      </div>


      <div className='service_container'>
        <div className="service_containerheading backend">
          <h5> <img src={backend} alt="img" /> Backend </h5>
          {/* <span className="tags" >Lambda</span> 
          <span className="tags" >Radis Cache</span> 
          <span className="tags" >RDS Cluster</span>
          <span className="tags" >AWS SES</span> */}
        </div>
        <Grid> 
            {/* <GridItem columnSpan={4}  >
            <Lambda />
          </GridItem>  */}
          <GridItem columnSpan={6}>
            <Radiscache  backend_Redis_CacheToolTip_Modal={ backend_Redis_CacheToolTip_Modal} unsetContent={unsetContent} disruptionData={disruptionData} elasticentity={elasticentity} serviceLevel={serviceLevel}/>
          </GridItem>
          {/* <GridItem columnSpan={6}>
          <Elasticsearch backend_Redis_CacheToolTip_Modal={backend_Redis_CacheToolTip_Modal} unsetContent={unsetContent} elasticsearchentity={elasticsearchentity} disruptionData={disruptionData}/>
          </GridItem> */}
          <GridItem columnSpan={6}>
            <Rdscluster rdsentityid={rdsentityid} backend_RDS_ClusterToolTip_Modal={backend_RDS_ClusterToolTip_Modal} unsetContent={unsetContent} disruptionData={disruptionData} />
          </GridItem> 
          <GridItem columnSpan ={6}>
             <Awsses middleware_Elastic_Search_Modal={middleware_Elastic_Search_Modal} unsetContent={unsetContent} awssesentity={awssesentity} disruptionData={disruptionData}/>
          </GridItem>
          <GridItem columnSpan ={6}>
             <Cloudsearch  disruptionData={disruptionData} serviceLevel={serviceLevel} />
          </GridItem>
          {/* <GridItem columnSpan={4}>
            <Elasticsearch backend_Redis_CacheToolTip_Modal={backend_Redis_CacheToolTip_Modal} unsetContent={unsetContent} elasticsearchentity={elasticsearchentity}/>
          </GridItem> */}
        </Grid> 
      </div>

      <div className='service_container'>
        <div className="service_containerheading network">
          <h5> <img src={Network} alt="img" /> Network Layer</h5>
          {/* <span className="tags" >VPC NAT Gateway</span> 
          <span className="tags" >AWS ALB P1/SCM</span> 
          <span className="tags" >Route 53</span> */}
        </div>
        <Grid>
          <GridItem columnSpan={6}  >
            <Vpcnat network_Natgateway_ToolTip_Modal={network_Natgateway_ToolTip_Modal} unsetContent={unsetContent} disruptionData={disruptionData}  serviceLevel={serviceLevel} nathoverdata={nathoverdata}/>
          </GridItem>
          <GridItem columnSpan={6}>
            <Awsalb showTipModalNetwork={showTipModalNetwork} unsetContent={unsetContent} disruptionData={disruptionData} awsalbentity={awsalbentity}  serviceLevel={serviceLevel}/>
          </GridItem>
          <GridItem columnSpan={12}>
           <UpdateMiddleware 

      />
          </GridItem>
        </Grid>
      </div>

      
      </>
  )
}

export default Container