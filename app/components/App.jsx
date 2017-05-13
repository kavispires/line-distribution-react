import React from 'react';

import Header from './Header';
import PopUpAlert from './PopUpAlert';

const App = ({children, alert, closePopUpAlert}) => {
	return (
		<div className="container">
			<Header />
			{ children }
      <PopUpAlert message={alert} closePopUpAlert={closePopUpAlert} />
		</div>
	);
};

export default App;
