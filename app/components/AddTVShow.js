import React from 'react';

import AddTVItem from './AddTVItem';

class AddTVShow extends React.Component {
		constructor(props) {
		super(props);
	}

	render () {
		//Variable to hold the List of shows or a loading statement
		var buildTVList;
		//Make sure shows props has something in it, if so map over the shows and create an AddTVItem for each one.
		if(this.props.shows) {
			buildTVList = this.props.shows.map((show) => {
				return <AddTVItem show={show.show} key={show.show.id} onAddShowSelect={this.props.onAddShowSelect}/>
			});
		} else {
			 <p>Loading...</p>
		}
		return (
			<div>
				{buildTVList}
			</div>

		);
	}
}

export default AddTVShow;
