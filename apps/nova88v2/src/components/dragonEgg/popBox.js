import { uniq } from "lodash";
import { bool } from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useContext } from "react";
import { sleep } from "@ailab-mobile/common";
import { DrawPrizeTypeEnum, useGragonEgg } from "@ailab-mobile/hooks";
import { cloudBannerImgURL } from "../../config";
import { popBoxContext } from "../common/context";
import { eventIds } from "../../datas/eventId";

// 選擇蛋的彈窗
export const DrawPopBox = () => {
	const { t } = useTranslation();

	const { setPopBox } = useContext(popBoxContext);

	const { eggTicket } = useGragonEgg();

	const openPrizePox = () => {
		setPopBox({
			isOpen: true,
			className: "dragonegg-result-pop",
			custContent: <PrizePopBox />
		});
	};

	const onOpenPrizeBox = async () => {
		setPopBox({
			isOpen: true,
			className: "dragonegg-pop eggs",
			custContent: <AnimationPopBox />
		});

		// 動畫彈窗顯示 2.5 秒後再顯示獎品彈窗
		await sleep(2500);
		openPrizePox();
	};

	return (
		<div className="pop">
			<button
				className="close-btn"
				onClick={() => setPopBox({ isOpen: false })}
			/>
			<div className="dragonegg-frame">
				<div className="title">{t("lbl_DragonEgg_DrawEggs")}</div>
				<div className="text">{t("lbl_DragonEgg_DrawHints")}</div>
				<div className="dragonegg-draw">
					<button className="egg" onClick={onOpenPrizeBox}>
						<img
							src={`${cloudBannerImgURL}/h5/img/event/dragonegg/draw-egg.png`}
							alt="choose_egg"
						/>
					</button>
					<button className="egg" onClick={onOpenPrizeBox}>
						<img
							src={`${cloudBannerImgURL}/h5/img/event/dragonegg/draw-egg.png`}
							alt="choose_egg"
						/>
					</button>
					<button className="egg" onClick={onOpenPrizeBox}>
						<img
							src={`${cloudBannerImgURL}/h5/img/event/dragonegg/draw-egg.png`}
							alt="choose_egg"
						/>
					</button>
					<img
						className="dragonegg-draw-bg"
						src={`${cloudBannerImgURL}/h5/img/event/dragonegg/game-egg-bg.png`}
						alt="game-egg-bg"
					/>
				</div>
				<div className="dragonegg-egg">
					{t("lbl_DragonEgg_Eggs")}: <span>{eggTicket}</span>
				</div>
			</div>
		</div>
	);
};

// 顯示獎品的彈窗
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
	let imgType = "popup-reward";
	if (
		// 單抽無獎
		!isMultiDraw &&
		prizeList[0]?.drawPrizeType === DrawPrizeTypeEnum.noPrize
	) {
		imgType = "popup-goodlucky";
	} else if (
		// 單抽為福
		!isMultiDraw &&
		prizeList[0]?.drawPrizeType === DrawPrizeTypeEnum.blessingSticker
	) {
		imgType = "popup-blessingegg";
	}

	return (
		<div
			className={classNames("pop", {
				"ten-draw": isMultiDraw,
				"next-try":
					prizeList[0]?.drawPrizeType === DrawPrizeTypeEnum.noPrize,
				single:
					!isMultiDraw &&
					prizeList[0]?.drawPrizeType !== DrawPrizeTypeEnum.noPrize
			})}>
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
							{t("lbl_DragonEgg_GoodLuck")}
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
				{!isMultiDraw && (
					<img
						src={`${cloudBannerImgURL}/h5/img/event/dragonegg/${imgType}.png`}
						alt="winning"
					/>
				)}
				{isMultiDraw && (
					<>
						<div className="title">
							{t("lbl_DragonEgg_CONGRATULATIONS")}
						</div>
						<div className="dragonegg-result-list">
							<div className="list-title">
								{t("lbl_DragonEgg_EventRewards")}
							</div>
							{prizeList.map(({ prizeName }) => (
								<div key={uniq()}>{prizeName}</div>
							))}
						</div>
					</>
				)}
			</div>

			<div className="dragonegg-result-btn">
				{/* 單抽且無法再抽 */}
				{eggTicket === 0 && !isMultiDraw && (
					<div className="dragonegg-result-btn">
						<button
							className="btn-confirm"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_DragonEgg_Confirm")}
						</button>
					</div>
				)}
				{/* 單抽有獎或10抽且剩下龍蛋不為 0 時 */}
				{(isMultiDraw ||
					prizeList[0]?.drawPrizeType !==
						DrawPrizeTypeEnum.noPrize) &&
					eggTicket !== 0 && (
						<button
							className="btn-receive"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_DragonEgg_Received")}
						</button>
					)}
				<div className="btn-playdraw">
					{/* 單抽且可再單抽 */}
					{!isMultiDraw && eggTicket > 0 && (
						<button
							className="btn-oneplay"
							onClick={() => {
								getPrize({ multiDraw: false });
							}}>
							{t("lbl_DragonEgg_DrawAgain")}
						</button>
					)}
					{/* 單抽10抽且可再10抽 */}
					{eggTicket >= 10 && (
						<button
							className="btn-tenplay"
							onClick={() => getPrize({ multiDraw: true })}>
							{t("lbl_DragonEgg_10Again")}
						</button>
					)}
				</div>
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

// Nova 獨有的開獎動畫彈窗
const AnimationPopBox = () => {
	return (
		<div className="pop">
			<div className="dragonegg-frame">
				<img
					className="egg-check"
					src={`${cloudBannerImgURL}/h5/img/event/dragonegg/animation-egg-1.png`}
					alt="egg-check"
				/>
				<img
					className="egg-broken"
					src={`${cloudBannerImgURL}/h5/img/event/dragonegg/animation-egg-2.png`}
					alt="egg-broken"
				/>
			</div>
		</div>
	);
};
