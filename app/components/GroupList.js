import React from 'react';
import GroupListItem from 'GroupListItem';
import helpers from '../helpers/helpers';

class GroupList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Sort function by sort number
		let sortBySortNumber = (a, b) => {
			if (a.sort > b.sort) {
			    return 1;
			}
			if (a.sort < b.sort) {
			    return -1;
			}
			  // a must be equal to b
			  return 0;
		};
		//Loop through groups and create an <li> for each one.
		let sortedGroup = [...this.props.groups];
		sortedGroup.sort(helpers.groupSortBySortNumber);
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
