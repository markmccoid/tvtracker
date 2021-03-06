import React from 'react';
import { connect } from 'react-redux';

var alertify = require('alertifyjs');

import { startAddGroupMember, startDeleteGroupMember, startDeleteGroup, startUpdateGroup, startUpdateGroupSort } from '../actions/actions';


class GroupEdit extends React.Component {
	constructor(props) {
		super(props);

	}

	moveToMembers = (show) => {
		let {firebaseKey, name, id} = show;
		let newMemberObj = {
			tvShowFirebaseKey: firebaseKey,
			tvShowName: name,
			tvShowId: id
		};
		//dispatch action that will add member to firebase and redux
		this.props.dispatch(startAddGroupMember(newMemberObj, this.props.groupInfo.firebaseKey));
	}

	deleteFromMembers = (memberFirebaseKey) => {
		this.props.dispatch(startDeleteGroupMember(memberFirebaseKey, this.props.groupInfo.firebaseKey));
	}

	onGroupEdit= (e) => {
		console.log("In Submit");
		e.preventDefault();

		let { groupInfo } = this.props;

		let newName = this.refs.updGroup.value || groupInfo.name;
		let newDesc = this.refs.updGroupDesc.value  || groupInfo.description;
		console.log("upd", newName, newDesc);

		this.props.dispatch(startUpdateGroup(newName, newDesc, groupInfo.firebaseKey));
	}

	updateSortAfterDelete = (sortNumDeleted) => {
		//Need to find the groups with sorts > the sortNumDeleted and move them down 1 sort num
		let resortedGroups = [];

		this.props.groups.forEach((group) => {
			if (group.sort > sortNumDeleted) {
				resortedGroups.push({fbKey: group.firebaseKey, newSort: group.sort - 1});
			}
		});
		//Loop through the groups that need to be updated for the new sort order
		//and dispatch the update sort action for each one
		resortedGroups.forEach((group) => {
			this.props.dispatch(startUpdateGroupSort(group.fbKey, group.newSort));
		});
	}


	render() {
		console.log("groupEDIT-groupinfo",this.props.groupInfo);
		let { groupInfo } = this.props;
		let groupMembers = groupInfo.members || [];
		let groupFirebaseKey = groupInfo.firebaseKey;
		//Get a list of shows that are not a member of this group
		let availableShows = this.props.tvShows.filter((show) => {
			let foundArray = groupMembers.filter((memberShow) => memberShow.tvShowFirebaseKey === show.firebaseKey);
			//if foundArray length >0 means that we found that show in the member array, so we return false to exclude show from available list.
			return foundArray.length > 0 ? false : true;
		});
		//EDIT FORM
		var editForm = <form onSubmit={this.onGroupEdit}>
				<input type="text" ref="updGroup" placeholder={groupInfo.name} />
				<input type="text" ref="updGroupDesc" placeholder={groupInfo.description} />
				<button className="button small" type="submit">Update Group</button>
				<button className="button small" type="button"
								onClick={() => {
									this.props.setGroupEditingState(undefined);
									this.props.showBlankGroup();
									this.props.dispatch(startDeleteGroup(groupInfo.firebaseKey));
									//Need to update all the sort numbers after the delete
									this.updateSortAfterDelete(groupInfo.sort);
									alertify.alert(`Group "${groupInfo.name}" Deleted`);
								}}>Delete</button>
				<button className="button small" type="button" onClick={() => this.props.showBlankGroup()}>Cancel</button>
			</form>;

		return (
			<div>
			<h3>Editing {groupInfo.name}</h3>
			<div className="row">
				<div className="columns small-12">
					{editForm}
				</div>
			</div>
			<hr />
			<h3>Edit Shows in {groupInfo.name}</h3>
			<div className="row">
				<div className="columns small-6">
				<h4>Available Shows</h4>
					<ul className="menu vertical">
						{availableShows.map((show) => {
							return (
									<li className="hover-pointer"
										key={show.id}
										onClick={() => this.moveToMembers(show)}>
										{show.name}
									</li>
							);
						})}
					</ul>
				</div>

				<div className="columns small-6">
				<h4>Selected Shows</h4>
					<ul className="menu vertical">
						{groupMembers.map((member) => {
								return (
									<li className="hover-pointer"
										key={member.tvShowFirebaseKey}
										onClick={() => this.deleteFromMembers(member.firebaseKey)}>
								 		{member.tvShowName}
								 	</li>
								);
						})}
					</ul>
				</div>
			</div>
			</div>
		);
	}
}

export default connect()(GroupEdit);

