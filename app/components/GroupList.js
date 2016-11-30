import React from 'react';
import GroupListItem from 'GroupListItem';
import _ from 'lodash';

class GroupList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Loop through groups and create an <li> for each one.
		let sortedGroup = _.sortBy([...this.props.groups], 'sort');

		let groupList = sortedGroup.map((group) => {
				return (
					<li key={group.firebaseKey}>
						<GroupListItem groupInfo={group} setGroupEditingState={this.props.setGroupEditingState} changeSort={this.props.changeSort}/>
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
