import { connect } from 'react-redux';

import Distribute from '../components/Distribute';

import {
    trackMouseDown,
    trackMouseUp,
    resetDistribution,
    finishDistribution
} from '../reducers/distribution';

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    currentBand: state.bands.currentBand,
    currentSingers: state.distribution.currentSingers,
    log: state.distribution.log,
    members: state.distribution.members
  };
};

const mapStateToDispatch = (dispatch) => {
	return {
		mouseDown: (index) => dispatch(trackMouseDown(index)),
		mouseUp: (index) => dispatch(trackMouseUp(index)),
		reset: () => dispatch(resetDistribution()),
		finish: () => dispatch(finishDistribution())
	};
};

export default connect(mapStateToProps, mapStateToDispatch)(Distribute);
