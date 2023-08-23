import nrdbQuery from "../query";
export const accountId = 3884245;


export const relationshipdata = async () => {
  let relationshipQuery = `SELECT uniqueCount(targetEntityGuid) from Relationship Where sourceEntityGuid IN ('Mzk2MTMzM3xOUjF8V09SS0xPQUR8MjQ2MDI') and targetDomain is NOT NULL facet targetEntityGuid,sourceEntityGuid,targetDomain,targetEntityType LIMIT MAX`
  let relationshipData = await nrdbQuery(accountId, relationshipQuery)
  return relationshipData;
}

export const awssqsData = async (sqsentityid) => {
  let sqsQuery = `SELECT sum(aws.sqs.NumberOfMessagesSent) AS 'sent_message', sum(aws.sqs.NumberOfMessagesReceived) AS  'received_message', sum(aws.sqs.NumberOfMessagesDeleted) AS 'deleted_message', sum(aws.sqs.ApproximateNumberOfMessagesVisible) AS 'visible_message', sum(aws.sqs.ApproximateNumberOfMessagesNotVisible) AS 'notVisible_message', sum(aws.sqs.ApproximateNumberOfMessagesDelayed) AS 'delayed_message', sum(aws.sqs.NumberOfEmptyReceives) AS 'empty_messages', sum(aws.sqs.ApproximateAgeOfOldestMessage) AS 'oldest_message' FROM Metric WHERE  entity.guid IN ('${sqsentityid}') SINCE 1 hour ago`;
  let sqsData = await nrdbQuery(accountId, sqsQuery);
  return sqsData;
}

export const snsDatas = async (snsentityid) => {
  let snsQuery = `SELECT sum(aws.sns.NumberOfMessagesPublished) AS 'messsages_published', sum(aws.sns.NumberOfNotificationsDelivered) AS 'notifications_delivered', sum(aws.sns.NumberOfNotificationsFailed) AS 'notifications_failed' FROM Metric WHERE  entity.guid IN ('${snsentityid}')`
  let snsData = await nrdbQuery(accountId, snsQuery)
  return snsData
}

export const rdsreceivedata = async (rdsentityid) => {
  let rdsmemoryquery = `SELECT average(aws.rds.NetworkReceiveThroughput) as 'Receive', average(aws.rds.NetworkTransmitThroughput) as 'Transmit',average(aws.rds.CPUUtilization) As 'cpu_utilization', average(aws.rds.DatabaseConnections) AS  'db_connection', average(aws.rds.ReadLatency) * 1000 AS  'read_latency' , average(aws.rds.WriteLatency) * 1000 As 'write_latency', average(aws.rds.WriteThroughput) AS 'write_throughput', average(aws.rds.ReadThroughput) AS 'read_throughput', min(aws.rds.FreeStorageSpace) AS 'free_storage'FROM  Metric Where entity.guid IN ('MzkzNjM0OXxJTkZSQXxOQXwtNTM3NDI3MDYyNzE2ODE0NDc2OA') FACET entity.name AS 'name' since 1 hour ago`
  let rdsmemorydata = await nrdbQuery(accountId, rdsmemoryquery)
  return rdsmemorydata
}

export const rdsutilization = async () => {
  let rdsutiliquery = `SELECT average(aws.rds.CPUUtilization) As 'cpu_utilization', average(aws.rds.DatabaseConnections) AS  'db_connection', average(aws.rds.ReadLatency) * 1000 AS  'read_latency' , average(aws.rds.WriteLatency) * 1000 As 'write_latency', average(aws.rds.WriteThroughput) AS 'write_throughput', average(aws.rds.ReadThroughput) AS 'read_throughput' FROM  Metric Where entity.guid IN ('MzkzNjM0OXxJTkZSQXxOQXwtNTM3NDI3MDYyNzE2ODE0NDc2OA') FACET entity.name AS 'name' since 1 hour ago`
  let rdsutilidata = await nrdbQuery(accountId, rdsutiliquery)
  return rdsutilidata
}

export const rdsquerydatas = async () => {
  let rdsquery = `SELECT average(provider.loginFailures.Average) AS 'login_failures(s)' , average(provider.queries.Average) AS 'queries(s)' FROM DatastoreSample WHERE provider='RdsDbInstance' AND entityGuid IN ('MzkzNjM0OXxJTkZSQXxOQXwtNTM3NDI3MDYyNzE2ODE0NDc2OA') SINCE 1 hour ago`
  let rdsfinaldata = await nrdbQuery(accountId, rdsquery)
  return rdsfinaldata
}


export const browserdata = async () => {
  let jsQuery = `SELECT (filter(count(newrelic.timeslice.value), WHERE metricTimesliceName = 'EndUser/errors') / filter(count(newrelic.timeslice.value), WHERE metricTimesliceName = 'Browser')) as 'JavaScript_error_rate' FROM Metric WHERE (entityGuid  IN ('MzkzNjM0OXxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzODQ3Njg3Mg')) since 1 hour ago`
  let jsData = await nrdbQuery(accountId, jsQuery)
  return jsData
}

export const broserdatas = async () => {
  let browserquery = `SELECT  average(duration) as 'page_load_time'  FROM PageView WHERE entityGuid IN ('MzkzNjM0OXxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzODQ3Njg3Mg') facet pageUrl since 1 hour ago`
  let browserdata = await nrdbQuery(accountId, browserquery)
  return browserdata
}

export const apigatewaydata = async (ap) => {
  let apiquery = `SELECT count('aws.apigateway.5XXError') AS  '5xx_error' ,count('aws.apigateway.4XXError') AS '4xx_error', average('aws.apigateway.Latency') * 10000 AS 'latency' FROM Metric  WHERE  aws.apigateway.ApiName = 'be-events' SINCE  1 hours ago`
  let apidata = await nrdbQuery(accountId, apiquery)
  return apidata
}

export const stepfunctiondata = async () => {
  let stepquery = `SELECT average(aws.states.ExecutionTime) as 'execution_time_ms',sum(aws.states.ExecutionThrottled) as 'execution_throttled',sum(aws.states.ExecutionsAborted) as 'execution_aborted',sum(aws.states.ExecutionsFailed) as 'execution_failed',sum(aws.states.ExecutionsTimedOut) as 'execution_timed_out' FROM Metric WHERE entity.guid IN ('MzkzNjM0OXxJTkZSQXxOQXw2NDc3MTM0MzQxNjA0NzM2MDM4') SINCE 1 hour ago`
  let stepdata = await nrdbQuery(accountId, stepquery)
  return stepdata
}

