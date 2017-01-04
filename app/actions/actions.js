import axios from 'axios';
import tvMaze from 'tvmaze';
import firebase, { firebaseRef, githubProvider, googleProvider } from 'app/firebase';

//Initialization Actions
export const INITIALIZE_STORE = 'INITIALIZE_STORE'; //Load initial data from firebase and update the tvShow and showData store objects
export const SET_DATA_LOADING = 'SET_DATA_LOADING';

//Adding a New Show
export const ADD_SHOW_BY_ID = 'ADD_SHOW_BY_ID';  //
export const LOAD_NEWSHOWS = 'LOAD_NEWSHOWS';
export const SET_ADD_NEW_SHOW = 'SET_ADD_NEW_SHOW';

//Refresh Show Data
export const REFRESH_SHOW_BY_ID = 'REFRESH_SHOW_BY_ID';

//
export const SHOW_SELECTED = 'SHOW_SELECTED';

//User Data Actions
export const ON_DL_FORM_CHANGE = 'ON_DL_FORM_CHANGE'; //When user updates the season and episode downloaded inputs
export const ON_WATCHING_FORM_CHANGE = 'ON_WATCHING_FORM_CHANGE';
export const ON_DELETE_SHOW = 'ON_DELETE_SHOW';
export const ADD_USER_LINK = 'ADD_USER_LINK';
export const DELETE_USER_LINK = 'DELETE_USER_LINK';
export const ADD_SHOW_NOTES = 'ADD_SHOW_NOTES';
export const ADD_SHOW_SOURCE = 'ADD_SHOW_SOURCE';

//Group Actions
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const ADD_GROUP_MEMBER = 'ADD_GROUP_MEMBER';
export const DELETE_GROUP_MEMBER = 'DELETE_GROUP_MEMBER';
export const UPDATE_GROUP_SORT = 'UPDATE_GROUP_SORT';

//Auth Actions
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_WORKING = 'AUTH_WORKING';
export const AUTH_LOGGED_IN = 'AUTH_LOGGED_IN';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT';

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
				episodeProgress: 'watched',
				showNotes: '',
				showSource: 'download',
				showLinks: [{link:showObj.imdbLink,
											linkDescription: `IMDB Entry for ${showObj.name}`},
										{link:showObj.downloadLink,
											linkDescription: `Download ${showObj.name}`}]
			};
			var uid = getState().auth.uid;
			var tvShowRef = firebaseRef.child(`users/${uid}/tvShows`).push(showObj);
			var showDataRef = firebaseRef.child(`users/${uid}/showData`).push(showDataInit);
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

//-------REFRESH SHOW BY ID GROUP ------------
export function refreshShowById(showObj) {
//showData can either hold one show or an array of shows
//	var request = tvMaze.getTVInfoAndEpisodes(showId);
	return {
		type: REFRESH_SHOW_BY_ID,
		payload: showObj
	};
}

//Called from AddTVItem.js and will ultimately call the addShowById action creator
export var startRefreshShowById= (showId, tvShowFirebaseKey) => {

	//Return thunk --
	return (dispatch, getState) => {
		var request = tvMaze.getTVInfoAndEpisodes(showId);
		//once tvMaze data comes back "then"
		return request.then((showObj) => {
			//Get user id
			var uid = getState().auth.uid;
			//Update Firebase record
			var tvShowRef = firebaseRef.child(`users/${uid}/tvShows/${tvShowFirebaseKey}`).update(showObj);
			dispatch(refreshShowById({
						tvShow: {
							...showObj,
							firebaseKey: tvShowFirebaseKey
						}
					}));
			});
	};
};
//------- END - REFRESH SHOW BY ID GROUP ------------

