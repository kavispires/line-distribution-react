import { connect } from 'react-redux';

import CreateBand from '../components/CreateBand';
import { loadColorList, checkBandName, handleBandName, setNewMemberColor, setNewMemberName, addCustomMember, editCustomMember, handlePublicStatus, addBand, closeModal } from '../reducers/creator';

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    alert: state.creator.alert,
    currentBand: state.bands.currentBand,
    colorList: state.creator.colorList,
    newBand: state.creator.newBand,
    newBandName: state.creator.newBandName,
    newMembers: state.creator.newMembers,
    newMember: state.creator.newMember,
    newMemberName: state.creator.newMemberName,
    newMemberColor: state.creator.newMemberColor,
    publicStatus: state.creator.publicStatus,
    modalMessage: state.creator.modalMessage
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    checkBandName: (event) => dispatch(checkBandName(event.target.value)),
    handleBandName: (event) => dispatch(handleBandName(event.target.value)),
    handleMemberName: (event) => dispatch(setNewMemberName(event.target.value)),
    handleMemberColor: (color) => dispatch(setNewMemberColor(color)),
    addCustomMember: () => {
      dispatch(addCustomMember());
      dispatch(loadColorList());
    },
    editCustomMember: (member) => dispatch(editCustomMember(member)),
		handlePublicStatus: (event) => dispatch(handlePublicStatus(event.target.value)),
    handleSubmit: () => dispatch(addBand()),
    closeModal: () => dispatch(closeModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBand);
