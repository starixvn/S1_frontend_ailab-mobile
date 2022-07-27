/* eslint-disable react/no-array-index-key */
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {
	matchType,
	knockoutsEvent,
	defGroupsData,
	defMatchTime
} from "./fixture.matches.def";
import { bannerImgUrl } from "../../config";

const Matches = ({ matches, prediction, event, selectEvent, i18n, langId }) => {
	const knockoutsTab = Object.values(knockoutsEvent).map(el => (
		<button
			key={`knockouts-tab-${el.eventName}`}
			className={
				matches === matchType.knockouts && event === el.eventName
					? "active"
					: ""
			}
			onClick={() => {
				selectEvent({
					type: matchType.knockouts,
					eventName: el.eventName
				});
			}}>
			<div>{i18n[el.displayKey]}</div>
		</button>
	));

	const groupsTab = Object.keys(defGroupsData).map(el => {
		const month = moment(el, "MMDD").format("MMM");
		const day = moment(el, "MMDD").format("DD");
		const week = moment(el, "MMDD").format("ddd");

		return (
			<button
				key={`groups-tab-${el}`}
				className={
					matches === matchType.groups && event === el ? "active" : ""
				}
				onClick={() => {
					selectEvent({
						type: matchType.groups,
						eventName: el
					});
				}}>
				<div>{month}</div>
				<div>{day}</div>
				<div>{week.toUpperCase()}</div>
			</button>
		);
	});

	const timeFormat = ({ time, source }) => {
		let matchTimeInZone = "";

		if (source === "api") {
			matchTimeInZone = moment(time, "YYYY-MM-DDTHH:mm Z")
				.zone("+07:00")
				.format("YYYY/MM/DD HH:mm +0700");
		} else {
			matchTimeInZone = moment(time, "YYYY/MM/DD HH:mm Z")
				.zone("+07:00")
				.format("YYYY/MM/DD HH:mm +0700");
		}

		const matchTime = moment(matchTimeInZone, "YYYY/MM/DD HH:mm").format(
			"HH:mm"
		);
		const matchDate = moment(matchTimeInZone, "YYYY/MM/DD HH:mm").format(
			"MM/DD"
		);
		return { matchTime, matchDate };
	};

	const getKnockoutsContent = ({ type, data }) => {
		let matchTable = [];

		if (data) {
			if (type === matchType.knockouts && prediction) {
				const arr = [];

				if (prediction?.[event]) {
					const sortedData = prediction?.[event]?.sort(
						(a, b) => a.sort - b.sort
					);

					const _sortedData = [...sortedData];

					for (let i = 0; i < _sortedData?.length; i + 2) {
						arr.push(_sortedData?.splice(i, i + 2));
					}
				}

				matchTable = data[event]?.map((el, i) => {
					const targetMatch = arr?.find(item => {
						return item[0].sort === el.sort;
					});

					const targetMatchTimeObj = prediction.matchTimes.find(
						time => {
							const _matchName = time.matchName.replace(
								"Match ",
								""
							);
							return _matchName === el.match;
						}
					);

					const { matchTime, matchDate } = timeFormat({
						time: targetMatchTimeObj.matchTime,
						source: "api"
					});

					return (
						<div
							className="match"
							key={`match-${i}-${targetMatch?.[0]?.countryName}`}>
							<div className="order">Match {el.match}</div>
							<div>
								<div className="team left">
									{targetMatch?.[0]?.countryName}
									<img
										src={`${bannerImgUrl}/img/flag/${
											targetMatch?.[0]?.imageName ??
											"na.jpg"
										}`}
										alt={targetMatch?.[0]?.imageName}
									/>
								</div>
								<div className="time">
									<span>{matchDate}</span>
									<span>{matchTime}</span> (GMT+7){" "}
								</div>
								<div className="team right">
									{targetMatch?.[1]?.countryName}
									<img
										src={`${bannerImgUrl}/img/flag/${
											targetMatch?.[1]?.imageName ??
											"na.jpg"
										}`}
										alt={targetMatch?.[1]?.imageName}
									/>
								</div>
							</div>
						</div>
					);
				});
			}

			if (type === matchType.groups) {
				matchTable = data[event]?.map(el => {
					const { matchTime } = timeFormat({
						time: el.time,
						source: "frontend"
					});

					const _name = langId === "vn" ? "nameVN" : "name";

					return (
						<div
							className="match"
							key={`match-${el.time}-${el.teamA.name}`}>
							<div>
								<div className="team left">
									{el.teamA[_name]}
									<img
										src={`${bannerImgUrl}/img/flag/${el.teamA.imgName}`}
										alt={el.teamA.imgName}
									/>
								</div>
								<div className="time">
									<span>{matchTime}</span> (GMT+7){" "}
								</div>
								<div className="team right">
									{el.teamB[_name]}
									<img
										src={`${bannerImgUrl}/img/flag/${el.teamB.imgName}`}
										alt={el.teamB.imgName}
									/>
								</div>
							</div>
						</div>
					);
				});
			}
		}

		return matchTable;
	};

	return (
		<>
			<div
				className={`${
					matches === matchType.knockouts
						? "group-tab-sort"
						: "group-tab-date"
				}`}>
				{matches === matchType.knockouts ? knockoutsTab : groupsTab}
			</div>

			<div className="group-match">
				{getKnockoutsContent({
					type: matches,
					data:
						matches === matchType.knockouts
							? defMatchTime
							: defGroupsData
				})}
			</div>
		</>
	);
};

Matches.defaultProps = {
	prediction: null,
	event: null,
	selectEvent: () => null,
	i18n: null,
	langId: null
};

Matches.propTypes = {
	matches: PropTypes.string.isRequired,
	prediction: PropTypes.objectOf(PropTypes.any),
	event: PropTypes.string,
	selectEvent: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string),
	langId: PropTypes.string
};

export default Matches;
