import React from 'react';
import TVListItem from 'TVListItem';
import tvMaze from './../api/tvMaze';

class TVList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// tvMaze.getTVInfoById(580).then(function (theData){
		// 	console.log(theData);
		// }, function (e){
		// 	console.log(e);
		// });
		var { tvShows, onAddShow } = this.props;
		var getTVListItems;

		if (tvShows.length < 1 || tvShows === undefined) {
			getTVListItems =	<div>No Shows</div>
		} else {
			getTVListItems = tvShows.map((tvShow) => {
				return (
					<TVListItem showName={tvShow.name} showId={tvShow.id} onSelectShow={this.props.onSelectShow} key={tvShow.id}/>
				);
			});
		}

		return (
			<div>
				<ul className="menu">
					<li><input type="text" ref="txtTVShow" placeholder="TV Show Name" /></li>
	        <li><button onClick={(event) => {
	        		event.preventDefault();
	        		onAddShow(this.refs.txtTVShow.value);
	        		this.refs.txtTVShow.value = '';
	        	}}
	        type="button" className="button">Add</button></li>
				</ul>
				<ul className="menu vertical">
						{getTVListItems}
				</ul>
			</div>
		);
	}
};

export default TVList;
