import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(App);
