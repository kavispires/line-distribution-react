import { connect } from 'react-redux';

import MyBands from '../components/MyBands';
import {
  deleteBand,
  editBand,
  handleCreateBandClick,
  loadCurrentBand
} from '../reducers/bands';

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    myBands: state.bands.myBands,
    favoriteBands: state.bands.favoriteBands,
    currentBand: state.bands.currentBand
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCreateBandClick: (value) => dispatch(handleCreateBandClick(value)),
		loadCurrentBand: (id) => dispatch(loadCurrentBand(id)),
    editBand: (id) => dispatch(editBand(id)),
    deleteBand: (id) => dispatch(deleteBand(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBands);
