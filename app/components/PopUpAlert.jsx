import React from 'react';

const Alert = ({message}) => {
	return (
		<div className="alert">
      <span className="close">x</span>
      <p className="content">{ message }</p>
    </div>
	);
};

export default Alert;
