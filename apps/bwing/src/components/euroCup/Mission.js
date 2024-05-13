import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { bannerImgUrl } from "../../config";
import path from "../../path";
import { numFormatToDigits } from "../common/common";
import { userInfoContext } from "../common/context";
import ProgressBar from "./components/ProgressBar";

const Mission = ({
	activeMissionTab,
	setActiveMissionTab,
	promotionMission,
	cupEventPromotionMissionProgress
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const numbers = Array.from({ length: 5 }, (_, index) => index + 1);

	const missionData1 =
		promotionMission.find(mission => mission.missionNo === 1) || {};
	const missionData2 =
		promotionMission.find(mission => mission.missionNo === 2) || {};
	const missionData3 =
		promotionMission.find(mission => mission.missionNo === 3) || {};

	const missionData5 =
		promotionMission.find(mission => mission.missionNo === 5) || {};
	const getDepositProgressWidth = (cur, target) => {
		if (!cur && !target) {
			return "0%";
		}
		const percentage = (cur / target) * 100;
		return percentage > 100 ? "100%" : `${percentage}%`;
	};

	const getVerifyProgressWidth = () => {
		if (missionData1?.isCompleted) {
			return "100%";
		}
		if (userInfo.isLogin) {
			return "50%";
		}

		return "0%";
	};

	return (
		<div className="mission-box">
			<div className="mission-bar">
				{numbers.map(number => (
					<div
						className={classNames({
							active: activeMissionTab === number && number !== 5,
							five: activeMissionTab === number && number === 5
						})}
						onClick={() => setActiveMissionTab(number)}
						style={{ fontSize: "unset" }}>
						{t("lbl_CupEvent_Mission")} {number}
						{number < 5 && (
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/arrow-grey.png`}
								alt="arrow-grey"
							/>
						)}
					</div>
				))}
			</div>
			<div className="mission-item">
				<div
					className={classNames("mission-one", {
						close: activeMissionTab !== 1
					})}>
					<div className="ticket-title">
						{t("lbl_CupEvent_GetTickets", { count: 1 })}
					</div>
					<div className="subtitle">
						{t("lbl_CupEvent_Mission_Subtitle")}
					</div>
					<div className="progress">
						<img
							src={`${bannerImgUrl}/h5/img/event/eurocup/${
								userInfo.isLogin ? "done-yellow" : "done-grey"
							}.png`}
							alt={userInfo.isLogin ? "done-yellow" : "done-grey"}
						/>
						<div className="progress-bar">
							<div
								className="item"
								style={{
									width: getVerifyProgressWidth()
								}}
							/>
							{/* 完成Register達到50% round加上active */}
							<div
								className={classNames("round", {
									active: userInfo.isLogin
								})}
							/>
						</div>
						<img
							src={`${bannerImgUrl}/h5/img/event/eurocup/${
								missionData1?.isCompleted
									? "done-yellow"
									: "done-grey"
							}.png`}
							alt={
								missionData1?.isCompleted
									? "done-yellow"
									: "done-grey"
							}
						/>
					</div>
					<div className="state">
						<div>
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/register-icon.png`}
								alt="register-icon"
							/>
							<div>
								<span>{t("lbl_Completed")}</span>
								<span>
									{t("lbl_CupEvent_Mission_Register")}
								</span>
							</div>
						</div>
						<div>
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/verify-icon.png`}
								alt="verify-icon"
							/>
							<div>
								<span>{t("lbl_Completed")}</span>
								<span>{t("lbl_CupEvebnt_Verify")}</span>
							</div>
						</div>
					</div>
				</div>
				<div
					className={classNames("mission-two", {
						close: activeMissionTab !== 2
					})}>
					<div className="ticket-title">
						{" "}
						{t("lbl_CupEvent_GetTickets", { count: 1 })}
					</div>
					<div className="amount-item">
						<div className="money">
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/money-icon.png`}
								alt="money-icon"
							/>
							<div>
								<span>{t("lbl_CupEvent_MakeAtLeast")}</span>
								<span>
									{/* {numFormatToDigits(
										missionData2?.depositAmount,
										0
									)}{" "} */}
									{/* 原本串接API，登入後才會顯示數字，2024/5/13需求改為寫死 */}
									1,000,000 VND
								</span>
								<span>
									{t("lbl_CupEvent_AccumulatedDeposit")}
								</span>
							</div>
							<button
								onClick={() =>
									navigate(
										`${
											userInfo.isLogin
												? `/${path.deposit.root}`
												: `/${path.login.root}`
										}`
									)
								}>
								{t("lbl_Deposit")}
							</button>
						</div>
						<div className="progress">
							<div
								className="progress-bar"
								style={{
									width: missionData2?.isCompleted
										? "100%"
										: getDepositProgressWidth(
												cupEventPromotionMissionProgress?.depositAmount,
												missionData2?.depositAmount
										  )
								}}
							/>
						</div>
						<div className="number">
							<div>{t("lbl_CupEvent_CurrentlyAccumulated")}</div>
							<div>
								<span>
									{missionData2?.isCompleted
										? numFormatToDigits(
												missionData2?.depositAmount,
												0
										  )
										: numFormatToDigits(
												cupEventPromotionMissionProgress?.depositAmount,
												0
										  )}
								</span>{" "}
								/{" "}
								{numFormatToDigits(
									missionData2?.depositAmount,
									0
								)}{" "}
								VND
							</div>
						</div>
					</div>
				</div>
				<div
					className={classNames("mission-three", {
						close: activeMissionTab !== 3
					})}>
					<div className="ticket-title">
						{t("lbl_CupEvent_GetTickets", { count: 1 })}
					</div>
					<div className="amount-item">
						<div className="money">
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/money-icon.png`}
								alt="money-icon"
							/>
							<div>
								<span>{t("lbl_CupEvent_MakeAtLeast")}</span>
								<span>
									{/* {numFormatToDigits(
										missionData3?.depositAmount,
										0
									)}{" "} */}
									{/* 原本串接API，登入後才會顯示數字，2024/5/13需求改為寫死 */}
									10,000,000 VND
								</span>
								<span>
									{" "}
									{t("lbl_CupEvent_AccumulatedDeposit")}
								</span>
							</div>
							<button
								onClick={() =>
									navigate(
										`${
											userInfo.isLogin
												? `/${path.deposit.root}`
												: `/${path.login.root}`
										}`
									)
								}>
								{t("lbl_Deposit")}
							</button>
						</div>
						<div className="progress">
							<div
								className="progress-bar"
								style={{
									width: missionData3?.isCompleted
										? "100%"
										: getDepositProgressWidth(
												cupEventPromotionMissionProgress?.depositAmount,
												missionData3?.depositAmount
										  )
								}}
							/>
						</div>
						<div className="number">
							<div>{t("lbl_CupEvent_CurrentlyAccumulated")}</div>
							<div>
								<span>
									{missionData3?.isCompleted
										? numFormatToDigits(
												missionData3?.depositAmount,
												0
										  )
										: numFormatToDigits(
												cupEventPromotionMissionProgress?.depositAmount,
												0
										  )}
								</span>{" "}
								/{" "}
								{numFormatToDigits(
									missionData3?.depositAmount,
									0
								)}{" "}
								VND
							</div>
						</div>
					</div>
				</div>
				<div
					className={classNames("mission-four", {
						close: activeMissionTab !== 4
					})}>
					<div className="ticket-title">
						{t("lbl_CupEvent_GetTickets", { count: 2 })}
					</div>
					<div className="subtitle">
						{t("lbl_CupEvent_Mission4_Subtitle")}
					</div>
					{cupEventPromotionMissionProgress?.affList?.length > 0 && (
						<div className="sheet">
							<div className="sheet-title">
								<div>{t("lbl_ID")}</div>
								<div>{t("lbl_CupEvent_Mission")} 01</div>
								<div>{t("lbl_CupEvent_Mission")} 02</div>
							</div>
							<div>
								{cupEventPromotionMissionProgress?.affList?.map(
									({ accountName, mission1, mission2 }) => (
										<div className="sheet-item">
											<div className="user">
												{accountName}
											</div>
											<div
												className={classNames(
													"check-box",
													{
														yellow: mission1
													}
												)}
											/>
											<div
												className={classNames(
													"check-box",
													{
														green: mission2
													}
												)}
											/>
										</div>
									)
								)}
							</div>
						</div>
					)}
				</div>
				<div
					className={classNames("mission-five", {
						close: activeMissionTab !== 5
					})}>
					<div className="ticket-title">
						{t("lbl_CupEvent_GetTickets", { count: 5 })}
					</div>
					<div>
						<div className="subtitle">
							{t("lbl_CupEvent_Mission5_Subtitle")}
							<span>{t("lbl_CupEvent_Mission5_Tip")}</span>
						</div>
						<ProgressBar
							cur={
								missionData5?.isCompleted
									? 20
									: cupEventPromotionMissionProgress?.completedBetCount ??
									  0
							}
							target={20}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
Mission.propTypes = {
	activeMissionTab: PropTypes.number.isRequired,
	setActiveMissionTab: PropTypes.func.isRequired,
	promotionMission: PropTypes.arrayOf(PropTypes.any).isRequired,
	cupEventPromotionMissionProgress: PropTypes.objectOf(PropTypes.any)
		.isRequired
};

export default Mission;
