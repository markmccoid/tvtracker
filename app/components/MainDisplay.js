import React from 'react';

//Import Components
import TVList from 'TVList';
import TVItemDetail from 'TVItemDetail';
import AddTVShow from 'AddTVShow';

//Import APIs and Helpers
import tvMaze from './../api/tvMaze';
import helpers from './../helpers/helpers';

class MainDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tvShows: helpers.initData,
			showSelectedId: undefined,
			addingNewShow: false,
			newShowsInfo: {
				showSearchTerm: '',
				showsReturned: []
			}
		};
		//Need to bind any functions that try to set state to this??
		this.onAddShow = this.onAddShow.bind(this);
		this.onDownloadChange = this.onDownloadChange.bind(this);
		this.onAddShowSelect = this.onAddShowSelect.bind(this);
	}

	render() {
		//determine if we should show the TVItemDetail or the AddTVShow
		var detailPane = () => {
			if (this.state.addingNewShow) {
				return <AddTVShow shows={this.state.newShowsInfo.showsReturned} onAddShowSelect={this.onAddShowSelect}/>
			} else {
				return <TVItemDetail showSelectedId={this.state.showSelectedId} tvShows={this.state.tvShows} onDownloadChange={this.onDownloadChange}/>
			}
		}
		return (
			<div className="row">
				<div className="columns small-4">
					<TVList tvShows={ this.state.tvShows } onAddShow={ this.onAddShow } onSelectShow={ selectedShow => this.onSelectShow(selectedShow)} />
				</div>
				<div className="columns">
					{detailPane()}
				</div>
			</div>
		);
	}
	onAddShow (showName) {
		// //create a copy of the state array "tvShows" so we can push the new show onto it
		// //Need to do this to keep the state immutable
		// var currShows = this.state.tvShows.slice();
		// //Add the new show to the temp array
		// currShows.push(
		// 		{
		// 			id: uuid(),
		// 			name: showName
		// 		}
		// 	);
		this.setState(
			{
				addingNewShow: true,
				newShowsInfo: {
					showSearchTerm: showName
				}
			}
		);
		//Call tvMazeAPI to get a list of shows matching name
		console.log('onAddShow: ' + showName);
		tvMaze.getTVInfoByName(showName).then((theData) => {
					this.setState({
						newShowsInfo: {
							showsReturned: theData
					}});
				}, function (e){
					console.log(e);
				}
				);
	}

	onAddShowSelect (selectedShowId) {
		//This is triggered when the AddTVItem components button is pressed.  Sending the selected TVMaze ID up the chain
		//Reset state to NOT adding a TV Show
		this.clearNewShowState();

		//Check to see if already in our state object:
		if ( this.state.tvShows.filter((selectedShowId) => this.state.tvShows.id === selectedShowId).length > 0 ) {
			return null;  //Need to actually do something here...probably update state and rerender...
		}

		//Call API and get info on selected show and save(update) into state
		tvMaze.getTVInfoAndEpisodes(selectedShowId).then((theData) => {
			const showData = theData.showData;
			const seasonData = theData.seasonData;
			const showImage = showData.image || {medium: './images/placeholder.png'};

			//console.log(showData);
			//console.log(seasonData);
			var newTVShow = {
					id: showData.id,
					name: showData.name,
					summary: showData.summary,
					genres: showData.genres,
					status: showData.status,
					runtime: showData.runtime,
					premiered: showData.premiered,
					daysAired: showData.schedule.days,
					image: showImage.medium,
					seasons: seasonData.length,
					seasonsDetail: seasonData,
					downloading: {
						seasonDownloading:1,
						episodeDownloading: 1},
					watching: {
						seasonWatching: 1,
						episodeWatching: 1
					}
				};

			const tvShowsArray = [...this.state.tvShows, newTVShow];

			this.setState({
				tvShows: tvShowsArray,
				showSelectedId: selectedShowId
			});
		});
	}

	onDownloadChange (type, newValue, showId) {
		var { tvShows } = this.state;
		tvShows.map((show) => {
			if( show.id === showId) {
				if (type === 's') {
					show.downloading.seasonDownloading = newValue;
				} else {
					show.downloading.episodeDownloading = newValue;
				}
			}
		});

		this.setState({tvShows});
	}
	//Used in TVList Component - updates state for rendering show in TVDetail Component.
	onSelectShow (selectedShowId) {
		//this.setState({showSelected: selectedShow}
		//Clear the new show state in case we are coming from adding a show.
		this.clearNewShowState();
		this.setState({
				showSelectedId: selectedShowId
		});
	}
	//Helper functions
	clearNewShowState() {
		this.setState({
			addingNewShow: false,
			newShowsInfo: []
		});
	}
};

export default MainDisplay;
