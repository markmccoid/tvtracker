import axios from 'axios';
import tvMaze from 'tvmaze';
import firebase, { firebaseRef } from 'app/firebase';

export const INITIALIZE_STORE = 'INITIALIZE_STORE'; //Load initial data from firebase and update the tvShow and showData store objects
export const ADD_SHOW_BY_ID = 'ADD_SHOW_BY_ID';  //
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SHOW_SELECTED = 'SHOW_SELECTED';
export const LOAD_NEWSHOWS = 'LOAD_NEWSHOWS';
export const SET_ADD_NEW_SHOW = 'SET_ADD_NEW_SHOW';
export const ON_DL_FORM_CHANGE = 'ON_DL_FORM_CHANGE'; //When user updates the season and episode downloaded inputs
export const ON_WATCHING_FORM_CHANGE = 'ON_WATCHING_FORM_CHANGE';
export const ON_DELETE_SHOW = 'ON_DELETE_SHOW';
//User Data Actions
export const ADD_USER_LINK = 'ADD_USER_LINK';
export const DELETE_USER_LINK = 'DELETE_USER_LINK';

export function initializeStore(data) {
	return {
		type: INITIALIZE_STORE,
		payload: data
	};
}


//-------ADD SHOW BY ID GROUP ------------
export function addShowById(showObj) {
//showData can either hold one show or an array of shows
//	var request = tvMaze.getTVInfoAndEpisodes(showId);
	return {
		type: ADD_SHOW_BY_ID,
		payload: showObj
	};
}

//Called from AddTVItem.js and will ultimately call the addShowById action creator
export var startAddShowById= (showId) => {

	//Return thunk --
	return (dispatch, getState) => {
		var request = tvMaze.getTVInfoAndEpisodes(showId);
		//once tvMaze data comes back "then"
		return request.then((showObj) => {
			//Create the show data initialization object
			var showDataInit = {
				showId: showId,
				seasonDownloading: 1,
				episodeDownloading: 1,
				seasonWatching: 1,
				episodeWatching: 1,
				showLinks: [{link:showObj.imdbLink,
											linkDescription: `IMDB Entry for ${showObj.name}`}]
			};
			var tvShowRef = firebaseRef.child('tvShows').push(showObj);
			var showDataRef = firebaseRef.child('showData').push(showDataInit);
			Promise.all([tvShowRef, showDataRef]).then((values) => {
				dispatch(addShowById({
						tvShow: {
							...showObj,
							firebaseKey: values[0].key
						},
						showData: {
							...showDataInit,
							firebaseKey: values[1].key
						}
					}));
			});

		});
	};
};
//------- END - ADD SHOW BY ID GROUP ------------

export function showSelected(showId) {
	return {
		type: SHOW_SELECTED,
		payload: showId
	}
}

export function setSearchText(searchText) {
	return {
		type: SET_SEARCH_TEXT,
		action: searchText
	};
}

//set "addingNewShow" state either true and false
export var setNewShowFlag = (flag = false) => {
	return {
		type: SET_ADD_NEW_SHOW,
		action: flag
	};
}

export var loadNewShows = (searchTerm) => {
	var payload = tvMaze.getTVInfoByName(searchTerm);
//Since we are sending a searchTerm also, the promise middleware
//doesn't do anything.  Therefore, I'm doing a .then in the reduce to
//get the final values.

	return {
		type: LOAD_NEWSHOWS,
		payload: payload
	};
}

//------- ON DOWNLOAD CHANGE GROUP ------------

export var onDownloadChange = (type, value, showSelected) => {
	const action = {
		type: type,
		value: value,
		showSelected: showSelected
	};
	return {
		type: ON_DL_FORM_CHANGE,
		action: action
	};
};

