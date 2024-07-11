import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { products } from "@ailab-mobile/common";
import moment from "moment";
import useMenu from "../../hook/useMenu";

/** 本月倒數 */
const LeaderboardDateCountdown = () => {
	const { t } = useTranslation();
	const { onClickProductItem } = useMenu();

	/** 本月倒數時間 */
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	const { days, hours, minutes, seconds } = timeLeft;

	/** 計算離本月結算的倒數時間 */
	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = moment();
			const endOfMonth = moment().endOf("month");
			const diff = endOfMonth.diff(now);
			const calSeconds = Math.floor((diff / 1000) % 60);
			const calMinutes = Math.floor((diff / 1000 / 60) % 60);
			const calHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const calDays = Math.floor(diff / (1000 * 60 * 60 * 24));

			setTimeLeft({
				days: calDays,
				hours: calHours,
				minutes: calMinutes,
				seconds: calSeconds
			});
		};
		const interval = setInterval(calculateTimeLeft, 1000);
		return () => clearInterval(interval);
	}, []);

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
