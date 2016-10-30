import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router'; //ES6 destructuring
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import tvMaze from './api/tvmaze';

import routes from './routes';

//This creates the store that will be passed to the Provider component
var store = require('./store/configureStore').configure();

//subscribe to store and on any change to tvShows array, save the data
// var unsubscribe = store.subscribe(() => {
// 	if ( Array.isArray(store.getState().tvShows) ) {
// 		//console.log(store.getState().tvShows);
// 		tvMaze.saveShowData(store.getState().tvShows);
// 	}
// });
//The above code did not check for differences in tvShows state so was updating all the time
//--------------------------------------------------------------------
//This code from:  https://github.com/reactjs/redux/issues/303#issuecomment-125184409
//Allows us to check current state with next state and determine if we should update.
//The arguments:
// **store - the redux store variable
// **select - a function that pulls the piece of state we want to check
// **onChange - a function that will be invoked if the current and next state are different
//---------------------------------------------------------------------
function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

var unsubscribe = observeStore(store, (state) => state.tvShows, (state) => tvMaze.saveShowData(state));

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
