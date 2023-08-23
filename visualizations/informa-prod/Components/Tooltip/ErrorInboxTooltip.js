import React from 'react'

const ErrorInboxTooltip = ({ data }) => {


  return (
    <div className='errorbox' >
      <p className='errortitle' >ERRORS</p>
      {data.length && data.map((item) => {
        if (item["4xError"])
          return (
            <div className='errorboxdata'>
              <span className='spanstyling'>{item["aws.apigateway.ApiName"]} </span>
              <span className='spanstyling'>{"4xError: "}{item["4xError"]}</span>
              <span className='spanstyling'>{"5xError: "}{item["5xError"]}</span>
            </div>
          )
        else if (item['error']) {
          return (
            <div className='errorboxdata'>
              <span className='spanstyling'>{item["facet"][0]} </span>
              <span className='spanstyling'>{"sc_status: "}{item["facet"][1]}</span>
              <span className='spanstyling'>{item["error"]}</span>
            </div>
          )
        }
        else if (item["facet"][0] == "https://be2.ponedev.net/sign-in") {
          return (
            <div className='errorboxdata'>
              <span className='spanstyling'>{"PageUrl: "}{item["facet"][0]} </span>
              <span className='spanstyling'>{item["error"]}</span>
            </div>
          )
        }
        else if (item["facet"][0] == "partneringONE (Browser App) Largest Contentful Paint") {
          return (
            <div className='errorboxdata'>
              {/* <span style={{ color: "black" }}>{item["facet"][0]} </span> */}
              <span className='spanstyling'>{item["facet"][1]}</span>
              <span className='spanstyling'>{item["error"]}</span>
            </div>
          )
        }
      })}


    </div >
  )
}

export default ErrorInboxTooltip