import React from "react";

const Lambdatracing = ({ opentracing, setOpenmodal }) => {
  const close = () => {
    setOpenmodal(false);
  };

  if (!opentracing) {
    return null;
  }
  return (
    <div className="tracing_modal">
      <div className="griditem_container">
        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-accounts
          </span>

          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0Bj38k4oGQX`)}
          >
            https://onenr.io/0Bj38k4oGQX
          </span>
        </div>
        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-agenda
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0dQekGrnNRe`)}
          >
            https://onenr.io/0dQekGrnNRe
          </span>
        </div>
        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-contactsharing
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0nQx87Vy7QV`)}
          >
            https://onenr.io/0nQx87Vy7QV
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-events
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0VjYNgkmNQ0`)}
          >
            https://onenr.io/0VjYNgkmNQ0
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-requesting
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0VjYNgk3NQ0`)}
          >
            https://onenr.io/0VjYNgk3NQ0
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-rescheduling
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0Vwgly58ERJ`)}
          >
            https://onenr.io/0Vwgly58ERJ
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-schedulecontentpagesreindex
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0yw48BklVw3`)}
          >
            https://onenr.io/0yw48BklVw3
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-scheduling
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0Vwgly54BRJ`)}
          >
            https://onenr.io/0Vwgly54BRJ
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-scheduling
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0Vwgly54BRJ`)}
          >
            https://onenr.io/0Vwgly54BRJ
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-search
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0Bj38k4OdQX`)}
          >
            https://onenr.io/0Bj38k4OdQX
          </span>
        </div>

        <div className="borders" style={{ borderbottom: "none" }}>
          <span className="title" style={{ color: "black" }}>
            Be2-security
          </span>
          <span
            className="url_message"
            style={{ color: "blue" }}
            onClick={() => window.open(`https://onenr.io/0OwvZno67wv`)}
          >
            https://onenr.io/0OwvZno67wv
          </span>
        </div>
      </div>
    </div>
  );
};

export default Lambdatracing;