export const vpsgateway = async () => {

  let vapsquery = `SELECT sum(aws.natgateway.ActiveConnectionCount)/1000  AS 'active_connection', sum(aws.natgateway.ConnectionAttemptCount)/1000 AS 'connection_attempt',sum(aws.natgateway.ConnectionEstablishedCount)/1000 AS 'connection_established',sum(aws.natgateway.ErrorPortAllocation) AS 'error_Port_Allocation', sum(aws.natgateway.IdleTimeoutCount)/1000  AS 'idle_timeout'  FROM Metric WHERE aws.Namespace ='AWS/NATGateway' SINCE 1 hours ago`
  let vpsdata = await nrdbQuery(accountId, vapsquery)
  return vpsdata
}

export const cloudcache = async () => {
  let cloudcache = `FROM Log SELECT percentage(count(*), WHERE x_edge_result_type = 'Hit') AS 'Cache Hit Ratio' WHERE logtype LIKE 'cloudfront-%' AND message NOT LIKE '%#Fields%' AND message NOT LIKE '%#Version%' AND (x_edge_result_type = 'Hit' OR x_edge_result_type = 'Miss') COMPARE with 1 hour ago`
  let cloudcachedata = await nrdbQuery(accountId, cloudcache)
  return cloudcachedata
}

export const cloudfrontend = async () => {
  let cloudquery = `FROM Log SELECT percentage(count(*), WHERE x_edge_result_type = 'Hit' AND (x_edge_result_type = 'Hit' OR x_edge_result_type = 'Miss')) AS 'cache_Hit_Ratio' ,  percentage(count(*), WHERE numeric(sc_status) >= 200 and numeric(sc_status) < 400) AS 'Success_Rate' ,percentage(count(*), WHERE numeric(sc_status) >= 400 and numeric(sc_status) <= 599) AS 'Error_Rate',count(*) as 'Total_Requests' ,sum(numeric(sc_bytes)) as 'Content_Bytes', sum(numeric(cs_bytes)) AS 'Client_Bytes' WHERE logtype LIKE 'cloudfront-%' AND message NOT LIKE '%#Fields%' AND message NOT LIKE '%#Version%'  since 1 hour ago `
  let clouddata = await nrdbQuery(accountId, cloudquery)
  return clouddata
}

export const elbdata = async () => {
  let elbdataquery = `SELECT sum(aws.applicationelb.RequestCount.byAlb)/ 1000  as 'Requests_counts', sum(aws.applicationelb.HTTPCode_ELB_4XX_Count) + sum(aws.applicationelb.HTTPCode_ELB_5XX_Count)  as 'HTTP_errors', sum(aws.applicationelb.ActiveConnectionCount)/ 1000  as 'Active_connections', sum('aws.applicationelb.ClientTLSNegotiationErrorCount')/ 1000 AS  'ClientTLSNegotiationErrorCount' FROM Metric WHERE aws.Namespace = 'AWS/ApplicationELB' and entity.guid IN ('MzkzNjM0OXxJTkZSQXxOQXwtMzQ2NzQxMTUyNDQ1MDY2Nzg3OQ') FACET entity.name since 1 hour ago`
  let eldtotaldata = await nrdbQuery(accountId, elbdataquery)
  return eldtotaldata

}

export const lambdadatas = async (lambdaentityid) => {
  let lambdaquery = `From AwsLambdaInvocation SELECT count(*) as 'Total_invocation', filter(average(duration),where entity.guid IS NOT null) as 'average_duration',filter(count(http.statusCode),where http.statusCode!='200') as 'Invocation_failed' , filter(count(http.statusCode),where http.statusCode ='200') AS 'Invocation_success' where entity.guid IN ('${lambdaentityid}') `
  let lambdatotaldata = await nrdbQuery(accountId, lambdaquery)
  return lambdatotaldata
}

export const lambdathrottledata = async (lambdaentityid) => {
  let lambdaquery = `SELECT sum(\`provider.throttles.Sum\`) AS 'Throttles',sum(\`provider.deadLetterErrors.Sum\`) AS 'Dead_Letter_Errors' FROM  ServerlessSample where entity.guid IN ('${lambdaentityid}') AND provider = 'LambdaFunction' `
  let lambdatotaldata = await nrdbQuery(accountId, lambdaquery)
  return lambdatotaldata
}

export const lambdadedlettersdata = async (lambdaentityid) => {
  let lambdaquery = `SELECT  count(provider.deadLetterErrors.Minimum) AS  'dead_letters_errors' FROM  ServerlessSample WHERE entityGuid IN ('${lambdaentityid}')  AND provider = 'LambdaFunction' FACET entityName  SINCE 1 hour ago`
  let lambdatotaldata = await nrdbQuery(accountId, lambdaquery)
  return lambdatotaldata
}

export const traceIdData = async () => {
  let traceIDQuery = `SELECT uniqueCount(trace.id),latest(entityCount) > 1 from DistributedTraceSummary where root.entity.guid='MzI4ODkyNXxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzODQ2MTgyMA' where errorCount != 0 AND entityCount > 1 facet trace.id since 1 day ago`
  let traceIDDatas = await nrdbQuery(accountId, traceIDQuery)
  return traceIDDatas;
}

export const getelasticcachedata = async (elasticentity) => {
  let elasticquery = `SELECT average(provider.cpuUtilization.Average) AS 'CPU', average(provider.freeableMemory.Average) AS 'Free_Memory', average(provider.networkBytesIn.Average)/1000000 as 'network_packet_in', average(provider.networkBytesOut.Average)/1000000 as 'network_packet_out',  average(provider.cacheHits.Average) as 'cache_hits_count', average(\`provider.cacheMisses.Sum\`) as 'cache_misses_count' , sum(provider.replicationLag.Sum) as 'replicationlag', sum(provider.currConnections.Sum)  AS 'curr_connections', sum(provider.evictions.Sum) as 'evictions' FROM DatastoreSample WHERE provider='ElastiCacheRedisNode' AND entityGuid in ('${elasticentity}')`
  let elasticdata = await nrdbQuery(accountId, elasticquery)
  return elasticdata
}

