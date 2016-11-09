import React from 'react';

var Link = ({ link, linkDescription, index, showSelected, onLinkDelete }) => {
	return (
		<div className="row callout showData-link align-middle">
		<div className="columns medium-10">
			<a href={link} target="_blank">
				<div >
					{linkDescription}
				</div>
			</a>
		</div>
		<div className="columns medium-2">
			<button
				className="button small expanded"

				onClick={() => onLinkDelete(showSelected, index)}>Delete
			</button>
		</div>
		</div>
	);
}

export default Link;
