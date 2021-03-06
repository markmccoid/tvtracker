import React from 'react';
import { connect } from 'react-redux';

import { startOnDownloadChange,
					startOnWatchingChange,
					startAddUserLink,
					startOnLinkDelete,
					startAddShowSource,
					startAddShowNotes,
					addShowNotes } from '../actions/actions';
import Link from 'Link';
import TVShowSource from './TVShowSource';

class TVUserData extends React.Component {
		constructor(props) {
		super(props);

		this.state = {
			showAddLink: false,
			addLinkIcon: './images/TriangleRightBlue.png'
		}
	}

	onLinkDelete = (showId, index) => {
		var showData = this.props.showData;
		this.props.startOnLinkDelete(showId, index, showData);
	}

	render() {
	var { showData, startOnDownloadChange, startOnWatchingChange, startOnLinkDelete, startAddShowSource, startAddShowNotes, addShowNotes } = this.props;
	//console.log(showData);

	var addLinkForm =
				<form onSubmit={(e)=> {
						e.preventDefault();
						var link = this.refs.link.value.trim();
						var linkDescription = this.refs.linkDesc.value.trim();

						if ( link.length > 0 && linkDescription.length > 0) {
							this.props.startAddUserLink(showData, this.refs.link.value, this.refs.linkDesc.value);
						}
						this.refs.link.value = '';
						this.refs.linkDesc.value = '';
						this.setState({
								showAddLink: false,
								addLinkIcon: this.state.showAddLink ? './images/TriangleRightBlue.png' : './images/TriangleDownBlue.png'
							});
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
			</form>;
	//If showSource download, then this guy
	let downloadSection1JSX =
				<div className="columns medium-2" key="1">
					<p className="detail-title">Season Downloaded</p>
					<input
						type="number"
						value={showData.seasonDownloading}
						onChange={(event) => startOnDownloadChange('s', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>;
	let downloadSection2JSX =
				<div className="columns medium-2"  key="2">
					<p className="detail-title">Episode Downloaded</p>
					<input
						type="number"
						value={showData.episodeDownloading}
						onChange={(event) => startOnDownloadChange('e', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>;
	let downloadSection3JSX = <div className="columns medium-2" key="3"></div>;
	let downloadSectionJSX = [downloadSection1JSX, downloadSection2JSX, downloadSection3JSX];
	let otherSectionJSX = <div className="columns medium-6" style={{ alignItems: "center" }}><img src={`./images/${showData.showSource}.png`} height='150px'  /></div>;

	let downloadWatchingJSX =
		<div className="callout" style={{paddingTop:0, paddingBottom: 0}}>

			<div className="row">
				<div className="column small-6">
					<TVShowSource
						onShowSourceChange={showSource => startAddShowSource(showSource, showData.showId, showData.firebaseKey)}
						showSource={showData.showSource ? showData.showSource : 'download' }
					/>
				</div>
				<div className="column small-6" style={{borderLeft:"1px solid #ccc"}}>
					<h4 className="text-center">Watching</h4>
				</div>
			</div>
			<div className="row">

				{showData.showSource === 'download' ? downloadSectionJSX : otherSectionJSX}

				<div className="columns medium-2" style={{borderLeft:"1px solid #ccc"}}>
					<p className="detail-title">Season Watching</p>
					<input
						type="number"
						value={showData.seasonWatching}
						onChange={(event) => startOnWatchingChange('s', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>
				<div className="columns medium-2">
					<p className="detail-title">Episode Watching</p>
					<input
						type="number"
						value={showData.episodeWatching}
						onChange={(event) => startOnWatchingChange('e', event.target.value, showData.showId, showData.firebaseKey)}
						/>
				</div>
				<div className="columns medium-2">
					<p className="detail-title" style={{borderBottom: "0"}}>Progress Watching</p>
				  <input 	type="radio"
				  				name="rWatching"
				  				value="watched"
				  				checked={showData.episodeProgress === 'watched'}
				  				onChange={(event) => startOnWatchingChange('r', event.target.value, showData.showId, showData.firebaseKey)}/> Watched<br />
				  <input 	type="radio"
				  				name="rWatching"
				  				value="inProgress"
									checked={showData.episodeProgress === 'inProgress'}
				  				onChange={(event) => startOnWatchingChange('r', event.target.value, showData.showId, showData.firebaseKey)}/> In Progress
				</div>
			</div>
		</div>;
	return (
		<div>
			{downloadWatchingJSX}

			<a onClick={() => {
						this.setState({
							showAddLink: !this.state.showAddLink,
							addLinkIcon: this.state.showAddLink ? './images/TriangleRightBlue.png' : './images/TriangleDownBlue.png'
						});
					}
				} >
				<img className="hover-pointer" src={this.state.addLinkIcon} width="32" height="32"/>
			</a>
			{this.state.showAddLink ? addLinkForm : null}

				{!this.props.showData.showLinks ? null : this.props.showData.showLinks.map((linkObj, idx) => {
					return (
						<Link link={linkObj.link}
									linkDescription={linkObj.linkDescription}
									index={idx}
									showSelected={showData.showId}
									key={idx}
									onLinkDelete={this.onLinkDelete}/>

					);
				})}

			<label> <h5>Show Notes</h5>
				<textarea rows="2" cols="50"
					onChange={(e) => addShowNotes(showData.showId, e.target.value)}
					onBlur={(e) => startAddShowNotes(e.target.value, showData.showId, showData.firebaseKey)}
					value={showData.showNotes}
					/>
			</label>
			<button className="button small" onClick={() => startAddShowNotes(showData.showNotes, showData.showId, showData.firebaseKey)}>Save Note</button>
		</div>
	);
}
};

export default connect(null, {
	startOnDownloadChange,
	startOnWatchingChange,
	startAddUserLink,
	startOnLinkDelete,
	startAddShowSource,
	startAddShowNotes,
	addShowNotes
})(TVUserData);

