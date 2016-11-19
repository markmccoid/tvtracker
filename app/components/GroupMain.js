import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { startAddGroup, startDeleteGroup, startUpdateGroup } from  '../actions/actions';
import GroupItem from 'GroupItem';

var Griddle = require('griddle-react');

class GroupMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: ''
		};
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
		//--------------------------------
		//--Add Group JSX
		var AddGroupJSX = <div>
					<form onSubmit={(e) => {
							e.preventDefault();
							this.props.dispatch(startAddGroup(this.refs.groupName.value));
					}}>
						<div className="row">
							<div className="columns small-8">
								<label> Group Name
								<input
									type="text"
									ref="groupName" />
								</label>
							</div>
							<div className="columns small-4">
								<p></p>
							</div>
						</div>
						<div className="row">
							<div className="columns small-12">
								<label> Group Description
								<input
									type="text"
									ref="groupDesc" />
								</label>
							</div>
						</div>
						<div className="row">
							<div className="columns small-12">
								<button className="button"
									type="submit"
									>Add Group</button>
							</div>
						</div>
					</form>
						<h4>Current Groups</h4>
						{groups}
					</div>;
		//--------------------------------
		//--Edit Group JSX
		var EditGroupJSX = <div> Editing Groups, maybe here is where we add shows to group.
											</div>
		//---------------------
		switch (this.state.page)
		{
			case 'ADD':
				mainPanelJSX = AddGroupJSX;
				break;
			case 'EDIT':
				mainPanelJSX = EditGroupJSX;
				break;
			default:
				mainPanelJSX = '';
		}

		return (
			<div className="row">
				<div className="columns small-4" style={{paddingRight: "0", height:"100%"}}>
					<div className="callout secondary">
						<ul className="menu vertical">
							<li><a onClick={() => this.setState({page: "ADD"})}>
										Add New Groups
									</a>
							</li>
							<li><a onClick={() => this.setState({page: "EDIT"})}>
										Edit Groups
									</a>
							</li>
						</ul>
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
		groups: state.groups
	}
}
export default connect(mapState)(GroupMain);
