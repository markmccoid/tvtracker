import React from 'react';
import { Select } from 'antd';

const ShowSource = ({ onShowSourceChange, showSource }) => {
	const handleChange = (value) => {
		onShowSourceChange(value);
	};

	return (
	  <div style={{ marginBottom: '10px', marginTop: '5px' }}>
	    <Select value={showSource} style={{ width: 300, fontSize: '20px' }} onChange={handleChange}>
	      <Option value="download" style={{ fontSize: '18px' }}>Download</Option>
	      <Option value="netflix" style={{ fontSize: '18px' }}>Netflix</Option>
	      <Option value="hulu" style={{ fontSize: '18px' }}>Hulu</Option>
	      <Option value="amazonprime" style={{ fontSize: '18px' }}>Amazon Prime</Option>
	    </Select>
	  </div>
 	);
};

export default ShowSource;
