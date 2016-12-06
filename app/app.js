import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory, hashHistory } from 'react-router'; //ES6 destructuring
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import tvMaze from './api/tvmaze';
import { initializeStore, setDataLoading, authLogin, authLogout } from './actions/actions';
import routes from './routes';
import firebase from 'app/firebase';

import localizer from 'react-widgets/lib/localizers/simple-number'
localizer();

//setup an observer -- whenever firebase auth state changes
//run the function.  Right now, if not logged in, go to login
//else go to main page.
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		//Store the uid (user id) in our store
		store.dispatch(authLogin(user.uid));
		//Initialize the tvShow and showData nodes of the store with data from firebase
		store.dispatch(setDataLoading(true));
		tvMaze.loadInitialData(user.uid).then((data) => {
			store.dispatch(initializeStore(data));
			store.dispatch(setDataLoading(false));
		});
		hashHistory.push('/main');
	} else {
		store.dispatch(authLogout());
		hashHistory.push('/');
	}
});

//This creates the store that will be passed to the Provider component
var store = require('./store/configureStore').configure();

// //Initialize the tvShow and showData nodes of the store
// //with data from firebase
// store.dispatch(setDataLoading(true));
// tvMaze.loadInitialData().then((data) => {
// 	store.dispatch(initializeStore(data));
// 	store.dispatch(setDataLoading(false));
// });

//-------------------------------------------------------

//require('react-widgets/lib/less/react-widgets.less');
//Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

//app css - there is an alias in webpack config pointing to app.css called applicationStyles
require('style!css!sass!applicationStyles');

//--Ant Design css load
require('style!css!antd/dist/antd.min.css');

//path="/" designates the root of the application
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory} routes={routes} />
	</Provider>,
  document.getElementById('app')
);
//Old ReactDom render method without routing
/*
ReactDOM.render(
  <h1>Boilerplate app!  </h1>,
  document.getElementById('app')
);
*/
