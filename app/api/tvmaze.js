var axios = require('axios');
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
				return res.data;
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
				var showData = showInfoResponse.data;
				var episodeData = episodeResponse.data;
				var epObj;
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
				return ({showData: showData,
								seasonData: seasonArray} );

			}));
	}
}

