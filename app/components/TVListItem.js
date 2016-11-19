import React from 'react';
import TVShowHelpers from '../helpers/TVShowHelpers';

class TVListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var tvShow = this.props.tvShow;
		var { seasonDownloading, episodeDownloading } = this.props.showData;
		if ( parseInt(seasonDownloading) < 10 ) {
			seasonDownloading = `0${seasonDownloading}`;
		}
		if ( parseInt(episodeDownloading) < 10 ) {
			episodeDownloading = `0${episodeDownloading}`;
		}
		var showSelectedId = this.props.showSelectedId;
		var nextEpisodeObj = TVShowHelpers.getNextEpisode(tvShow);
		return (
			<li key={tvShow.name} className={showSelectedId === tvShow.id ? "tt-active" : ""}>
				<a href="#" onClick={() => this.props.onSelectShow(tvShow.id)}>{tvShow.name} <br />
					<div className={showSelectedId === tvShow.id ? "details tt-active" : "details"}>
						{`${nextEpisodeObj.title}-${nextEpisodeObj.date}-#${nextEpisodeObj.number}-Last DL-S${seasonDownloading}.E${episodeDownloading}`}
					</div>
				</a>
			</li>
		);
	}
};

export default TVListItem;
