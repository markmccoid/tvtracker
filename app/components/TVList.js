import React from 'react';
import { connect } from 'react-redux';

import TVListItem from 'TVListItem';
import tvMaze from './../api/tvMaze';
import { loadNewShows, showSelected, setSearchText, setNewShowFlag } from '../actions/actions';

class TVList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// tvMaze.getTVInfoById(580).then(function (theData){
		// 	console.log(theData);
		// }, function (e){
		// 	console.log(e);
		// });
		var { tvShows } = this.props;
		var getTVListItems;

		if (tvShows.length < 1 || tvShows === undefined) {
			getTVListItems =	<div>No Shows</div>
		} else {
			getTVListItems = tvShows.map((tvShow) => {
				return (
					<TVListItem showName={tvShow.name} showId={tvShow.id} onSelectShow={this.props.showSelected} key={tvShow.id}/>
				);
			});
		}

		return (
			<div>
				<ul className="menu">
					<li><input
								type="text"
								ref="tvSearchText"
								value={this.props.showSearchTerm}
								onChange={() => this.props.setSearchText(this.refs.tvSearchText.value)}
								placeholder="TV Show Name" />
					</li>
	        <li><button
	        			onClick={(event) => {
									//onAddShow(this.refs.tvSearchText.value);
									this.props.loadNewShows(this.props.showSearchTerm);
									this.props.setSearchText('');
			        		//this.refs.tvSearchText.value = '';
			        	}}
	        			type="button"
	        			className="button">Search
	        		</button>
	        </li>
				</ul>
				<ul className="menu vertical">
						{getTVListItems}
				</ul>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		tvShows: state.tvShows,
		showSearchTerm: state.newShowsInfo.showSearchTerm
	}
}
export default connect(mapStateToProps, {
	loadNewShows,
	showSelected,
	setSearchText,
	setNewShowFlag
})(TVList);

