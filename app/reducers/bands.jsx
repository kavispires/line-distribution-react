import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------------   ACTIONS   ------------------ */

const SET_ALL_BANDS = 'SET_ALL_BANDS';
const SET_BANDS = 'SET_BANDS';
const SET_CURRENT_BAND = 'SET_CURRENT_BAND';
const SET_FAVORITE_BANDS = 'SET_FAVORITE_BANDS';

/* --------------   ACTION CREATORS   -------------- */

const setAllBands = bands => ({ type: SET_ALL_BANDS, bands });
const setBands = bands => ({ type: SET_BANDS, bands });
const setCurrentBand = band => ({ type: SET_CURRENT_BAND, band });
const setFavoriteBands = bands => ({ type: SET_FAVORITE_BANDS, bands });


/* -----------------   REDUCERS   ------------------ */

const initialState = {
	allBands: {},
	myBands: [],
	favoriteBands: [],
	currentBand: {}
};

export default function reducer(prevState = initialState, action) {

	const newState = Object.assign({}, prevState);

	switch (action.type) {

		case SET_ALL_BANDS:
			newState.allBands = action.bands;
			break;

		case SET_BANDS:
			newState.myBands = action.bands;
			break;

		case SET_CURRENT_BAND:
			newState.currentBand = action.band;
			break;

		case SET_FAVORITE_BANDS:
			newState.favoriteBands = action.bands;
			break;

		default:
			return prevState;

	}

	return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const loadAllBands = () => (dispatch) => {
	return axios.get(`api/bands`)
		.then(res => res.data)
		.then(bands => dispatch(setAllBands(bands)))
		.catch(err => console.error(err));
};

export const loadBands = () => (dispatch, getState) => {
	const userId = getState().auth.id;
	return axios.get(`api/users/${userId}/bands`)
		.then(res => res.data)
		.then(bands => dispatch(setBands(bands)))
		.catch(err => console.error(err));
};

export const loadFavoriteBands = () => (dispatch, getState) => {
	const userId = getState().auth.id;
	return axios.get(`api/users/${userId}/favoritebands`)
		.then(res => res.data)
		.then(bands => dispatch(setFavoriteBands(bands)))
		.catch(err => console.error(err));
};

export const loadCurrentBand = (bandId) => (dispatch) => {
	console.log('Loading band', bandId);
	axios.get(`api/bands/${bandId}`)
		.then(res => res.data)
		.then(band => dispatch(setCurrentBand(band)))
		.catch(err => console.error(err));
	browserHistory.push(`/distribute`);
};

export const handleCreateBandClick = (editing) => (dispatch) => {
	dispatch(setCurrentBand({}));
	browserHistory.push(`/create`);
};

// It doesn't really delete the band, but removes its owner/user_id
export const deleteBand = (bandId) => (dispatch) => {
	return axios.put(`api/bands/${bandId}`)
		.then(res => res.data)
		// .then(band => )
};
