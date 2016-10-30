import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { tvShowsReducer, showSelectedReducer, newShowsInfoReducer } from '../reducers/reducers';
import helpers from '../helpers/helpers';
import tvMaze from '../api/tvmaze';

const INITIAL_STATE = {
			tvShows: tvMaze.loadInitialData(),
			showSelectedId: undefined,
			newShowsInfo: {
				showSearchTerm: '',
				showsReturned: [],
				addingNewShow: false
			}
		};
//--------------------------------------------
//-Create Store
//--------------------------------------------
export var configure = (initialState = INITIAL_STATE) => {

	var reducer = combineReducers({
			tvShows: tvShowsReducer,
			showSelectedId: showSelectedReducer,
			newShowsInfo: newShowsInfoReducer
	});

	var store = createStore(reducer, initialState, compose(applyMiddleware(promise),
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

