import React from 'react';

const Warning = ({message, closeWarning}) => {
	return message ?
		(
			<div className="warning">
	      <span className="close" onClick={() => closeWarning(message)}>x</span>
	      <p className="content">{ message }</p>
	    </div>
	  ) : null
	;
};

import { closeWarning } from '../reducers/app';
import {connect} from 'react-redux';

export default connect(
  ({ auth }) => ({ user: auth }),
  {closeWarning}
)(Warning);
