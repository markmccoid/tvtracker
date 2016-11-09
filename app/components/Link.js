import React from 'react';

var Link = ({ link, linkDescription, index, showSelected, onLinkDelete }) => {
	return (
		<div className="row  callout">
		<div className="columns medium-8">
			<a href={link} target="_blank">{linkDescription} </a>
		</div>
		<div className="columns medium-4">
			<button
				className="button small"
				onClick={() => onLinkDelete(showSelected, index)}>Delete
			</button>
		</div>
		</div>
	);
}

export default Link;
