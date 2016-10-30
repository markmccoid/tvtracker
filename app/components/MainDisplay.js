import React from 'react';
import { connect } from 'react-redux';

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
				console.log('addTVShow');
				return <AddTVShow shows={this.props.newShowsInfo.showsReturned} onAddShowSelect={this.onAddShowSelect}/>
			} else {

				return <TVItemDetail onDownloadChange={this.onDownloadChange}/>
			}
		}
		return (
			<div className="row">
				<div className="columns small-4">
					<TVList tvShows={ this.props.tvShows } />
				</div>
				<div className="columns">
					{detailPane()}
				</div>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		tvShows: state.tvShows,
		showSelectedId: state.showSelectedId,
		newShowsInfo: state.newShowsInfo
	};
}
export default connect(mapStateToProps)(MainDisplay);
