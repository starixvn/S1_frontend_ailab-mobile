import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import { isConvert, number_format } from "../../common/common";

const Mission = ({ promotionInfo }) => {
	const [targetTask, setTargetTask] = useState({});
	const { t } = useTranslation();
	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);

	const {
		tierAmountList,
		missionBonusProgress,
		fullFillType,
		winOver
	} = promotionInfo;
	const depositAmountSum =
		(missionBonusProgress && missionBonusProgress.depositAmountSum) || 0;
	const turnoverSum =
		(missionBonusProgress && missionBonusProgress.turnoverSum) || 0;

	const currentDate = moment().format("MM/DD");

	const getTaskStatusClassName = (target = 0, current = 0) =>
		current >= target ? "completed" : "undone";

	const getTaskStatusDisplayKey = (target = 0, current = 0) =>
		current >= target ? t("lbl_Completed") : t("lbl_OnGoing");

	const getTaskStatusProgress = (target = 0, current = 0) =>
		current >= target ? "100%" : `${(current / target) * 100}%`;

	const _isConvert = isConvert(currencyId);

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
	}, []);

	if (tierAmountList.length > 0) {
		return (
			<>
				{tierAmountList.map(
					({ requiredAmount, requiredTurnover, rollOver, bonus }) => (
						<div
							className="rolloverList"
							key={`${requiredAmount}${requiredTurnover}${rollOver}${bonus}`}>
							<div>
								<div>{t("lbl_Deposit").toUpperCase()}</div>
								<div>
									{t(`Currency_${currencyId}`)}{" "}
									{number_format(
										requiredAmount,
										_isConvert,
										0
									)}
								</div>
							</div>
							<div>
								<div>{t("lbl_Turnover").toUpperCase()}</div>
								<div>
									{t(`Currency_${currencyId}`)}{" "}
									{number_format(
										requiredTurnover,
										_isConvert,
										0
									)}
								</div>
							</div>
							<div>
								<div>
									{fullFillType === 2
										? t("lbl_WinOver")
										: t("lbl_RollOver")}
								</div>
								<div>
									{fullFillType === 2 ? winOver : rollOver}X
								</div>
							</div>
							<div>
								<div>{t("lbl_Bonus").toUpperCase()}</div>
								<div>
									{t(`Currency_${currencyId}`)}{" "}
									{number_format(bonus, _isConvert, 0)}
								</div>
							</div>
						</div>
					)
				)}
				<div className="mission-content">
					<div className="mission-title">
						{currentDate} {t("lbl_DailyTasks").toUpperCase()}
					</div>
					<div className="mission-progress">
						<div>
							<div className="mission-progress-item">
								<div className="mission-progress-text">
									<div>
										{t(
											"lbl_RequiredDepositAmount"
										).toUpperCase()}
									</div>
								</div>
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
									{depositAmountSum}/
									{targetTask?.requiredAmount}
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
									{turnoverSum}/{targetTask?.requiredTurnover}
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
					</div>
				</div>
			</>
		);
	}
	return null;
};

export default Mission;

Mission.defaultProps = {
	promotionInfo: null
};

Mission.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any)
};
