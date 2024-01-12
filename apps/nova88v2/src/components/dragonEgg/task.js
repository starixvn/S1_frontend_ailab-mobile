import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import {
	useGragonEgg,
	CategoryIdEnum,
	PromotionMissionTypeEnum
} from "@ailab-mobile/hooks";
import { useNavigate } from "@reach/router";
import path from "../../path";
import { cloudBannerImgURL } from "../../config";
import { isConvert, number_format } from "../common/common";
import { defCol } from "../../datas/defMenu";
import { popBoxContext, userInfoContext } from "../common/context";
import { DrawPopBox, PrizePopBox } from "./popBox";
import { eventIds } from "../../datas/eventId";

const Task = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId, currencyId }
	} = useContext(userInfoContext);

	const { eggTicket, missionList, getMissionList } = useGragonEgg();

	const _isConvert = isConvert(currencyId);

	const goMission = ({ type, tpCategoryId }) => {
		let targetPath = "";

		if (type === PromotionMissionTypeEnum.referFriend) {
			targetPath = path.referral.root;
		} else if (type === PromotionMissionTypeEnum.accumulateDeposit) {
			targetPath = path.deposit.root;
		} else {
			const category =
				tpCategoryId === CategoryIdEnum.sports
					? defCol.sports
					: defCol.livecasino;

			targetPath =
				tpCategoryId === CategoryIdEnum.slots
					? path.casino.root
					: `${path.home.root}?target=${category}`;
		}

		navigate(targetPath);
	};

	const drawPrize = ({ isMulti }) => {
		if (isMulti) {
			setPopBox({
				isOpen: true,
				className: "dragonegg-result-pop next-try active",
				custContent: <PrizePopBox isMulti={isMulti} />
			});
		} else {
			setPopBox({
				isOpen: true,
				className: "dragonegg-pop choose",
				custContent: <DrawPopBox />
			});
		}
	};

	useEffect(() => {
		getMissionList();
	}, [langId]);

	return (
		<div className="event-main">
			<div className="event-task">
				<div className="event-main-title">
					{t("lbl_DragonEgg_DailyTask")}
				</div>
				{missionList.map(
					({
						type,
						eggCount,
						goalAmount,
						isCompleted,
						missionName,
						tpCategoryId,
						progressAmount
					}) => {
						const percentage =
							progressAmount > goalAmount
								? 100
								: ((progressAmount / goalAmount) * 100).toFixed(
										2
								  );

						return (
							<div className="event-task-item" key={missionName}>
								<div className="event-task-info">
									<div className="text">{missionName}</div>
									<div className="progress">
										<div
											className="progress-bar"
											style={{ width: `${percentage}%` }}
										/>
									</div>
									{type ===
									PromotionMissionTypeEnum.referFriend ? (
										<div className="progress-info">
											<span>{progressAmount}</span> /
											{goalAmount}
										</div>
									) : (
										<div className="progress-info">
											<span>
												{number_format(
													progressAmount,
													_isConvert,
													0
												)}
											</span>
											/
											{number_format(
												goalAmount,
												_isConvert,
												0
											)}
										</div>
									)}
								</div>
								<div
									className={classNames("event-task-inner", {
										active: isCompleted
									})}
									onClick={() => {
										if (!isCompleted)
											goMission({
												type,
												tpCategoryId
											});
									}}>
									<img
										src={`${cloudBannerImgURL}/h5/img/event/dragonegg/daily-egg${
											eggCount === 1 ? "1" : "2"
										}${isCompleted ? "-ok" : ""}.png`}
										alt="daily_egg"
										className={`event-task-${
											eggCount === 1 ? "one" : "two"
										}`}
									/>
									<button
										className={classNames(
											"event-task-btn",
											{
												active: isCompleted
											}
										)}>
										{isCompleted
											? t("lbl_DragonEgg_Received")
											: t("lbl_DragonEgg_Go")}
									</button>
								</div>
							</div>
						);
					}
				)}
			</div>
			<div className="event-draw">
				<div className="event-draw-egg">
					<div className="event-draw-value">
						{t("lbl_DragonEgg_Eggs")}: <span>{eggTicket}</span>
					</div>
					<img
						className="event-draw-img"
						src={`${cloudBannerImgURL}/h5/img/event/dragonegg/index-game-eggs.png`}
						alt="draw_dragon"
					/>
				</div>
				<div className="event-draw-btn">
					<button
						className={classNames("draw-single", {
							active: eggTicket > 0
						})}
						onClick={() => {
							if (eggTicket > 0)
								drawPrize({
									isMulti: false,
									eventId: eventIds.dragonEgg
								});
						}}>
						{t("lbl_DragonEgg_DrawNow")}
					</button>
					<button
						className={classNames("draw-ten", {
							active: eggTicket >= 10
						})}
						onClick={() => {
							if (eggTicket >= 10)
								drawPrize({
									isMulti: true,
									eventId: eventIds.dragonEgg
								});
						}}>
						{t("lbl_DragonEgg_ClickFor10")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Task;
