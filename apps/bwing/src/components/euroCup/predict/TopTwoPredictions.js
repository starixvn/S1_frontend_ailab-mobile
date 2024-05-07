import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import PropTypes from "prop-types";
import { sportsImgUrl } from "../../../config";
import { eventTime } from "../../common/eventTime";
import { isEventPeriod } from "../../common/common";
import { predictTabs } from "../def";
import Schedule from "../schedule/Schedule";

const TopTwoPredictions = ({
	predictScoreList,
	predictionSettingData,
	isPredict,
	homeTeamScore,
	awayTeamScore,
	activePredictTab,
	setHomeTeamScore,
	setAwayTeamScore,
	setActivePredictTab,
	onSubmit
}) => {
	const { t } = useTranslation();

	let homeTeam;
	let awayTeam;
	for (const item of predictScoreList) {
		if (item.team === "Home" && !homeTeam) {
			homeTeam = item;
		} else if (item.team === "Away" && !awayTeam) {
			awayTeam = item;
		}
		if (homeTeam && awayTeam) break;
	}

	return (
		<div className="center-wrapper">
			<div className="center-btn">
				<button
					className={classNames({
						active: activePredictTab === predictTabs.prediction
					})}
					onClick={() => setActivePredictTab(predictTabs.prediction)}>
					{t("lbl_CupEvent_Prediction")}
				</button>
				<button
					className={classNames({
						active: activePredictTab === predictTabs.schedule
					})}
					onClick={() => setActivePredictTab(predictTabs.schedule)}>
					{t("lbl_CupEvent_Schedule")}
				</button>
			</div>

			{activePredictTab === predictTabs.prediction && (
				<div className="center-content active">
					<div className="center-text">
						<span>{t("lbl_CupEvent_Prediction_Banner_Desc1")}</span>
						<span>{t("lbl_CupEvent_Prediction_Banner_Desc2")}</span>
						<span>{t("lbl_CupEvent_Prediction_Banner_Desc3")}</span>
						<span>{t("lbl_CupEvent_Prediction_Banner_Desc4")}</span>
					</div>
					<div className="center-score">
						<div className="score-country">
							<div>
								{/* 冠亞軍未知狀況score-flag加上unknown */}
								<div
									className={classNames("score-flag", {
										unknown: !isEventPeriod(
											eventTime.predictScore
										)
									})}>
									<img
										src={`${sportsImgUrl}/Country%20Team/${homeTeam?.teamDetail.imageName}`}
										alt={homeTeam?.teamDetail.countryName}
									/>
								</div>

								{/* 冠亞軍未知狀況先用score-text等冠亞出來換成score-input */}
								{isEventPeriod(eventTime.predictScore) ? (
									<div
										className={classNames("score-input", {
											check: isPredict
										})}>
										<input
											type="number"
											name="score"
											placeholder={t(
												"lbl_CupEvent_PleaseFillOut"
											)}
											value={homeTeamScore}
											onChange={e =>
												setHomeTeamScore(e.target.value)
											}
										/>
									</div>
								) : (
									<div className="score-text">
										{t("lbl_CupEvent_Prediction_HideTip")}
									</div>
								)}
							</div>
							<div className="vs">
								<span>vs</span>
								<span>:</span>
							</div>
							<div>
								{/*
									冠亞軍未知狀況score-flag classname加上unknown
									*/}
								<div
									className={classNames("score-flag", {
										unknown: !isEventPeriod(
											eventTime.predictScore
										)
									})}>
									<img
										src={`${sportsImgUrl}/Country%20Team/${awayTeam?.teamDetail.imageName}`}
										alt={awayTeam?.teamDetail.countryName}
									/>
								</div>
								{isEventPeriod(eventTime.predictScore) ? (
									<div
										className={classNames("score-input", {
											check: isPredict
										})}>
										<input
											type="number"
											name="score"
											placeholder={t(
												"lbl_CupEvent_PleaseFillOut"
											)}
											value={awayTeamScore}
											onChange={e =>
												setAwayTeamScore(e.target.value)
											}
										/>
									</div>
								) : (
									<div className="score-text">
										{t("lbl_CupEvent_Prediction_HideTip")}
									</div>
								)}
							</div>
						</div>
					</div>
					{isEventPeriod(eventTime.predictScore) && (
						<button
							onClick={() => onSubmit()}
							className={classNames("submit-btn", {
								check: isPredict
							})}>
							{t("lbl_Submit")}
						</button>
					)}

					<div className="center-tip">
						{t("lbl_CupEvent_Prediction_desc")}
					</div>
				</div>
			)}

			{activePredictTab === predictTabs.schedule && (
				<Schedule predictionSettingData={predictionSettingData} />
			)}
		</div>
	);
};

TopTwoPredictions.propTypes = {
	predictScoreList: PropTypes.arrayOf(PropTypes.any).isRequired,
	predictionSettingData: PropTypes.objectOf(PropTypes.any).isRequired,
	isPredict: PropTypes.bool.isRequired,
	homeTeamScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	awayTeamScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	activePredictTab: PropTypes.number.isRequired,
	setHomeTeamScore: PropTypes.func.isRequired,
	setAwayTeamScore: PropTypes.func.isRequired,
	setActivePredictTab: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default TopTwoPredictions;
