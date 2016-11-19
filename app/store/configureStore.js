import { createStore, combineReducers, applyMiddleware, compose, reduxMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { newShowsInfoReducer } from '../reducers/newShowsInfoReducer';
import { tvShowsReducer } from '../reducers/tvShowsReducer';
import { showSelectedReducer} from '../reducers/showSelectedReducer';
import { showDataReducer } from '../reducers/showDataReducer';
import { dataLoadingReducer } from '../reducers/dataLoadingReducer';
import { groupsReducer } from '../reducers/groupsReducer';
import { authReducer } from '../reducers/authReducer';
import { AUTH_NULL } from '../actions/actions';

import helpers from '../helpers/helpers';
import tvMaze from '../api/tvmaze';


//--Take out in production -- Using for testing to make sure not mutating state in reducers
import freeze from 'redux-freeze';

const INITIAL_STATE = {
			tvShows: [],
			showData: [],
			showSelectedId: undefined,
			dataLoading: false,
			newShowsInfo: {
				showsReturned: [],
				addingNewShow: false
			},
			groups: [],
			auth: {
				uid: undefined,
				status: AUTH_NULL,
				errorMessage: undefined
			}
		};
//--------------------------------------------
//-Create Store
//--------------------------------------------
export var configure = (initialState = INITIAL_STATE) => {

	var reducer = combineReducers({
			tvShows: tvShowsReducer,
			showData: showDataReducer,
			showSelectedId: showSelectedReducer,
			dataLoading: dataLoadingReducer,
			newShowsInfo: newShowsInfoReducer,
			groups: groupsReducer,
			auth: authReducer
	});

	var store = createStore(reducer, initialState, compose(applyMiddleware(promise, thunk, freeze),
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

