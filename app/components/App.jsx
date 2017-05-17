import React from 'react';

import Header from './Header';
import PopUpAlert from './PopUpAlert';
import PopUpPrompt from './PopUpPrompt';

const App = ({children, alert, prompt, closePopUp}) => {

	return (
		<div className="container">
			<Header />
			{ children }
      <PopUpAlert message={alert} closePopUp={closePopUp} />
      <PopUpPrompt message={prompt.message} callback={prompt.callback} closePopUp={closePopUp} />
		</div>
	);
};

export default App;
