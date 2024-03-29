import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../../common/context";
import usePopBox from "../../hook/usePopBox";
import {
	defSpecialSetting,
	defLoginGameType,
	useGotoGame
} from "../../hook/useGotoGame";
import { defMenuLinks, defMenuType } from "../../layout/header.menu.def";
import { defPopBoxType } from "../../common/popBox";
import {
	SET_CASINO_ENTER_PAGE,
	SET_ENTER_PAGE
} from "../../../service/enterPage";
import { api_game_GetRecentlyViewed } from "../../../service/api/game";
import useDelayFunc from "../../hook/useDelayFunc";
import { defCategory } from "../../../datas/productList";

const HomeRecentViewedGames = () => {
	const [recentlyViewedGames, setRecentlyViewedGames] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const { t } = useTranslation();
	const { throttle } = useDelayFunc();
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});
	const { isLogin, langId } = userInfo;

	const handleGoToRecentlyViewedGame = ({
		selectedTpId,
		selectedTpGameType,
		selectedCategoryId,
		selectedGameId,
		isMaintain
	}) => {
		let targetItem;
		const gameItems = Object.values(defMenuLinks(userInfo.langId)).find(
			itemList => {
				const res = itemList.subMenu?.find(
					({ tpId, tpGameType }) =>
						tpId === selectedTpId &&
						tpGameType === selectedTpGameType
				);
				if (res !== undefined) {
					targetItem = res;
					return true;
				}
				return false;
			}
		);

		let params = null;
		if (targetItem.parameter) {
			params = Object.keys(targetItem.parameter).map(
				keys => `${keys}=${targetItem.parameter[keys]}`
			);
		}
		const _urlParams = params !== null ? `?${params.join("&")}` : "";
		const pathLink = targetItem.path || gameItems.path;

		const handleOpenGame = async ({
			tpId,
			gameId,
			menuType,
			_subPath,
			tpGameType,
			afterLogin
		}) => {
			if (menuType === defMenuType.useGoToGame) {
				handleGoToGame({
					isLogin,
					langId,
					tpId,
					gameId,
					tpGameType
				});
			} else if (_subPath) {
				if (afterLogin && !isLogin) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Login
					});
				} else {
					navigate(`/${userInfo.langId}/${_subPath}`);
				}
			} else {
				SET_ENTER_PAGE({
					isLogin: userInfo.isLogin,
					langId: userInfo.langId,
					tpId,
					gameId,
					loginCallback: () =>
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.Login
						}),
					tpGameType
				});
			}
		};

		if (targetItem.menuType === defMenuType.Link) {
			if (selectedCategoryId === defCategory.Slots) {
				if (isMaintain) {
					return;
				}
				throttle(
					() =>
						SET_CASINO_ENTER_PAGE({
							tpId: selectedTpId,
							gameId: selectedGameId,
							isFree: false,
							langId: userInfo.langId,
							execFunction:
								selectedTpId === defSpecialSetting.PG
									? handleGoToGame.bind(this, {
											langId: userInfo.langId,
											tpId: selectedTpId,
											gameId: selectedGameId,
											isFun: false,
											tpGameType: selectedTpGameType,
											loginGameType:
												defLoginGameType.returnHtml
									  })
									: null,
							tpGameType: selectedTpGameType
						}),
					5000
				);
			} else {
				navigate(`/${userInfo.langId}/${pathLink}${_urlParams}`);
			}
		} else {
			handleOpenGame({
				tpId: targetItem.tpId,
				gameId: gameItems.productInfo?.gameId,
				menuType: targetItem.menuType,
				_subPath: gameItems.path,
				tpGameType: targetItem.tpGameType,
				afterLogin: false
			});
		}
	};

	useEffect(() => {
		const getRecentlyViewedGames = async () => {
			try {
				const res = await api_game_GetRecentlyViewed({
					currencyId: userInfo.currencyId
				});
				if (res.data.errorCode === 0) {
					const { recentlyViewedList } = res.data.data;
					setRecentlyViewedGames(recentlyViewedList);
				}
			} catch (error) {
				errorPopBox(error);
			}
		};
		getRecentlyViewedGames();
	}, []);

	const params = {
		spaceBetween: 22,
		slidesPerView: 4.5,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	if (!recentlyViewedGames || recentlyViewedGames.length === 0) {
		return null;
	}

	return (
		<div className="home-recently">
			<div className="home-title"> Recently view </div>
			<Swiper className="recently" modules={[Navigation]} {...params}>
				<div className="swiper-wrapper">
					{recentlyViewedGames &&
						recentlyViewedGames.map(
							({
								gameLogo,
								tpLogo,
								gameName,
								tpId,
								tpGameType,
								isMaintain,
								categoryId,
								gameId
							}) => (
								<SwiperSlide
									key={`recently-game-${tpId}-${tpGameType}`}>
									<div
										className="swiper-slide"
										onClick={() =>
											handleGoToRecentlyViewedGame({
												selectedTpId: tpId,
												selectedTpGameType: tpGameType,
												selectedCategoryId: categoryId,
												selectedGameId: gameId,
												isMaintain
											})
										}>
										<div
											className={`recently-game ${
												isMaintain ? "active" : ""
											}`}>
											<div>
												<img
													className="recently-image"
													src={
														gameLogo[
															userInfo.langId
														] ?? gameLogo.en
													}
													alt={gameLogo}
												/>
												<div>
													<img
														className="recently-brand"
														src={tpLogo}
														alt={tpLogo}
													/>
													<div className="recently-title">
														{gameName[
															userInfo.langId
														] ?? gameName.en}
													</div>
												</div>
											</div>
											{isMaintain && (
												<div className="under">
													{t("lbl_underMaintenance")}
												</div>
											)}
										</div>
									</div>
								</SwiperSlide>
							)
						)}
				</div>
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
			</Swiper>
		</div>
	);
};

export default HomeRecentViewedGames;
