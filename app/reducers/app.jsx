/* ------------------   ACTIONS   ------------------ */

const SET_POPUP_ALERT = 'SET_POPUP_ALERT';
// const SET_POPUP_PROMPT = 'SET_POPUP_PROMPT';
// const SET_MODAL = 'SET_MODAL';

/* --------------   ACTION CREATORS   -------------- */

export const setPopupAlert = message => ({ type: SET_POPUP_ALERT, message });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  alertMessage: ''
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_POPUP_ALERT:
      newState.alertMessage = action.message;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

// ?
