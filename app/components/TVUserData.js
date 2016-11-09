import React from 'react';
import { connect } from 'react-redux';

import { startOnDownloadChange, startOnWatchingChange, startAddUserLink, onLinkDelete } from '../actions/actions';
import Link from 'Link';

class TVUserData extends React.Component {
		constructor(props) {
		super(props);

	}

	render() {
	var { showData, startOnDownloadChange, startOnWatchingChange, onLinkDelete } = this.props;
// console.log(this.props.showData.showLinks);
// console.log(this.props);
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
						value={showData.seasonDownloading}
						onChange={(event) => startOnDownloadChange('s', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>
				<div className="columns medium-3">
					<p className="detail-title">Episode DL</p>
					<input
						type="text"
						value={showData.episodeDownloading}
						onChange={(event) => startOnDownloadChange('e', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>

				<div className="columns medium-3" style={{borderLeft:"1px solid #ccc"}}>
					<p className="detail-title">Season Watching</p>
					<input
						type="text"
						value={showData.seasonWatching}
						onChange={(event) => startOnWatchingChange('s', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>
				<div className="columns medium-3">
					<p className="detail-title">Episode Watching</p>
					<input
						type="text"
						value={showData.episodeWatching}
						onChange={(event) => startOnWatchingChange('e', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>
			</div>
		</div>;
	return (
		<div>
			{downloadingJSX}
			<form onSubmit={(e)=> {
						e.preventDefault();
						var link = this.refs.link.value.trim();
						var linkDescription = this.refs.linkDesc.value.trim();

						if ( link.length > 0 && linkDescription.length > 0) {
							this.props.startAddUserLink(showData, this.refs.link.value, this.refs.linkDesc.value);
						}
						this.refs.link.value = '';
						this.refs.linkDesc.value = '';
					}
				}>
			<div className="row align-bottom">
				<div className="columns medium-2">
					<button className="button">Add Link</button>
				</div>
				<div className="columns medium-5">
					<label>Link
					<input
						type="text"
						name="link"
						ref="link" />
					</label>
				</div>
				<div className="columns medium-5">
					<label>Link Description
					<input
						type="text"
						name="linkDesc"
						ref="linkDesc" />
					</label>
				</div>
			</div>
			</form>

				{!this.props.showData.showLinks ? null : this.props.showData.showLinks.map((linkObj, idx) => {
					return (
						<Link link={linkObj.link}
									linkDescription={linkObj.linkDescription}
									index={idx}
									showSelected={showData.showId}
									key={idx}
									onLinkDelete={onLinkDelete}/>

					);
				})}

			<label> <h5>Show Notes</h5>
				<textarea rows="2" cols="50">

				</textarea>
			</label>
		</div>
	);
}
};

export default connect(null, {
	startOnDownloadChange,
	startOnWatchingChange,
	startAddUserLink,
	onLinkDelete
})(TVUserData);

