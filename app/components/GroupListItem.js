import React from 'react';

class GroupListItem extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		let { groupInfo } = this.props;

		return (
			<div className="callout">
				<a
					onClick={() => this.props.setGroupEditingState(groupInfo.firebaseKey)}>
					{groupInfo.name}
				</a>
			</div>
		);
	}

}
export default GroupListItem;
