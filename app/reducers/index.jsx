import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  bands: require('./bands').default,
  creator: require('./creator').default
});

export default rootReducer;
