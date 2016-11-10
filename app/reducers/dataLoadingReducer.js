import { SET_DATA_LOADING } from '../actions/actions';

export var dataLoadingReducer = (state = false, action) => {

	switch ( action.type ) {
		case SET_DATA_LOADING:
			return action.payload;
		default:
			return state;
	}
}
