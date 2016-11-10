import React from 'react';

var Link = ({ link, linkDescription, index, showSelected, onLinkDelete }) => {
	return (
		<div className="row callout showData-link align-middle">
		<div className="columns medium-11">
			<a href={link} target="_blank">
				<div >
					{linkDescription}
				</div>
			</a>
		</div>
		<div className="columns medium-1 align-right">
			<a onClick={() => onLinkDelete(showSelected, index)}>
				<img src="./images/DeleteIconRed.png" width="32" height="32"/>
			</a>
		</div>
		</div>
	);
}

export default Link;
