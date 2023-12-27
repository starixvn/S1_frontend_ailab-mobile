import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useGragonEgg } from "@ailab-mobile/hooks";
import { popBoxContext, userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import { eventIds } from "../../datas/eventId";

const Collection = () => {
	const { t } = useTranslation();

	const [stickerResult, setStickerResult] = useState({
		stickers: 0,
		isClaimedBigPrize: false
	});

	const {
		userInfo: { langId }
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
	).map(i => (
		<div className="event-fu-item">
			<img
				src={`${bannerImgUrl}/h5/img/event/dragonegg/5fu_fu_on.png`}
				alt=""
			/>
		</div>
	));

	const emptyStickers = Array.from(
		{ length: 5 - stickerResult.stickers },
		(_, i) => i + 1
	).map(i => (
		<div className="event-fu-item">
			<img
				src={`${bannerImgUrl}/h5/img/event/dragonegg/5fu_fu_off.png`}
				alt=""
			/>
		</div>
	));

	useEffect(() => {
		getStickers();
	}, []);

	return (
		<div
			className={classNames("event-collection", { vn: langId === "vn" })}>
			<div
				className={classNames("event-fu", {
					active: stickerResult.isClaimedBigPrize
				})}>
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
				<img
					src={`${bannerImgUrl}/h5/img/event/dragonegg/5fu_coin.png`}
					alt="5fu_coin"
				/>
				VND $888,000,000
			</button>
			<div className="event-collection-text">
				{t("lbl_DragonEgg_BlessingHints")}
			</div>
		</div>
	);
};

export default Collection;
