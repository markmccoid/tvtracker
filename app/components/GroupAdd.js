import React from 'react';
import { connect } from 'react-redux';

import { startAddGroup } from '../actions/actions';

class GroupAdd extends React.Component {
		constructor(props) {
		super(props);

	}

	render() {
		//--------------------------------
		//--Add Group JSX
		var AddGroupJSX = <div>
					<form onSubmit={(e) => {
							e.preventDefault();
							this.props.checkGroupExists(this.refs.groupName.value, this.refs.groupDesc.value);
							this.refs.groupName.value = '';
							this.refs.groupDesc.value = '';
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
					</div>;
		return (
			<div>
				{AddGroupJSX}
			</div>
		);
	}

}

export default connect()(GroupAdd);
