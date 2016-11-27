import React from 'react';

class GroupListItem extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		let { groupInfo } = this.props;

		return (
			<div className="callout row align-middle">
				<div className="columns small-8">
					<a
						onClick={() => this.props.setGroupEditingState(groupInfo.firebaseKey)}>
						{groupInfo.name}
					</a>
				</div>
				<div className="columns small-4">
					<a onClick={() => this.props.changeSort("up", groupInfo.sort)}>up</a>
					<a onClick={() => this.props.changeSort("down", groupInfo.sort)}>down</a>
				</div>
			</div>
		);
	}

}
export default GroupListItem;
