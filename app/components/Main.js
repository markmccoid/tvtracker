import React from 'react';
import { connect } from 'react-redux';
//Import Components
import Navbar from 'Navbar';
import MainDisplay from 'MainDisplay';


class Main extends React.Component {
constructor(props) {
	super(props);

}
	render() {
		return (
			<div className="row">
				<div className="columns small-12">
					<Navbar tvShows={this.props.tvShows}/>
					{this.props.children}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tvShows: state.tvShows
	}
}
export default connect(mapStateToProps)(Main);
