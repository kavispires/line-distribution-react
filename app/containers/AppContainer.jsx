import { connect } from 'react-redux';

import App from '../components/App';

import { closePopUpAlert } from '../reducers/app';

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    alert: state.app.alert
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		closePopUpAlert: () => dispatch(closePopUpAlert())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
