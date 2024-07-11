import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { bannerImgUrl } from "apps/bwing/src/config";

const LeaderboardRewardTop3Item = ({
	ranking,
	bonus,
	convertToMillion,
	RANK
}) => {
	const { t } = useTranslation();

	return (
		<div className="item">
			<img
				src={`${bannerImgUrl}/h5/img/leaderboard/${RANK[ranking]}.png`}
				alt={`${RANK[ranking]}`}
			/>
			<div className="text">
				<div className="data-number">{convertToMillion(bonus)}</div>
				<div className="text-unit">{t("lbl_millionDong")}</div>
			</div>
		</div>
	);
};

export default LeaderboardRewardTop3Item;

LeaderboardRewardTop3Item.propTypes = {
	ranking: PropTypes.string.isRequired,
	bonus: PropTypes.number.isRequired,
	convertToMillion: PropTypes.func.isRequired,
	RANK: PropTypes.object.isRequired
};
