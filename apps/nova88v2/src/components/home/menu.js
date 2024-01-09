import classNames from "classnames";
import { useTranslation } from "react-i18next";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "@Router";
import {
	popBoxContext,
	userInfoContext,
	productTpGameTypeSettingListContext
} from "Context";
import { useGetTpIdsQuery } from "@ailab-mobile/service";
import { getUrlParameter } from "../common/common";
import { cloudBannerImgURL } from "../../config";
import { useGotoGame, open9wSports } from "../hook/useGotoGame";
import {
	defTpGameType,
	useGetTpMaintainList
} from "../hook/useGetTpMaintainList";
import useHandleLogin from "../hook/useHandleLogin";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import gameList, { defCol, defIconType } from "../../datas/productList";

const Menu = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { langId, isLogin, currencyId } = userInfo;

	const { setPopBox } = useContext(popBoxContext);
	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);

	const { data: { data: siteTpIdList = [] } = {} } = useGetTpIdsQuery();

	const { maintainList } = useGetTpMaintainList();

	const { handleLogin } = useHandleLogin();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const [selectedCategory, setSelectedCategory] = useState(defCol.sports);

	const selectedGame = gameList({ langId, currencyId }).find(
		({ category }) => category === selectedCategory
	);

	let sortedGameList = selectedGame?.items;

	if (selectedGame?.customSort?.[currencyId]) {
		const temp = [];
		selectedGame.customSort?.[currencyId].forEach(gameName => {
			const game = sortedGameList.find(el => el.sortKey === gameName);
			if (game) temp.push(game);
		});
		sortedGameList = temp;
	}

	useEffect(() => {
		const prevPage = getUrlParameter("prev");
		if (prevPage === defCol.slots) setSelectedCategory(defCol.slots);
	}, []);

	return (
		<>
			<div className="home-sidebar">
				{gameList({ langId, currencyId })
					.filter(({ allowCurrency }) => {
						// filter allow currency if exist
						const isAllowCurrency =
							!allowCurrency ||
							allowCurrency.includes(currencyId);

						return isAllowCurrency;
					})
					.map(({ items, category, categoryIcon, translateKey }) => {
						const isNew = items.some(
							({ eventIcon }) =>
								eventIcon &&
								eventIcon.some(
									({ icon, inPeriod }) =>
										icon === defIconType.new && inPeriod
								)
						);

						const onClickCategory = () => {
							if (category !== selectedCategory)
								setSelectedCategory(category);
						};

						return (
							<button
								className={classNames(`btn-${categoryIcon}`, {
									active: selectedCategory === category
								})}
								key={category}
								onClick={onClickCategory}>
								{isNew && <div className="new-icon">New</div>}
								<div className="btn-circle">
									<img
										src={`${cloudBannerImgURL}/h5/img/4.0/${categoryIcon}-icon.png`}
										alt={category}
									/>
								</div>
								<div>{t(translateKey)}</div>
							</button>
						);
					})}
			</div>

			<div className="home-gamelist">
				<div className={`${selectedCategory} active`}>
					{sortedGameList &&
						sortedGameList
							.filter(({ tpId, tpGameType, allowCurrency }) => {
								// filter site tpId
								const isInSiteTpList = isLogin
									? siteTpIdList?.includes(tpId)
									: true;

								// filter allow currency if exist (after login)
								const isAllowCurrency =
									!allowCurrency ||
									allowCurrency?.includes(currencyId);

								// filter tpGameTypeSettingList if exist and not showing when noShow is true
								const isShowLiveHost =
									tpGameTypeSettingList?.length === 0 ||
									!tpGameTypeSettingList?.find(
										({
											tpId: settingTpId,
											gameType: settingTpGameType
										}) =>
											settingTpId === tpId &&
											settingTpGameType === tpGameType
									)?.noShow;

								return (
									isInSiteTpList &&
									isAllowCurrency &&
									isShowLiveHost
								);
							})
							.map(
								({
									img,
									tpId,
									path,
									gameId,
									eventIcon,
									tpGameType,
									spanText,
									spanTextKey,
									useGotoGame: isUseGotoGame
								}) => {
									const isNew = eventIcon?.some(
										({ icon, inPeriod }) =>
											icon === defIconType.new && inPeriod
									);

									const underMaintain = maintainList?.some(
										({
											tpId: maintainTpId,
											tpGameType: maintainTpGameType
										}) =>
											maintainTpId === tpId &&
											(maintainTpGameType ===
												defTpGameType.All ||
												maintainTpGameType ===
													tpGameType)
									);

									const isLiveHostNoPlay = tpGameTypeSettingList?.find(
										({
											tpId: settingTpId,
											gameType: settingTpGameType
										}) =>
											settingTpId === tpId &&
											settingTpGameType === tpGameType
									)?.noPlay;

									const showNoPlayPopBox = () => {
										setPopBox({
											isOpen: true,
											title: t("lbl_Information"),
											content: (
												<div
													style={{
														color: "red"
													}}>
													{t(
														"lbl_InaccessibleWithoutPermission"
													)}
												</div>
											)
										});
									};

									const onClickGame = async () => {
										if (isLiveHostNoPlay) {
											showNoPlayPopBox();
										} else if (isUseGotoGame) {
											if (!isLogin) {
												handleLogin();
											} else {
												const result = await handleGoToGame(
													{
														tpId,
														langId,
														gameId,
														isLogin,
														tpGameType
													}
												);
												const { url, key, userId } =
													result ?? {};
												open9wSports({
													url,
													key,
													userId
												});
											}
										} else {
											GET_ENTER_PAGE({
												tpId,
												langId,
												gameId,
												isLogin,
												tpGameType,
												loginCallback: handleLogin,
												execFunction: isUseGotoGame
													? handleGoToGame.bind(
															this,
															{
																tpId,
																langId,
																gameId,
																isLogin,
																tpGameType
															}
													  )
													: null
											});
										}
									};

									return path ? (
										<Link
											key={`${tpId}-${tpGameType}-${img}`}
											// redirect if is not live host no play
											to={
												!isLiveHostNoPlay &&
												`${path}/${tpId}`
											}
											className={classNames(
												"gamelist-item",
												{ under: underMaintain }
											)}
											onClick={
												isLiveHostNoPlay
													? showNoPlayPopBox
													: null
											}
											style={
												underMaintain
													? { pointerEvents: "none" }
													: null
											}>
											<div className="gamelist-img">
												{isNew && (
													<div className="new-icon">
														New
													</div>
												)}
												<img
													src={img}
													alt={tpGameType}
												/>
												<div className="gamelist-title">
													{t(spanTextKey) || spanText}
												</div>
											</div>
										</Link>
									) : (
										<button
											key={`${tpId}-${tpGameType}-${img}`}
											className={classNames(
												"gamelist-item",
												{
													under: underMaintain
												}
											)}
											onClick={onClickGame}>
											<div className="gamelist-img">
												{isNew && (
													<div className="new-icon">
														New
													</div>
												)}
												<img
													src={img}
													alt={tpGameType}
												/>
												<div className="gamelist-title">
													{t(spanTextKey) || spanText}
												</div>
											</div>
										</button>
									);
								}
							)}
				</div>
			</div>
		</>
	);
};

export { Menu };
