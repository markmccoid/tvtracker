import * as C from '../actions/actions';

export var groupsReducer = (state = [], action) => {
		switch (action.type) {
		case C.INITIALIZE_STORE:
			return action.payload.groups;
		case C.ADD_GROUP:
			var groups = [...state];
			groups.push(action.newGroup)
			return groups;
		case C.UPDATE_GROUP:
			let updGroup = [...state];

			let finalGroup = updGroup.map((obj) => {
				if (action.firebaseKey === obj.firebaseKey) {
					return {
						...obj,
						name: action.newName,
						description: action.newDesc
					};
				} else {
					return obj
				}
			});
			return finalGroup;
		case C.DELETE_GROUP:
			let filterGroups = [...state];
			return filterGroups.filter((obj) => action.firebaseKey !== obj.firebaseKey);
		case C.ADD_GROUP_MEMBER:
			let addGroup = state.filter((obj) => obj.firebaseKey === action.groupFirebaseKey)[0];
			//If there are no members in group return empty array otherwise create new array with existing members
			let updMembers = !addGroup.members ? updMembers = []: [...addGroup.members];
			//Push new member onto list
			updMembers.push(action.newMemberObj);
			//Return using the filter on state to only pick the items we DIDN’T change, then
			//add the updated object on the end.  Doesn't keep array in order, but shouldn't matter for this one.
			return (
					[...state.filter((obj) => obj.firebaseKey !== action.groupFirebaseKey),
					{...addGroup, members: updMembers}]
						);
		case C.DELETE_GROUP_MEMBER:
			//Get the group that we want to delete a member from
			let delGroup = state.filter((obj) => obj.firebaseKey === action.groupFirebaseKey)[0];
			//If there are no members in group return empty array otherwise create new array with existing members
			let delMembers = !delGroup.members ? delMembers = []: [...delGroup.members];
			//return only members that DO NOT equal the one we want to delete
			let newMembers = delMembers.filter((member) => member.firebaseKey !== action.memberFirebaseKey);
			//Return using the filter on state to only pick the items we DIDN’T change, then
			//add the updated object on the end.  Doesn't keep array in order, but shouldn't matter for this one.
			return (
					[...state.filter((obj) => obj.firebaseKey !== action.groupFirebaseKey),
					{...delGroup, members: newMembers}]
						);
		default:
			return state;
	}
};
