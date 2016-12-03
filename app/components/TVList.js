import React from 'react';
import { connect } from 'react-redux';
require('semantic-ui-css/semantic');
import { Accordion, Icon } from 'semantic-ui-react';

import _ from 'lodash';

import TVListItem from 'TVListItem';
import tvMaze from './../api/tvMaze';
import { loadNewShows, showSelected, addingNewShow, setNewShowFlag } from '../actions/actions';
import helpers from '../helpers/helpers';

class TVList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var { tvShows, showData } = this.props;
		//Since we are modifying groups, need a new array of groups to work with.
		var groups = [...this.props.groups];
		groups.push({
			name: "All",
			description: "Default list of all shows",
			firebaseKey: '',
			members: tvShows.map((show) => ({tvShowFirebaseKey: show.firebaseKey, tvShowName: show.name, tvShowId: show.id})),
			sort: groups.length + 1
		});

		//Create a new array of sorted TVShow objects
		//let tvShowsSorted = [...tvShows].sort((a,b) => helpers.objectSort(a,b, 'name'));
		let tvShowsSorted = _.sortBy([...tvShows],'name');
		let getTVListItems;

		//Check to see if we are still loading data from firebase (dataLoading from redux store)
		if ( this.props.dataLoading ) {
			getTVListItems = <li className="text-center"><img src="./images/ajax-loader.gif" /></li>;
		} else {
			//Once done loading initialize to "no Show" in case we have no shows
			getTVListItems = <li>No Shows</li>
		}

		//If we have some shows, let's create the list!
		if (tvShows.length > 0 ) {
			//If there are groups, then render with groups/
			//Need to have a default "All" group that always exists in the group array
			//Could create programatically here or put in store..  Programatically probably easier/better
			if (groups.length > 0){
				let groupsSorted = _.sortBy([...groups], 'sort');
				// let groupsSorted = [...groups];
				// groupsSorted.sort((a,b) => helpers.objectSort(a,b, 'sort'));
				getTVListItems = groupsSorted.map((group) => {
					let groupHeader = <Accordion.Title>
				          						<Icon name='dropdown' />
				          						<strong>{group.name}</strong>
				        						</Accordion.Title>;
				  var sortedMembers = _.sortBy([...group.members], 'tvShowName');
					// var sortedMembers = [...group.members];
					// sortedMembers.sort((a,b) => helpers.objectSort(a,b, 'tvShowName'));

					let showList = sortedMembers.map((memberShow) => {
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
				//If we have no groups, just render the sorted tv Show list
				getTVListItems = tvShowsSorted.map((tvShow) => {
							let currShowData = showData.filter((obj) => tvShow.id === obj.showId)[0];
							return (
								<TVListItem tvShow={tvShow}
														showData={currShowData}
														showSelectedId={this.props.showSeletedId}
														onSelectShow={this.props.showSelected}
														key={tvShow.id}/>
							);
						});
			}
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