export const gettraceiddata = async (browserEntity) => {
  let traceidquery = `SELECT  uniques(trace.id) from Span where entity.guid IN (${browserEntity})  and response.statusCode != 200 since 1 hour ago limit MAX`
  let tracedata = await nrdbQuery(accountId, traceidquery)
  return tracedata
}

export const gettabletracedata = async (traceIds) => {
  let tabledata = `From  Span SELECT  uniqueCount(error.group.message) where trace.id IN  (${traceIds})  since  1 hour ago facet timestamp,error.message,(duration.ms) as 'Duration',trace.id,request.domain,request.headers.host,error.group.message limit MAX`
  let apidata = await nrdbQuery(accountId, tabledata)
  return apidata
}

export const gettotalentitycount = async (traceIds) => {
  let totalentityquery = `SELECT  uniques(entity.name),uniques(parent.type) as 'parenttype' from Span where trace.id In ('${traceIds}') since 1 hour ago `
  let totalentitydata = await nrdbQuery(accountId, totalentityquery)
  return totalentitydata
}

export const getflowData = async (traceidS) => {
  let flowQuery = `From Span SELECT timestamp,entity.name as 'entity_name', request.headers.accept as 'parent_type',parent.transportType ,name,pageUrl,browserApp.name as 'browser_name',http.url as 'url',error.group.message as 'error_message',appName,error.statusCode as 'error code',response.statusCode as 'response_code',request.method as 'request_method',http.statusCode as 'http statuscode',http.method as 'request_method',http.statusText as 'http_statustext',error.class as 'error_class',error.message as 'error_message',parent.app as 'parent_app',browserInteraction.name as 'browserInteraction_name',transaction.name as 'transaction_name',request.uri as 'request_uri',request.url as 'request_url' , request.domain  where traceId IN ('${traceidS}')  limit MAX`
  let flowData = await nrdbQuery(accountId, flowQuery)
  return flowData
}

export const countData = async (traceidS) => {
  let countQuery = `SELECT latest(entity.name), latest(browserApp.name) ,count(entity.guid),count(transactionId), count(request.headers.accept)as 'calls_count' FROM Span  WHERE trace.id IN ('${traceidS}')  FACET  entity.guid,browserApp.name   `
  let countDatas = await nrdbQuery(accountId, countQuery)
  return countDatas
}


export const averageTime = async (traceidS) => {
  let averageQuery = `SELECT count(entity.guid),sum(duration),average(duration) , latest(entity.name) as 'entity_name' , latest(browserApp.name) as 'browser_name' FROM Span WHERE trace.id IN ('${traceidS}')  FACET entity.guid `
  let averageData = await nrdbQuery(accountId, averageQuery)
  return averageData
}
export const getFrontEndGraphData = async () => {
  let frontEndGraphQuery = `From NrAiIncident SELECT timestamp,conditionName,incidentLink,policyId ,policyName   where tags.policyId IN ('1105577' , '1105578') and event='open'   limit max since 12 hours ago`
  let frontEndGraphData = await nrdbQuery(accountId, frontEndGraphQuery)
  return frontEndGraphData
}

export const getBackEndGraphData = async () => {
  let backEndGraphQuery = `From NrAiIncident SELECT timestamp,conditionName,incidentLink,policyId,policyName   where tags.policyId IN ('1105575', '1105579' ,'1105580') and event='open'   limit max since 12 hours   ago`
  let backEndGraphData = await nrdbQuery(accountId, backEndGraphQuery)
  return backEndGraphData
}

export const getMiddlewareEndGraphData = async () => {
  let middlewareEndGraphQuery = `From NrAiIncident SELECT timestamp,conditionName,incidentLink,policyId,policyName   where tags.policyId IN ('1105568', '1105571', '1105576','1105573', '1105574' ,'1105581') and event='open'   limit max since 12 hours ago`
  let middlewareEndGraphData = await nrdbQuery(accountId, middlewareEndGraphQuery)
  return middlewareEndGraphData
}
export const getNetworkGraphData = async () => {
  let networkGraphGraphQuery = `From NrAiIncident SELECT timestamp,conditionName,incidentLink,policyId,policyName   where tags.policyId IN ('1105570' , '1105569') and event='open'   limit max since 12 hours ago`
  let networkGraphGraphData = await nrdbQuery(accountId, networkGraphGraphQuery)
  return networkGraphGraphData
}


// // ========= for hover,errorInbox ======================================

export const apigatewayHovers = async (guid) => {
  let apiHover = `SELECT sum(\`provider.4xxError.Sum\`) as '4XXError',sum(\`provider.5xxError.Sum\`) as '5XXError',average(\`provider.latency.Average\`)/1000 as 'Latency(s)' FROM ApiGatewaySample WHERE provider = 'ApiGatewayApi' AND entityGuid IN (${guid}) FACET entityName`;
  let apidataquery = await nrdbQuery(accountId, apiHover)
  return apidataquery
}

export const cloudfrontHover = async () => {
  let cloudeHover = `SELECT latest(timestamp), count(sc_status) AS 'error' from Log where logtype ='cloudfront-rtl'  and sc_status  NOT LIKE '%2%'AND sc_status NOT LIKE '%3%' facet cs_protocol as 'Type' ,sc_status AS 'HTTP_Status',cs_uri_stem as 'request_uri' , cs_host as 'Host' ,x_edge_detailed_result_type as'Error_type' since 1 hour ago`
  let cloudQueryData = await nrdbQuery(accountId, cloudeHover)
  return cloudQueryData
}

export const broserHoverData = async (guid) => {
  let broserhoverdata = `SELECT  count(errorMessage) AS 'error' from JavaScriptError WHERE  entityGuid IN (${guid}) facet pageUrl,errorMessage  since 1 hour ago limit MAX `
  let broserQueryData = await nrdbQuery(accountId, broserhoverdata)
  return broserQueryData
}

export const broserHoverData2 = async(guid)=>{
  let broserhoverdata =  `SELECT count(httpResponseCode),latest(timestamp ) from AjaxRequest where entityGuid IN (${guid}) and httpResponseCode In (400,403,404,502,503,500) facet httpResponseCode,pageUrl SINCE 1 hour ago `
  let broserQueryData = await nrdbQuery(accountId,broserhoverdata)
  return broserQueryData
}

