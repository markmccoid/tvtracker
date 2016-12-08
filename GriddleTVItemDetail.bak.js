import React from 'react';
import { connect } from 'react-redux';
import { startDeleteShow, startDeleteGroupMember } from '../actions/actions';
import Griddle from 'griddle-react';
require('semantic-ui-css/semantic');
import { Accordion, Icon } from 'semantic-ui-react';
import _ from 'lodash';

var alertify = require('alertifyjs');

import helpers from '../helpers/helpers';
import TVShowHelpers from '../helpers/TVShowHelpers';
import TVUserData from 'TVUserData';

const TVItemDetail = ({ tvShow, showSelectedId, startDeleteShow, startDeleteGroupMember, showData, groups }) => {
  if (!tvShow) {
  	return <div></div>
  }
	var onDeleteShow = (showId, tvShowFirebaseKey, showDataFirebaseKey, showName) => {
		//Find shows that are in the selected group and set up if we delete show.
		//may be better to do it TVItemDetail
		let groupsWithShow = [];
		_.forEach(groups,(group) => {
			let membersToDelete = _.filter(group.members,(member) => member.tvShowId === showSelectedId);

			if (membersToDelete.length > 0) {
			groupsWithShow.push( {
									memberFirebaseKey: membersToDelete[0].firebaseKey,
									groupFirebaseKey: group.firebaseKey
								});
			}
		});
		//Get cofirmation of delete
		alertify.confirm('', `Confirm Deletion of ${showName}`,
									() => {
										//find if show is a member in any group and delete it from the group
										groupsWithShow.forEach((show) => {
											console.log('deleting member', show.memberFirebaseKey);
											startDeleteGroupMember(show.memberFirebaseKey, show.groupFirebaseKey);
										});
										startDeleteShow(showId, tvShowFirebaseKey, showDataFirebaseKey);
										//Alert that delete was successful
										alertify.success(`Deleted ${showName}`);
									},
              		() => {
              			alertify.error(`Canceled delete of ${showName}`)
              		});
	};

	// //--GET NEXT EPISODE
		var nextEpisodeObj = TVShowHelpers.getNextEpisode(tvShow);
		var nextEpisodeBlock = <div className="columns small-4 callout small secondary">
						<p className="detail-title">{nextEpisodeObj.title}</p>
						<p>{nextEpisodeObj.date} | {nextEpisodeObj.number}</p>
					</div>;

	//-----------------------------------------
	//--Setup Griddle Component to Show Episode
		var griddleColumnMetadata = [
			{"columnName": "episodeNumber",
		    "order": 1,
		    "locked": false,
		    "visible": true,
		    "displayName": "Episode #"
		  },
		  {"columnName": "episodeName",
		    "order": 2,
		    "locked": false,
		    "visible": true,
		    "displayName": "Name"
		  },
		  {"columnName": "episodeAirDate",
		    "order": 3,
		    "locked": false,
		    "visible": true,
		    "displayName": "Air Date"
		  }];
		var sortedSeasons = [...tvShow.seasonData];
		sortedSeasons.sort((a,b) => b.season-a.season);
		var griddleComponents = sortedSeasons.map((season) => {
			let aTitle = <Accordion.Title>
          						<Icon name='dropdown' />
          						<strong>Season {season.season}</strong>
        						</Accordion.Title>;
			let aContent =	<Accordion.Content>
												<Griddle  results={season.episodeDetail}
												columnMetadata= {griddleColumnMetadata}
												showSettings={true}
												resultsPerPage={10}
												enableInfiniteScroll={true} useFixedHeader={true} bodyHeight={300}
												/>
									 		</Accordion.Content>;
					return ([aTitle,aContent]);
		});

	//--------------------------------------
		return (
			<div>
				<div className="row">
					<div className="shrink columns medium-4">
						<div className="row">
							<div className="columns medium-12">
								<img src={tvShow.image} className="show-image"/>
							</div>
							<div className="columns medium-12">
								<a href="#" onClick={()=> onDeleteShow(showSelectedId, tvShow.firebaseKey, showData.firebaseKey, tvShow.name)} className="button alert">Delete</a>
							</div>
						</div>
					</div>
					<div className="columns">
						<div className="row">
							<div className="columns small-6 callout small secondary">
								<p className="detail-title">Show</p>
								<p>{tvShow.name}</p>
							</div>
							<div className="columns small-2 callout small secondary">
								<p className="detail-title">Status</p>
								<p>{tvShow.status}</p>
							</div>
							{nextEpisodeObj.date === '' ? '' : nextEpisodeBlock}
						</div>
						<div className="row">
							<div className="columns small-12 summary-container">
								<p className="detail-title">Summary</p>
								<div dangerouslySetInnerHTML={{__html: tvShow.summary}} className="summary"></div>
							</div>
						</div>
					</div>
				</div>

				<TVUserData showData={showData} />
				<Accordion>
					{griddleComponents}
				</Accordion>
			</div>
		);
	};

// export default TVItemDetail;
export default connect(null, {
	startDeleteShow,
	startDeleteGroupMember
})(TVItemDetail);
