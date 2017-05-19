import axios from 'axios';
import store from '../store';
import _ from 'lodash';

/* ------------------   ACTIONS   ------------------ */

const SET_CURRENT_SINGERS = 'SET_CURRENT_SINGERS';
const SET_LAST_KEY_DOWN = 'SET_LAST_KEY_DOWN';
const SET_LAST_KEY_UP = 'SET_LAST_KEY_UP';
const SET_LOG = 'SET_LOG';
const SET_MEMBERS = 'SET_MEMBERS';
const SET_RESULTS = 'SET_RESULTS';
const TOGGLE_DISTRIBUTE = 'TOGGLE_DISTRIBUTE';

/* --------------   ACTION CREATORS   -------------- */

export const setCurrentSingers = (singers) => ({ type: SET_CURRENT_SINGERS, singers });
export const setLastKeyDown = (key) => ({ type: SET_LAST_KEY_DOWN, key });
export const setLastKeyUp = (key) => ({ type: SET_LAST_KEY_UP, key });
export const setLog = (log) => ({ type: SET_LOG, log });
export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setResults = (results) => ({ type: SET_RESULTS, results});
export const toggleDistribute = (value) => ({ type: TOGGLE_DISTRIBUTE, value });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
	currentSingers: [],
	distribute: false,
	lastKeyDown: 0,
	lastKeyUp: 0,
	log: [],
	members: [],
	results: []
};

class Member {
	constructor (id, name, color, code, face) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.keyCode = code;
		this.keyFace = face;
		this.boxStart = 0;
		this.duration = 0;
		this.total = 0;
		this.percentage = 0;
	}
}

export default function reducer(prevState = initialState, action) {

	const newState = Object.assign({}, prevState);

	switch (action.type) {

		case SET_CURRENT_SINGERS:
			newState.currentSingers = action.singers;
			break;

		case SET_LAST_KEY_DOWN:
			newState.lastKeyDown = action.key;
			break;

		case SET_LAST_KEY_UP:
			newState.lastKeyUp = action.key;
			break;

		case SET_LOG:
			newState.log = action.log;
			break;

		case SET_MEMBERS:
			newState.members = action.members;
			break;

		case SET_RESULTS:
			newState.results = action.results;
			break;

		case TOGGLE_DISTRIBUTE:
			newState.distribute = action.value;
			break;

		default:
			return prevState;

	}

	return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

const boxFace = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const boxCode = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80];

const deepCopy = (arrayOfObjects) => {
	return [...arrayOfObjects].map(item => Object.assign({}, item));
};

export const calculatePercentages = () => (dispatch, getState) => {
	// Get total time and calculate percentual per member;
	const members = deepCopy(getState().distribution.members);
	let allMembersTotal = 0;
	members.forEach(member => allMembersTotal += member.total);
	members.forEach(member => member.percentage = Math.round(member.total * 100 / allMembersTotal));
	
	dispatch(setMembers(members));
};

export const setUpDistribution = () => (dispatch, getState) => {
	const currentBand = getState().bands.currentBand;

	// Stop code if there's no currentBand
	if (!currentBand.id) return;

	const members = currentBand.members.map((mem, i) => {
		return new Member(mem.id, mem.name, mem.color, boxCode[i], boxFace[i]);
	});

	return dispatch(setMembers(members));
};

export const trackMouseDown = (index, now = Date.now()) => (dispatch, getState) => {
	if (!getState().distribution.distribute) return;

	// Deep copy members
	const members = deepCopy(getState().distribution.members);
	// Update boxStart
	members[index].boxStart = now;

	// Set who's singing
	const currentSingers = [...getState().distribution.currentSingers];
	currentSingers.unshift(members[index].name);

	dispatch(setMembers(members));
	dispatch(setCurrentSingers(currentSingers));
};

export const trackMouseUp = (index, now = Date.now()) => (dispatch, getState) => {
	if (!getState().distribution.distribute) return;

	// Deep copy members
	const members = deepCopy(getState().distribution.members);
	// Calculate duration
	const duration = Number(((now - members[index].boxStart) / 1000).toFixed(2));
	// Add to Duration/Total
	members[index].duration = duration;
	members[index].total += duration;
	members[index].boxStart = 0;

	dispatch(setMembers(members));

	// Add log
	const log = [...getState().distribution.log].map(l => Object.assign({}, l));
	log.push({name: members[index].name, duration: duration});

	dispatch(setLog(log));

	// Update Who's Singing
	const currentSingers = [...getState().distribution.currentSingers];
	const whoIndex = currentSingers.indexOf(members[index].name);
	currentSingers.splice(whoIndex, 1);

	dispatch(setCurrentSingers(currentSingers));

	dispatch(calculatePercentages());
};

export const trackKeyDown = (key) => (dispatch, getState) => {
	if (!getState().distribution.distribute) return;

	// Set end time
	const now = Date.now();

	const members = getState().distribution.members;

	const index = members.findIndex(member => member.keyCode === key);
	
	if (index >= 0) dispatch(trackMouseDown(index, now));
};

export const trackKeyUp = (key) => (dispatch, getState) => {
	if (!getState().distribution.distribute) return;

	// Set end time
	const now = Date.now();

	const members = getState().distribution.members;

	const index = members.findIndex(member => member.keyCode === key);
	
	if (index >= 0) dispatch(trackMouseUp(index, now));
};

export const resetDistribution = () => (dispatch, getState) => {
	dispatch(setLog([]));
	// Deep copy members
	const members = deepCopy(getState().distribution.members).map(member => {
		member.duration = 0;
		member.total = 0;
		member.percentage = 0;
		return member;
	});
	dispatch(setMembers(members));
};

export const removeLastLine = () => (dispatch) => {

};

export const decreaseLine = () => (dispatch) => {

};

export const finishDistribution = () => (dispatch, getState) => {
	dispatch(toggleDistribute(false));

	const members = deepCopy(getState().distribution.members);

	const maxPercentage = Math.max.apply(Math, members.map(function(m){return m.percentage;}));

	members.forEach(member => member.relativePercentage = Math.round(member.percentage * 100 / maxPercentage));

	const results = _.orderBy(members, ['total'], ['desc']);

	dispatch(setResults(results));
};

export const toggleHelp = () => (dispatch) => {

};

export const clearResults = () => (dispatch) => {
	dispatch(toggleDistribute(true));
	dispatch(setResults({}));
};

/* KEYBOARD INPUT WATCHERS */

let lastKeyDown;

document.body.addEventListener('keydown', function(event) {
	if (event.keyCode !== lastKeyDown) {
		store.dispatch(trackKeyDown(event.keyCode));
		lastKeyDown = event.keyCode;
	}
});

document.body.addEventListener('keyup', function(event) {
	store.dispatch(trackKeyUp(event.keyCode));
	if (event.keyCode === lastKeyDown) lastKeyDown = null;
});
