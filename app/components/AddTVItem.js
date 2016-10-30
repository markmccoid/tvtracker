import React from 'react';
import { connect } from 'react-redux';
import { addShowById, setNewShowFlag, showSelected } from '../actions/actions';

class AddTVItem extends React.Component {
	constructor(props) {
		super(props);
	}

	onAddShowSelect(selectedShowId) {
		//Check to see if already in our state object:
		if ( this.props.tvShows.length !== 0) {
			if ( this.props.tvShows.filter((show) => show.id === selectedShowId).length > 0 ) {
				alert ("Show already in your list");
				return null;  //Need to actually do something here...probably update state and rerender...
			}
		}
		this.props.addShowById(selectedShowId);
		//this.props.showSelected(selectedShowId);
		//this.props.setNewShowFlag(false);
	}

	render() {
		const { id, name, status, runtime, summary} = this.props.show;

		var image = this.props.show.image || {medium: './images/placeholder.png'};
		var showImage = image.medium;

		return (
			<div>
				<div className="row callout">
					<div className="columns">
						<div className="row">
							<div className="columns small-12 medium-2">
								<p><strong>ShowID: </strong>{id}</p>
								<img src={showImage} width="100px" height="200"/> <br />
							</div>
							<div className="columns small-10">
								<div className="row">
									<div className="columns small-12 medium-5">
										<p><strong>Name: </strong>{name}</p>
									</div>
									<div className="columns small-12 medium-5">
										<p><strong>Status: </strong>{status}</p>
										<p><strong>Runtime: </strong>{runtime}</p>
									</div>
								</div>
								<div className="row">
									<div className="columns small-12 medium-12">
										<p><strong>Summary: </strong><span dangerouslySetInnerHTML={{__html: summary.slice(0,300)}}></span></p>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="columns small-12 medium-12 small-centered">
								<a href="#" onClick={() => this.onAddShowSelect(id)} className="expanded button">Select This Show</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		tvShows: state.tvShows
	};
}
export default connect(mapStateToProps, {
	addShowById,
	setNewShowFlag,
	showSelected
})(AddTVItem);
