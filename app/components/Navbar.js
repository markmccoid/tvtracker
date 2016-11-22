import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { startLogout } from '../actions/actions';

//require exportData = '../helpers/helpers/exportData';
import helpers from '../helpers/helpers';

var Navbar = ({dispatch, tvShows}) => {
	return (
		<div className="row">
		<div className="columns ">
			<div className="top-bar" data-topbar role="navigation">
				<div className="top-bar-left">
					<span className="title">TV Tracker</span>
					<ul className="menu">
					  <li><Link to="/main" >Home</Link></li>
					  <li><Link to="groupmanage" >Group Management</Link></li>
					  <li><a onClick={() => dispatch(startLogout())}>Logout</a></li>
					</ul>
				</div>
				<div className="top-bar-right">
		      <ul className="menu">
		        <li><input type="search" placeholder="Search" /></li>
		        <li><button type="button" className="button">Search</button></li>
		        <li><button type="button" className="button" onClick={() => helpers.exportData(tvShows)}>Export</button></li>
		      </ul>
		    </div>
			</div>
		</div>
		</div>
	);
};

export default connect()(Navbar);
