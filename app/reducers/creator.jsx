import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import { setPopUpAlert, displayWarning } from './app';
import { filterColors } from '../utils';

/* ------------------   ACTIONS   ------------------ */

const SET_NEW_BAND = 'SET_NEW_BAND';
const SET_NEW_BAND_NAME = 'SET_NEW_BAND_NAME';
const SET_NEW_MEMBER_COLOR = 'SET_NEW_MEMBER_COLOR';
const SET_NEW_MEMBER_NAME = 'SET_NEW_MEMBER_NAME';
const SET_NEW_MEMBER_ID = 'SET_NEW_MEMBER_ID';
const SET_NEW_MEMBERS = 'SET_NEW_MEMBERS';
const SET_CURRENT_MEMBER = 'SET_CURRENT_MEMBER';
const SET_CURRENT_BAND_NAME = 'SET_CURRENT_BAND_NAME';
const SET_PUBLIC_STATUS = 'SET_PUBLIC_STATUS';
const SET_COLOR_LIST = 'SET_COLOR_LIST';
const TOGGLE_EDITING_BAND = 'TOGGLE_EDITING_BAND';
const TOGGLE_EDITING_MEMBER = 'TOGGLE_EDITING_MEMBER';

/* --------------   ACTION CREATORS   -------------- */

export const setNewBand = (band) => ({ type: SET_NEW_BAND, band });
export const setNewBandName = (name) => ({ type: SET_NEW_BAND_NAME, name });
export const setNewMemberColor = (color) => ({ type: SET_NEW_MEMBER_COLOR, color });
export const setNewMemberName = (name) => ({ type: SET_NEW_MEMBER_NAME, name });
export const setNewMemberId = (id) => ({ type: SET_NEW_MEMBER_ID, id });
export const setNewMembers = (members) => ({ type: SET_NEW_MEMBERS, members });
export const setCurrentMember = (member) => ({ type: SET_CURRENT_MEMBER, member });
export const setCurrentBandName = (bandName) => ({ type: SET_CURRENT_BAND_NAME, bandName });
export const setPublicStatus = (status) => ({ type: SET_PUBLIC_STATUS, status });
export const setColorList = (list) => ({ type: SET_COLOR_LIST, list });
export const toggleEditingBand = (value) => ({ type: TOGGLE_EDITING_BAND, value});
export const toggleEditingMember = (value) => ({ type: TOGGLE_EDITING_MEMBER, value});

/* -----------------   REDUCERS   ------------------ */

const initialState = {
	newBand: {},
	newBandName: '',
	newMembers: [],
	newMemberName: '',
	newMemberColor: '',
	newMemberId: 0,
	publicStatus: true,
	colorList: [],
	editingMember: false,
	editingBand: false
};

