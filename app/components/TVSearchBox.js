import React from 'react';

class TVSearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSearchBox: false
		}
	}

	onSearchClick = () => {
		this.setState({showSearchBox: true});
	}

	handleSearchText = (e) => {
		this.props.onSearch(e.target.value);
	}

	render() {
		let searchJSX = <h4 onClick={this.onSearchClick}>Search</h4>;
		//--------------------------------------------
		// let searchText = this.state.searchText;
		// 		//Handle search string searching
		// if (searchText.length > 0) {
		// 	//convert input string to a regular expression object to pass to match function
		// 	let reSearchString = new RegExp(searchText, "g");
		// 	tvShowsFiltered = this.props.tvShows.filter(function(show){
		// 		if (show.name) {
		// 			return show.name.toLowerCase().match(reSearchString);
		// 		}
		// 	});
		// }
		//--------------------------------------------
		if (this.state.showSearchBox) {
			searchJSX = <input type="text" placeholder="Search in Your List" onChange={this.handleSearchText}/>;
		}
		return (
			<div>
				{searchJSX}
			</div>
		);
	}
};

export default TVSearchBox;
