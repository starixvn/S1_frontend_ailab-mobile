import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation } from "swiper";
import { useNavigate } from "@reach/router";
import { popBoxContext, userInfoContext } from "../common/context";
import {
	defSpecialSetting,
	open9wSports,
	useGotoGame,
	defLoginGameType
} from "../hook/useGotoGame";
import api from "../../service/api";
import gameList from "../../datas/productList";
import {
	defAppType,
	GET_CASINO_ENTER_PAGE,
	GET_ENTER_PAGE
} from "../../service/enterPage";
import path from "../../path";
import useHandleLogin from "../hook/useHandleLogin";
import { defProductType } from "../../datas/hotGameList";
import useSetTimeout from "../hook/useSetTimeout";

const RecentlyViewedGameList = () => {
	const [recentlyViewedGames, setRecentlyViewedGames] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const { throttle } = useSetTimeout();
	const { handleLogin } = useHandleLogin();
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});
	const handleGoToRecentlyViewedGame = ({
		selectedTpId,
		selectedTpGameType,
		selectedCategoryId,
		selectedGameId,
		isMaintain
	}) => {
		let targetItem;
		const gameItems = gameList({
			langId: userInfo.langId,
			currencyId: userInfo.currencyId
		}).find(itemList => {
			let res;
			if (itemList.items) {
				res = itemList.items.find(
					({ tpId, tpGameType }) =>
						tpId === selectedTpId &&
						tpGameType === selectedTpGameType
				);
			} else if (
				itemList.tpId &&
				itemList.tpGameType &&
				itemList.tpId === selectedTpId &&
				itemList.tpGameType === selectedTpGameType
			) {
				res = itemList;
			}

			if (res !== undefined) {
				targetItem = res;
				return targetItem;
			}

			return false;
		});
		let _path = targetItem?.path;
		if (
			gameItems?.category === "slot" &&
			targetItem?.spanText !== "Mega888"
		) {
			_path = `${path.casino.root}/${targetItem.tpId}`;
		}

		const handleOpenGame = async ({
			tpId,
			gameId,
			useGotoGame: _useGotoGame,
			specialUrl,
			tpGameType,
			bettype,
			appType
		}) => {
			if (tpId === defSpecialSetting.sports_9w) {
				const result = await handleGoToGame({
					isLogin: userInfo.isLogin,
					langId: userInfo.langId,
					tpId,
					gameId,
					tpGameType
				});
				const { url, key, userId } = result ?? {};
				open9wSports({ url, key, userId });
			} else {
				GET_ENTER_PAGE({
					langId: userInfo.langId,
					tpId,
					gameId,
					isLogin: userInfo.isLogin === true,
					loginCallback: handleLogin,
					execFunction: _useGotoGame
						? handleGoToGame.bind(this, {
								isLogin: userInfo.isLogin === true,
								langId: userInfo.langId,
								tpId,
								gameId,
								tpGameType
						  })
						: null,
					specialUrl,
					tpGameType,
					bettype,
					appType
				});
			}
			return true;
		};

		if (targetItem?.href) {
			navigate(targetItem.href);
		} else if (targetItem?.path) {
			if (selectedCategoryId === defProductType.Slots) {
				if (isMaintain) {
					return;
				}
				throttle(
					() =>
						GET_CASINO_ENTER_PAGE({
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
				navigate(_path);
			}
		} else {
			handleOpenGame({
				tpId: targetItem.tpId,
				gameId: targetItem.gameId,
				useGotoGame: targetItem.useGotoGame,
				specialUrl: targetItem?.specialUrl ?? "",
				tpGameType: targetItem.tpGameType,
				bettype: targetItem?.bettype,
				appType: defAppType.desktop
			});
		}
	};

	useEffect(() => {
		const getRecentlyViewedGames = async () => {
			try {
				const res = await api.game.GetRecentlyViewed({
					currencyId: userInfo.currencyId
				});
				if (res.data.errorCode === 0) {
					const { recentlyViewedList } = res.data.data;
					setRecentlyViewedGames(recentlyViewedList);
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: error
				});
			}
		};
		getRecentlyViewedGames();
	}, []);

	const params = {
		spaceBetween: 10,
		slidesPerView: 1.8
	};

	if (!recentlyViewedGames || !recentlyViewedGames.length) return null;

	return (
		<>
			<div className="moduleTitle ">{t("lbl_Recently_Viewed")}</div>

			<Swiper
				className="recently"
				modules={[Navigation]}
				navigation
				{...params}>
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
													alt=""
												/>
												<img
													className="recently-brand"
													src={tpLogo}
													alt=""
												/>
												<div className="recently-title">
													{gameName[
														userInfo.langId
													] ?? gameName.en}
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
			</Swiper>
		</>
	);
};

export default RecentlyViewedGameList;
