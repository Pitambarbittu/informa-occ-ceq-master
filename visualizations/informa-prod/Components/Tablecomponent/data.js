// export const data = {
//   type: "node",
//   name: "Broe" ,
//   value: 0,
//   children: [
//     {
//       type: "node",
//       name: "webportal",
//       value: 0,
//       children:[
//         {type:"leaf" , name:"Promo" , value:10},
          // { type:"node" , name: "Lambda" , value:10}

import { count } from "d3";

//       ],

//     }
//   ]
// };




export const flowData = (data , countData , avaerageduration) => {
  let countDatas = countData.filter(val=>val && val.calls_count !== 0) 
  let averageDatas= avaerageduration.filter(val=>val&&val["sum.duration"] !==0)

  function createObject2(arr, parent_type = null) {
   
    
    if (arr.length == 0 ) return undefined;
  
    let next_parent_type = "";
    let remaining = [...arr];
    
    
    let items = arr.filter((e) => e["parent_type"] === parent_type);
  
    switch (parent_type) {
      case null:
        const item = items[0];
        next_parent_type = item.browser_name ? "*/*" : "application/json";
        const index = remaining.findIndex((e) => e === item);
        remaining.splice(index, 1);
        items = [item];
        break;
      case "*/*":
        next_parent_type = "application/json";
        break;
      default:
    }
  
    remaining = remaining.filter(
      (e) => e["parent_type"] && (e["parent_type"] !== parent_type) 
    );
       
    return items.map((item) => {

      let children = createObject2(remaining, next_parent_type);
      let counts = countDatas.filter(val=>val["latest.entity.name"] === item.entity_name)
      let duration= averageDatas.filter(val=>val.entity_name === item.entity_name)

      return {
        // type: children ? "node" : "leaf",
        type:"node",
        name: item.entity_name,  
        key: item.browser_name,
        error: item.error_code?item.error_code:item.http_statuscode !== "200"?item["http statuscode"]:null,
        pageUrl:item.pageUrl,
        request_url:item.request_url,
        request_uri:item.request_uri,
        request_domain:item["request.domain"],
        entityType:item.browser_name ? "*/*":(item["parent_type"]==="*/*") ? "application/json" :null,
        count : counts.length?counts[0].calls_count:null,
        durations:duration.length ?duration[0]["sum.duration"]:null,

        // errorMessage :item.
        children
      };
    });
  }


function createObject(arr) {
  if (arr.length === 0) {
    // recursion break condition
    return undefined;
  }
  let index = 0;
  let remaining = [];
  // find if browser web portal exists
  const ifExists = arr.findIndex((e) => e.browser_name !== null);
  if (ifExists >= 0) {
    index = ifExists;
  }
  const item = arr[index];
  if (item.browser_name !== null) {
    // just remove browser web portal from array
    arr.splice(index, 1);
    remaining = arr;
  } else {
    // remove all of same type
    remaining = arr.filter((e) => e.entity_name !== item.entity_name );
  }
  // recursion
  const children = createObject(remaining);

  // if(item["parent.type"].length){

  // }

  return [{
    type: "node",
    name: item.entity_name,
    value: ++index*10,
    key: item.browser_name,
    error:item.error_message,
    children,
  }];
}

const sorted = data.sort(
  (a, b) => a["timestamp"] - b["timestamp"]
);

let filter = [];

const unique2 = sorted.filter((obj, index) => {
  return index === sorted.findIndex(o => obj.entity_name === o.entity_name && obj["parent_type"] === o["parent_type"]);
});
const finalObj = createObject2(unique2)

// return finalObj
return finalObj[0];
}