import { LOAD_NEWSHOWS, SHOW_SELECTED, SET_SEARCH_TEXT, SET_ADD_NEW_SHOW, ADD_SHOW_BY_ID } from '../actions/actions';

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
		console.log(action);
			return {
				...state,
				addingNewShow: action.action
			};
		//When a new Show is added OR a show is selected (from left menu), need to update this to False
		case ADD_SHOW_BY_ID:
		case SHOW_SELECTED:
			return {
					...state,
					addingNewShow: false,
					showsReturned: []
				};
		default:
			return state;
	}
};
