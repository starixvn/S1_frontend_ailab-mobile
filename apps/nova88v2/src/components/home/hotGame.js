import Swiper from "react-id-swiper";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	productTpGameTypeSettingListContext
} from "Context";
import { defDeviceType } from "@ailab-mobile/api";
import { useGetHotGameDataListQuery } from "@ailab-mobile/service";
import useHandleLogin from "../hook/useHandleLogin";
import {
	defTpGameType,
	useGetTpMaintainList
} from "../hook/useGetTpMaintainList";
import { cloudBannerImgURL } from "../../config";
import { defProductType } from "../../datas/hotGameList";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";

const defSwipperConfig = {
	containerClass: "hotgame-container",
	slidesPerView: 3.2,
	spaceBetween: 10
};

const HotGame = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { isLogin, langId, currencyId }
	} = useContext(userInfoContext);

	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);

	const { maintainList } = useGetTpMaintainList();
	const { handleLogin } = useHandleLogin();

	const {
		data: { data: { HotGame: apiHotGameList = [] } = {} } = {}
	} = useGetHotGameDataListQuery({
		langId,
		currencyId,
		deviceType: defDeviceType.Mobile
	});

	// * 如果沒有資料，整個元件都不渲染
	if (apiHotGameList.length === 0) return null;

	const hotGameList = apiHotGameList.map(
		({ tpId, gameId, gameLogo, gameName, tpCategory, tpGameType }) => {
			const onClickGame = () => {
				const underMaintain = maintainList.some(
					({ tpId: maintainTpId, tpGameType: maintainTpGameType }) =>
						tpId === maintainTpId &&
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
				} else if (tpCategory === defProductType.Slots) {
					GET_CASINO_ENTER_PAGE({
						tpId,
						langId,
						gameId,
						tpGameType,
						isFree: false
					});
				} else {
					GET_ENTER_PAGE({
						tpId,
						langId,
						gameId,
						isLogin,
						tpGameType,
						loginCallback: handleLogin
					});
				}
			};

			return (
				<div key={gameName} onClick={onClickGame}>
					<a>
						<div className="hotgame-item">
							<img src={gameLogo} alt={gameName} />
							<span>{gameName}</span>
						</div>
					</a>
				</div>
			);
		}
	);

	return (
		<>
			<div className="home-title">{t("lbl_HotGame")}</div>
			<div className="home-hotgame">
				<div className="hotgame-bn">
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/hotgame-bn.png`}
						alt="Hot Game"
					/>
				</div>
				<div className="home-hotgame-swiper">
					<Swiper {...defSwipperConfig}>{hotGameList}</Swiper>
				</div>
			</div>
		</>
	);
};

export { HotGame };
