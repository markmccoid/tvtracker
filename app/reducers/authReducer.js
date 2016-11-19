import { LOGIN, LOGOUT, AUTH_NULL, AUTH_WORKING, AUTH_SUCCESSFUL, AUTH_ERROR } from '../actions/actions';

export var authReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, uid: action.uid };
		case LOGOUT:
			return { ...state, uid: undefined};
		case AUTH_NULL:
			return { ...state, status: AUTH_NULL};
		case AUTH_SUCCESSFUL:
			return { ...state, status: AUTH_SUCCESSFUL};
		case AUTH_ERROR:
			return { ...state, status: AUTH_ERROR, errorMessage: action.errorMessage};
		case AUTH_WORKING:
			return { ...state, status: AUTH_WORKING};
		default:
			return state;
	}
};
