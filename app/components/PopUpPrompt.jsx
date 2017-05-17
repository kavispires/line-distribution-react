import React from 'react';

const PopUpPrompt = ({message, closePopUp, callback}) => {
  return (
    <div>
      {
        message ? (
          <div className="modal">
          	<div className="modal-border">
	            <div className="modal-content">
	            	<span className="icon icon-exclamation-triangle" /><br />
	              <p>{message}</p>
	              <button className="btn btn-20" onClick={() => closePopUp()}>Cancel</button> <button className="btn btn-20" onClick={() => callback()}>Ok</button>
	            </div>
	          </div>
          </div>)
        : null
      }
    </div>
  );
};

export default PopUpPrompt;
