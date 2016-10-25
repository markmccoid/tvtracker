var redux = require('redux');
var { tvShowsReducer, showSelectedReducer, newShowsInfoReducer, addingNewShowReducer }  =  require('../reducers/reducers');

//--------------------------------------------
//-Create Store
//--------------------------------------------
export var configure = (initialState = {}) => {

	var reducer = redux.combineReducers({
			tvShows: tvShowsReducer,
			showSelected: showSelectedReducer,
			newShowsInfo: newShowsInfoReducer,
			addingNewShow: addingNewShowReducer
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
			window.devToolsExtension ? window.devToolsExtension() : f => f));

	return store;
}

//From Redux documentation -- Thinking I could use this to apply the Promise middleware.
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import DevTools from './containers/DevTools'
// import reducer from '../reducers/index'

// const store = createStore(
//   reducer,
//   compose(
//     applyMiddleware(thunk),
//     DevTools.instrument()
//   )
// )