export const sesData = async (guid) => {
  let stepHover = `SELECT sum(\`aws.ses.Reputation.BounceRate\`) AS 'Bounce_Rate',sum(\`aws.ses.Reputation.ComplaintRate\`)AS 'Complaint_rate',sum(\`aws.ses.Delivery\`)AS 'Delivery',sum(\`aws.ses.Send\`)AS 'Send' FROM Metric WHERE aws.Namespace ='AWS/SES' AND entity.guid IN('${guid}') `
  let stepFunctionQueryData = await nrdbQuery(accountId, stepHover)
  return stepFunctionQueryData
}

export const rdsData = async(guid)=>{
  let stepHover = `SELECT sum(\`provider.deadlocks.Sum\`) as 'Deadlocks', sum(\`provider.blockedTransactions.Sum\`) as 'blockedTransactions' FROM DatastoreSample WHERE provider='RdsDbInstance' AND entityGuid in(${guid}) `
  let stepFunctionQueryData = await nrdbQuery(accountId, stepHover)
  return stepFunctionQueryData
}

export const redis_CacheData = async () => {
  let cacheHover = `SELECT  sum(aws.elasticache.Evictions) AS 'eviction',sum(aws.elasticache.AuthenticationFailures) AS 'authentication_failures'from Metric where aws.Namespace='AWS/ElastiCache' and aws.elasticache.CacheClusterId IN ('be2-cluster-0001-001') facet aws.elasticache.CacheClusterId since 1 hour ago`
  let cacheQueryData = await nrdbQuery(accountId, cacheHover)
  return cacheQueryData
}

export const elasticsearchErrorHover = async (elasticId) => {
  let searchHover = `SELECT sum(\`provider.3xx.Sum\`) AS '3xxErrors', sum(\`provider.4xx.Sum\`) AS '4xxErrors', sum(\`provider.5xx.Sum\`) AS '5xxErrors' FROM DatastoreSample WHERE provider='ElasticsearchCluster' AND entityGuid IN (${elasticId}) FACET entityName  `
  let searchQueryData = await nrdbQuery(accountId, searchHover)
  return searchQueryData
}

export const sqsMessageDelayed = async (guid) => {
  let searchHover = `SELECT average(\`provider.approximateNumberOfMessagesDelayed.Average\`) as 'Number Of Messages Delayed' FROM QueueSample WHERE provider='SqsQueue' AND \`entityGuid\` in (${guid}) `
  let searchQueryData = await nrdbQuery(accountId, searchHover)
  return searchQueryData
}

export const snsFailed = async (guid) => {
  let searchHover = `SELECT sum(\`provider.numberOfNotificationsFailed.Average\`) as 'Number Of Notifications Failed' FROM QueueSample WHERE provider='SnsTopic' AND \`entityGuid\` in (${guid}) `
  let searchQueryData = await nrdbQuery(accountId, searchHover)
  return searchQueryData
}

export const lambdaHoverData = async (lambdaentityid) => {
  let lambdaData = `SELECT count(*) AS 'error_count' FROM AwsLambdaInvocationError WHERE entityGuid IN (${lambdaentityid})  facet aws.lambda.functionName AS 'lambda_function_Name' , error.message  `
  let lambdaQueryData = await nrdbQuery(accountId, lambdaData)
  return lambdaQueryData
}

export const albp1HoverData = async (guid) => {
  let albData = `FROM Metric SELECT sum(aws.applicationelb.HTTPCode_ELB_4XX_Count) AS '4xx_errors',sum(aws.applicationelb.HTTPCode_ELB_5XX_Count)  as '5xx_errors',count('aws.applicationelb.ClientTLSNegotiationErrorCount')  as 'clientTLS_negotiation_error', sum(\`aws.applicationelb.ELBAuthError\`) AS 'ELB_auth_error' , sum(\`aws.applicationelb.ELBAuthFailure\`) as 'auth_failures' WHERE aws.Namespace = 'AWS/ApplicationELB' AND  entity.guid IN ( ${guid})AND aws.applicationelb.AvailabilityZone IS NOT NULL FACET entity.name`
  let albQueryData = await nrdbQuery(accountId, albData)
  return albQueryData
}

export const ecsErrorData = async () => {
  let errorDataEcs = `FROM ContainerSample SELECT uniqueCount(ecsTaskArn) AS 'task_count' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:249383183839:cluster/development-2','arn:aws:ecs:eu-west-1:249383183839:cluster/uat-2') AND status LIKE '%Exited (1)%'`;
  let ecsErrorQuery = await nrdbQuery(accountId, errorDataEcs)
  return ecsErrorQuery
}

export const ecsHoverData = async () => {
  let ecsData = `FROM ContainerSample SELECT uniqueCount(ecsTaskArn) AS  'Exited(1)Error' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:423107795665:cluster/production') AND status NOT LIKE '%Exited (0)%' AND status NOT LIKE '%up%' facet status,ecsTaskArn AS 'Tasks',ecsTaskDefinitionFamily  `
  let ecsHoverQuery = await nrdbQuery(accountId, ecsData)
  return ecsHoverQuery
}

export const apmErrorHoverData = async (guid) => {
  let apmerror = `From TransactionError SELECT  count(error.class) as 'count' where entity.guid In (${guid})facet appName ,error.class ,request.headers.host,error.message,http.statusCode`
  let apmquery = await nrdbQuery(accountId, apmerror)
  return apmquery
}

export const getnatErrorHover = async () => {
  let natgatewayErrorHover = `SELECT sum(aws.natgateway.ErrorPortAllocation) AS 'error_Port_count' FROM Metric WHERE aws.Namespace = 'AWS/NATGateway' FACET aws.natgateway.NatGatewayId`
  let errorHover = await nrdbQuery(accountId, natgatewayErrorHover)
  return errorHover
}

//========== for hover,sli/slo ============================================

export const sliBroserData = async(guid)=>{
  let sliData = `From  ServiceLevelSnapshot SELECT  latest(sliCompliance) WHERE entity.guid IN (${guid}) and remainingErrorBudget = 0 and entity.name like '%browser%' facet entity.name,entity.guid  limit max`
  let sliQueryData = await nrdbQuery(accountId,sliData)
  return sliQueryData
}

export const sliApiGatewayData = async (guid) => {
  let sliData = `From  ServiceLevelSnapshot SELECT  latest(sliCompliance) WHERE entity.guid IN (${guid}) and remainingErrorBudget = 0 and entity.name like '%API Gateway%' facet entity.name,entity.guid  limit max`
  let sliQueryData = await nrdbQuery(accountId, sliData)
  return sliQueryData
}

