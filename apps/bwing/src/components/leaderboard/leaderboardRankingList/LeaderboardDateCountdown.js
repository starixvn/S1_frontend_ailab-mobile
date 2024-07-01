import React from "react";
import { useTranslation } from "react-i18next";
import { products, useLeaderBoard } from "@ailab-mobile/common";
import useMenu from "../../hook/useMenu";

/** 本月倒數 */
const LeaderboardDateCountdown = () => {
	const { t } = useTranslation();
	const { timeLeft } = useLeaderBoard();
	const { days, hours, minutes, seconds } = timeLeft;
	const { onClickProductItem } = useMenu();
	return (
		<div className="countdown">
			<div className="countdown-item">
				<div className="title">{t("lbl_reamainingTime")}</div>
				<div className="countdown-time">
					<div className="list">
						<span>{days}</span>
						{t("lbl_day")}
					</div>
					<div className="list">
						<span>{hours}</span>
						{t("lbl_hours")}
					</div>
					<div className="list">
						<span>{minutes}</span>
						{t("lbl_minutes")}
					</div>
					<div className="list">
						<span>{seconds}</span>
						{t("lbl_seconds")}
					</div>
				</div>
			</div>
			<button
				onClick={() => onClickProductItem(products.Soccer)}
				className="btn-bet">
				{t("lbl_betNow")}
			</button>
		</div>
	);
};

/** 本月倒數 */
export default LeaderboardDateCountdown;
