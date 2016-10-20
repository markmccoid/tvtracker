import React from 'react';
import tvMaze from './../api/tvMaze';

class TVItemDetail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { tvShows, showSelectedId, onDownloadChange} = this.props;
		//const { showSelectedId, tvMazeAPIData } = showSelected;

		//if now showSelected in props, then don't render this section
		//In future could render a default show or put some other "temp" JSX
		if (showSelectedId === undefined) {
			return null;
		}

		//the tvShow object is sending all of the tvShows, must pick out the one selected by filtering
		//using the passed this.props.showSelected.showSelectedId.
		var tvShow = this.props.tvShows.filter((show) => show.id === showSelectedId)[0];
		//-------------------------
		var downloadingJSX =
				<div className="callout">
					<div className="row">
						<div className="column small-12">
							<h4>Downloading</h4>
						</div>
					</div>
					<div className="row">
						<div className="columns medium-4">
							<p className="detail-title">Season Downloading</p>
							<input
								type="text"
								value={tvShow.downloading.seasonDownloading}
								onChange={(event) => onDownloadChange('s', event.target.value, showSelectedId)}
								/>
						</div>
						<div className="columns medium-8">
							<p className="detail-title">Episode Downloading</p>
							<input
								type="text"
								value={tvShow.downloading.episodeDownloading}
								onChange={(event) => onDownloadChange('e', event.target.value, showSelectedId)}
								/>
						</div>
					</div>
				</div>;

		return (
			<div>
				<p>Show Selected: {showSelectedId}</p>
				<div className="row">
					<div className="shrink columns medium-4">
						<img src={tvShow.image} />
					</div>
					<div className="columns">
						<div className="row">
							<div className="columns small-12">
								<p className="detail-title">Show</p>
								<p>{tvShow.name}</p>
							</div>
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
	}
	onDownloadChange(type, value, showSelected) {
		this.props.onDownloadChange(type, value, showSelected);
	}
};

export default TVItemDetail;
