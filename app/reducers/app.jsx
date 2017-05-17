import _ from 'lodash';

/* ------------------   ACTIONS   ------------------ */

const SET_POPUP_ALERT = 'SET_POPUP_ALERT';
const SET_POPUP_PROMPT = 'SET_POPUP_PROMPT';
const SET_WARNING = 'SET_WARNING';

/* --------------   ACTION CREATORS   -------------- */

export const setPopUpAlert = message => ({ type: SET_POPUP_ALERT, message });
export const setPopUpPrompt = message => ({ type: SET_POPUP_PROMPT, message });
export const setWarning = warning => ({ type: SET_WARNING, warning });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  alert: '',
  prompt: {}, // {message: '', callback: {}}
  warning: {} // {id: '', message: ''}
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_POPUP_ALERT:
      newState.alert = action.message;
      break;

    case SET_WARNING:
      newState.warning = action.warning;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const displayWarning = (id = '', message = '') => (dispatch, getState) => {
  const warnings = Object.assign({}, getState().app.warning);
  warnings[id] = message;
  return dispatch(setWarning(warnings));
};

export const closeWarning = (message) => (dispatch, getState) => {
  const warnings = Object.assign({}, getState().app.warning);
  const id = _.findKey(warnings, (m) => m === message);
  if (warnings.hasOwnProperty(id)) warnings[id] = '';
  return dispatch(setWarning(warnings));
};

export const displayPopUpAlert = (message) => (dispatch) => {
  return dispatch(setPopUpAlert(message));
};

export const closePopUp = () => (dispatch) => {
  dispatch(setPopUpAlert(''));
  dispatch(setPopUpPrompt({}));
};
