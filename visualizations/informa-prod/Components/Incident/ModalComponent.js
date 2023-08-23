import close from '../../Assets/close.svg';

const ModalComponent = ({ onClose, modalData, height }) => {
 
  return (
    <div
    className="modal-overlay"

    style={{transform: `translate(-50%  , 0px)`,left: '50%',top:"0%"}}
    >
      <div className="modal-container">
        <div className="modal-content">

          <h3>
            INCIDENT TIMELINE DATA FOR
            
            <span style={{ fontSize: '16px', color: 'green', marginLeft:"8px" }}>
              ({modalData.readTime})
            </span>
            <span className="count_box">
              {modalData.Backend +
                modalData['Front-end'] +
                modalData.Middleware +
                modalData.Network}
            </span>
          </h3>
          <div style={{ marginTop: '18px', width: '100%' }}>
            <table style={{ width: '100%', border: '1px solid grey' }}>
              <thead>
                <th style={{ padding: '8px' }}>Policy name</th>
                <th></th>
                <th></th>
              </thead>
              <tbody>
                {Object.keys(modalData.policyObj).map((cur, index) => (
                  <>
                    <tr key={index}>
                      <td style={{ width: '100%' }} colSpan={4}>
                        <table style={{ width: '100%' }}>
                          <thead>
                            <th
                              style={{
                                backgroundColor: '#8ED6D466',
                                color: 'black',
                                textWrap: 'nowrap',
                                padding: '8px',
                                width: '30%',
                              }}
                            >
                              {cur}
                            </th>
                            <th
                              style={{
                                backgroundColor: '#8ED6D466',
                                color: 'black',
                                textWrap: 'nowrap',
                                width: '30%',
                              }}
                            >
                              Condition Name
                            </th>
                            <th
                              style={{
                                backgroundColor: '#8ED6D466',
                                color: 'black',
                                textWrap: 'nowrap',
                                width: '30%',
                              }}
                            >
                              Incident Link
                            </th>
                          </thead>
                          <tbody>
                            {modalData.policyObj[cur].length > 0 &&
                              modalData.policyObj[cur].map((v, index) => {
                                return (
                                  <tr key={index}>
                                    <td></td>
                                    <td style={{ textWrap: 'nowrap' }}>
                                      {v.conditionName}
                                    </td>
                                    <td
                                      className="hover"
                                      onClick={() =>
                                        window.open(v.incidentLink)
                                      }
                                      style={{ textWrap: 'nowrap' }}
                                    >
                                      Incident Link
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <img
          src={close}
          className="close-button"
          onClick={onClose}
          alt="cross"
        />
      </div>
    </div>
  );
};

export default ModalComponent;
