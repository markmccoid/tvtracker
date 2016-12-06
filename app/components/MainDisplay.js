import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

//Import Components
import TVList from 'TVList';
import TVItemDetail from 'TVItemDetail';
import AddTVShow from 'AddTVShow';

//Import APIs and Helpers
import tvMaze from '../api/tvMaze';
import helpers from '../helpers/helpers';

class MainDisplay extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		//determine if we should show the TVItemDetail or the AddTVShow
		var detailPane = () => {
//			console.log(this.props.tvShows, this.props.showSelectedId);
			if (this.props.newShowsInfo.addingNewShow) {
				//console.log('addTVShow');
				return <AddTVShow shows={this.props.newShowsInfo.showsReturned} />
			} else {
				var tvShow = this.props.tvShows.filter((show) => show.id === this.props.showSelectedId)[0];
				var showData = this.props.showData.filter((showData) => showData.showId === this.props.showSelectedId)[0];

				return <TVItemDetail tvShow={tvShow} showData={showData} showSelectedId={this.props.showSelectedId} groups={this.props.groups}/>
			}
		}
		return (
			<div className="row">
				<div className="columns small-4" style={{paddingRight: "0", marginBottom:"0px"}}>
					<TVList tvShows={this.props.tvShows} showData={this.props.showData} groups={this.props.groups}/>
				</div>
				<div className="columns callout secondary" style={{marginLeft: "-1px", marginRight: "15px", marginBottom:"0px"}}>
					{detailPane()}
				</div>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		tvShows: state.tvShows,
		showData: state.showData,
		showSelectedId: state.showSelectedId,
		newShowsInfo: state.newShowsInfo,
		groups: state.groups
	};
}
export default connect(mapStateToProps)(MainDisplay);
