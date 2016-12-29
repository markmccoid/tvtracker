import React from 'react';

class TVSearchBox extends React.Component {
	constructor(props) {
		super(props);

	}

	handleSearchText = (e) => {
		this.props.onSearch(e.target.value);
	}
	componentDidMount = () => {
		//When component mounts set the focus to the search box
		this.searchBox.focus();
	}

	render() {
		return (
			<div>
				<input type="text"
					ref={(searchBox) => {this.searchBox = searchBox}}
					placeholder="Search in Your List"
					onChange={this.handleSearchText}
					style={{marginBottom:"0"}}/>
				<h5 style={{textAlign:"center", width:"100%"}}><a onClick={()=> {
							this.searchBox.value = '';
							this.props.onClear();
							this.props.onSearch('');
						}}
						style={{display:"block"}}>Clear</a>
				</h5>
			</div>
		);
	}
};

TVSearchBox.propTypes = {
	onSearch: React.PropTypes.func.isRequired
}
export default TVSearchBox;
