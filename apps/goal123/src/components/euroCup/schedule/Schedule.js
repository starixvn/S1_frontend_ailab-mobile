import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import MatchesByDate from "./MatchesByDate";
import { bannerImgUrl, sportsImgUrl } from "../../../config";
import {
	defFinalSort,
	defQuarterFinalsSort,
	defRoundOf16Sort,
	defSemiFinalsSort
} from "../def";

const Schedule = ({ predictionSettingData }) => {
	const [activeDate, setActiveDate] = useState("");
	const {
		matchTimes,
		roundOf16,
		quarterFinals,
		semiFinals,
		final
	} = predictionSettingData;

	const groupByDate = useMemo(() => {
		const group = {};
		matchTimes.forEach(match => {
			const date = new Date(match.matchTime).toISOString().slice(0, 10);
			if (!group[date]) {
				group[date] = [];
			}
			group[date].push(match);
		});
		return group;
	}, [matchTimes]);

	const teamMap = useMemo(() => {
		const map = new Map();
		const stages = [roundOf16, quarterFinals, semiFinals, final];
		stages.forEach((teams, index) => {
			const stageName = [
				"roundOf16",
				"quarterFinals",
				"semiFinals",
				"final"
			][index];
			teams.forEach(team => {
				const key = `${stageName}-${team.sort}`;
				map.set(key, team);
			});
		});
		return map;
	}, [roundOf16, quarterFinals, semiFinals, final]);

	const createMatchesTeam = (defSorts, stage) => {
		const matchesTeam = {};
		Object.keys(defSorts).forEach(match => {
			matchesTeam[match] = defSorts[match].map(sortNumber => {
				const key = `${stage}-${sortNumber}`;
				return teamMap.get(key);
			});
		});
		return matchesTeam;
	};

	const allMatchesTeam = {
		...createMatchesTeam(defRoundOf16Sort, "roundOf16"),
		...createMatchesTeam(defQuarterFinalsSort, "quarterFinals"),
		...createMatchesTeam(defSemiFinalsSort, "semiFinals"),
		...createMatchesTeam(defFinalSort, "final")
	};

	Object.keys(groupByDate).forEach(date => {
		groupByDate[date] = groupByDate[date].map(match => ({
			...match,
			teams: allMatchesTeam[match.matchName.replace(" ", "")]
		}));
	});

	useEffect(() => {
		const currentDate = moment();
		let closestDate = "";
		let minDiff = Infinity;

		Object.keys(groupByDate).forEach(date => {
			const matchDate = moment(date);
			if (
				matchDate.isSameOrAfter(currentDate) &&
				matchDate.diff(currentDate) < minDiff
			) {
				closestDate = date;
				minDiff = matchDate.diff(currentDate);
			}
		});

		setActiveDate(closestDate);
	}, []);

	return (
		<div className="euro-fixture active">
			<MatchesByDate
				matches={groupByDate}
				activeDate={activeDate}
				setActiveDate={setActiveDate}
			/>
			<div className="euro-match-list">
				{activeDate &&
					groupByDate[activeDate].map(
						({ matchName, matchTime, teams }) => (
							<div
								className="euro-match-item"
								key={`${matchName}-${matchTime}`}>
								<div className="euro-match-order">
									{matchName}
								</div>
								<div>
									{teams[0]?.imageName ? (
										<div className="team">
											<img
												src={`${sportsImgUrl}/Country%20Team/${teams[0].imageName}`}
												alt={teams[0].countryName}
											/>
											<div>{teams[0].countryName}</div>
										</div>
									) : (
										<div className="team">
											<img
												src={`${bannerImgUrl}/h5/img/event/eurocup/empty.svg`}
												alt="empty"
											/>
											<div>{matchName}</div>
										</div>
									)}

									<div className="time">
										<span>
											{moment(matchTime).format("HH:mm")}
										</span>
										(GMT
										{moment(matchTime).utcOffset() / 60 >= 0
											? "+"
											: ""}
										{moment(matchTime).utcOffset() / 60})
									</div>
									{teams[1]?.imageName ? (
										<div className="team">
											<img
												src={`${sportsImgUrl}/Country%20Team/${teams[1].imageName}`}
												alt={teams[1].countryName}
											/>
											<div>{teams[1].countryName}</div>
										</div>
									) : (
										<div className="team">
											<img
												src={`${bannerImgUrl}/h5/img/event/eurocup/empty.svg`}
												alt="empty"
											/>
											<div>{matchName}</div>
										</div>
									)}
								</div>
							</div>
						)
					)}
			</div>
		</div>
	);
};
Schedule.propTypes = {
	predictionSettingData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Schedule;
