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
		default:
			return state;
	}
};
