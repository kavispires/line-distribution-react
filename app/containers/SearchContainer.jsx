import { connect } from 'react-redux';

import Search from '../components/Search';

const mapState = (state) => {
  return {
    user: state.auth
  };
};

export default connect(mapState)(Search);
