import { LOAD_NEWSHOWS, SHOW_SELECTED, SET_SEARCH_TEXT, SET_ADD_NEW_SHOW, ADD_SHOW_BY_ID, ON_DL_FORM_CHANGE, ON_DELETE_SHOW, ON_WATCHING_FORM_CHANGE } from '../actions/actions';
import df from 'deep-freeze-strict';

export var tvShowsReducer = (state = [], action) => {
	console.log(action.type);
	switch (action.type) {
		case ADD_SHOW_BY_ID:
			//Expecting to get back action.payload with showdata and season detail
			return [...state, action.payload];
		case ON_DL_FORM_CHANGE:
			var { type, value, showSelected } = action.action;
			var idx = state.findIndex((show) => {return show.id === showSelected});
			//create new item for changed object in array -- NOTE: slice returns an array.
			//Here there will only be a single object in the array, so grab the first/only one which is index 0.
			var showToUpdate = state.slice(idx, idx+1)[0];
			var updatedShow;
			//check the type 'e' is for episode updating and 's' is for season updating.
			if (type === 'e') {
				//Even though showToUpdate is a new array, it contains sub-objects, downloading being one of them.
				//These sub object are STILL pointing to the original state object, thus, if we update anything in
				//these sub objects, we will be mutating the original object.
				//So to keep this from happening we are doing all the shit below!
				updatedShow = [{...showToUpdate, downloading: {...showToUpdate.downloading, episodeDownloading: value}}];
			} else if (type === 's') {
				updatedShow = [{...showToUpdate, downloading: {...showToUpdate.downloading, seasonDownloading: value}}];
			}

			return [
				...state.slice(0,idx),
				//Modify this selected array piece without mutating it????
				...updatedShow,
				...state.slice(idx+1)
			];
//-----------------------------------
		case ON_WATCHING_FORM_CHANGE:
			var { type, value, showSelected } = action.action;
			var idx = state.findIndex((show) => {return show.id === showSelected});
			//create new item for changed object in array -- NOTE: slice returns an array.
			//Here there will only be a single object in the array, so grab the first/only one which is index 0.
			var showToUpdate = state.slice(idx, idx+1)[0];
			var updatedShow;
			//check the type 'e' is for episode updating and 's' is for season updating.
			if (type === 'e') {
				//Even though showToUpdate is a new array, it contains sub-objects, downloading being one of them.
				//These sub object are STILL pointing to the original state object, thus, if we update anything in
				//these sub objects, we will be mutating the original object.
				//So to keep this from happening we are doing all the shit below!
				updatedShow = [{...showToUpdate, watching: {...showToUpdate.watching, episodeWatching: value}}];
			} else if (type === 's') {
				updatedShow = [{...showToUpdate, watching: {...showToUpdate.watching, seasonWatching: value}}];
			}

			return [
				...state.slice(0,idx),
				//Modify this selected array piece without mutating it????
				...updatedShow,
				...state.slice(idx+1)
			];
		case ON_DELETE_SHOW:
			var showId = action.payload;
			console.log('in reducer: ', showId);
			return state.filter((show) => show.id !== showId);
		default:
			return state;
	}
};

export var showSelectedReducer = (state = '', action) => {
	switch (action.type) {
		case SHOW_SELECTED:
			return action.payload;
		//When a new show is added update the selected show to be the new show.
		case ADD_SHOW_BY_ID:
			return 	action.payload.id;
		case ON_DELETE_SHOW:
			return '';
		default:
			return state;
	}
};

export var newShowsInfoReducer = (state = {
																						showSearchTerm: '',
																						showsReturned: [],
																						addingNewShow: false
																					}, action) => {
	switch (action.type) {
		case LOAD_NEWSHOWS:
			return {
				...state,
				showsReturned: action.payload,
				addingNewShow: true
			};
		case SET_SEARCH_TEXT:
			return {
				...state,
				showSearchTerm: action.action
			};
		case SET_ADD_NEW_SHOW:
			return {
				...state,
				addingNewShow: action.action
			};
		//When a new Show is added OR a show is selected (from left menu), need to update this to False
		case ADD_SHOW_BY_ID:
		case SHOW_SELECTED:
			return {
					...state,
					addingNewShow: false
				};
		default:
			return state;
	}
};

