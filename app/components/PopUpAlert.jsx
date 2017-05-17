import React from 'react';

const PopUpAlert = ({message, closePopUp}) => {
  return (
    <div>
      {
        message ? (
          <div className="modal">
          	<div className="modal-border">
	            <div className="modal-content">
	            	<span className="icon icon-exclamation-triangle" /><br />
	              <p>{message}</p>
	              <button className="btn btn-20" onClick={() => closePopUp()}>OK</button>
	            </div>
	          </div>
          </div>)
        : null
      }
    </div>
  );
};

export default PopUpAlert;
