import React from "react";
import { useLeaderBoard } from "@ailab-mobile/common";
import { useTranslation } from "react-i18next";
import { numFormatToDigits } from "../common/common";

/** 積分表 */
const LeaderboardPointConversion = () => {
	const { leaderBoardSettingResponseData } = useLeaderBoard();
	const { t } = useTranslation();

	const { leaderboardPointCalculation = {} } =
		leaderBoardSettingResponseData ?? {};

	const { liveCasinoTurnover, slotTurnover, sportTurnover } =
		leaderboardPointCalculation ?? {};

	/** 將point轉換成 i18n 顯示 */
	const getPointI18nText = () => {
		const POINT = 1; // 固定積分
		const i18nText = t("lbl_Points");
		return `${POINT} ${i18nText}`;
	};

	/**
	 * 將流水 + vnd 轉換成 i18n 顯示
	 * @param turnover 流水 */
	const getTurnoverI18nText = turnover => {
		return `${numFormatToDigits(turnover, 0)} ${t("lbl_vnd")}`;
	};
	return (
		<div className="info-point">
			<div className="title">{t("lbl_pointConversion")}</div>
			<div className="table-content">
				<div className="table-thead">
					<div className="list">{t("lbl_category")}</div>
					<div className="list">{t("lbl_validTurnover")}</div>
					<div className="list">{t("lbl_Points")}</div>
				</div>
				<div className="table-inner">
					<div className="list">
						{t("lbl_General_CasinoWithLive")}
					</div>
					<div className="list">
						{getTurnoverI18nText(liveCasinoTurnover)}
					</div>
					<div className="list">{getPointI18nText()}</div>
				</div>
				<div className="table-inner">
					<div className="list">{t("lbl_General_Slots")}</div>
					<div className="list">
						{getTurnoverI18nText(slotTurnover)}
					</div>
					<div className="list">{getPointI18nText()}</div>
				</div>
				<div className="table-inner">
					<div className="list">{t("lbl_General_Sports")}</div>
					<div className="list">
						{getTurnoverI18nText(sportTurnover)}
					</div>
					<div className="list">{getPointI18nText()}</div>
				</div>
			</div>
		</div>
	);
};

/** 積分表 */
export default LeaderboardPointConversion;
