import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	app: require('./app').default,
  auth: require('./auth').default,
  bands: require('./bands').default,
  creator: require('./creator').default,
  distribution: require('./distribution').default,
  songs: require('./songs').default
});

export default rootReducer;
