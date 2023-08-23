import React, { useState, useRef } from "react";
import { HistogramChart } from "nr1";
import FilterModal from "../Filter/FilterModal";
import IncidentGraph from "./Incident/IncidentGraph";
import { Icon } from "nr1";

import upArrow from "../Assets/up-arrow.svg";
import downArrow from "../Assets/down-arrow.svg";
import { Incident_timeline_link } from "../LinksDetails";

const Application = () => {
  const [openmodal, setOpenmodal] = useState(false);
  const containerRef = useRef();
  function open() {
    setOpenmodal(!openmodal);
  }

  function close() {
    setOpenmodal(true);
  }
  return (
    <>
      <div className="application_conatiner">
        <div>
          <h5>Informa OCC</h5>
        </div>
        <div className="chart_container">
          <div className="header_conatiner" onClick={() =>window.open(Incident_timeline_link)} style={{cursor:"pointer"}}>
            <p className="main_heading">Incident Timeline</p>
            {/* <span onClick={open}> + Add Filter</span>
            {openmodal && (
              <FilterModal openmodal={openmodal} setOpenmodal={setOpenmodal} />
            )} */}
          </div>

          <div>
            {/* <button
              style={{
                display: "flex",
                justifyContent:"space-between",
                // gap: "12px",
                // border: "none",
                background: "#F0F2F5",
                borderRadius: "16px",
                border: "1px solid #D9D9DC",
              }}
            >
              <p>24 hours</p>

              <div
                style={{
                  display: "flex",
                //   justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <img src={upArrow} alt="img" />
                </div>
                <div>
                  <img src={downArrow} alt="img" />
                </div>
              </div>
            </button> */}
          </div>

          <div
            className="histogram_container"
            ref={containerRef}
            style={{ marginTop: "36px" }}
          >
            <IncidentGraph containerRef={containerRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