export default function reducer(prevState = initialState, action) {

	const newState = Object.assign({}, prevState);

	switch (action.type) {

		case SET_NEW_BAND:
			newState.newBand = action.band;
			break;

		case SET_NEW_BAND_NAME:
			newState.newBandName = action.name;
			break;

		case SET_CURRENT_BAND_NAME:
			newState.newBandName = action.bandName;
			break;

		case SET_NEW_MEMBER_COLOR:
			newState.newMemberColor = action.color;
			break;

		case SET_NEW_MEMBER_NAME:
			newState.newMemberName = action.name;
			break;

		case SET_NEW_MEMBER_ID:
			newState.newMemberId = action.id;
			break;

		case SET_NEW_MEMBERS:
			newState.newMembers = action.members;
			break;

		case SET_CURRENT_MEMBER:
			newState.newMember = action.member;
			break;

		case SET_PUBLIC_STATUS:
			newState.publicStatus = action.status;
			break;

		case SET_COLOR_LIST:
			newState.colorList = action.list;
			break;

		case TOGGLE_EDITING_BAND:
			newState.editingBand = action.value;
			break;

		case TOGGLE_EDITING_MEMBER:
			newState.editingMember = action.value;
			break;

		default:
			return prevState;

	}

	return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

/* Check if band has been previously created */
export const checkBandName = (bandName) => (dispatch, getState) => {
	const bands = getState().bands.allBands.map(band => band.name.toLowerCase().replace(/\s/g, ''));
	const typedName = bandName.toLowerCase().replace(/\s/g, '');

	if (bands.indexOf(typedName) !== -1) {
		return dispatch(displayWarning('cb1', `${bandName} already exists in the database. Please, search for this band and add it to your favorites instead of creating a duplicate.`));
	} else {
		return dispatch(displayWarning('cb1', ''));
	}
};

export const handleBandName = (bandName) => (dispatch) => {
	return dispatch(setCurrentBandName(bandName));
};

export const handlePublicStatus = (status) => (dispatch, getState) => {
	status = (getState().creator.publicStatus) ? false : true;
	return dispatch(setPublicStatus(status));
};

/* Remove colors used by created members */
export const loadColorList = () => (dispatch, getState) => {
	const newMembers = getState().creator.newMembers;
	let usedColors = [];
	if (newMembers.length > 0) {
		usedColors = newMembers.map(member => member.color);
	}
	let availableColors = filterColors(usedColors);
	// If member is being edited, add its color to the beginning
	const memberColor = getState().creator.newMemberColor;
	if (memberColor) availableColors.unshift(memberColor);
	dispatch(setColorList(availableColors));
};

export const addCustomMember = () => (dispatch, getState) => {
	const newMembers = [...getState().creator.newMembers];
	
	// This id is only used when editing a member;
	let id = getState().creator.newMemberId;
	if (id === 0) id = `n${newMembers.length + 1}`;

	const member = {
		name: getState().creator.newMemberName,
		color: getState().creator.newMemberColor,
		id: id
	};

	// Assign random name, if member doesn't have one;
	if (!member.name) {
		member.name = `Member ${newMembers.length + 1}`;
	}

	// Assign random color, if member doesn't have one
	if (!member.color) {
		const availableColors = getState().creator.colorList;
		member.color = availableColors[Math.floor(Math.random() * availableColors.length)];
	}

	// Add or update to array
	const editingMember = getState().creator.editingMember;

	if (!editingMember) {
		newMembers.push(member);
	} else {
		const index = newMembers.findIndex(el => el.id === member.id);
		if (index) newMembers[index] = member;
		else newMembers.push(member);
	}

	dispatch(loadColorList());
	dispatch(setNewMemberName(''));
	dispatch(setNewMemberColor(''));
	dispatch(setNewMemberId(0));
	dispatch(setNewMembers(newMembers));

	if (getState().creator.newMembers.length === 20) {
		dispatch(displayWarning('cb2', `You've reached the maximum number of members of 20. Save your band or edit previously created members.`));
	} else {
		dispatch(displayWarning('cb2', ''));
	}

	dispatch(loadColorList());
	dispatch(toggleEditingMember(false));
};

export const editCustomMember = (member) => (dispatch) => {
	dispatch(toggleEditingMember(true));
	dispatch(setNewMemberName(member.name));
	dispatch(setNewMemberColor(member.color));
	dispatch(setNewMemberId(member.id));
	dispatch(loadColorList());
};

export const removeCustomMember = () => (dispatch, getState) => {
	const memberName = getState().creator.newMemberName;
	let newMembersCopy = _.filter([...getState().creator.newMembers], (m) => m.name !== memberName);
	dispatch(setNewMembers(newMembersCopy));
	dispatch(setNewMemberName(''));
	dispatch(setNewMemberColor(''));
	dispatch(setNewMemberId(0));
	dispatch(loadColorList());
	dispatch(toggleEditingMember(false));
};

export const loadNewBand = () => (dispatch, getState) => {
	const band = getState().bands.currentBand;
	if (band.id) {
		return dispatch(setPublicStatus(band.publicStatus));
	}
};

export const addBand = () => (dispatch, getState) => {
	const bandName = getState().creator.newBandName;
	const bandStatus = getState().creator.publicStatus;
	const members = getState().creator.newMembers;
	const userId = getState().auth.id;

	if (bandName === '') {
		return dispatch(setPopUpAlert('Your band must have a name.'));
	}
	if (members.length < 2) {
		return dispatch(setPopUpAlert('Your band must have at least 2 members'));
	}

	const bandToAdd = {
		user_id: userId,
		original_creator_id: userId,
		name: bandName,
		public: bandStatus,
		members: members
	};

	return axios.post('/api/bands', bandToAdd)
		.then((band) => {
			console.log('Band created', band);
			browserHistory.push('/myBands');
		})
		.catch(err => console.error(err));

};

export const updateBand = () => (dispatch, getState) => {
	const bandId = getState().bands.currentBand.id;
	const bandStatus = getState().creator.publicStatus;
	const members = getState().creator.newMembers.map(m => {
		if (isNaN(m.id)) delete m.id;
		return m;
	});
	const bandToUpdate = {
		status: bandStatus,
		members: members
	};

	return axios.put(`/api/bands/${bandId}/update`, bandToUpdate)
		.then((band) => {
			console.log('Band updated', band);
			dispatch(setNewBandName(''));
			dispatch(setNewMembers([]));
			browserHistory.push('/mybands');
		})
		.catch(err => console.error(err));
};
