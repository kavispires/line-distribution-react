import React from 'react';

const PopUpAlert = ({message, closePopUpAlert}) => {
  return (
    <div>
      {
        message ? (
          <div className="modal">
          	<div className="modal-border">
	            <div className="modal-content">
	            	<span className="icon icon-exclamation-triangle" /><br />
	              <p>{message}</p>
	              <button className="btn btn-20" onClick={() => closePopUpAlert()}>OK</button>
	            </div>
	          </div>
          </div>)
        : null
      }
    </div>
  );
};

export default PopUpAlert;
