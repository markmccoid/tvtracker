import React from 'react';
import GroupListItem from 'GroupListItem';

class GroupList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Loop through groups and create an <li> for each one.
		let groupList = this.props.groups.map((group) => {
				return (
					<li key={group.firebaseKey}>
						<GroupListItem groupInfo={group} setGroupEditingState={this.props.setGroupEditingState}/>
					</li>
				);
			});

		return (
			<ul className="menu vertical">
				{groupList}
			</ul>
		);
	}

}
export default GroupList;
