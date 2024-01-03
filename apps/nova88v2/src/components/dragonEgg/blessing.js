import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useGragonEgg } from "@ailab-mobile/hooks";
import { cloudBannerImgURL } from "../../config";
import { popBoxContext, userInfoContext } from "../common/context";
import { currencyIdToCurrency } from "../common/common";
import { eventIds } from "../../datas/eventId";
import { prizeAmout } from "./info";

const Collection = () => {
	const { t } = useTranslation();

	const [stickerResult, setStickerResult] = useState({
		stickers: 0,
		isClaimedBigPrize: false
	});

	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const { getBlessingSticker, claimBlessingPrize } = useGragonEgg();

	const claimPrize = async () => {
		const { errorCode, message } = await claimBlessingPrize({
			eventId: eventIds.dragonEgg
		});

		if (errorCode !== 0) {
			setPopBox({
				isOpen: true,
				content: `[${errorCode}] ${message}`
			});
		}
	};

	const getStickers = async () => {
		const { data } = await getBlessingSticker({
			eventId: eventIds.dragonEgg
		});

		setStickerResult(data);
	};

	const blessingStickers = Array.from(
		{ length: stickerResult.stickers },
		(_, i) => i + 1
	).map(() => (
		<div className="event-fu-item">
			<div className="event-collection-get">
				<img
					src={`${cloudBannerImgURL}/h5/img/event/dragonegg/bless-egg.png`}
					alt=""
				/>
			</div>
		</div>
	));

	const emptyStickers = Array.from(
		{ length: 5 - stickerResult.stickers },
		(_, i) => i + 1
	).map(() => (
		<div className="event-fu-item">
			<div className="event-collection-noget">
				<img
					src={`${cloudBannerImgURL}/h5/img/event/dragonegg/bless-word.png`}
					alt=""
				/>
			</div>
		</div>
	));

	useEffect(() => {
		getStickers();
	}, []);

	if (!currencyId) return null;

	return (
		<div className={classNames("event-collection")}>
			<div className="event-main-title">
				{t("lbl_DragonEgg_FiveFortunes")}
			</div>
			<div className="event-collection-text">
				{t("lbl_DragonEgg_BlessingHints", {
					amount: prizeAmout[currencyId].blessing
				})}
			</div>
			<div className="event-fu-inner">
				{blessingStickers}
				{emptyStickers}
			</div>
			<button
				className={classNames("event-collection-btn", {
					active:
						stickerResult.stickers >= 5 &&
						!stickerResult.isClaimedBigPrize
				})}
				onClick={() => {
					if (
						stickerResult.stickers >= 5 &&
						!stickerResult.isClaimedBigPrize
					) {
						claimPrize();
					}
				}}>
				{stickerResult.isClaimedBigPrize
					? t("lbl_DragonEgg_Received")
					: `${currencyIdToCurrency[currencyId]} $${prizeAmout[currencyId].blessing}`}
			</button>
		</div>
	);
};

export default Collection;
