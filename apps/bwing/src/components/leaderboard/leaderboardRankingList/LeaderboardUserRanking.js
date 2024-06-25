import React from "react";
import PropTypes from "prop-types";

/** 使用者自己的排名 */
const LeaderboardUserRanking = ({ userRank }) => {
	const { rank, userName, point } = userRank ?? {};
	return (
		<div className="user-themselves">
			<div className="left">
				<i className="icon-arrow" />
				<div className="order">{rank}</div>
				<div className="user-id">{userName}</div>
			</div>
			<div className="right">
				<i className="icon-cash" />
				<span>{point}</span>
			</div>
		</div>
	);
};

/** 使用者自己的排名 */
export default LeaderboardUserRanking;

LeaderboardUserRanking.propTypes = {
	userRank: PropTypes.shape({
		rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		userName: PropTypes.string,
		point: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	}).isRequired
};
