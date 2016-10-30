import axios from 'axios';
import tvMaze from 'tvmaze';

export const ADD_SHOW_BY_ID = 'ADD_SHOW_BY_ID';  //
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SHOW_SELECTED = 'SHOW_SELECTED';
export const LOAD_NEWSHOWS = 'LOAD_NEWSHOWS';
export const SET_ADD_NEW_SHOW = 'SET_ADD_NEW_SHOW';
export const ON_DL_FORM_CHANGE = 'ON_DL_FORM_CHANGE'; //When user updates the season and episode downloaded inputs
export const ON_WATCHING_FORM_CHANGE = 'ON_WATCHING_FORM_CHANGE';
export const ON_DELETE_SHOW = 'ON_DELETE_SHOW';

export function addShowById(showId) {
//showData can either hold one show or an array of shows
	var request = tvMaze.getTVInfoAndEpisodes(showId);
	return {
		type: ADD_SHOW_BY_ID,
		payload: request
	};
}

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
}

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
}

export var deleteShow = (showId) => {
	return {
		type: ON_DELETE_SHOW,
		payload: showId
	};
}
