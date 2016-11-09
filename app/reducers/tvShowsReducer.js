import { ADD_SHOW_BY_ID, ON_DL_FORM_CHANGE, ON_DELETE_SHOW, ON_WATCHING_FORM_CHANGE, INITIALIZE_STORE } from '../actions/actions';

export var tvShowsReducer = (state = [], action) => {
	switch (action.type) {
		case INITIALIZE_STORE:
			return action.payload.tvShows;
		case ADD_SHOW_BY_ID:
			//Expecting to get back action.payload with showdata and season detail
			return [...state, action.payload.tvShow];

		case ON_DELETE_SHOW:
			var showId = action.payload;
			return state.filter((show) => show.id !== showId);
		default:
			return state;
	}
};
