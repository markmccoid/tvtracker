import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { startAddGroup, startDeleteGroup, startUpdateGroup, startUpdateGroupSort } from  '../actions/actions';
import GroupList from 'GroupList';
import GroupEdit from 'GroupEdit';
import GroupAdd from 'GroupAdd';

import GroupItem from 'GroupItem';


class GroupMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: '',
			groupEditing: undefined
		};
	}

//--- SET page STATE -----------
	showAddGroup = () => {
		this.setState({page: "ADD"});
	}
	showEditGroup = () => {
		this.setState({page: "EDIT"});
	}
	showBlankGroup = () => {
		this.setState({page: ""});
	}
//------------------------------
	setGroupEditingState = (firebaseKey) => {
		this.setState({groupEditing: firebaseKey});
		if(firebaseKey) {
			this.showEditGroup();
		}
	}

	changeSort = (direction, startSortNum) => {
		let groupsCopy = [...this.props.groups];

		let resortedGroups = [];
		groupsCopy.forEach((group) => {
			if (direction === 'up') {
				//If startSortNum equal 1, then we move it to bottom and all others up 1
				if (startSortNum === 1) {
					if (group.sort === 1) {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: this.props.groups.length})
					} else {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: group.sort - 1});
					}
				} else {
					//startSortNum not equal to one, so we are just swapping positions of two adjacent groups
					//look for the group before the one being pushed up
					if (group.sort === (startSortNum-1)) {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: startSortNum});
					} else if(group.sort === startSortNum) {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: startSortNum-1});
					}
				}
			} else {
				//Going down
				if (startSortNum === this.props.groups.length) {
					if (group.sort === this.props.groups.length) {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: 1})
					} else {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: group.sort + 1});
					}
				} else {
					if (group.sort === (startSortNum+1)) {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: startSortNum});
					} else if(group.sort === startSortNum) {
						resortedGroups.push({fbKey: group.firebaseKey, newSort: startSortNum+1});
					}
				}
			}
		});

		//Loop through the groups that need to be updated for the new sort order
		//and dispatch the update sort action for each one
		resortedGroups.forEach((group) => {
			this.props.dispatch(startUpdateGroupSort(group.fbKey, group.newSort));
		});
	}

	checkGroupExists = (newName, newDescription) => {
		let foundGroup = this.props.groups.filter((group) => group.name === newName);

		if (foundGroup.length > 0) {
			alert (`Group with name ${newName} already exists`);
		} else {
			this.props.dispatch(startAddGroup(newName, newDescription, this.props.groups.length+1));
		}
	}

	render() {
		var groups, mainPanelJSX;
		if (this.props.groups.length > 0) {
				groups = this.props.groups.map((obj, idx) => {
				return (
					<GroupItem key={obj.firebaseKey} groupInfo={obj} />
					);
			});
		} else {
			<div> No Groups Created Yet</div>
		}

		//---------------------
		switch (this.state.page)
		{
			case 'ADD':
				mainPanelJSX = <GroupAdd checkGroupExists={this.checkGroupExists} />;
				break;
			case 'EDIT':
				let selectedGroupInfo = this.props.groups.filter((group) => group.firebaseKey === this.state.groupEditing)[0];
				mainPanelJSX = <GroupEdit tvShows={this.props.tvShows}
													groupInfo={selectedGroupInfo}
													groups={this.props.groups}
													setGroupEditingState={this.setGroupEditingState}
													showBlankGroup={this.showBlankGroup}/>;
				break;
			default:
				mainPanelJSX = '';
		}

		return (
			<div className="row">
				<div className="columns small-4" style={{paddingRight: "0", height:"100%"}}>
					<div className="callout secondary">
						<button
							className="button expanded"
							onClick={this.showAddGroup}>
							Add Group
						</button>
						<br />
						<h3>Group Edit</h3>
						<GroupList groups={this.props.groups} setGroupEditingState={this.setGroupEditingState} changeSort={this.changeSort}/>
					</div>
				</div>
				<div className="columns callout secondary" style={{marginLeft: "-1px", marginRight: "14px"}}>
					{mainPanelJSX}
				</div>
			</div>
		);
	}
}

function mapState (state) {
	return {
		groups: state.groups,
		tvShows: state.tvShows
	}
}
export default connect(mapState)(GroupMain);