export const lambdaSliData = async (guid) => {
  let lambdaData = `From  ServiceLevelSnapshot SELECT  latest(sliCompliance) WHERE entity.guid IN (${guid}) and remainingErrorBudget = 0 and entity.name like '%lambda%' facet entity.name,entity.guid limit max  `
  let lambdaQueryData = await nrdbQuery(accountId, lambdaData)
  return lambdaQueryData
}

export const sliEcsServices = async (guid) => {
  let sliEcsData = `From  ServiceLevelSnapshot SELECT  latest(sliCompliance) WHERE entity.guid IN (${guid}) and remainingErrorBudget = 0 and entity.name like '%ecs%' facet entity.name,entity.guid limit max  `
  let sliEcsQueryData = await nrdbQuery(accountId, sliEcsData)
  return sliEcsQueryData
}

export const sliApmServices = async (guid) => {
  let sliApmData = `From  ServiceLevelSnapshot SELECT  latest(sliCompliance) WHERE entity.guid IN (${guid}) and remainingErrorBudget = 0 and entity.name like '%apm%' facet entity.name,entity.guid limit max  `
  let sliApmQueryData = await nrdbQuery(accountId, sliApmData)
  return sliApmQueryData
}

export const ElasticSliData = async (guid) => {
  let sliApmData = `From  ServiceLevelSnapshot SELECT  latest(sliCompliance) WHERE entity.guid IN(${guid}) and remainingErrorBudget = 0 and entity.name like '%Elastic Cache%' facet entity.name,entity.guid  limit max  `
  let sliApmQueryData = await nrdbQuery(accountId, sliApmData)
  return sliApmQueryData
}

//=================DISRUPTIONS=================================================

export const allDisruption = async () => {
  let disruption = `SELECT latest(timestamp),count(conditionName) FROM NrAiIncident WHERE policyId IN (1105577 , 1105578,1105568,1105571 , 1105576, 1105573, 1105574,1105581 , 1105575,1105579 , 1105580 ,1105570 , 1105569) AND event = 'open' FACET policyId,policyName,conditionName `;
  let disruptionQueries = await nrdbQuery(accountId, disruption)
  return disruptionQueries
}

//===================================================================================
export const awsecedata = async () => {
  let awssesresult = `SELECT average(aws.ecs.CPUUtilization.byCluster) as 'cpu_utilization',average(aws.ecs.MemoryUtilization.byCluster) as 'memory_utilization',average(aws.ecs.containerinsights.NetworkRxBytes) as'network_recieve',average(aws.ecs.containerinsights.NetworkTxBytes) as 'networktransmit' FROM Metric WHERE entity.guid IN ('Mzk2MTMzM3xJTkZSQXxOQXwtNjIzMjk4NjUwODYwNjY2MDExMA')`
  let ecsresult = await nrdbQuery(accountId, awssesresult)
  return ecsresult
}

export const awsecedata2 = async () => {
  // let awssesresult2 =  `FROM ContainerSample SELECT filter(uniqueCount(label.com.amazonaws.ecs.task-arn), WHERE state != 'exited') AS 'Running', filter(uniqueCount(label.com.amazonaws.ecs.task-arn), WHERE state = 'exited') AS 'Exited' WHERE ecsClusterArn = 'arn:aws:ecs:eu-west-1:249383183839:cluster/uat-2'`
  let awssesresult2 = `FROM ContainerSample SELECT uniqueCount(\`label.com.amazonaws.ecs.task-arn\`) - filter(uniqueCount(\`label.com.amazonaws.ecs.task-arn\`), WHERE state = 'exited') AS 'Running', filter(uniqueCount(\`label.com.amazonaws.ecs.task-arn\`), WHERE state = 'exited') AS 'Exited' WHERE ecsClusterArn = 'arn:aws:ecs:eu-west-1:423107795665:cluster/production'`

  let ecsresult2 = await nrdbQuery(accountId, awssesresult2)
  return ecsresult2
}

export const awsecedata3 = async () => {
  let awssesresult3 = `FROM ContainerSample SELECT uniqueCount(reportingAgent) as 'Agents Reporting' WHERE ecsClusterArn = 'arn:aws:ecs:eu-west-1:249383183839:cluster/uat-2'`
  let ecsresult3 = await nrdbQuery(accountId, awssesresult3)
  return ecsresult3
}

export const cloudsearch = async () => {
  // let cloudsearchquery=`SELECT sum(aws.cloudsearch.SuccessfulRequests) as 'Successful_Request',sum(aws.cloudsearch.SearchableDocuments) as 'Searchable_Documents',sum(aws.cloudsearch.Partitions) as 'Cloudsearch_Partitions' ,sum(aws.cloudsearch.IndexUtilization) as 'Cloudsearch_Index' FROM Metric WHERE aws.Namespace ='AWS/CloudSearch' AND aws.cloudsearch.DomainName IN ('be2-search','fe2-search')`
  let cloudsearchquery = `SELECT sum(aws.cloudsearch.SuccessfulRequests) as 'Successful_Request',sum(aws.cloudsearch.SearchableDocuments) as 'Searchable_Documents',sum(aws.cloudsearch.Partitions) as 'Cloudsearch_Partitions' ,sum(aws.cloudsearch.IndexUtilization) as 'Cloudsearch_Index' FROM Metric WHERE aws.Namespace ='AWS/CloudSearch' AND aws.cloudsearch.DomainName IN ('green-search')`


  let cloudsearchresult = await nrdbQuery(accountId, cloudsearchquery)
  return cloudsearchresult
}

export const browserfid = async () => {
  let browserfidquery = `FROM PageViewTiming SELECT filter(count(*),WHERE firstInputDelay > 300) as 'FID',filter(count(*),WHERE cumulativeLayoutShift > 0.25) as 'CLS',filter(count(*),WHERE largestContentfulPaint > 2.5) AS 'LCP' where appName like'%partnering%' FACET appName since 1 hour ago `
  let browserfidresult = await nrdbQuery(accountId, browserfidquery)
  return browserfidresult
}

