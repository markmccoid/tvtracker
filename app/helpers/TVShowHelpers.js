import helpers from './helpers';

export default {
	getNextEpisode: (tvShow) => {
		//--------------------------------
		//--GET NEXT EPISODE
		//--------------------------------
		//Loop through selected show and find episode airing after or on today
		const currentDateValue = helpers.getCurrentDateObject().valueOf();
		var episodesAfterToday = tvShow.seasonData[tvShow.seasonData.length-1].episodeDetail.filter((episode) => {
			let epDateValue = new Date(episode.episodeAirDate).valueOf();
			return epDateValue >= currentDateValue;
		});


		var nextEpisodeObj;
		if ( episodesAfterToday.length === 0 ) {  //if this array (build above) returns 0, then there are no episodes after today.  return a blank object
			let currSeason = tvShow.seasonData[tvShow.seasonData.length-1];
			var lastEpisode = currSeason.episodeDetail[currSeason.episodeDetail.length-1];
			nextEpisodeObj = {date: lastEpisode.episodeAirDate, number: lastEpisode.episodeNumber, title: 'Last Episode'};
		} else {
			//grab the first episode in the array (the next one to show) Display in render below
			nextEpisodeObj = {date: episodesAfterToday[0].episodeAirDate, number: episodesAfterToday[0].episodeNumber, title: 'Next Episode'};
			// var episodeDate = new Date(tvShow.seasonData[tvShow.seasonData.length-1].episodeDetail[4].episodeAirDate).valueOf();
			// console.log('TVItemDetail: ', tvShow.name, tvShow.seasonData[tvShow.seasonData.length-1].episodeDetail[4].episodeAirDate);
			// console.log(helpers.getCurrentDateObject().valueOf(), helpers.getCurrentDateString(), episodeDate);
			//-------------------------
		}
		return nextEpisodeObj;
		//--END  GET NEXT EPISODE
	}
};
