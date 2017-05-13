import { connect } from 'react-redux';

import CreateBand from '../components/CreateBand';
import { checkBandName, handleBandName, setNewMemberColor, setNewMemberName, addCustomMember, editCustomMember, handlePublicStatus, addBand, removeCustomMember } from '../reducers/creator';

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    warning: state.app.warning,
    currentBand: state.bands.currentBand,
    colorList: state.creator.colorList,
    editing: state.creator.editing,
    newBand: state.creator.newBand,
    newBandName: state.creator.newBandName,
    newMembers: state.creator.newMembers,
    newMember: state.creator.newMember,
    newMemberName: state.creator.newMemberName,
    newMemberColor: state.creator.newMemberColor,
    publicStatus: state.creator.publicStatus
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    checkBandName: (event) => dispatch(checkBandName(event.target.value)),
    handleBandName: (event) => dispatch(handleBandName(event.target.value)),
    handleMemberName: (event) => dispatch(setNewMemberName(event.target.value)),
    handleMemberColor: (color) => dispatch(setNewMemberColor(color)),
    addCustomMember: () => dispatch(addCustomMember()),
    editCustomMember: (member) => dispatch(editCustomMember(member)),
    removeCustomMember: () => dispatch(removeCustomMember()),
		handlePublicStatus: (event) => dispatch(handlePublicStatus(event.target.value)),
    handleSubmit: () => dispatch(addBand())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBand);