export const ecsMicro = async () => {
  let throughputquerys = `SELECT rate(count(*),1 minute) AS 'throughput(rpm)' FROM Transaction WHERE appName = 'Scheduler [BE2]' or entity.guid = 'MzkzNjM0OXxBUE18QVBQTElDQVRJT058NTE3MzIwMDM1' AND transactionType = 'Web'`
  let throughputresults = await nrdbQuery(accountId, throughputquerys)
  return throughputresults
}


export const ecstrans = async () => {
  let transcationsquery = `SELECT average(duration)*1000 as 'average_duration(ms)' FROM Transaction WHERE appName = 'Scheduler [BE2]' or entity.guid = 'MzkzNjM0OXxBUE18QVBQTElDQVRJT058NTE3MzIwMDM1'`
  let transcationresult = await nrdbQuery(accountId, transcationsquery)
  return transcationresult
}

export const ecstapdex = async (apmIdEntity) => {
  let apdexquery = `SELECT count(*) AS 'Throughput',average(duration) as 'Average_duration',apdex(duration,t:0.5) as 'Apdex_score' FROM Transaction WHERE appName = 'Scheduler [PROD]' or entity.guid IN ('${apmIdEntity}') AND transactionType = 'Web'`
  let apdexresult = await nrdbQuery(accountId, apdexquery)
  return apdexresult
}

export const ecsterror = async () => {
  let ecsquery = `SELECT count(apm.service.error.count) / count(apm.service.transaction.duration) as 'error_rate' FROM Metric WHERE (entity.guid = 'Mzk2MTMzM3xBUE18QVBQTElDQVRJT058NTEwMjAwNDE5') AND (transactionType = 'Web')`
  let ecserror = await nrdbQuery(accountId, ecsquery)
  return ecserror
}


export const getnatgatewaydata = async () => {
  let natwayquery = `SELECT sum(aws.natgateway.ActiveConnectionCount)  AS 'active_connection', sum(aws.natgateway.ConnectionAttemptCount) AS 'connection_attempt',sum(aws.natgateway.ConnectionEstablishedCount) AS 'connection_established',sum(aws.natgateway.ErrorPortAllocation) AS 'error_Port_Allocation', sum(aws.natgateway.IdleTimeoutCount)  AS 'idle_timeout'  FROM Metric WHERE aws.Namespace ='AWS/NATGateway'  `
  let natwaydata = await nrdbQuery(accountId, natwayquery)
  return natwaydata
}

export const Awsecs = async () => {
  let ecsquery = `SELECT average(aws.ecs.CPUUtilization.byCluster) as 'cpu_utilization',average(aws.ecs.MemoryUtilization.byCluster) as 'memory_utilization',average(aws.ecs.containerinsights.NetworkRxBytes) as'network_recieve',average(aws.ecs.containerinsights.NetworkTxBytes) as 'networktransmit' FROM Metric WHERE entity.guid IN ('MzkzNjM0OXxJTkZSQXxOQXwtNTcxNDg0MTc1NzM2MjY5MDUzNw')  `
  let ecsdata = await nrdbQuery(accountId, ecsquery)
  return ecsdata
}

export const getawsalbdata = async (awsalbentity) => {
  let ecsquery = `SELECT sum(\`aws.applicationelb.RequestCount.byAlb\`) as 'Total_Requests',sum(\`aws.applicationelb.HTTPCode_ELB_5XX_Count\`) + sum(\`aws.applicationelb.HTTPCode_ELB_4XX_Count\`) as 'Http_errors',sum(\`aws.applicationelb.ActiveConnectionCount\`) as 'Active_connections',sum(\`aws.applicationelb.ELBAuthError\`) + sum(\`aws.applicationelb.ELBAuthFailure\`) as 'Authorization_errors',sum(aws.applicationelb.ClientTLSNegotiationErrorCount) as 'TLS_Negotiation_error' FROM Metric WHERE entity.guid IN ('${awsalbentity}') AND aws.applicationelb.AvailabilityZone IS NOT NULL SINCE 1 hour ago`
  let ecsdata = await nrdbQuery(accountId, ecsquery)
  return ecsdata
}

export const getapigatewaydata = async (apientitydata) => {
  let apiquery = `SELECT count('aws.apigateway.5XXError') AS  'xx5_error' ,count('aws.apigateway.4XXError') AS 'xx4_error', sum('aws.apigateway.Latency') AS 'latency' FROM Metric WHERE entity.guid IN ('${apientitydata}') SINCE 1 hour ago`
  let apidata = await nrdbQuery(accountId, apiquery)
  return apidata
}

export const getbrowserjsdata = async (browserentity) => {
  let jsquery = `SELECT count(errorMessage) as 'error_message' FROM JavaScriptError WHERE (entityGuid  IN ('${browserentity}'))`
  let jsdata = await nrdbQuery(accountId, jsquery)
  return jsdata
}

export const getbrowserlcpdata = async (browserentity) => {
  let jsquery = `SELECT average(largestContentfulPaint) as 'LCP', average(firstInputDelay) AS 'FID', average(cumulativeLayoutShift) AS 'CLS' FROM PageViewTiming WHERE entityGuid IN ('${browserentity}')`
  let jsdata = await nrdbQuery(accountId, jsquery)
  return jsdata
}

export const getEntityCount = async (traceId) => {
  let jsquery = `SELECT  uniques(entity.name) from Span where trace.id In ('${traceId}')  since 1 day ago`
  let jsdata = await nrdbQuery(accountId, jsquery)
  return jsdata
}


export const getcloudfrontdetails = async (cloudfrontentity) => {
  let jsquery = `SELECT sum(\`aws.cloudfront.Requests\`) as 'Requests',average(\`aws.cloudfront.4xxErrorRate\`) + average(\`aws.cloudfront.5xxErrorRate\`) as 'Error_rate',sum(\`aws.cloudfront.BytesDownloaded\`) as 'Client_received_bytes', sum(\`aws.cloudfront.BytesUploaded\`) as 'Client_sent_bytes' FROM Metric WHERE entity.guid IN ('${cloudfrontentity}')  `
  let jsdata = await nrdbQuery(accountId, jsquery)
  return jsdata
}

