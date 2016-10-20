import React from 'react';

class TVListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li key={this.props.showName}>
				<a href="#" onClick={() => this.props.onSelectShow(this.props.showId)}>{this.props.showName}</a>
			</li>
		);
	}
};

export default TVListItem;
