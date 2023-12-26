import { uniq } from "lodash";
import { bool } from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useContext } from "react";
import { DrawPrizeTypeEnum, useGragonEgg } from "@ailab-mobile/hooks";
import { bannerImgUrl } from "../../config";
import { popBoxContext } from "../common/context";
import { eventIds } from "../../datas/eventId";

export const DrawPopBox = () => {
	const { t } = useTranslation();

	const { setPopBox } = useContext(popBoxContext);

	const { eggTicket } = useGragonEgg();

	const onOpenPrizeBox = async () => {
		setPopBox({
			isOpen: true,
			className: "dragonegg-result-pop next-try active",
			displayStyle: "flex",
			custContent: <PrizePopBox />
		});
	};

	return (
		<div className="pop">
			<button
				className="close-btn"
				onClick={() => setPopBox({ isOpen: false })}
			/>
			<div className="dragonegg-frame">
				<div>{t("lbl_DragonEgg_DrawHints")}</div>
				<div className="dragonegg-draw">
					<button className="egg" onClick={onOpenPrizeBox}>
						<img
							src={`${bannerImgUrl}/h5/img/event/dragonegg/choose_egg.png`}
							alt="choose_egg"
						/>
					</button>
					<button className="egg" onClick={onOpenPrizeBox}>
						<img
							src={`${bannerImgUrl}/h5/img/event/dragonegg/choose_egg.png`}
							alt="choose_egg"
						/>
					</button>
					<button className="egg" onClick={onOpenPrizeBox}>
						<img
							src={`${bannerImgUrl}/h5/img/event/dragonegg/choose_egg.png`}
							alt="choose_egg"
						/>
					</button>
				</div>
				<div className="dragonegg-egg">
					{t("lbl_DragonEgg_Eggs")}: <span>{eggTicket}</span>
				</div>
			</div>
		</div>
	);
};

export const PrizePopBox = ({ isMulti }) => {
	const { t } = useTranslation();

	const { setPopBox } = useContext(popBoxContext);

	const [prizeList, setPrizeList] = useState([]);
	const [isMultiDraw, setIsMultiDraw] = useState(isMulti);

	const { eggTicket, drawPrize } = useGragonEgg();

	const getPrize = async ({ multiDraw }) => {
		const drawResult = await drawPrize({
			eventId: eventIds.dragonEgg,
			multiDraw
		});

		const { errorCode, data, message } = drawResult;

		if (errorCode === 0) {
			setPrizeList(multiDraw ? data : [data]);
			if (multiDraw) setIsMultiDraw(true);
		} else {
			setPopBox({
				isOpen: true,
				content: `[${errorCode}] ${message}`
			});
		}
	};

	useEffect(() => {
		getPrize({ multiDraw: isMultiDraw });
	}, []);

	// 顯示圖片
	// 單抽有獎
	let imgType = "egg";
	// 10抽
	if (isMulti) {
		imgType = "egg_10draw";
	} else if (
		// 單抽無獎
		!isMulti &&
		prizeList[0]?.drawPrizeType === DrawPrizeTypeEnum.noPrize
	) {
		imgType = "goodluck";
	} else if (
		// 單抽為福
		!isMulti &&
		prizeList[0]?.drawPrizeType === DrawPrizeTypeEnum.blessingSticker
	) {
		imgType = "fu";
	}

	return (
		<div className="pop">
			<button
				className="close-btn"
				onClick={() => setPopBox({ isOpen: false })}
			/>

			<div className="dragonegg-result-frame">
				{!isMultiDraw &&
					// 單抽
					(prizeList[0]?.drawPrizeType ===
					DrawPrizeTypeEnum.noPrize ? (
						// 單抽無獎
						<div className="title">
							{t("lbl_DragonEgg_GoodLuck").toUpperCase()}
						</div>
					) : (
						// 單抽有獎
						<>
							<div className="title">
								{t("lbl_DragonEgg_CONGRATULATIONS")}
							</div>
							<div className="rewards-title">
								{prizeList[0]?.prizeName}
							</div>
						</>
					))}
				<img
					src={`${bannerImgUrl}/h5/img/event/dragonegg/winning_${imgType}.png`}
					alt="winning_goodluck"
				/>
				{isMultiDraw && (
					<div className="dragonegg-result-list">
						{prizeList.map(({ prizeName }) => (
							<div key={uniq()}>{prizeName}</div>
						))}
					</div>
				)}
			</div>

			<div className="dragonegg-result-btn">
				{/* 單抽且無法再抽 */}
				{eggTicket === 0 && !isMultiDraw && (
					<button
						className="btn-blue-outline full"
						onClick={() => setPopBox({ isOpen: false })}>
						{t("lbl_DragonEgg_Confirm")}
					</button>
				)}
				{/* 單抽有獎或10抽 */}
				{(isMultiDraw ||
					prizeList[0]?.drawPrizeType !==
						DrawPrizeTypeEnum.noPrize) && (
					<button
						className={classNames("btn-blue-outline", {
							full:
								(isMultiDraw && eggTicket < 10) ||
								prizeList[0]?.drawPrizeType !==
									DrawPrizeTypeEnum.noPrize,
							"half mr-2": isMultiDraw && eggTicket >= 10
						})}
						onClick={() => setPopBox({ isOpen: false })}>
						{t("lbl_DragonEgg_Received")}
					</button>
				)}
				{/* 單抽且可再單抽 */}
				{!isMultiDraw && eggTicket > 0 && (
					<button
						className={classNames("btn-blue", {
							full: eggTicket < 10,
							"half mr-2": eggTicket >= 10
						})}
						onClick={() => {
							getPrize({ multiDraw: false });
						}}>
						{t("lbl_DragonEgg_DrawAgain")}
					</button>
				)}
				{/* 單抽10抽且可再10抽 */}
				{eggTicket >= 10 && (
					<button
						className="btn-org half"
						onClick={() => getPrize({ multiDraw: true })}>
						{t("lbl_DragonEgg_10Again")}
					</button>
				)}
			</div>
			<div className="dragonegg-result-egg">
				{t("lbl_DragonEgg_Eggs")}: <span>{eggTicket}</span>
			</div>
		</div>
	);
};

PrizePopBox.defaultProps = {
	isMulti: false
};

PrizePopBox.propTypes = {
	isMulti: bool
};
