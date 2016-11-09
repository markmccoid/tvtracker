import React from 'react';
//require exportData = '../helpers/helpers/exportData';
import helpers from '../helpers/helpers';

var Navbar = (props) => {
	return (
		<div className="row">
		<div className="columns ">
			<div className="top-bar" data-topbar role="navigation">
				<div className="top-bar-left">
					<span className="title">TV Tracker</span>
				</div>
				<div className="top-bar-right">
		      <ul className="menu">
		        <li><input type="search" placeholder="Search" /></li>
		        <li><button type="button" className="button">Search</button></li>
		        <li><button type="button" className="button" onClick={() => helpers.exportData(props.tvShows)}>Export</button></li>
		      </ul>
		    </div>
			</div>
		</div>
		</div>
	);
};

export default Navbar;

				// <div className="row">
				// 	<div className="column medium-12">
				// 		Top Bar is at the top of the page
				// 	</div>
				// </div>
