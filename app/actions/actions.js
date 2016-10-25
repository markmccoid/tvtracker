import axios from 'axios';
import tvMaze from 'tvmaze';

export const LOAD_SHOWS = 'LOAD_SHOWS';
export const TOGGLE_ADDINGNEWSHOW = 'TOGGLE_ADDINGNEWSHOW';
export const LOAD_NEWSHOWS = 'LOAD_NEWSHOWS';

export function loadShows() {
//Call helper to load shows

	return {
		type: LOAD_SHOWS,
		payload: request
	};
}

//Toggle "addingNewShow" state between true and false
export function toggleAddingNewShow() {
	return {
		type: TOGGLE_ADDINGNEWSHOW
	}
}

export var loadNewShows = (searchTerm) => {
	var payload = {};
	//
	tvMaze.getTVInfoByName(showName).then((theData) => {
			payload = newShowsInfo: {
					showSearchTerm: searchTerm,
					showsReturned: theData
			}});
		}, function (e){
			console.log(e);
		}
		);
	return {
		type: LOAD_NEWSHOWS,
		payload: payload
	};
}

// export function fetchPosts() {
// 	//since we are using react-promise, this action won't get dispatched
// 	//to the reducers until the request has resolved.
// 	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

// 	return {
// 		type: FETCH_POSTS,
// 		payload: request
// 	};
// }