export var startOnDownloadChange = (type, value, showSelected, firebaseKey) => {
	return (dispatch, getState) => {
		var updType;
		if ( type === 'e' ) {
			updType = {episodeDownloading: value};
		} else {
			updType = {seasonDownloading: value};
		}
		var showUpdateRef = firebaseRef.child(`showData/${firebaseKey}`).update(updType);

		return showUpdateRef.then(() => {
			dispatch(onDownloadChange(type, value, showSelected));
		});
	};
};
//------- END - ON DOWNLOAD CHANGE GROUP ------------

//------- ON WATCHING CHANGE GROUP ------------
export var onWatchingChange = (type, value, showSelected) => {
	const action = {
		type: type,
		value: value,
		showSelected: showSelected
	};
	return {
		type: ON_WATCHING_FORM_CHANGE,
		action: action
	};
};

export var startOnWatchingChange = (type, value, showSelected, firebaseKey) => {
	return (dispatch, getState) => {
		var updType;
		if ( type === 'e' ) {
			updType = {episodeWatching: value};
		} else {
			updType = {seasonWatching: value};
		}
		console.log('watching:', updType);
		var showUpdateRef = firebaseRef.child(`showData/${firebaseKey}`).update(updType);

		return showUpdateRef.then(() => {
			dispatch(onWatchingChange(type, value, showSelected));
		});
	};
};
//------- END - ON WATCHING CHANGE GROUP ------------

//-----------------------------------------------
//--Delete Show Group
export var deleteShow = (showId) => {
	return {
		type: ON_DELETE_SHOW,
		payload: showId
	};
}

export var startDeleteShow = (showId, tvShowFirebaseKey, showDataFirebaseKey) => {
		return (dispatch, getState) => {
			var tvShowRef = firebaseRef.child(`tvShows/${tvShowFirebaseKey}`).remove();
			var showDataRef = firebaseRef.child(`showData/${showDataFirebaseKey}`).remove();

			return Promise.all([tvShowRef, showDataRef]).then(() => {
				dispatch(deleteShow(showId));
			}).catch((error) => console.log('error removing from firebase', error));
		};
}
//-----------------------------------------------
//------- ADD USER LINK GROUP ------------
export var addUserLinks = (showSelected, newLinksArray) => {
	var action = {
		showSelected,
		newLinksArray
	};

	return {
		type: ADD_USER_LINK,
		action: action
	};
}

export var startAddUserLink = (showData, link, linkDesc) => {
	const { showId, firebaseKey, showLinks = [] } = showData;

	//create new link object
	var newLink = {link: link, linkDescription: linkDesc};
	//add new link onto existing array of link objects for showData.showLinks
	//Thought this would be easier than trying to add a single one to firebase.
	var newLinkArray = [...showLinks, newLink];

	//Setup thunk to call action after adding to firebase.
	return (dispatch, getState) => {
		var addLinkRef = firebaseRef.child(`showData/${firebaseKey}`).update({showLinks:newLinkArray});
		addLinkRef.then(()=> {
			//dispatch(addUserLinks(showId, link, linkDesc));
			dispatch(addUserLinks(showId, newLinkArray));
		});
	};
};
//------- END - ADD USER LINK GROUP ------------

//------- DELETE USER LINK GROUP ------------
export var onLinkDelete = (showSelected, Index) => {
	var action = {
		showSelected,
		Index
	};
	return {
		type: DELETE_USER_LINK,
		action: action
	};
};

export var startOnLinkDelete = (showSelected, Index, showData) => {
	//showData will be the showData for the show we need to update
	const { showId, firebaseKey, showLinks } = showData;
	var newLinksArray = showLinks.filter((obj, idx) => Index !== idx);
	console.log(newLinksArray);
	return (dispatch, getState) => {
		var updLinksRef = firebaseRef.child(`showData/${firebaseKey}`).update({showLinks:newLinksArray});

		updLinksRef.then(() => {
			dispatch(addUserLinks(showId, newLinksArray));
		});
	};


};
//------- END - DELETE USER LINK GROUP ------------
