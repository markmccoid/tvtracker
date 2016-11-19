var axios = require('axios');
import firebase, { firebaseRef } from '../firebase';

import _ from 'lodash';

const TVMAZESHOWSEARCH_URL = 'http://api.tvmaze.com/search/shows';
const TVMAZEIDSEARCH_URL = 'http://api.tvmaze.com/shows/';
// 347024191b7ce6ada1f7dfa6e5881348
// q=searchterm

module.exports = {
	//Will return an array of show objects:
	//--USAGE
	// tvMaze.getTVInfoByName('Raising').then(function (theData){
	// 		console.log(theData[0]);
	// 	}, function (e){
	// 		console.log(e);
	// 	});
	getTVInfoByName: function(tvShowName){
		var encodedtvShowName = encodeURIComponent(tvShowName);
		var requestUrl = `${TVMAZESHOWSEARCH_URL}?q=${encodedtvShowName}`;

		// console.log(requestUrl);

		return axios.get(requestUrl).then(function(res){
				return res.data.map((obj) => obj.show);
		}, function(res){
			throw new Error(res);
		});
	},

	getTVInfoById: function(tvShowId){
		var encodedtvShowId = encodeURIComponent(tvShowId);
		var requestUrl = `${TVMAZEIDSEARCH_URL}${encodedtvShowId}`;
		// console.log(requestUrl);

		return axios.get(requestUrl).then(function(res){
				return res.data;
		}, function(res){
			throw new Error(res);
		});
	},

	getTVInfoAndEpisodes: function (tvShowId) {
		var encodedtvShowId = encodeURIComponent(tvShowId);
		var requestUrl = `${TVMAZEIDSEARCH_URL}${encodedtvShowId}`;

		return axios.all([
			axios.get(requestUrl),
			axios.get(`${requestUrl}/episodes`)
			])
			.then(axios.spread(function(showInfoResponse, episodeResponse){
				var showDataTemp = showInfoResponse.data;
				var episodeData = episodeResponse.data;
				var epObj;

				//Deal with null images
				var image = showDataTemp.image || {medium: './images/placeholder.png'};
				var showImage = image.medium;

				//create an link to the imdb page and download page
				var imdbLink = `http://www.imdb.com/title/${showDataTemp.externals.imdb}`;
				var downloadLink = `https://thepiratebay.org/search/${showDataTemp.name}`;
				//Build showData object.  Pull off pieces from resonse that we want
				var showData = {
					id: showDataTemp.id,
					name: showDataTemp.name,
					summary: showDataTemp.summary,
					genres: showDataTemp.genres,
					status: showDataTemp.status,
					runtime: showDataTemp.runtime,
					premiered: showDataTemp.premiered,
					dayAired: showDataTemp.dayAired === undefined ? null : showDataTemp.dayAired,
					image: showImage,
					seasons: showDataTemp.seasons === undefined ? null : showDataTemp.seasons,
					imdbLink: imdbLink,
					downloadLink: downloadLink
				};

				//Get array of unique seasons
				var seasons = _.uniq(episodeData.map((episode) => {
					return (episode.season);
				}));
				//Produce an Array of objects one for each season
				// [{
				// 	season: 1,
				// 	episodes: 12,
				// 	episodeDetail: [{
				// 		episodeNumber: 1,
				// 		episodeName:'the name',
				// 		episodeAirDate: '2009-03-18'
				// 	},
				// 	{...}]
				// },
				// {...}]
				var seasonArray = seasons.map((seasonNum) => {
					var seasonObj = {
						season: seasonNum,
						episodes: episodeData.filter((episode) => episode.season === seasonNum).length,
						episodeDetail: episodeData.filter((episode) => episode.season === seasonNum)
							.map((episode) => {
									return ({
											episodeNumber: episode.number,
											episodeName: episode.name,
											episodeAirDate: episode.airdate
										});
								})
					};
					return seasonObj;
				});
				//Last step is to return the show data and the seasonData that we build above.
				//unpack the showData object so we have
				// - Data from tvMaze API
				// - seasonsDetail node data
				// - create empty downloading and watching objects
				return (	{	...showData,
										seasonData: seasonArray
									} );

			}));
	},

	// loadInitialData: function () {
	// 	var stringtvShows = localStorage.getItem('tvShows');
	// 	var tvShows = [];

	// 	try {
	// 		if ( tvShows === null ) {
	// 			return [];
	// 		} else {
	// 			tvShows = JSON.parse(stringtvShows);
	// 		}
	// 	} catch (e) {
	// 		alert("error loading TVShows from localStorage: ", e);
	// 	}
	// 	return Array.isArray(tvShows) ? tvShows : [];
	// },

	loadInitialData: function (uid) {
		var showData = [];

		var showDataArray = [];
		var tvShowsArray = [];
		var groupsArray = [];

		return firebaseRef.child(`users/${uid}`).once('value').then((snap) => {
			//make sure we have some data if not, return empty arrays
			if (!snap.val()) {
				return {
								tvShows: tvShowsArray,
								showData: showDataArray,
								groups: groupsArray
							};
			}
			var snapData = snap.val().showData;
			var tvData = snap.val().tvShows;
			var groupsData = snap.val().groups;

			showDataArray = Object.keys(snapData).map((objKey) => {
				return {...snapData[objKey], firebaseKey: objKey};
			});
			tvShowsArray = Object.keys(tvData).map((objKey) => {
				return {...tvData[objKey], firebaseKey: objKey};
			});
			groupsArray = Object.keys(groupsData).map((objKey) => {
				return {...groupsData[objKey], firebaseKey: objKey};
			});
			return {tvShows: tvShowsArray, showData: showDataArray, groups: groupsArray};
		});
	}
};

