import { LOAD_NEWSHOWS, SHOW_SELECTED, SET_SEARCH_TEXT, SET_ADD_NEW_SHOW, ADD_SHOW_BY_ID, ON_DL_FORM_CHANGE, ON_DELETE_SHOW, ON_WATCHING_FORM_CHANGE } from '../actions/actions';

export var tvShowsReducer = (state = [], action) => {
	console.log(action.type);
	switch (action.type) {
		case ADD_SHOW_BY_ID:
			//Expecting to get back action.payload with showdata and season detail
			return [...state, action.payload];
		case ON_DL_FORM_CHANGE:
			var { type, value, showSelected } = action.action;
			return state.map((show) => {
				if( show.id === showSelected) {
					if (type === 's') {
						show.downloading.seasonDownloading = value;
					} else {
						show.downloading.episodeDownloading = value;
					}
				}
				return show;
			});
//-----------------------------------
//--This is another way to do the above.  I think this is a bit more complicated, but just a FYI
//-----------------------------------
			// var idx = state.findIndex((show) => {return show.id === showSelected});
			// //create new item for changed object in array -- NOTE: slice returns an array.
			// //Here there will only be a single object in the array.
			// var updatedObject = state.slice(idx, idx+1);
			// //check the type 'e' is for episode updating and 's' is for season updating.
			// if (type === 'e') {
			// 	updatedObject[0].downloading.episodeDownloading = value;
			// } else if (type === 's') {
			// 	updatedObject[0].downloading.seasonDownloading = value;
			// }

			// return [
			// 	...state.slice(0,idx),
			// 	//Modify this selected array piece without mutating it????
			// 	...updatedObject,
			// 	...state.slice(idx+1)
			// ];
//-----------------------------------
		case ON_WATCHING_FORM_CHANGE:
			var { type, value, showSelected } = action.action;
			console.log(type, value, showSelected);
			return state.map((show) => {
				if( show.id === showSelected) {
					if (type === 's') {
						show.watching.seasonWatching = value;
					} else {
						show.watching.episodeWatching = value;
					}
				}
				return show;
			});
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

