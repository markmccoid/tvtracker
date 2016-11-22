import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { startAddGroup, startDeleteGroup, startUpdateGroup } from  '../actions/actions';
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

	checkGroupExists = (newName, newDescription) => {
		console.log(newName);
		let foundGroup = this.props.groups.filter((group) => group.name === newName);
		console.log(foundGroup);

		if (foundGroup.length > 0) {
			alert (`Group with name ${newName} already exists`);
		} else {
			this.props.dispatch(startAddGroup(newName, newDescription));
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
				mainPanelJSX = <GroupAdd checkGroupExists={this.checkGroupExists}/>;
				break;
			case 'EDIT':
				let selectedGroupInfo = this.props.groups.filter((group) => group.firebaseKey === this.state.groupEditing)[0];
				mainPanelJSX = <GroupEdit tvShows={this.props.tvShows}
													groupInfo={selectedGroupInfo}
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
						<GroupList groups={this.props.groups} setGroupEditingState={this.setGroupEditingState}/>
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
