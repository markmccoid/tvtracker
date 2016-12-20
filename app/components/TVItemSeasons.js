import React from 'react';
import _ from 'lodash';
import { Collapse, Table } from 'antd';

import helpers from '../helpers/helpers';
import TVShowHelpers from '../helpers/TVShowHelpers';


const TVItemSeasons = ({tvShow}) => {
	//-----------------------------------------
	//--Setup the antd Collapse Component to Show Episodes
		var antdColumns = [{
					title:'Episode #',
					dataIndex: 'episodeNumber',
					key: 'episodeNumber'
				},{
					title:'Name',
					dataIndex: 'episodeName',
					key: 'episodeName'
				},{
					title:'Air Date',
					dataIndex: 'episodeAirDate',
					key: 'episodeAirDate'
				}];
		//--get new set of season data and then sort by season #
		var sortedSeasons = [...tvShow.seasonData];
		sortedSeasons.sort((a,b) => b.season-a.season);

		var episodeAccordion = sortedSeasons.map((season) => {
		var antdData = season.episodeDetail.map((episode) => {
					return (
						{
							key: episode.episodeNumber,
							...episode
						});
				});
			return <Collapse.Panel header={'Season ' + season.season} key={season.season}>
												<Table dataSource={antdData}
												columns= {antdColumns}
												/>
												</Collapse.Panel>;
		});

	return (
				<Collapse accordion>
					{episodeAccordion}
				</Collapse>
				);

};

TVItemSeasons.propTypes = {
	tvShow: React.PropTypes.object
}
export default TVItemSeasons;
