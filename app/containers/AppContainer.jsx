import { connect } from 'react-redux';

import App from '../components/App';

import { closePopUp } from '../reducers/app';

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    alert: state.app.alert,
    prompt: state.app.prompt
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		closePopUp: () => dispatch(closePopUp())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
