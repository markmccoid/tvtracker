import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router'; //ES6 destructuring
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import tvMaze from './api/tvmaze';
import { initializeStore } from './actions/actions';
import routes from './routes';

//This creates the store that will be passed to the Provider component
var store = require('./store/configureStore').configure();

//Initialize the tvShow and showData nodes of the store
//with data from firebase
tvMaze.loadInitialData().then((data) => {
	store.dispatch(initializeStore(data));
});

// tvMaze.loadInitialShowData().then((data) => {
// 	store.dispatch(initShowData(data));
// });


//If we want, can dispatch an action to load the initial set of data
//--Example below is from ToDo app
// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));
//-------------------------------------------------------

//Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

//app css - there is an alias in webpack config pointing to app.css called applicationStyles
require('style!css!sass!applicationStyles');

//path="/" designates the root of the application
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
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
