import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import i18next from "i18next";
import classNames from "classnames";
import { siteIdEnum } from "@ailab-mobile/common";
import { DrawPrizeStatusEnum } from "./type";

interface IAngpaoDrawPrizeProps {
	message: string;
	isLogin: boolean;
	drawPrizeStatus: number | undefined;
	isAnimationActive: boolean;
	onCheckDrawPrize: () => void;
}

const AngpaoDrawPrize = ({
	message,
	isLogin,
	drawPrizeStatus,
	isAnimationActive,
	onCheckDrawPrize
}: IAngpaoDrawPrizeProps) => {
	const { t } = useTranslation();
	const siteId = Number(process.env.REACT_APP_SITE_ID);

	// * 原因在於 nova88 的 router 跟其他品牌不同，可透過將 route 統一來優化
	const slotsPath = siteId === siteIdEnum.Nova88 ? "slots" : "casino";

	return (
		<>
			<div className="eventTitle">
				{/* 圖片語系只支援 en cs my th */}
				<img
					src={`${process.env.REACT_APP_BANNER_URL}/h5/img/event/angpao/title-${i18next.language}.png`}
					alt="title"
				/>
			</div>
			<div className="angpaoModule">
				<div
					className={classNames("angpao", {
						active: isAnimationActive
					})}>
					{/* 圖片語系只支援 en cs my th */}
					<img
						className="angpao--front"
						src={`${process.env.REACT_APP_BANNER_URL}/h5/img/event/angpao/angpao-front-${i18next.language}.png`}
						alt=""
					/>

					<img
						className="angpao--back"
						src={`${process.env.REACT_APP_BANNER_URL}/h5/img/event/angpao/angpao-back.png`}
						alt=""
					/>
					<img
						className="coin--right"
						src={`${process.env.REACT_APP_BANNER_URL}/h5/img/event/angpao/coin-r.png`}
						alt=""
					/>
					<img
						className="coin--left"
						src={`${process.env.REACT_APP_BANNER_URL}/h5/img/event/angpao/coin-l.png`}
						alt=""
					/>

					{(!isLogin ||
						drawPrizeStatus === DrawPrizeStatusEnum.CanJoin) && (
						<button className="btn" onClick={onCheckDrawPrize}>
							{t("Label_ShakeNow")}
						</button>
					)}

					{isLogin &&
						(drawPrizeStatus === DrawPrizeStatusEnum.NotEligible ||
							drawPrizeStatus ===
								DrawPrizeStatusEnum.DailyLimit) && (
							<Link to={`/${slotsPath}`}>
								<button className="btn">
									{t("Label_BetNow")}
								</button>
							</Link>
						)}

					<div className="message">
						{isLogin && !isAnimationActive && message}
					</div>
				</div>
			</div>
		</>
	);
};

export default AngpaoDrawPrize;
