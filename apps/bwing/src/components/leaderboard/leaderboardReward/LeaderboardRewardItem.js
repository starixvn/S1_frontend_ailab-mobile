import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

/** 其他名次獎勵項目 */
const LeaderboardRewardItem = ({ ranking, bonus, convertToMillion }) => {
	const { t } = useTranslation();
	return (
		<div className="item">
			<div className="text">
				<div className="text-ranking">{t(`lbl_rank_${ranking}`)}</div>
				<div className="data-number">{convertToMillion(bonus)}</div>
				<div className="text-unit">{t("lbl_millionDong")}</div>
			</div>
		</div>
	);
};

/** 其他名次獎勵項目 */
export default LeaderboardRewardItem;

LeaderboardRewardItem.propTypes = {
	ranking: PropTypes.string.isRequired,
	bonus: PropTypes.number.isRequired,
	convertToMillion: PropTypes.func.isRequired
};
