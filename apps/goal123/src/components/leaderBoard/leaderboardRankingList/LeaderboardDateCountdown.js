import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { products } from "@ailab-mobile/common";
import { CountdownTimer } from "@ailab-mobile/components";
import { useMenu } from "../../hook/useMenu";

/** 本月倒數 */
const LeaderboardDateCountdown = () => {
	const { t } = useTranslation();
	const { onClickProductItem } = useMenu();
	/** 每月的最後一天 ISO 格式 */
	const endOfMonthISO = moment().endOf("month").toISOString();

	return (
		<CountdownTimer
			endTime={endOfMonthISO}
			renderHTMLCallback={timeLeft => {
				const { days, hours, minutes, seconds } = timeLeft;
				return (
					<div className="countdown">
						<div className="countdown-item">
							<div className="title">
								{t("lbl_Leaderboard_Remaining_Time")}
							</div>
							<div className="countdown-time">
								<div className="list">
									<span>{days}</span>
									{t("lbl_Days")}
								</div>
								<div className="list">
									<span>{hours}</span>
									{t("lbl_Hours")}
								</div>
								<div className="list">
									<span>{minutes}</span>
									{t("lbl_Minutes")}
								</div>
								<div className="list">
									<span>{seconds}</span>
									{t("lbl_Seconds")}
								</div>
							</div>
						</div>
						<button
							onClick={() => onClickProductItem(products.Soccer)}
							className="btn-bet">
							{t("lbl_BetNow")}
						</button>
					</div>
				);
			}}
		/>
	);
};

/** 本月倒數 */
export default LeaderboardDateCountdown;
