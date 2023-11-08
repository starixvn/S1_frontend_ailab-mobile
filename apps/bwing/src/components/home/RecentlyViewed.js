import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { defNavPanel, navContext, userInfoContext } from "../common/context";
import { productList } from "../../datas/defMenu";
import path from "../../path";
import {
	defAppType,
	GET_CASINO_ENTER_PAGE,
	GET_ENTER_PAGE
} from "../../service/enterPage";
import { defProductType } from "../../datas/productList";
import { defSpecialSetting, useGotoGame,defLoginGameType } from "../hook/useGotoGame";
import useSetTimeout from "../hook/useSetTimeout";

const RecentlyViewed = ({ recentlyViewedGames }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const navigate = useNavigate();
	const { throttle } = useSetTimeout();
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
		const gameItems = Object.values(
			productList({
				langId: userInfo.langId
			})
		).find(itemList => {
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
		if (gameItems?.category === "slot") {
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
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin === true,
				loginCallback: () => setNav(defNavPanel.login),
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

	if (!recentlyViewedGames || !recentlyViewedGames.length) return null;

	const swiperParams = {
		spaceBetween: 10,
		slidesPerView: 1.9,
		initialSlide: 1.3
	};

	return (
		<>
			<div className="home-title">
				<i className="icon-star-outline" />
				{t("lbl_Recently_Viewed")}
			</div>
			<div className="home-recently mb-2">
				<Swiper {...swiperParams}>
					{recentlyViewedGames.map(
						({
							gameLogo,
							gameName,
							tpId,
							tpGameType,
							categoryId,
							gameId,
							isMaintain
						}) => (
							<div key={`${tpId}_${tpGameType}_${gameId}`}>
								<a
									className={`home-recently-item ${
										isMaintain ? "maintain" : ""
									}`}
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
										className="home-recently-img"
										style={{
											backgroundImage: `url("${
												gameLogo[userInfo.langId] ??
												gameLogo.en
											}")`
										}}
									/>
									<div className="home-recently-info">
										<span>
											{gameName[userInfo.langId] ??
												gameName.en}
										</span>
									</div>
									{isMaintain && (
										<div className="tag-maintain">
											{t("lbl_underMaintenance")}
										</div>
									)}
								</a>
							</div>
						)
					)}
				</Swiper>
			</div>
		</>
	);
};

RecentlyViewed.defaultProps = {
	recentlyViewedGames: []
};

RecentlyViewed.propTypes = {
	recentlyViewedGames: PropTypes.arrayOf(PropTypes.any)
};

export default RecentlyViewed;