export function showSelected(showId) {
	return {
		type: SHOW_SELECTED,
		payload: showId
	}
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
		value: parseInt(value),
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
			updType = {episodeDownloading: parseInt(value)};
		} else {
			updType = {seasonDownloading: parseInt(value)};
		}
		var uid = getState().auth.uid;
		var showUpdateRef = firebaseRef.child(`users/${uid}/showData/${firebaseKey}`).update(updType);

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
		value: parseInt(value),
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
		switch (type) {
			case 'e':
				updType = {episodeWatching: parseInt(value)};
				break;
			case 's':
				updType = {seasonWatching: parseInt(value)};
				break;
			case 'r':
				updType = {episodeProgress: parseInt(value)};
				break;
		}
		// if ( type === 'e' ) {
		// 	updType = {episodeWatching: value};
		// } else  {
		// 	updType = {seasonWatching: value};
		// }
		var uid = getState().auth.uid;
		var showUpdateRef = firebaseRef.child(`users/${uid}/showData/${firebaseKey}`).update(updType);

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
			var uid = getState().auth.uid;

			var tvShowRef = firebaseRef.child(`users/${uid}/tvShows/${tvShowFirebaseKey}`).remove();
			var showDataRef = firebaseRef.child(`users/${uid}/showData/${showDataFirebaseKey}`).remove();

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
		var uid = getState().auth.uid;

		var addLinkRef = firebaseRef.child(`users/${uid}/showData/${firebaseKey}`).update({showLinks:newLinkArray});
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
	//only return the links we are NOT deleting
	var newLinksArray = showLinks.filter((obj, idx) => Index !== idx);

	return (dispatch, getState) => {
		var uid = getState().auth.uid;

		var updLinksRef = firebaseRef.child(`users/${uid}/showData/${firebaseKey}`).update({showLinks:newLinksArray});

		updLinksRef.then(() => {
			dispatch(addUserLinks(showId, newLinksArray));
		});
	};


};
//------- END - DELETE USER LINK GROUP ------------

export var setDataLoading = (dataLoadingFlag) => {
	return {
		type: SET_DATA_LOADING,
		payload: dataLoadingFlag
	};
};

//------- ADD SHOW NOTES GROUP ------------
export var addShowNotes = (showSelected, showNotes) => {
	return {
		type: ADD_SHOW_NOTES,
		showSelected: showSelected,
		payload: showNotes
	};
};

export var startAddShowNotes = (showNotes, showSelected, firebaseKey) => {
	return (dispatch, getState) => {
		var uid = getState().auth.uid;

		var updNotesRef = firebaseRef.child(`users/${uid}/showData/${firebaseKey}`).update({showNotes:showNotes});

		updNotesRef.then(() => {
			dispatch(addShowNotes(showSelected, showNotes));
		});
	};
};
//------- END - ADD SHOW NOTES GROUP ------------

//------- ADD SHOW SOURCE GROUP ------------
export var addShowSource = (showSelected, showSource) => {
	return {
		type: ADD_SHOW_SOURCE,
		showSelected: showSelected,
		payload: showSource
	};
};

export var startAddShowSource = (showSource, showSelected, firebaseKey) => {
	return (dispatch, getState) => {
		var uid = getState().auth.uid;

		var updNotesRef = firebaseRef.child(`users/${uid}/showData/${firebaseKey}`).update({showSource});

		updNotesRef.then(() => {
			dispatch(addShowSource(showSelected, showSource));
		});
	};
};
//------- END - ADD SHOW SOURCE GROUP ------------

//----- GROUPS Actions --------------------------------
export var addGroup = (newGroup, firebaseKey) => {
	newGroup.firebaseKey = firebaseKey;
	return {
		type: ADD_GROUP,
		newGroup
	};
};

export var startAddGroup = (groupName, groupDescription, sort) => {
	const newGroup = {
		name: groupName,
		description: groupDescription,
		members: [],
		sort
	};
	return (dispatch, getState) => {
		//get the uid of the currently logged in user
		let uid = getState().auth.uid;

		var groupRef = firebaseRef.child(`users/${uid}/groups`).push(newGroup);
		let firebaseKey = groupRef.key;
		groupRef.then(() => {
			dispatch(addGroup(newGroup, firebaseKey));
		});
	};
};
//---------- UPDATE GROUP --------------
export var updateGroup = (newName, newDesc, firebaseKey) => {
	return {
		type: UPDATE_GROUP,
		newName,
		newDesc,
		firebaseKey
	};
};

export var startUpdateGroup = (newName, newDesc, firebaseKey) => {
	return (dispatch, getState) => {
		//get the uid of the currently logged in user
		let uid = getState().auth.uid;

		let groupRef = firebaseRef.child(`users/${uid}/groups/${firebaseKey}`);
		groupRef.update({name: newName, description: newDesc}).then(() => {
			console.log('Update Done');
			dispatch(updateGroup(newName, newDesc, firebaseKey));
		});
	};
};
//---------- UPDATE GROUP SORT --------------
export var updateGroupSort = (firebaseKey, newSort) => {
	return {
		type: UPDATE_GROUP_SORT,
		sort: newSort,
		firebaseKey
	};
};