export const getrdsclusterdata = async (rdsentityid) => {
  let rdsquery = `SELECT average(aws.rds.NetworkReceiveThroughput) as 'Receive', average(aws.rds.NetworkTransmitThroughput) as 'Transmit',average(aws.rds.CPUUtilization) As 'cpu_utilization', average(aws.rds.DatabaseConnections) AS  'db_connection', average(aws.rds.ReadLatency) * 1000 AS  'read_latency' , average(aws.rds.WriteLatency) * 1000 As 'write_latency', average(aws.rds.WriteThroughput) AS 'write_throughput', average(aws.rds.ReadThroughput) AS 'read_throughput', min(aws.rds.FreeStorageSpace) AS 'free_storage'FROM  Metric Where entity.guid IN ('${rdsentityid}') `
  let rdsdata = await nrdbQuery(accountId, rdsquery)
  return rdsdata
}

// export const getawssesdata = async (awssesentity) => {
//   let awssesquery = `SELECT sum(\`aws.ses.Reputation.BounceRate\`) AS 'Bounce_Rate',sum(\`aws.ses.Reputation.ComplaintRate\`)AS 'Complaint_rate',sum(\`aws.ses.Delivery\`) AS 'Delivery',sum(\`aws.ses.Send\`) AS 'Send' FROM Metric WHERE aws.Namespace ='AWS/SES' AND entity.guid ('${awssesentity}') `
//   let awssesdata = await nrdbQuery(accountId, awssesquery)
//   return awssesdata
// }
export const getawssesdata = async (awssesentity) => {
  let awssesquery = `SELECT sum(\`aws.ses.Reputation.BounceRate\`) AS 'Bounce_Rate',sum(\`aws.ses.Reputation.ComplaintRate\`)AS 'Complaint_rate',sum(\`aws.ses.Delivery\`) AS 'Delivery',sum(\`aws.ses.Send\`) AS 'Send' FROM Metric WHERE aws.Namespace ='AWS/SES' AND entity.guid ('${awssesentity}')  `
  let awssesdata = await nrdbQuery(accountId, awssesquery)
  return awssesdata
}


//browser Query
export const getErrorInoxBrowser = async (browserIds) => {
  let domainQuery = `FROM  JavaScriptError SELECT  count(errorClass) as 'errorCount' ,latest(timestamp) where entityGuid In (${browserIds}) facet errorClass,errorMessage,domain ,requestUri SINCE 1 hour ago`;
  let domainData = await nrdbQuery(accountId, domainQuery);
  return domainData;
};
export const getDisruption = async (browserIds) => {
  let domainQuery = `SELECT latest(timestamp) as 'timestamp',count(conditionId) as 'count' from NrAiIncident where entity.guid IN (${browserIds}) facet conditionName,tags.policyId ,policyName`;
  let domainData = await nrdbQuery(accountId, domainQuery);
  return domainData;
};

export const getLCPData = async (guid) => {
  // let averageQuery = `FROM PageViewTiming  SELECT percentile(largestContentfulPaint, 75) as 'lcp%' , latest(largestContentfulPaint) as 'lcp', filter(count(largestContentfulPaint ),WHERE largestContentfulPaint <= 2.5)/ filter(count(*),WHERE largestContentfulPaint IS NOT NULL)*100 AS 'good', filter(count(largestContentfulPaint ),WHERE largestContentfulPaint > 2.5 and largestContentfulPaint <= 4)/ filter(count(*),WHERE largestContentfulPaint IS NOT NULL)*100 AS 'NEEDS IMPROVEMENT', filter(count(largestContentfulPaint ),WHERE largestContentfulPaint > 4)/ filter(count(*),WHERE largestContentfulPaint IS NOT NULL)*100 AS 'Poor' where entityGuid IN(${guid}) and domain = '${domainName}' SINCE 1 hour ago`;
  let averageQuery = `FROM PageViewTiming  SELECT percentile(largestContentfulPaint, 75),  percentage(count(largestContentfulPaint), WHERE largestContentfulPaint <= 2.5) AS 'Good', percentage(count(largestContentfulPaint), WHERE largestContentfulPaint >= 2.5 and largestContentfulPaint <= 4) AS 'NEEDS IMPROVEMENT', percentage(count(largestContentfulPaint), WHERE largestContentfulPaint > 4) AS 'Poor' where entityGuid in(${guid})`;
  let averageData = await nrdbQuery(accountId, averageQuery);
  return averageData;
};

export const getCLSData = async (guid) => {
  let averageQuery = `FROM PageViewTiming  SELECT percentile(cumulativeLayoutShift, 75) AS 'cls',  percentage(count(cumulativeLayoutShift), WHERE cumulativeLayoutShift <= 0.1) AS 'good', percentage(count(cumulativeLayoutShift), WHERE cumulativeLayoutShift >= 0.1 and cumulativeLayoutShift <= 0.25) AS 'NEEDS IMPROVEMENT', percentage(count(cumulativeLayoutShift), WHERE cumulativeLayoutShift > 0.25) AS 'Poor' where entityGuid in(${guid})`;
  let averageData = await nrdbQuery(accountId, averageQuery);
  return averageData;
};

export const getFIDData = async (guid) => {
  let averageQuery = `FROM PageViewTiming  SELECT percentile(firstInputDelay, 75) AS 'cls',  percentage(count(firstInputDelay), WHERE firstInputDelay <= 100) AS 'good', percentage(count(firstInputDelay), WHERE firstInputDelay >= 100 and firstInputDelay <= 300) AS 'NEEDS IMPROVEMENT', percentage(count(firstInputDelay), WHERE firstInputDelay > 300) AS 'Poor' where entityGuid in(${guid})`;
  let averageData = await nrdbQuery(accountId, averageQuery);
  return averageData;
};


export const getErroRate = async (guid) => {
  // let awsalbquery = `From JavaScriptError,PageView SELECT  filter(uniqueCount(session),WHERE  errorClass IS NOT NULL )*100/filter(count(session),where entityGuid IN ( 'MzkzNjM0OHxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzODQ4MDY3Ng','MzkzNjM0OHxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzODQ4MDY4Mg')) as 'errorRate'  where domain = '${domainName}' AND entityGuid in ( 'MzkzNjM0OHxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzODQ4MDY3Ng', 'MzkzNjM0OHxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzODQ4MDY4Mg') FACET domain, appName`
  let awsalbquery = `From JavaScriptError,PageView SELECT  filter(uniqueCount(session),WHERE  errorClass IS NOT NULL )*100/filter(count(session),where entityGuid IN (${guid})) as 'errorRate'  FACET domain, appName`;
  let awsdata = await nrdbQuery(accountId, awsalbquery);
  return awsdata;
};
export const getGeographyData = async (guid) => {
  let awsalbquery = `From PageView SELECT count(*) where entityGuid IN (${guid}) FACET  countryCode since 1 hour ago`;
  let awsdata = await nrdbQuery(accountId, awsalbquery);
  return awsdata;
};
export const getsliBrowserData = async (guid) => {
  let awsalbquery = `From  ServiceLevelSnapshot SELECT  latest(sliCompliance) WHERE entity.guid IN (${guid}) and remainingErrorBudget = 0 facet entity.name,entity.guid  limit max SINCE 1 hour ago`;
  let awsdata = await nrdbQuery(accountId, awsalbquery);
  return awsdata;
};

