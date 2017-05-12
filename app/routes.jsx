import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import AppContainer from './containers/AppContainer';
import CreateBandContainer from './containers/CreateBandContainer';
import DistributeContainer from './containers/DistributeContainer';
import HomeContainer from './containers/HomeContainer';
import MyBandsContainer from './containers/MyBandsContainer';
import ProfileContainer from './containers/ProfileContainer';
import SearchContainer from './containers/SearchContainer';

import NotFound from './components/NotFound';

import {whoami} from './reducers/auth';
import {loadBands, loadFavoriteBands, loadAllBands} from './reducers/bands';
import {loadColorList} from './reducers/creator';
import {loadSongs} from './reducers/songs';

const onEnterProfile = (nextState, replace, done) => {
	store.dispatch(whoami())
		.then(() => store.dispatch(loadSongs()))
		.then(() => done())
		.catch(err => console.error(err));
};

const onEnterMyBands = (nextState, replace, done) => {
	store.dispatch(whoami())
		.then(() => store.dispatch(loadBands()))
		.then(() => store.dispatch(loadFavoriteBands()))
		.then(() => done())
		.catch(err => console.error(err));
};

const onEnterCreate = (nextState, replace, done) => {
	store.dispatch(whoami())
		.then(() => store.dispatch(loadColorList()))
		.then(() => store.dispatch(loadAllBands()))
		.then(() => done())
		.catch(err => console.error(err));
};

export default function Root () {
	return (
		<Provider store={store}>
	    <Router history={browserHistory}>
	      <Route path="/" component={AppContainer}>
	        <IndexRedirect to="/home" />
	        <Route path="/home" component={HomeContainer} />
	        <Route path="/profile" component={ProfileContainer} onEnter={onEnterProfile} />
	        <Route path="/mybands" component={MyBandsContainer} onEnter={onEnterMyBands} />
        	<Route path="/create" component={CreateBandContainer} onEnter={onEnterCreate} />
	        <Route path="/distribute" component={DistributeContainer} />
	        <Route path="/search" component={SearchContainer} />
	      </Route>
	      <Route path="*" component={NotFound} />
	    </Router>
	  </Provider>
	);
}
