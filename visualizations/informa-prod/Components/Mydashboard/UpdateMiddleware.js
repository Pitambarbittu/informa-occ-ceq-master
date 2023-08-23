import React from 'react'
// import '../Mydashboard/Update.css'
// import "../Mydashboard/Style.css"

const UpdateMiddleware = () => {
  return (
    <div  className='main_container'>
    <div className='head'>
                <h3 className='heading1'>Browser</h3> 
            </div>
            <button className='view'>VIEW EDIT</button>

            <div className='errors' >
              
                <div  className='error box'  >
                    <p className="main_header"
                    >ERROR INBOX</p>
                    
                        <span>0</span>

                        <div className='ptag'>
                        <p >Error rate </p>  
                        <small className='p1' >0%</small>
                        </div>
                        <div>
                    <p className='lcpfidcls'>LCP</p>
                    <img className='i' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMyAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNjI1IDEyLjYyNUM5LjczMTYgMTIuNjI1IDEyLjI1IDEwLjEwNjYgMTIuMjUgN0MxMi4yNSAzLjg5MzQgOS43MzE2IDEuMzc1IDYuNjI1IDEuMzc1QzMuNTE4NCAxLjM3NSAxIDMuODkzNCAxIDdDMSAxMC4xMDY2IDMuNTE4NCAxMi42MjUgNi42MjUgMTIuNjI1WiIgc3Ryb2tlPSIjNTk1QTZDIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYuNjI1IDQuNzVDNy4wMzkyMSA0Ljc1IDcuMzc1IDQuNDE0MjEgNy4zNzUgNEM3LjM3NSAzLjU4NTc5IDcuMDM5MjEgMy4yNSA2LjYyNSAzLjI1QzYuMjEwNzkgMy4yNSA1Ljg3NSAzLjU4NTc5IDUuODc1IDRDNS44NzUgNC40MTQyMSA2LjIxMDc5IDQuNzUgNi42MjUgNC43NVoiIGZpbGw9IiM1OTVBNkMiLz4KPHBhdGggZD0iTTYuNjI1IDEwLjM3NVY2LjI1IiBzdHJva2U9IiM1OTVBNkMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="" />

                    <hr className='sndhr' />
                    
                    
                </div>
                
                </div>
               
            
                <hr />

                
                <div className='slislo box'  >               
                    <p>SLI/SLO</p>
                    
                        <span>0</span>
                        <div className='ptag'>
                        <p >User time on the site <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMyAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNjI1IDEyLjYyNUM5LjczMTYgMTIuNjI1IDEyLjI1IDEwLjEwNjYgMTIuMjUgN0MxMi4yNSAzLjg5MzQgOS43MzE2IDEuMzc1IDYuNjI1IDEuMzc1QzMuNTE4NCAxLjM3NSAxIDMuODkzNCAxIDdDMSAxMC4xMDY2IDMuNTE4NCAxMi42MjUgNi42MjUgMTIuNjI1WiIgc3Ryb2tlPSIjNTk1QTZDIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYuNjI1IDQuNzVDNy4wMzkyMSA0Ljc1IDcuMzc1IDQuNDE0MjEgNy4zNzUgNEM3LjM3NSAzLjU4NTc5IDcuMDM5MjEgMy4yNSA2LjYyNSAzLjI1QzYuMjEwNzkgMy4yNSA1Ljg3NSAzLjU4NTc5IDUuODc1IDRDNS44NzUgNC40MTQyMSA2LjIxMDc5IDQuNzUgNi42MjUgNC43NVoiIGZpbGw9IiM1OTVBNkMiLz4KPHBhdGggZD0iTTYuNjI1IDEwLjM3NVY2LjI1IiBzdHJva2U9IiM1OTVBNkMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="" /> </p>

                        <small className='p2'>1.64 s</small>
                        </div>
                        <div>
                    <p className='lcpfidcls'>FID</p>
                    <img className='i' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMyAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNjI1IDEyLjYyNUM5LjczMTYgMTIuNjI1IDEyLjI1IDEwLjEwNjYgMTIuMjUgN0MxMi4yNSAzLjg5MzQgOS43MzE2IDEuMzc1IDYuNjI1IDEuMzc1QzMuNTE4NCAxLjM3NSAxIDMuODkzNCAxIDdDMSAxMC4xMDY2IDMuNTE4NCAxMi42MjUgNi42MjUgMTIuNjI1WiIgc3Ryb2tlPSIjNTk1QTZDIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYuNjI1IDQuNzVDNy4wMzkyMSA0Ljc1IDcuMzc1IDQuNDE0MjEgNy4zNzUgNEM3LjM3NSAzLjU4NTc5IDcuMDM5MjEgMy4yNSA2LjYyNSAzLjI1QzYuMjEwNzkgMy4yNSA1Ljg3NSAzLjU4NTc5IDUuODc1IDRDNS44NzUgNC40MTQyMSA2LjIxMDc5IDQuNzUgNi42MjUgNC43NVoiIGZpbGw9IiM1OTVBNkMiLz4KPHBhdGggZD0iTTYuNjI1IDEwLjM3NVY2LjI1IiBzdHJva2U9IiM1OTVBNkMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="" />

                    <hr className='sndhr' />
                  
                </div>
               
                </div>
                <hr />

                <div className='disruption box' >
                    <p className="main_heading"
                    >DISRUPTIONS</p>
                    
                        <span >0</span>
                        

                        <div className='ptag'>
                        <p >Page Views<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMyAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNjI1IDEyLjYyNUM5LjczMTYgMTIuNjI1IDEyLjI1IDEwLjEwNjYgMTIuMjUgN0MxMi4yNSAzLjg5MzQgOS43MzE2IDEuMzc1IDYuNjI1IDEuMzc1QzMuNTE4NCAxLjM3NSAxIDMuODkzNCAxIDdDMSAxMC4xMDY2IDMuNTE4NCAxMi42MjUgNi42MjUgMTIuNjI1WiIgc3Ryb2tlPSIjNTk1QTZDIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYuNjI1IDQuNzVDNy4wMzkyMSA0Ljc1IDcuMzc1IDQuNDE0MjEgNy4zNzUgNEM3LjM3NSAzLjU4NTc5IDcuMDM5MjEgMy4yNSA2LjYyNSAzLjI1QzYuMjEwNzkgMy4yNSA1Ljg3NSAzLjU4NTc5IDUuODc1IDRDNS44NzUgNC40MTQyMSA2LjIxMDc5IDQuNzUgNi42MjUgNC43NVoiIGZpbGw9IiM1OTVBNkMiLz4KPHBhdGggZD0iTTYuNjI1IDEwLjM3NVY2LjI1IiBzdHJva2U9IiM1OTVBNkMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="" />
                         </p>
                        <small className='p3'>0</small>
                        </div>

                        <div>
                    <p className='lcpfidcls'>cls </p>
                    <img className='i' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxMyAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNjI1IDEyLjYyNUM5LjczMTYgMTIuNjI1IDEyLjI1IDEwLjEwNjYgMTIuMjUgN0MxMi4yNSAzLjg5MzQgOS43MzE2IDEuMzc1IDYuNjI1IDEuMzc1QzMuNTE4NCAxLjM3NSAxIDMuODkzNCAxIDdDMSAxMC4xMDY2IDMuNTE4NCAxMi42MjUgNi42MjUgMTIuNjI1WiIgc3Ryb2tlPSIjNTk1QTZDIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYuNjI1IDQuNzVDNy4wMzkyMSA0Ljc1IDcuMzc1IDQuNDE0MjEgNy4zNzUgNEM3LjM3NSAzLjU4NTc5IDcuMDM5MjEgMy4yNSA2LjYyNSAzLjI1QzYuMjEwNzkgMy4yNSA1Ljg3NSAzLjU4NTc5IDUuODc1IDRDNS44NzUgNC40MTQyMSA2LjIxMDc5IDQuNzUgNi42MjUgNC43NVoiIGZpbGw9IiM1OTVBNkMiLz4KPHBhdGggZD0iTTYuNjI1IDEwLjM3NVY2LjI1IiBzdHJva2U9IiM1OTVBNkMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="" />

                    <hr className='sndhr' />
                    
                </div>
                
                </div>

                <hr />
            </div>     
                    <button className='btntracing'>DISTRIBUTED TRACING</button>

                    <button className='btnvitals'>WEB VITALS</button>
                    
                    <button className='btnsli'>SLI/SLO DETAILS</button>
</div>
  )
}

export default UpdateMiddleware




