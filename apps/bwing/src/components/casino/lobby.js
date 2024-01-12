import React, { useContext, useState, useEffect, useRef } from "react";
import { defLoginGameType, products } from "@ailab-mobile/common";
import PropTypes, { func, string, arrayOf, object } from "prop-types";
import {
	defNavPanel,
	navContext,
	i18nContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import {
	useGotoGame
} from "../hook/useGotoGame";
import { api_SetFavoriteGame } from "../../service/api/account";
import { GET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import useSetTimeout from "../hook/useSetTimeout";
import Games from "./games";

const Panel = ({
	imageUrl,
	gameList,
	favoriteStr,
	searchInput,
	slotDataList,
	providerList,
	favoriteList,
	activeProvider,
	activeCategory,
	allCategoryList,
	maintainList,
	setGameList,
	setFavoriteStr,
	setFavoriteList,
	setCategoryList,
	setActiveCategory
}) => {
	const { throttle } = useSetTimeout();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const [selGameInfo, setSelGameInfo] = useState(null);
	const gameListRef = useRef(null);
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const handleSetFavorite = async (GameId, IsRemove, ProviderId) => {
		if (userInfo.isLogin) {
			try {
				await api_SetFavoriteGame(ProviderId, GameId, IsRemove);
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: error
				});
			}
		}
	};

	const randomArray = array => array.sort(() => Math.random() - 0.5);

	const renderSlot = () => {
		const targetList = slotDataList.find(
			item => item[0] === activeCategory
		);
		const filterHandle = item => {
			if (Object.keys(activeProvider).length > 0) {
				return (
					item.tpId === activeProvider?.tpId &&
					Object.values(item.gameName).find(obj =>
						obj.toLowerCase().includes(searchInput.toLowerCase())
					)
				);
			}
			return Object.values(item.gameName).find(obj =>
				obj.toLowerCase().includes(searchInput.toLowerCase())
			);
		};
		if (targetList) {
			if (targetList[0] === "myFavorite") {
				const tempList = [];
				const resultList = [];
				let storageStr = favoriteStr ?? "";
				if (storageStr && storageStr.charAt(0) === "&") {
					storageStr = storageStr.substring(1, storageStr.length);
				}
				const storageList = storageStr?.split("&") ?? [];
				storageList.forEach(str => {
					const chars = str.split("_");
					tempList.push({
						tpId: chars[0],
						gameId: str.replace(`${chars[0]}_`, "")
					});
				});
				const allList = slotDataList.find(item => item[0] === "all")[1];
				tempList.forEach(favObj => {
					const result = allList.find(
						allObj =>
							Number(allObj.tpId) === Number(favObj.tpId) &&
							allObj.gameId === favObj.gameId
					);
					if (result) {
						resultList.push(result);
					}
				});
				const filterList = resultList.filter(item =>
					filterHandle(item)
				);
				setGameList(filterList);
			} else {
				const filterList =
					targetList[0] === "all" &&
					Object.keys(activeProvider).length === 0
						? randomArray(
								targetList[1]?.filter(item =>
									filterHandle(item)
								)
						  )
						: targetList[1]?.filter(item => filterHandle(item));
				setGameList(filterList);
			}
		}
	};

	const clickPlay = (freePlay, randomGame = null) => {
		const targetObj = !randomGame ? selGameInfo : randomGame;
		if (freePlay || userInfo.isLogin) {
			throttle(
				() =>
					GET_CASINO_ENTER_PAGE({
						tpId: targetObj.tpId,
						gameId: targetObj.gameId,
						isFree: freePlay,
						langId: userInfo.langId,
						tpGameType: activeProvider?.tpGameType,
						execFunction:
							targetObj.tpId === products.PGSoft.tpId
								? handleGoToGame.bind(this, {
										langId: userInfo.langId,
										tpId: targetObj.tpId,
										gameId: targetObj.gameId,
										isFun: freePlay,
										tpGameType: products.PGSoft.tpGameType,
										loginGameType:
											defLoginGameType.returnHtml
								  })
								: null
					}),
				freePlay ? 0 : 5000
			);
		} else {
			setNav(defNavPanel.login);
		}
	};

	useEffect(() => {
		if (!favoriteStr) {
			localStorage.setItem("favorite", "");
		}
	}, []);

	useEffect(() => {
		if (activeCategory === "myFavorite") {
			const tempList = [];
			const resultList = [];
			const tempFavoriteList = favoriteStr.split("&") ?? [];
			tempFavoriteList.forEach(str => {
				const chars = str.split("_");
				tempList.push({
					tpId: chars[0],
					gameId: str.replace(`${chars[0]}_`, "")
				});
			});

			const allList = allCategoryList.find(item => item[0] === "all")[1];
			const filterList = allList.filter(
				allItem => activeProvider.tpId === allItem.tpId
			);
			const judgeList =
				Object.keys(activeProvider).length > 0 ? filterList : allList;
			judgeList.forEach(judgeItem => {
				const result = tempList.find(
					tempItem =>
						judgeItem.tpId === Number(tempItem.tpId) &&
						judgeItem.gameId === tempItem.gameId
				);
				if (result) {
					resultList.push(judgeItem);
				}
			});
			setGameList(resultList);
		}
	}, [favoriteStr]);

	useEffect(() => {
		renderSlot();
	}, [activeCategory, activeProvider, searchInput]);

	useEffect(() => {
		if (allCategoryList.length && activeProvider?.tpId) {
			const filterList = allCategoryList.filter(
				item =>
					item[0] === "myFavorite" ||
					item[1].filter(i => i.tpId === activeProvider.tpId).length >
						0
			);
			const totalData = filterList.find(item => item[0] === "all")[1];
			if (totalData.length > 0) {
				const miniItem = filterList.find(el => el[0] === "mini");
				if (
					miniItem &&
					miniItem[1].some(({ tpId }) => tpId === activeProvider.tpId)
				) {
					filterList.splice(2, 0, miniItem);
					filterList.pop();
				}
				const tempList = [];
				filterList.forEach(item => tempList.push(item[0]));
				setCategoryList(tempList);
				setActiveCategory(tempList[1]);
			} else {
				setCategoryList([]);
				setActiveCategory(null);
			}
		} else {
			const tempList = [];
			allCategoryList.forEach(categoryItem => {
				if (
					categoryItem[1].length > 0 ||
					categoryItem[0] === "myFavorite"
				) {
					tempList.push(categoryItem[0]);
				}
			});
			setCategoryList(tempList);
		}
	}, [activeProvider]);

	return (
		<>
			<Games
				selectGame={setSelGameInfo}
				gameList={gameList}
				favorite={favoriteList}
				setFavorite={setFavoriteList}
				providerList={providerList}
				maintainList={maintainList}
				activeProvider={activeProvider}
				activeCategory={activeCategory}
				handleSetFavorite={handleSetFavorite}
				i18n={i18n}
				imgUrl={imageUrl}
				ref={gameListRef}
				favoriteStr={favoriteStr}
				setFavoriteStr={setFavoriteStr}
			/>
			{selGameInfo === null ? null : (
				<div className="slots-games popup active">
					<div className="slots-games-item">
						<button
							className="icon-close-slots"
							onClick={() => setSelGameInfo(null)}
						/>
						<div className="slots-games-img">
							<img
								src={`${imageUrl}/${selGameInfo.providerName}/${
									selGameInfo.imgName[userInfo.langId] ??
									selGameInfo.imgName.en
								}`}
								alt={
									selGameInfo.gameName[userInfo.langId] ??
									selGameInfo.gameName.en
								}
							/>
							<div className="slots-games-btn">
								{selGameInfo.playFree ? (
									<button
										data-testid="clickFreePlay"
										className="white"
										onClick={() => clickPlay(true)}>
										{i18n.lbl_Demo}
									</button>
								) : null}
								<button
									className="orange"
									data-testid="clickPlay"
									onClick={() => clickPlay(false)}>
									{i18n.lbl_Play}
								</button>
							</div>
						</div>
						<div className="slots-games-name">
							{selGameInfo.gameName[userInfo.langId] ??
								selGameInfo.gameName.en}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

Panel.defaultProps = {
	gameList: [],
	imageUrl: null,
	searchInput: null,
	favoriteStr: "",
	slotDataList: [],
	providerList: [],
	favoriteList: [],
	allCategoryList: [],
	maintainList: [],
	activeProvider: null,
	activeCategory: null,
	setGameList: () => null,
	setFavoriteStr: () => null,
	setCategoryList: () => null,
	setFavoriteList: () => null,
	setActiveCategory: () => null
};

Panel.propTypes = {
	imageUrl: string,
	favoriteStr: string,
	searchInput: string,
	activeProvider: object,
	activeCategory: string,
	gameList: arrayOf(PropTypes.any),
	favoriteList: arrayOf(PropTypes.any),
	slotDataList: arrayOf(PropTypes.any),
	providerList: arrayOf(PropTypes.any),
	allCategoryList: arrayOf(PropTypes.any),
	maintainList: arrayOf(PropTypes.any),
	setGameList: func,
	setFavoriteStr: func,
	setCategoryList: func,
	setFavoriteList: func,
	setActiveCategory: func
};

export default Panel;
