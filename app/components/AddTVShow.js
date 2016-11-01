import React from 'react';
import { connect } from 'react-redux';

import { loadNewShows, setSearchText } from '../actions/actions';

import AddTVItem from './AddTVItem';

class AddTVShow extends React.Component {
		constructor(props) {
		super(props);

		this.state = {
			searchTerm: ''
		}
	}

	render () {
		//Variable to hold the List of shows or a loading statement
		var buildTVList;
		//Make sure shows props has something in it, if so map over the shows and create an AddTVItem for each one.
		console.log(this.props);
		if(this.props.shows) {
			buildTVList = this.props.shows.map((show) => {
				return <AddTVItem show={show} key={show.id} />
			});
		} else {
			 <p>Loading...</p>
		}
		return (
			<div>
				<div className="row">
					<div className="columns medium-8">
					<input
								type="text"
								name="tvSearch"
								ref="tvSearchText"
								value={this.state.searchTerm}
								onChange={() => this.setState({searchTerm: this.refs.tvSearchText.value})}
								placeholder="TV Show Name" />
					</div>
					<div className="columns medium-4" style={{marginTop:"-.5em"}}>
					<button
	        			onClick={(event) => {
									//onAddShow(this.refs.tvSearchText.value);
									this.props.loadNewShows(this.state.searchTerm);
									this.setState({searchTerm:''});
			        		//this.refs.tvSearchText.value = '';
			        	}}
	        			type="button"
	        			className="button">Find Shows
	        </button>
	        </div>
				</div>
				{buildTVList}
			</div>

		);
	}
}

export default connect(null, {
	loadNewShows,
	setSearchText
})(AddTVShow);
