import React, { useState, useContext, useEffect } from "react";
import { products } from "@ailab-mobile/common";
import {
	popBoxContext,
	loadingContext,
	userInfoContext,
	defNavPanel,
	navContext
} from "../components/common/context";
import { api_GetSlotGamePage } from "../service/api/game";
import { getUrlParameter } from "../components/common/common";
import { useGetTpMaintainList } from "../components/hook/useGetTpMaintainList";
import Nav from "../components/casino/nav";
import Lobby from "../components/casino/lobby";
import Slider from "../components/casino/slider";
import SearchBox from "../components/casino/searchBox";
import GameProviders from "../components/casino/gameProviders";
import { useGotoGame, defLoginGameType } from "../components/hook/useGotoGame";
import useSetTimeout from "../components/hook/useSetTimeout";
import { GET_CASINO_ENTER_PAGE } from "../service/enterPage";

const Casino = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const { setNav } = useContext(navContext);

	const { currencyId } = userInfo;
	const page = getUrlParameter("page");
	const { throttle } = useSetTimeout();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { maintainList } = useGetTpMaintainList();
	const splitList = window.location.href.split("/");
	const pathTpId = splitList[splitList.length - 1];

	const [imageUrl, setImageUrl] = useState("");
	const [gameList, setGameList] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [providerList, setProviderList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [slotDataList, setSlotDataList] = useState([]);
	const [favoriteList, setFavoriteList] = useState([]);
	const [activeProvider, setActiveProvider] = useState({});
	const [activeCategory, setActiveCategory] = useState("");
	const [allCategoryList, setAllCategoryList] = useState([]);
	const [favoriteStr, setFavoriteStr] = useState(
		localStorage.getItem("favorite")
	);
	const [newGamesArr, setNewGamesArr] = useState([]);

	const changeActiveProvider = provider => {
		setActiveProvider(provider);
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
								: null,
						tpGameType: activeProvider?.tpGameType
					}),
				freePlay ? 0 : 5000
			);
		} else {
			setNav(defNavPanel.login);
		}
	};

	const handleCategoryActive = category => {
		if (category === "random") {
			const isMaintain = maintainList.some(
				({ tpId }) => Number(pathTpId) === tpId
			);
			if (!isMaintain) {
				if (userInfo.isLogin) {
					const allList = slotDataList.find(
						item => item[0] === "all"
					)[1];
					const filterList =
						Object.keys(activeProvider).length > 0
							? allList.filter(
									obj => obj.tpId === activeProvider.tpId
							  )
							: allList;
					const index = Math.floor(Math.random() * filterList.length);
					clickPlay(false, filterList[index]);
				} else {
					setNav(defNavPanel.login);
				}
			}
		} else {
			setActiveCategory(category);
		}
	};

	const getSlotGameData = async () => {
		setLoading(true);
		try {
			const res = await api_GetSlotGamePage({
				currencyId
			});
			const { providerList: pList } = res.data.data;
			const targetProvider =
				pList.find(obj => obj.tpId === Number(pathTpId)) ?? {};
			if (Object.keys(targetProvider).length > 0) {
				const targetIndex = pList.findIndex(
					providerObj => providerObj.tpId === targetProvider.tpId
				);
				const sliceProviderList = [
					...pList.slice(targetIndex),
					...pList.slice(0, targetIndex)
				];
				setProviderList(sliceProviderList);
				setActiveProvider(targetProvider);
			} else {
				setProviderList(pList);
			}
			const skipList = ["imgUrl", "providerList"];
			let tempList = [];
			setSlotDataList(Object.entries(res.data.data));
			Object.entries(res.data.data).forEach(item => {
				if (!skipList.includes(item[0])) {
					tempList.push(item);
					if (item[0] === "myFavorite") {
						if (userInfo.isLogin) {
							const storageStr = favoriteStr ?? "";
							const storageList = storageStr.split("&") ?? [];

							const addList = [];
							item[1].forEach(obj => {
								setFavoriteList(prev => [
									...prev,
									`${obj.tpId}_${obj.gameId}`
								]);
								!storageList.includes(
									`${obj.tpId}_${obj.gameId}`
								) && addList.push(`${obj.tpId}_${obj.gameId}`);
							});
							const mergeList = [...storageList, ...addList];
							localStorage.setItem(
								"favorite",
								mergeList.join("&")
							);
							setFavoriteStr(mergeList.join("&"));
						}
					}
				} else if (item[0] === "imgUrl") {
					setImageUrl(item[1]);
				}
			});
			const randomItem = tempList.filter(item => item[0] === "random")[0];
			const tempItemList = tempList.filter(item => item[0] !== "random");
			tempItemList.unshift(randomItem);
			setAllCategoryList(tempItemList);
			const random = tempList.filter(
				item => item[1].length > 0 && item[0] === "random"
			)[0];

			tempList = tempList.filter(item => {
				if (Object.keys(targetProvider).length > 0) {
					return (
						item[0] !== "random" &&
						(item[1].find(i => i.tpId === targetProvider?.tpId) ||
							item[0] === "myFavorite")
					);
				}
				return (
					item[0] !== "random" &&
					(item[1].length > 0 || item[0] === "myFavorite")
				);
			});
			tempList.unshift(random);

			const miniItem = tempList.find(el => el[0] === "mini");
			if (
				miniItem &&
				miniItem[1].some(({ tpId }) => tpId === targetProvider?.tpId)
			) {
				// 位置要放在 “All” 旁邊
				tempList.splice(2, 0, miniItem);
				tempList.pop();
			}

			if (page === "jackpot") {
				const jackpotItem = tempList.find(el => el[0] === "jackpot");
				const jackpootIdx = tempList.findIndex(
					el => el[0] === "jackpot"
				);

				// 位置要放在 “All” 旁邊
				tempList.splice(jackpootIdx, 1);
				tempList.splice(2, 0, jackpotItem);
			}

			const _list = [];
			tempList.forEach(item => _list.push(item[0]));
			setCategoryList(_list);

			// 找到featured在第幾個，設定一進畫面顯示它
			const featuredIdx = _list.findIndex(value => {
				return value === "featured";
			});
			setActiveCategory(
				page === "jackpot" ? "jackpot" : _list[featuredIdx]
			); // 決定一進畫面要渲染的類別遊戲

			// 沒有效果，先暫時註解
			// const targetList = Object.entries(res.data.data)?.find(item => {
			// 	return item[0] === _list[1];
			// })[1];
			// setGameList(targetList);

			setLoading(false);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: i18n.msg_ApiServerError
			});
			setLoading(false);
		}
	};

	useEffect(() => {
		getSlotGameData();
	}, []);

	// 一進畫面就先把新遊戲的gameId存在陣列
	useEffect(() => {
		allCategoryList.forEach(items => {
			if (items[0] === "new") {
				const _gameIdArr = items[1].map(item => item.gameId);
				setNewGamesArr(_gameIdArr);
			}
		});
	}, [allCategoryList]);

	return (
		<div className="wrapper">
			<div className="col-12">
				<div className="lobby-top">
					<Slider />

					<div className="slots-vender-bar">
						<GameProviders
							selNav={activeProvider?.tpId}
							onChange={changeActiveProvider}
							sorted={providerList}
						/>
					</div>
					<div className="slots-category">
						<div className="slots-category-menu">
							<Nav
								categoryList={categoryList}
								selNav={activeCategory}
								onChange={handleCategoryActive}
							/>
						</div>
						<SearchBox
							searchInput={searchInput}
							setSearchInput={setSearchInput}
						/>
					</div>
				</div>

				<Lobby
					imageUrl={imageUrl}
					gameList={gameList}
					favoriteStr={favoriteStr}
					slotDataList={slotDataList}
					providerList={providerList}
					favoriteList={favoriteList}
					searchInput={searchInput}
					activeProvider={activeProvider}
					activeCategory={activeCategory}
					allCategoryList={allCategoryList}
					maintainList={maintainList}
					setGameList={setGameList}
					setFavoriteStr={setFavoriteStr}
					setCategoryList={setCategoryList}
					setFavoriteList={setFavoriteList}
					setActiveCategory={setActiveCategory}
					newGamesArr={newGamesArr}
				/>
			</div>
		</div>
	);
};

export default Casino;
