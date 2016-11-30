import { LOGIN, LOGOUT, AUTH_LOGGED_OUT, AUTH_WORKING, AUTH_LOGGED_IN, AUTH_ERROR } from '../actions/actions';

export var authReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, uid: action.uid, status: AUTH_LOGGED_IN };
		case LOGOUT:
			return { ...state, uid: undefined, status: AUTH_LOGGED_OUT};
		case AUTH_LOGGED_OUT:
			return { ...state, status: AUTH_LOGGED_OUT};
		case AUTH_LOGGED_IN:
			return { ...state, status: AUTH_LOGGED_IN};
		case AUTH_ERROR:
			return { ...state, status: AUTH_ERROR, errorMessage: action.errorMessage};
		case AUTH_WORKING:
			return { ...state, status: AUTH_WORKING};
		default:
			return state;
	}
};
