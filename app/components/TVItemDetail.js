import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { startDeleteShow, startDeleteGroupMember, startRefreshShowById, startAddGroupMember } from '../actions/actions';
import Griddle from 'griddle-react';
require('semantic-ui-css/semantic');
import { Accordion, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { Collapse, Tag, Table } from 'antd';
const CheckableTag = Tag.CheckableTag;


var alertify = require('alertifyjs');

import helpers from '../helpers/helpers';
import TVShowHelpers from '../helpers/TVShowHelpers';
import TVUserData from 'TVUserData';

const TVItemDetail = ({ tvShow, showSelectedId, startDeleteShow, startDeleteGroupMember, startAddGroupMember, startRefreshShowById, showData, groups }) => {
  if (!tvShow) {
  	return <div></div>
  }
  var getGroupsWithShow = () => {
		//Find shows that are in the selected group and set up if we delete show.
		let groupsWithShow = [];
		let groupsFlagged = [];
		_.forEach(groups,(group) => {
			let memberInGroup = _.filter(group.members,(member) => member.tvShowId === showSelectedId);

			if (memberInGroup.length > 0) {
			groupsWithShow.push( {
									memberFirebaseKey: memberInGroup[0].firebaseKey,
									groupFirebaseKey: group.firebaseKey,
									groupName: group.name
								});
			}

			groupsFlagged.push({
				groupFirebaseKey: group.firebaseKey,
				groupName: group.name,
				memberFirebaseKey: memberInGroup.length > 0 ? memberInGroup[0].firebaseKey : undefined,
				showInGroup: memberInGroup.length > 0 ? true : false
			});

		});
		//console.log("groupsflagged", groupsFlagged);
		return {groupsWithShow, groupsFlagged};
  };
//---------------
//-DELETE SHOW
	var onDeleteShow = (showId, tvShowFirebaseKey, showDataFirebaseKey, showName) => {
		//Find shows that are in the selected group and set up if we delete show.
		// let groupsWithShow = [];
		// _.forEach(groups,(group) => {
		// 	let membersToDelete = _.filter(group.members,(member) => member.tvShowId === showSelectedId);

		// 	if (membersToDelete.length > 0) {
		// 	groupsWithShow.push( {
		// 							memberFirebaseKey: membersToDelete[0].firebaseKey,
		// 							groupFirebaseKey: group.firebaseKey
		// 						});
		// 	}
		// });
		//Get cofirmation of delete
		alertify.confirm('', `Confirm Deletion of ${showName}`,
									() => {
										//find if show is a member in any group and delete it from the group
										getGroupsWithShow().groupsWithShow.forEach((show) => {
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
//----------------------------------------------------------------------------------
//--Add show to Group
	var addToGroup = (show, groupFirebaseKey) => {
		let {firebaseKey, name, id} = show;
		let newMemberObj = {
			tvShowFirebaseKey: firebaseKey,
			tvShowName: name,
			tvShowId: id
		};
		//dispatch action that will add member to firebase and redux
		startAddGroupMember(newMemberObj, groupFirebaseKey);
	}
//--Delete show from Group members
	var deleteFromMembers = (memberFirebaseKey, groupFirebaseKey) => {
		console.log('delete',memberFirebaseKey, groupFirebaseKey);
		startDeleteGroupMember(memberFirebaseKey, groupFirebaseKey);
	}
//----------------------------------------------------------------------------------
	// //--GET NEXT EPISODE
		var nextEpisodeObj = TVShowHelpers.getNextEpisode(tvShow);
		var nextEpisodeBlock = <div className="columns small-4 callout small secondary">
						<p className="detail-title">{nextEpisodeObj.title}</p>
						<p>{nextEpisodeObj.date} | {nextEpisodeObj.number}</p>
					</div>;

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
		//function for group display JSX
		var groupsDisplay = () => {
			let groupsFlagged = getGroupsWithShow().groupsFlagged;
			let groupsShowIsIn = getGroupsWithShow().groupsWithShow;
			//If in no groups, don't show anything
			// if ( groupsShowIsIn.length === 0 ) {
			// 	return null;
			// }
			// console.log(groupsShowIsIn)
			let groupList = groupsShowIsIn.map(group => group.groupName).join(', ');
			let groupTagsJSX = groupsFlagged.map((group)=> {
					return (
					<CheckableTag
						checked={group.showInGroup}
						onChange={() => group.showInGroup ? deleteFromMembers(group.memberFirebaseKey, group.groupFirebaseKey) : addToGroup(tvShow, group.groupFirebaseKey)}>
						{group.groupName}
					</CheckableTag>
						);
				})
			return 	(
				<div className="badge-groups">
				Groups - <Link to="groupmanage" title={groupList}><span >{groupsShowIsIn.length}</span></Link>
				{groupTagsJSX}
				</div>
					);
		};
	//--------------------------------------
		return (
			<div className="tv-item-detail">
				<div className="row">
					<div className="shrink columns medium-4">
						<div className="row">
							<div className="columns medium-12">
								<img src={tvShow.image} className="show-image" />
							</div>
							<div className="columns medium-12">
								<a href="#" onClick={()=> onDeleteShow(showSelectedId, tvShow.firebaseKey, showData.firebaseKey, tvShow.name)} className="button alert">Delete</a>
								<a href="#" onClick={()=> startRefreshShowById(showSelectedId, tvShow.firebaseKey)} className="button primary">Refresh</a>
								<a href="#" onClick={()=> alert("Show Groups")} className="button primary">G</a>
								{groupsDisplay()}

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
				<Collapse accordion>
					{episodeAccordion}
				</Collapse>
			</div>
		);
	};

// export default TVItemDetail;
export default connect(null, {
	startDeleteShow,
	startDeleteGroupMember,
	startAddGroupMember,
	startRefreshShowById
})(TVItemDetail);
