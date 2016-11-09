import React from 'react';
import { connect } from 'react-redux';

import TVListItem from 'TVListItem';
import tvMaze from './../api/tvMaze';
import { loadNewShows, showSelected, addingNewShow, setNewShowFlag } from '../actions/actions';

class TVList extends React.Component {
	constructor(props) {
		super(props);
	}

//Simple sort function to sort the tvShow object array alphabetically by name
	showSort = (a, b) => {
	  if (a.name > b.name) {
	    return 1;
	  }
	  if (a.name < b.name) {
	    return -1;
	  }
	  // a must be equal to b
	  return 0;
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
			getTVListItems = tvShows.sort(this.showSort).map((tvShow) => {
				return (
					<TVListItem showName={tvShow.name} showId={tvShow.id} onSelectShow={this.props.showSelected} key={tvShow.id}/>
				);
			});
		}

		return (
			<div className="callout secondary" style={{height:"100%"}}>
				<div>
	        <div><button
	        			onClick={(event) => {
	        				//Set add new show flag to true
									this.props.setNewShowFlag(true);
			        	}}
	        			type="button"
	        			className="button expanded">
	        			Add New Show
	        		</button>
	        </div>
				</div>
				<hr />
				<ul className="menu vertical">
						{getTVListItems}
				</ul>
			</div>
		);
	}
};

// function mapStateToProps(state) {
// 	return {
// 		tvShows: state.tvShows,
// 		showSearchTerm: state.newShowsInfo.showSearchTerm
// 	}
// }
export default connect(null, {
	loadNewShows,
	showSelected,
	addingNewShow,
	setNewShowFlag
})(TVList);

