import Swiper from "react-id-swiper";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	popBoxContext,
	userInfoContext,
	productTpGameTypeSettingListContext
} from "Context";
import {
	SlotGameCategoryEnum,
	useGetSlotGamePageQuery
} from "@ailab-mobile/service";
import {
	defTpGameType,
	useGetTpMaintainList
} from "../hook/useGetTpMaintainList";
import { defSlotTpGameType } from "../../datas/productList";
import { GET_CASINO_ENTER_PAGE } from "../../service/enterPage";

const defSwipperConfig = {
	containerClass: "jackpot-container",
	slidesPerView: 3.2,
	spaceBetween: 10
};

const Jackpot = () => {
	const { t } = useTranslation();

	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { isLogin, langId, currencyId } = userInfo;

	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);

	const { maintainList } = useGetTpMaintainList();

	const {
		data: {
			data: {
				imgUrl,
				providerList = [],
				jackpot: apiJackpotList = []
			} = {}
		} = {}
	} = useGetSlotGamePageQuery({
		currencyId,
		slotGameCategoryList: [SlotGameCategoryEnum.Jackpot]
	});

	if (apiJackpotList.length === 0) return null;

	const jackpotList = apiJackpotList.map(
		({ tpId, gameId, imgName, gameName }) => {
			const tpGameType = Object.values(defSlotTpGameType).find(
				({ tpId: slotTpId }) => slotTpId === tpId
			)?.tpGameType;

			const brandTpName = providerList.find(
				({ tpId: providerTpId }) => providerTpId === tpId
			)?.tpName;

			const onClickGame = () => {
				const underMaintain = maintainList.some(
					({ tpId: maintainTpId, tpGameType: maintainTpGameType }) =>
						maintainTpId === tpId &&
						(maintainTpGameType === defTpGameType.All ||
							maintainTpGameType === tpGameType)
				);

				const isLiveHostNoPlay = tpGameTypeSettingList?.find(
					({ tpId: settingTpId, gameType: settingTpGameType }) =>
						settingTpId === tpId && settingTpGameType === tpGameType
				)?.noPlay;

				if (underMaintain) {
					setPopBox({
						isOpen: true,
						content: t("lbl_underMaintenance")
					});
				} else if (isLiveHostNoPlay) {
					setPopBox({
						isOpen: true,
						title: t("lbl_Information"),
						content: (
							<div
								style={{
									color: "red"
								}}>
								{t("lbl_InaccessibleWithoutPermission")}
							</div>
						)
					});
				} else if (!isLogin) {
					handleLogin();
				} else {
					GET_CASINO_ENTER_PAGE({
						tpId,
						langId,
						gameId,
						tpGameType,
						isFree: false
					});
				}
			};

			return (
				<div key={gameId} onClick={onClickGame}>
					<a>
						<div className="jackpot-item">
							<img
								src={`${imgUrl}/${brandTpName}/${
									imgName[langId] || imgName.en
								}`}
								alt={gameId}
							/>
							<span>{gameName[langId] || gameName.en}</span>
						</div>
					</a>
				</div>
			);
		}
	);

	return (
		<>
			<div className="home-title">{t("lbl_Jackpot")}</div>
			<div className="home-jackpot-swiper">
				<Swiper {...defSwipperConfig}>{jackpotList}</Swiper>
			</div>
		</>
	);
};

export { Jackpot };
