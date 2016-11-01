import React from 'react';
import { connect } from 'react-redux';
import { onDownloadChange, deleteShow, onWatchingChange } from '../actions/actions';
var alertify = require('alertifyjs');
import helpers from '../helpers/helpers';

const TVItemDetail = ({ tvShow, showSelectedId, onDownloadChange, deleteShow, onWatchingChange }) => {

  if (!tvShow) {
  	return <div></div>
  }
	var onDeleteShow = (showId, showName) => {
	alertify.confirm('', `Confirm Deletion of ${showName}`,
									() => {
										deleteShow(showId);
										alertify.success(`Deleted ${showName}`);
									},
              		() => {
              			alertify.error(`Canceled delete of ${showName}`)
              		});
	};

		//Loop through selected show and find episode airing after or on today
		const currentDateValue = helpers.getCurrentDateObject().valueOf();
		var episodesAfterToday = tvShow.seasonData[tvShow.seasonData.length-1].episodeDetail.filter((episode) => {
			let epDateValue = new Date(episode.episodeAirDate).valueOf();
			return epDateValue >= currentDateValue;
		});

		var nextEpisodeObj;
		if ( episodesAfterToday.length === 0 ) {  //if this array (build above) returns 0, then there are no episodes after today.  return a blank object
			nextEpisodeObj = {date: '', number: ''};
		} else {
			//grab the first episode in the array (the next one to show) Display in render below
			nextEpisodeObj = {date: episodesAfterToday[0].episodeAirDate, number: episodesAfterToday[0].episodeNumber};
			// var episodeDate = new Date(tvShow.seasonData[tvShow.seasonData.length-1].episodeDetail[4].episodeAirDate).valueOf();
			// console.log('TVItemDetail: ', tvShow.name, tvShow.seasonData[tvShow.seasonData.length-1].episodeDetail[4].episodeAirDate);
			// console.log(helpers.getCurrentDateObject().valueOf(), helpers.getCurrentDateString(), episodeDate);
			//-------------------------
		}

		var downloadingJSX =
				<div className="callout" style={{paddingTop:0, paddingBottom: 0}}>
					<div className="row">
						<div className="column small-6">
							<h4 className="text-center">Downloading</h4>
						</div>
						<div className="column small-6" style={{borderLeft:"1px solid #ccc"}}>
							<h4 className="text-center">Watching</h4>
						</div>
					</div>
					<div className="row">
						<div className="columns medium-3">
							<p className="detail-title">Season DL</p>
							<input
								type="text"
								value={tvShow.downloading.seasonDownloading}
								onChange={(event) => onDownloadChange('s', event.target.value, showSelectedId)}
								/>
						</div>
						<div className="columns medium-3">
							<p className="detail-title">Episode DL</p>
							<input
								type="text"
								value={tvShow.downloading.episodeDownloading}
								onChange={(event) => onDownloadChange('e', event.target.value, showSelectedId)}
								/>
						</div>

						<div className="columns medium-3" style={{borderLeft:"1px solid #ccc"}}>
							<p className="detail-title">Season Watching</p>
							<input
								type="text"
								value={tvShow.watching.seasonWatching}
								onChange={(event) => onWatchingChange('s', event.target.value, showSelectedId)}
								/>
						</div>
						<div className="columns medium-3">
							<p className="detail-title">Episode Watching</p>
							<input
								type="text"
								value={tvShow.watching.episodeWatching}
								onChange={(event) => onWatchingChange('e', event.target.value, showSelectedId)}
								/>
						</div>
					</div>
				</div>;
				var nextEpisodeBlock = <div className="columns small-4 callout small secondary">
								<p className="detail-title">Next Episode</p>
								<p>{nextEpisodeObj.date} | {nextEpisodeObj.number}</p>
							</div>;
		return (
			<div>
				<span>Show Selected: {showSelectedId}</span>
				<div className="row">
					<div className="shrink columns medium-4">
						<div className="row">
							<div className="columns medium-12">
								<img src={tvShow.image} />
							</div>
							<div className="columns medium-12">
								<a href="#" onClick={()=> onDeleteShow(showSelectedId, tvShow.name)} className="button alert">Delete</a>
							</div>
						</div>
					</div>
					<div className="columns">
						<div className="row">
							<div className="columns small-6 callout small secondary">
								<p className="detail-title">Show</p>
								<p>{tvShow.name}</p>
							</div>
							<div className="columns small-2 callout small secondary">
								<p className="detail-title">Status</p>
								<p>{tvShow.status}</p>
							</div>
							{nextEpisodeObj.date === '' ? '' : nextEpisodeBlock}
						</div>
						<div className="row">
							<div className="columns small-12">
								<p className="detail-title">Summary</p>
								<div dangerouslySetInnerHTML={{__html: tvShow.summary}}></div>
							</div>
						</div>
					</div>
				</div>
				{downloadingJSX}
			</div>
		);
	};

// export default TVItemDetail;
export default connect(null, {
	onDownloadChange,
	deleteShow,
	onWatchingChange
})(TVItemDetail);
