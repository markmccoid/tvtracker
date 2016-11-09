import { ADD_SHOW_BY_ID, ON_DELETE_SHOW, ON_DL_FORM_CHANGE, ON_WATCHING_FORM_CHANGE, ADD_USER_LINK, DELETE_USER_LINK, INITIALIZE_STORE } from '../actions/actions';

export var showDataReducer = (state = [], action) => {

	switch (action.type) {
		case INITIALIZE_STORE:
			return action.payload.showData;
		case ADD_SHOW_BY_ID:
			//Expecting to get back action.payload with showdata and season detail
			// var newShowDataRecord =
			// 			{
			// 				showId: action.payload.id,
			// 				seasonDownloading: 1,
			// 				episodeDownloading: 1,
			// 				seasonWatching: 1,
			// 				episodeWatching: 1,
			// 				showLinks: []
			// 			} ;
			return [...state, action.payload.showData];

		case ON_DELETE_SHOW:
			var showId = action.payload;
			return state.filter((showData) => showData.showId !== showId);

		case ON_DL_FORM_CHANGE:
			var { type, value, showSelected } = action.action;
			var idx = state.findIndex((showData) => {return showData.showId === showSelected});
			//create new item for changed object in array -- NOTE: slice returns an array.
			//Here there will only be a single object in the array, so grab the first/only one which is index 0.
			var showToUpdate = state.slice(idx, idx+1)[0];
			var updatedShow;
			//check the type 'e' is for episode updating and 's' is for season updating.
			if (type === 'e') {
				//Even though showToUpdate is a new array, it contains sub-objects, downloading being one of them.
				//These sub object are STILL pointing to the original state object, thus, if we update anything in
				//these sub objects, we will be mutating the original object.
				//So to keep this from happening we are doing all the shit below!
				updatedShow = {...showToUpdate, episodeDownloading: value};
			} else if (type === 's') {
				updatedShow = {...showToUpdate, seasonDownloading: value};
			}
			return [
				...state.slice(0,idx),
				//Modify this selected array piece without mutating it????
				updatedShow,
				...state.slice(idx+1)
			];

		case ON_WATCHING_FORM_CHANGE:
			var { type, value, showSelected } = action.action;
			var idx = state.findIndex((showData) => {return showData.showId === showSelected});
			//create new item for changed object in array -- NOTE: slice returns an array.
			//Here there will only be a single object in the array, so grab the first/only one which is index 0.
			var showToUpdate = state.slice(idx, idx+1)[0];
			var updatedShow;
			//check the type 'e' is for episode updating and 's' is for season updating.
			if (type === 'e') {
				//Even though showToUpdate is a new array, it contains sub-objects, downloading being one of them.
				//These sub object are STILL pointing to the original state object, thus, if we update anything in
				//these sub objects, we will be mutating the original object.
				//So to keep this from happening we are doing all the shit below!
				updatedShow = {...showToUpdate, episodeWatching: value};
			} else if (type === 's') {
				updatedShow = {...showToUpdate, seasonWatching: value};
			}
			return [
				...state.slice(0,idx),
				//Modify this selected array piece without mutating it????
				updatedShow,
				...state.slice(idx+1)
			];

		case ADD_USER_LINK:
			var { showSelected, link, linkDesc } = action.action;

			//Find show being edited's index
			var idx = state.findIndex((showData) => {return showData.showId === showSelected});
			//Get the show data to update ... will be an object
			var showToUpdate = state.slice(idx, idx+1)[0];
			//
			var updatedShowData;
			//If there are any show links add to them else create a new one.
			if ( showToUpdate.showLinks) {
				var linksToUpdate = [...showToUpdate.showLinks];
				linksToUpdate.push({link: link, linkDescription: linkDesc});
				updatedShowData = {...showToUpdate, showLinks: [...linksToUpdate]};
			} else {
				linksToUpdate = {link: link, linkDescription: linkDesc};
				updatedShowData = {...showToUpdate, showLinks: [{link: link, linkDescription: linkDesc}]};
			}

			return [
				...state.slice(0,idx),
				updatedShowData,
				...state.slice(idx+1)
				];

		case DELETE_USER_LINK:
			var { showSelected, index } = action.action;

			//Find show being edited's index
			var idx = state.findIndex((showData) => {return showData.showId === showSelected});
			//Get the show data to update ... will be an object
			var showToUpdate = state.slice(idx, idx+1)[0];
			//
			var updatedShowData;
			//If there are any show links add to them else create a new one.
				var linksToUpdate = [...showToUpdate.showLinks];
				linksToUpdate.splice(index, 1);
				updatedShowData = {...showToUpdate, showLinks: [...linksToUpdate]};

			return [
				...state.slice(0,idx),
				updatedShowData,
				...state.slice(idx+1)
				];

		default:
			return state;
	}
};
