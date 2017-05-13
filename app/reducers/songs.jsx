import axios from 'axios';

/* ------------------   ACTIONS   ------------------ */

const SET_ALL_SONGS = 'SET_ALL_SONGS';
const SET_SONGS = 'SET_SONGS';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

/* --------------   ACTION CREATORS   -------------- */

const setAllSongs = (songs) => ({ type: SET_ALL_SONGS, songs });
const setSongs = (songs) => ({ type: SET_SONGS, songs });
const setCurrentSong = (song) => ({ type: SET_CURRENT_SONG, song });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
	allSongs: [],
	mySongs: [],
	currentSong: {}
};

export default function reducer(prevState = initialState, action) {

	const newState = Object.assign({}, prevState);

	switch (action.type) {

		case SET_ALL_SONGS:
			newState.allSongs = action.songs;
			break;

		case SET_SONGS:
			newState.mySongs = action.songs;
			break;

		case SET_CURRENT_SONG:
			newState.currentSong = action.song;
			break;

		default:
			return prevState;

	}

	return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const loadAllSongs = () => (dispatch) => {
	return axios.get(`api/songs`)
		.then(res => res.data)
		.then(songs => dispatch(setAllSongs(songs)))
		.catch(err => console.error(err));
};

export const loadSongs = () => (dispatch, getState) => {
	let userId = getState().auth.id;
	return axios.get(`api/users/${userId}/songs`)
		.then(res => res.data)
		.then(songs => dispatch(setSongs(songs)))
		.catch(err => console.error(err));
};

export const loadCurrentSong = (songId) => (dispatch) => {
	return axios.get(`api/songs/${songId}`)
		.then(res => res.data)
		.then(song => dispatch(setCurrentSong(song)))
		.catch(err => console.error(err));
};
