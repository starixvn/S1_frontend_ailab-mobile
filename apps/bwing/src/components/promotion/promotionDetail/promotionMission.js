import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { lib_number_foramt } from "libs/promotion/src/lib/common/common";
import { promotionPeriodType } from "libs/promotion/src/lib/common/def";

const Mission = ({ promotionInfo, config }) => {
	const { userInfo } = config;
	const [targetTask, setTargetTask] = useState({});
	const { t } = useTranslation();
	const { currencyId } = userInfo;
	const {
		tierAmountList,
		missionBonusProgress,
		fullFillType,
		periodType
	} = promotionInfo;
	const depositAmountSum =
		(missionBonusProgress && missionBonusProgress.depositAmountSum) || 0;
	const turnoverSum =
		(missionBonusProgress && missionBonusProgress.turnoverSum) || 0;

	const currentDate = moment().format("MM/DD");

	const currencyName = currencyId
		? t(`Currency_${currencyId}`)
		: t("Currency_51");

	const getTaskStatusClassName = (target = 0, current = 0) =>
		current >= target ? "completed" : "undone";

	const getTaskStatusDisplayKey = (target = 0, current = 0) =>
		current >= target ? t("lbl_Completed") : t("lbl_OnGoing");

	const getTaskStatusProgress = (target = 0, current = 0) =>
		current >= target ? "100%" : `${(current / target) * 100}%`;

	const getTaskCycle = () => {
		const periodTypeLabels = {
			[promotionPeriodType.Daily]: t("lbl_DailyTasks").toUpperCase(),
			[promotionPeriodType.Weekly]: t("lbl_WeeklyTasks").toUpperCase(),
			[promotionPeriodType.Monthly]: t("lbl_MonthlyTasks").toUpperCase()
		};

		return periodTypeLabels[periodType] || "";
	};

	useEffect(() => {
		if (tierAmountList.length > 0) {
			const targetObj = tierAmountList.find(
				({ requiredAmount, requiredTurnover }) =>
					depositAmountSum < requiredAmount ||
					turnoverSum < requiredTurnover
			);
			if (targetObj === undefined) {
				setTargetTask(
					tierAmountList.reduce((acc, cur) => {
						return acc.requiredAmount > cur.requiredAmount
							? acc
							: cur;
					}, tierAmountList[0])
				);
			} else {
				setTargetTask(targetObj);
			}
		}
	}, [promotionInfo.bonusCode]);

	if (tierAmountList.length > 0) {
		const isShowDeposit = tierAmountList.some(
			({ requiredAmount }) => requiredAmount !== 0
		);
		const isShowTurnover = tierAmountList.some(
			({ requiredTurnover }) => requiredTurnover !== 0
		);
		return (
			<>
				{tierAmountList.map(
					({
						requiredAmount,
						requiredTurnover,
						rollOver,
						winOver,
						bonus
					}) => (
						<div
							className="promotion-info"
							key={`${requiredAmount}${requiredTurnover}${rollOver}${bonus}`}>
							{isShowDeposit && (
								<div className="promotion-info-item">
									<div>{t("lbl_Deposit").toUpperCase()}</div>
									<div>
										{currencyName}{" "}
										{lib_number_foramt({
											number: requiredAmount,
											isConvertRequired: false,
											digits: 0
										})}
									</div>
								</div>
							)}
							{isShowTurnover && (
								<div className="promotion-info-item">
									<div>{t("lbl_Turnover").toUpperCase()}</div>
									<div>
										{currencyName}{" "}
										{lib_number_foramt({
											number: requiredTurnover,
											isConvertRequired: false,
											digits: 0
										})}
									</div>
								</div>
							)}
							<div className="promotion-info-item">
								<div>
									{fullFillType === 2
										? t("lbl_WinOver")
										: t("lbl_RollOver")}
								</div>
								<div>
									{fullFillType === 2 ? winOver : rollOver}X
								</div>
							</div>
							<div className="promotion-info-item">
								<div>{t("lbl_Bonus").toUpperCase()}</div>
								<div>
									{currencyName}{" "}
									{lib_number_foramt({
										number: bonus,
										isConvertRequired: false,
										digits: 0
									})}
								</div>
							</div>
						</div>
					)
				)}
				<div className="mission-content">
					<div className="mission-title">
						{currentDate} {getTaskCycle()}
					</div>
					<div className="mission-progress">
						{isShowDeposit && (
							<div>
								<div className="mission-progress-item">
									<div className="mission-progress-text">
										<div>
											{t(
												"lbl_RequiredDepositAmount"
											).toUpperCase()}
										</div>
									</div>
									<div>
										<div className="progress">
											<div
												className="progress-bar"
												style={{
													width: `${getTaskStatusProgress(
														targetTask?.requiredAmount,
														depositAmountSum
													)}`
												}}
											/>
										</div>
										<div className="mission-number">
											{lib_number_foramt({
												number: depositAmountSum,
												isConvertRequired: false,
												digits: 0
											})}
											/
											{lib_number_foramt({
												number:
													targetTask?.requiredAmount,
												isConvertRequired: false,
												digits: 0
											})}
										</div>
									</div>
								</div>
								<div
									className={`state ${getTaskStatusClassName(
										targetTask?.requiredAmount,
										depositAmountSum
									)}`}>
									{getTaskStatusDisplayKey(
										targetTask?.requiredAmount,
										depositAmountSum
									)}
								</div>
							</div>
						)}
						{isShowTurnover && (
							<div>
								<div className="mission-progress-item turnover">
									<div className="mission-progress-text">
										<div>
											{t(
												"lbl_RequiredTurnover"
											).toUpperCase()}
										</div>
									</div>
									<div className="progress">
										<div
											className="progress-bar"
											style={{
												width: `${getTaskStatusProgress(
													targetTask?.requiredTurnover,
													turnoverSum
												)}`
											}}
										/>
									</div>
									<div className="mission-number">
										{lib_number_foramt({
											number: turnoverSum,
											isConvertRequired: false,
											digits: 0
										})}
										/
										{lib_number_foramt({
											number:
												targetTask?.requiredTurnover,
											isConvertRequired: false,
											digits: 0
										})}
									</div>
								</div>
								<div
									className={`state ${getTaskStatusClassName(
										targetTask?.requiredTurnover,
										turnoverSum
									)}`}>
									{getTaskStatusDisplayKey(
										targetTask?.requiredTurnover,
										turnoverSum
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</>
		);
	}
	return null;
};

export default Mission;

Mission.defaultProps = {
	promotionInfo: null,
	config: null
};

Mission.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	config: PropTypes.objectOf(PropTypes.any)
};