export var startUpdateGroupSort = (firebaseKey, newSort) => {
	return (dispatch, getState) => {
		//get the uid of the currently logged in user
		let uid = getState().auth.uid;

		let groupRef = firebaseRef.child(`users/${uid}/groups/${firebaseKey}`);
		groupRef.update({sort: newSort}).then(() => {
			console.log('Update Done');
			dispatch(updateGroupSort(firebaseKey, newSort));
		});
	};
};
//---------- DELETE GROUP --------------
export var deleteGroup = (firebaseKey) => {
	return {
		type: DELETE_GROUP,
		firebaseKey
	};
};
export var startDeleteGroup = (firebaseKey) => {
	return (dispatch, getState) => {
		//get the uid of the currently logged in user
		let uid = getState().auth.uid;

		var groupRef = firebaseRef.child(`users/${uid}/groups/${firebaseKey}`).remove();
		groupRef.then(() => {
			dispatch(deleteGroup(firebaseKey));
		});
	};
};
//---------- ADD NEW MEMBER TO GROUP --------------
export var addGroupMember = (newMemberObj, firebaseKey, groupFirebaseKey) => {
	return {
		type: ADD_GROUP_MEMBER,
		newMemberObj: {...newMemberObj, firebaseKey: firebaseKey},
		groupFirebaseKey
	};
};

export var startAddGroupMember = (newMemberObj, groupFirebaseKey) => {
	return (dispatch, getState) => {
		//get the uid of the currently logged in user
		let uid = getState().auth.uid;

		var groupMemberRef = firebaseRef.child(`users/${uid}/groups/${groupFirebaseKey}/members`).push(newMemberObj);
		groupMemberRef.then(() => {
			dispatch(addGroupMember(newMemberObj, groupMemberRef.key, groupFirebaseKey));
		});
	};
};
//---------- DELETE MEMBER TO GROUP --------------
export var deleteGroupMember = (memberFirebaseKey, groupFirebaseKey) => {
	return {
		type: DELETE_GROUP_MEMBER,
		memberFirebaseKey,
		groupFirebaseKey
	};
};

export var startDeleteGroupMember = (memberFirebaseKey, groupFirebaseKey) => {
	return (dispatch, getState) => {
		//get the uid of the currently logged in user
		let uid = getState().auth.uid;

		var groupMemberRef = firebaseRef.child(`users/${uid}/groups/${groupFirebaseKey}/members/${memberFirebaseKey}`).remove();
		return groupMemberRef.then(() => {
			dispatch(deleteGroupMember(memberFirebaseKey, groupFirebaseKey));
		});
	};
};
//=============================================================

//----- AUTH Actions --------------------------------
export var startLogin = (loginType, email='', password='') => {
	return (dispatch, getState) => {
		//set auth:status to working
		dispatch(authStatus(AUTH_WORKING));
		//now start the process of logging in
		var provider;
		switch (loginType) {
			case 'GOOGLE':
				provider = googleProvider;
				break;
			case 'GITHUB':
				provider = githubProvider;
				break;
			case 'EMAIL':
				return firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
				  dispatch(authStatus(AUTH_LOGGED_IN));
				}).catch((error) => {
					var errorCode = error.code;
		  		var errorMessage = error.message;
					dispatch(authStatus(AUTH_ERROR, `Email Sign In Error - Error Code: ${errorCode} - Error Message: ${errorMessage}`));
				});
				break;
			default:
				console.log('Error in startLogin-default case executed');
				return null;
		}

		return firebase.auth().signInWithPopup(provider).then((result) => {
					console.log('Auth Success', result);
					dispatch(authStatus(AUTH_LOGGED_IN));
				}, (error) => {
					var errorCode = error.code;
		  		var errorMessage = error.message;
					dispatch(authStatus(AUTH_ERROR, `${loginType} Error - Error Code: ${errorCode} - Error Message: ${errorMessage}`));
				});

	};
};

export var startEmailRegistration = (email='', password='') => {
	//Thunk
	return (dispatch, getState) => {
		//set auth:status to working
		dispatch(authStatus(AUTH_WORKING));
		firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
					console.log('Auth Success', result);
					dispatch(authStatus(AUTH_LOGGED_IN));
				}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log("Email registration error", errorCode, errorMessage);
		  dispatch(authStatus(AUTH_ERROR, `Email registration error - Error Code: ${errorCode} - Error Message: ${errorMessage}`));
		});
	};
};

export var startLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(() => {
			dispatch(authStatus(AUTH_LOGGED_OUT));
			console.log('logged out');
		});
	};
};

//Actions for auth Login and logout -- stored in auth: section of store
export var authLogin = (uid) => {
	return {
		type: LOGIN,
		uid
	};
};

export var authLogout = () => {
	return {
		type: LOGOUT
	};
};

//Actions for Auth status
export var authStatus = (status, errorMessage=undefined) => {
	return {
		type: status,
		errorMessage
	}
};
