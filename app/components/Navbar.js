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
			<div className="top-bar" data-topbar role="navigation" style={{border: "1px solid hsla(0,0%,4%,.25)"}}>
			<img src="./images/placeholder.png" className="title float-left" width="100" height="100"></img>
				<div className="top-bar-left">

					<ul className="menu" style={{fontSize: "20px"}}>
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

Navbar.propTypes = {
	tvShows: React.PropTypes.array
}
export default connect()(Navbar);
