import React from 'react';
import { connect } from 'react-redux';
require('semantic-ui-css/semantic');
import { Accordion, Icon } from 'semantic-ui-react';

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
		var { tvShows, showData } = this.props;
		//Since we are modifying groups, need a new array of groups to work with.
		var groups = [...this.props.groups];
		groups.push({
			name: "All",
			description: "Default list of all shows",
			firebaseKey: '',
			members: tvShows.map((show) => ({tvShowFirebaseKey: show.firebaseKey, tvShowName: show.name, tvShowId: show.id}))
		});


		var tvShowsSorted = [...tvShows].sort(this.showSort);
		var loadingOrEmptyJSX;
		var getTVListItems;
		if ( this.props.dataLoading ) {
			loadingOrEmptyJSX = <li className="text-center"><img src="./images/ajax-loader.gif" /></li>;
		} else {
			loadingOrEmptyJSX = <li>No Shows</li>
		}

		if (tvShows.length < 1 || tvShows === undefined) {
			getTVListItems =	loadingOrEmptyJSX;
			//<div>No Shows</div>
		} else {
			//If there are groups, then render with groups/
			//Need to have a default "All" group that always exists in the group array
			//Could create programatically here or put in store..  Programatically probably easier/better
			if (groups.length > 0){
				getTVListItems = groups.map((group) => {
					let groupHeader = <Accordion.Title>
				          						<Icon name='dropdown' />
				          						<strong>{group.name}</strong>
				        						</Accordion.Title>;
					let showList = group.members.map((memberShow) => {
						//Get the showData for the current memberShow
						let currShowData = showData.filter((obj) => memberShow.tvShowId === obj.showId)[0];
						let currentTVShow = tvShows.filter((show) => memberShow.tvShowId === show.id)[0];
						return (
								<TVListItem tvShow={currentTVShow}
														showData={currShowData}
														showSelectedId={this.props.showSeletedId}
														onSelectShow={this.props.showSelected}
														key={memberShow.tvShowId} />
						);
					});
					let wrappedList = <Accordion.Content>
														<ul className="menu vertical">
														{showList}
														</ul>
														</Accordion.Content>;
					return [groupHeader, wrappedList];
				});
			} else {
				getTVListItems = tvShowsSorted.map((tvShow) => {
							let currShowData = showData.filter((obj) => tvShow.id === obj.showId)[0];
							return (
								<TVListItem tvShow={tvShow} showData={currShowData} showSelectedId={this.props.showSeletedId} onSelectShow={this.props.showSelected} key={tvShow.id}/>
							);
						});
			}
		}
console.log("tvList", groups);
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
				<Accordion>

						{getTVListItems}

				</Accordion>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		dataLoading: state.dataLoading,
		showSeletedId: state.showSelectedId
	}
}

export default connect(mapStateToProps, {
		loadNewShows,
		showSelected,
		addingNewShow,
		setNewShowFlag
	})(TVList);

