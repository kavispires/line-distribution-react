import { connect } from 'react-redux';

import Profile from '../components/Profile';

const mapState = (state) => {
  return {
    user: state.auth
  };
};

export default connect(mapState)(Profile);