export const getUserTime = async () => {
  // let apigatew2ayquery = `SELECT percentile(pageHide, 75)/60  as 'PageHide', percentile(windowUnload, 75)/60 as 'windowUnload' FROM PageViewTiming WHERE entityGuid in (${guid}) and domain = '${domainName}'   FACET appName`;
  let apigatew2ayquery = `From PageView SELECT average(duration)  as 'avgDuration' ,latest(timestamp),latest(pageUrl) WHERE  session is NOT NULL and duration >1.5 facet pageUrl`;
  let apidata = await nrdbQuery(accountId, apigatew2ayquery);
  return apidata;
};
export const browserErrorData = async (guid) => {
  let errorData = `SELECT  count(httpResponseCode),latest(timestamp ) from AjaxRequest where entityGuid IN (${guid}) and httpResponseCode In (400,403,404,502,503,500) and hostname  NOt Like '%iris%' facet hostname,httpResponseCode,pageUrl SINCE 1 hour ago LIMIT 5`;
  let errorQuery = await nrdbQuery(accountId, errorData);
  return errorQuery;
};

export const getelasticsearchdataa = async (elasticsearchentity) => {
  let errorData = `SELECT max(\`provider.ClusterUsedSpace.Maximum\`) as 'Cluster_Used_Space', average(\`provider.ReadIOPS.Average\`) as 'Read_Iops', average(\`provider.WriteIOPS.Average\`) as 'Write_Iops', average(\`provider.CPUUtilization\`) AS 'CPU_Utilization', average(\`provider.ReadLatency.Average\`)*1000 AS 'Average_Read_Latency', average(\`provider.WriteLatency.Average\`)*1000 AS 'Write_Latency', average(\`provider.WriteThroughput.Average\`) AS 'Write_Throughput', average(\`provider.ReadThroughput.Average\`) AS 'Read_Throughput', count(provider.db0AverageTtl.Average) AS 'DB_Connections' FROM DatastoreSample WHERE provider='ElasticsearchCluster' AND entityGuid IN ('${elasticsearchentity}')`;
  let errorQuery = await nrdbQuery(accountId, errorData);
  return errorQuery;
};

export const gettotalcounterror = async (apientitydata) => {
  let errorData = `SELECT sum(\`aws.apigateway.4XXError.byApi\`) as 'x4_errors', sum(\`aws.apigateway.5XXError.byApi\`) as 'x5_errors', average(\`aws.apigateway.Latency.byApi\`)/1000 as 'Latency',sum(\`aws.apigateway.Count.byApi\`) as 'Total_Requests' FROM Metric  WHERE  entity.guid IN ('${apientitydata}')`
  let errorQuery = await nrdbQuery(accountId, errorData);
  return errorQuery;
};

export const getvpnnatdata = async () => {
  let vpcquery = `SELECT uniqueCount(aws.natgateway.NatGatewayId) AS 'Nat_Count', sum(aws.natgateway.ActiveConnectionCount)  AS 'active_connection', sum(aws.natgateway.ConnectionAttemptCount) AS 'connection_attempt',sum(aws.natgateway.ConnectionEstablishedCount) AS 'connection_established',sum(aws.natgateway.ErrorPortAllocation) AS 'error_Port_Allocation', sum(aws.natgateway.IdleTimeoutCount)  AS 'idle_timeout'  FROM Metric WHERE aws.Namespace ='AWS/NATGateway'`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}

export const getnatcounthover = async () => {
  let vpcquery = `SELECT uniqueCount(aws.natgateway.NatGatewayId) AS 'Nat_Count' FROM Metric WHERE aws.Namespace ='AWS/NATGateway' FACET aws.natgateway.NatGatewayId`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}

export const getecshightestcpu = async () => {
  let vpcquery = `FROM ContainerSample SELECT max(cpuUsedCoresPercent) as 'cpuused' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:423107795665:cluster/production') FACET containerId LIMIT 1`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}

export const getheighestmemoryusage = async () => {
  let vpcquery = `FROM ContainerSample SELECT max(memoryUsageBytes) as 'usage' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:423107795665:cluster/production') FACET containerId LIMIT 1`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}

export const gettransmitteddata = async () => {
  let vpcquery = `FROM ContainerSample SELECT average(networkTxBytesPerSecond) as 'transmitted' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:423107795665:cluster/production') FACET containerId LIMIT 1`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}

export const getreceiveddata = async () => {
  let vpcquery = `FROM ContainerSample SELECT average(networkRxBytesPerSecond) as 'received' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:423107795665:cluster/production') FACET containerId LIMIT 1`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}


export const getrunningstatusdata = async () => {
  let vpcquery = `FROM ContainerSample SELECT uniqueCount(\`label.com.amazonaws.ecs.task-arn\`) - filter(uniqueCount(\`label.com.amazonaws.ecs.task-arn\`), WHERE state = 'exited') AS 'Task_Running', filter(uniqueCount(\`label.com.amazonaws.ecs.task-arn\`), WHERE state = 'exited') AS 'Task_Exited' WHERE ecsClusterArn = 'arn:aws:ecs:eu-west-1:423107795665:cluster/production' FACET ecsClusterName`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}


export const gettotalrunningdata = async () => {
  let vpcquery = `FROM ContainerSample SELECT count(status) as 'running_container' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:423107795665:cluster/production') AND state = 'exited'`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}

export const getrunningtotalstopped = async () => {
  let vpcquery = `FROM ContainerSample SELECT uniqueCount(status) as 'Stopped_Containers' WHERE ecsClusterArn IN ('arn:aws:ecs:eu-west-1:423107795665:cluster/production') AND state = 'running'`
  let vpcdatas = await nrdbQuery(accountId, vpcquery);
  return vpcdatas;
}