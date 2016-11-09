import { SHOW_SELECTED, ADD_SHOW_BY_ID, ON_DELETE_SHOW } from '../actions/actions';

export var showSelectedReducer = (state = '', action) => {
	switch (action.type) {
		case SHOW_SELECTED:
			return action.payload;
		//When a new show is added update the selected show to be the new show.
		case ADD_SHOW_BY_ID:
			return 	action.payload.tvShow.id;
		case ON_DELETE_SHOW:
			return '';
		default:
			return state;
	}
};
