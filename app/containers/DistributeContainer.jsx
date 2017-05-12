import { connect } from 'react-redux';

import Distribute from '../components/Distribute';

const mapState = (state) => {
  return {
    user: state.auth,
    currentBand: state.bands.currentBand
  };
};

export default connect(mapState)(Distribute);
