import React from 'react';
import { connect } from 'react-redux';

import { startDeleteGroup, startUpdateGroup } from  '../actions/actions';

class GroupItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};

		this.onGroupEdit = this.onGroupEdit.bind(this);
	}

	onGroupEdit(e) {
		console.log("In Submit");
		e.preventDefault();
		this.setState({editing: false});

		let { groupInfo } = this.props;

		let newName = this.refs.updGroup.value || groupInfo.name;
		let newDesc = this.refs.updGroupDesc.value  || groupInfo.description;
		console.log("upd", newName, newDesc);

		this.props.dispatch(startUpdateGroup(newName, newDesc, groupInfo.firebaseKey));
	}

	render() {
		console.log("editing: ", this.state.editing);
		var editForm = <form onSubmit={this.onGroupEdit}>
						<input type="text" ref="updGroup" placeholder="Group Name" />
						<input type="text" ref="updGroupDesc" placeholder="Group Description" />
						<button className="button small" type="submit">Update Group</button>
						<button className="button small" type="button" onClick={() => this.props.dispatch(startDeleteGroup(groupInfo.firebaseKey))}>Delete</button>
						<button className="button small" type="button" onClick={() => this.setState({editing: false})}>Cancel</button>
					</form>;
		//------------------------
		var { groupInfo } = this.props;
		return (
			<div className="callout">
				<div>
					<strong>{groupInfo.name}</strong>
					<a onClick={() => this.setState({editing: !this.state.editing})}>{this.state.editing ? ' Cancel' : ' Edit'}</a>
				{this.state.editing ? editForm : ''}
				{this.state.editing ? '' :
					<a><img
							src="./images/DeleteIconRed.png" alt="Delete Group"
							className="float-right" width="32px" height="32px"
							style={{marginTop:"-7px"}}
							onClick={() => this.props.dispatch(startDeleteGroup(groupInfo.firebaseKey))}/> </a>
				}
				</div>
			</div>
			);

	}
}

export default connect()(GroupItem);
