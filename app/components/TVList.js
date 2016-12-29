import React from 'react';
import { connect } from 'react-redux';
// require('semantic-ui-css/semantic');
// import { Accordion, Icon } from 'semantic-ui-react';
import { Collapse } from 'antd';

import _ from 'lodash';

import TVListItem from 'TVListItem';
import TVSearchBox from 'TVSearchBox';
import tvMaze from './../api/tvMaze';
import { loadNewShows, showSelected, addingNewShow, setNewShowFlag } from '../actions/actions';
import helpers from '../helpers/helpers';

class TVList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			showSearchBox: false
		}
	}

	onSearch = (searchText) => {
		//Set the state to the text user is searching for
		//Will cause a rerender and filtering of tvShows based on search text
		this.setState({searchText});
	}
	onShowSearch = () => {
		this.setState({showSearchBox: true});
	}
	render() {
		var { tvShows, showData } = this.props;
		//set variable so we know if we are searching i.e. if we are, don't show groups
		let searchingFlag = false;
		//Handle search string searching
		let searchText = this.state.searchText;
		if (searchText.length > 0) {
			//set variable so we know we are searching -- don't show groups
			searchingFlag = true;
			//convert input string to a regular expression object to pass to match function
			let reSearchString = new RegExp(searchText.toLowerCase(), "g");
			tvShows = this.props.tvShows.filter(function(show){
				if (show.name) {
					return show.name.toLowerCase().match(reSearchString);
				}
			});
		}

		//For antd accordion
		const Panel = Collapse.Panel;
		//Since we are modifying groups, need a new array of groups to work with.
		var groups = [...this.props.groups];
		//If we have at least one group then push an "All" group
		if (groups.length > 0) {
			groups.push({
				name: "All",
				description: "Default list of all shows",
				firebaseKey: '',
				members: tvShows.map((show) => ({tvShowFirebaseKey: show.firebaseKey, tvShowName: show.name, tvShowId: show.id})),
				sort: groups.length + 1
			});
		}
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
			if (groups.length > 0 && !searchingFlag){
				let groupsSorted = _.sortBy([...groups], 'sort');
				// let groupsSorted = [...groups];
				// groupsSorted.sort((a,b) => helpers.objectSort(a,b, 'sort'));
				let getTVListItemsHold = groupsSorted.map((group) => {

				  //Could probably just use this:: var sortedMembers = _.sortBy([...group.members], 'tvShowName');
				  //Since we are bypassing building groups when searching.  However the below ensures that only members
				  //that are in the tvShows array passed into TVList component will be shown in group.
				  var sortedMembers = _([...group.members], 'tvShowName')
				  															.sortBy()
				  															.filter(member => {
				  																return _.find(tvShows, function (show) {return member.tvShowName === show.name;}) !== undefined;
				  															}).value();
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
					let wrappedList = <Panel header={group.name}>
														<ul className="menu vertical">
														{showList}
														</ul>
														</Panel>;
					return [wrappedList];
				});
				getTVListItems = <Collapse accordion>{getTVListItemsHold}</Collapse>
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
				getTVListItems = <ul className="menu vertical"> {getTVListItems} </ul>
			}
		}

		let searchBoxJSX;
		if (this.state.showSearchBox) {
			searchBoxJSX = <TVSearchBox onSearch={this.onSearch} onClear={() => this.setState({showSearchBox: false})}/>;
		} else {
			searchBoxJSX = <h5 style={{cursor: "pointer", border:"1px solid gray", textAlign:"center"}} onClick={() => this.setState({showSearchBox: true})}>Search</h5>;
		}

		return (
			<div className="callout secondary tv-list" style={{height:"100%"}}>
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
	        <div>
	        	{searchBoxJSX}
	        </div>
				</div>
				<hr />

					{getTVListItems}

			</div>
		);
	}
};

TVList.propTypes = {
	tvShows: React.PropTypes.array,
	showData: React.PropTypes.array,
	groups: React.PropTypes.array
}

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

