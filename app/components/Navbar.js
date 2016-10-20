import React from 'react';

var Navbar = () => {
	return (
		<div className="top-bar" data-topbar role="navigation">
			<div className="top-bar-left">
				<span className="title">TV Tracker</span>
			</div>
			<div className="top-bar-right">
	      <ul className="menu">
	        <li><input type="search" placeholder="Search" /></li>
	        <li><button type="button" className="button">Search</button></li>
	      </ul>
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
