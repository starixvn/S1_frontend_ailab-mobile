import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	productTpGameTypeSettingListContext
} from "Context";
import { Link } from "../route/link";
import Layout from "../components/common/layout";
import Header from "../components/header/header";
import Slider from "../components/casino/slider";
import Nav from "../components/casino/nav";
import GameProviders from "../components/casino/gameProviders";
import useHandleLogin from "../components/hook/useHandleLogin";
import {
	defLoginGameType,
	defSpecialSetting,
	useGotoGame
} from "../components/hook/useGotoGame";
import useSetTimeout from "../components/hook/useSetTimeout";
import Games from "../components/casino/games";
import api from "../service/api";
import path from "../path";
import { GET_CASINO_ENTER_PAGE } from "../service/enterPage";
import { defSlotTpGameType } from "../datas/productList";
import { defProductType } from "../datas/hotGameList";

const Panel = ({ searchInput }) => {
	const { throttle } = useSetTimeout();
	const { handleLogin } = useHandleLogin();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setLoading } = useContext(loadingContext);
	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);
	const [listFixed, setListFixed] = useState(false);
	const [providerList, setProviderList] = useState([]);
	const [activeProvider, setActiveProvider] = useState({});
	const [allCategoryList, setAllCategoryList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [activeCategory, setActiveCategory] = useState("");
	const [gameList, setGameList] = useState([]);
	const [favoriteList, setFavoriteList] = useState([]);
	const [favoriteStr, setFavoriteStr] = useState(
		localStorage.getItem("favorite")
	);
	const [imageUrl, setImageUrl] = useState("");
	const [slotDataList, setSlotDataList] = useState([]);
	const [selGameInfo, setSelGameInfo] = useState(null);
	const gameListRef = useRef(null);
	const splitList = window.location.href.split("/");
	const pathTpId = splitList[splitList.length - 1];
	const getSlotGameData = async () => {
		setLoading(true);
		try {
			const res = await api.game.GetSlotGamePage({
				currencyId: userInfo.currencyId
			});
			const { providerList: pList } = res.data.data;
			const targetProvider = pList.find(
				obj => obj.tpId === Number(pathTpId)
			);
			if (targetProvider) {
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
			tempList = tempList.filter(
				item =>
					item[0] !== "random" &&
					((item[1].length > 0 &&
						(targetProvider
							? item[1].filter(
									i => i.tpId === targetProvider?.tpId
							  ).length > 0
							: true)) ||
						item[0] === "myFavorite")
			);
			tempList.unshift(random);

			const miniItem = tempList.find(el => el[0] === "mini");
			if (
				miniItem &&
				miniItem[1].some(({ tpId }) => tpId === targetProvider?.tpId)
			) {
				tempList.splice(2, 0, miniItem);
				tempList.pop();
			}

			const _list = [];
			tempList.forEach(item => _list.push(item[0]));
			setCategoryList(_list);
			setActiveCategory(_list[1]);
			const targetList = Object.entries(res.data.data)?.find(
				item => item[0] === _list[1]
			)[1];
			const unLimitTpGameTypeList = getUnLimitTpGameTypeList(targetList);
			setGameList(unLimitTpGameTypeList);
			setLoading(false);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: error
			});
			setLoading(false);
		}
	};

	const getUnLimitTpGameTypeList = list => {
		if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
			const uniqueTpIds = Array.from(
				new Set(
					tpGameTypeSettingList.map(item => {
						if (item.categoryId === defProductType.Slots) {
							return item.tpId;
						}
						return null;
					})
				)
			);
			return list.filter(({ tpId }) => !uniqueTpIds.includes(tpId));
		}
		return list;
	};

	const handleSetFavorite = async (GameId, IsRemove, ProviderId) => {
		if (userInfo.isLogin) {
			try {
				await api.account.SetFavoriteGame({
					GameId,
					IsRemove,
					ProviderId
				});
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: error
				});
			}
		}
	};

	const changeActiveProvider = provider => {
		if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
			const uniqueTpIds = Array.from(
				new Set(
					tpGameTypeSettingList.map(item => {
						if (item.categoryId === defProductType.Slots) {
							return item.tpId;
						}
						return null;
					})
				)
			);
			if (uniqueTpIds.includes(provider.tpId)) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_Information,
					content: (
						<div style={{ color: "red" }}>
							{i18n.lbl_InaccessibleWithoutPermission}
						</div>
					)
				});
			} else {
				setActiveProvider(provider);
			}
		} else {
			setActiveProvider(provider);
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
				const unLimitTpGameTypeList = getUnLimitTpGameTypeList(
					filterList
				);
				setGameList(unLimitTpGameTypeList);
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
				const unLimitTpGameTypeList = getUnLimitTpGameTypeList(
					filterList
				);
				setGameList(unLimitTpGameTypeList);
			}
		}
	};

	let storageStr = favoriteStr;
	if (storageStr && storageStr.charAt(0) === "&") {
		storageStr = storageStr.substring(1, storageStr.length);
	}
	const storageList = storageStr?.split("&");
	const handleIsFavorite = () => {
		return storageList?.includes(
			`${selGameInfo?.tpId}_${selGameInfo?.gameId}`
		);
	};
	const _isFavorite = handleIsFavorite();
	const onToggleFavorite = () => {
		handleSetFavorite(selGameInfo?.gameId, _isFavorite, selGameInfo?.tpId);
		const storageFavList = storageStr
			.split("&")
			.filter(str => !(str === ""));
		let filterList;
		if (_isFavorite) {
			filterList = storageFavList.filter(
				item => item !== `${selGameInfo.tpId}_${selGameInfo.gameId}`
			);
			localStorage.setItem("favorite", filterList.join("&"));
			setFavoriteStr(filterList.join("&"));
		} else {
			localStorage.setItem(
				"favorite",
				`${storageStr ?? ""}${storageStr === false ? "" : "&"}${
					selGameInfo.tpId
				}_${selGameInfo.gameId}`
			);
			setFavoriteStr(
				`${storageStr ?? ""}${storageStr === false ? "" : "&"}${
					selGameInfo.tpId
				}_${selGameInfo.gameId}`
			);
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
						execFunction:
							targetObj.tpId === defSpecialSetting.PG
								? handleGoToGame.bind(this, {
										langId: userInfo.langId,
										tpId: targetObj.tpId,
										gameId: targetObj.gameId,
										isFun: freePlay,
										tpGameType:
											defSlotTpGameType.PG.tpGameType,
										loginGameType:
											defLoginGameType.returnHtml
								  })
								: null,
						tpGameType: Object.values(defSlotTpGameType).find(
							obj => targetObj.tpId === obj.tpId
						)?.tpGameType
					}),
				freePlay ? 0 : 5000
			);
		} else {
			handleLogin({
				selGameInfo: targetObj ?? {},
				selProvider: activeProvider,
				searchInfo: searchInput,
				selNav: activeCategory
			});
		}
	};

	const handleCategoryActive = category => {
		if (category === "random") {
			const allList = slotDataList.find(item => item[0] === "all")[1];
			const filterList =
				Object.keys(activeProvider).length > 0
					? allList.filter(obj => obj.tpId === activeProvider.tpId)
					: allList;
			const index = Math.floor(Math.random() * filterList.length);
			clickPlay(false, filterList[index]);
		} else {
			setActiveCategory(category);
		}
	};

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
			const unLimitTpGameTypeList = getUnLimitTpGameTypeList(resultList);
			setGameList(unLimitTpGameTypeList);
		}
	}, [favoriteStr]);

	useEffect(() => {
		getSlotGameData();
		if (!favoriteStr) {
			localStorage.setItem("favorite", "");
		}
	}, []);

	useEffect(() => {
		const handleScroller = () => {
			const gameListTop = gameListRef?.current?.getBoundingClientRect()
				.top;
			gameListTop >= 200 ? setListFixed(false) : setListFixed(true);
		};
		window.addEventListener("scroll", () => {
			handleScroller();
		});
		return () =>
			window.removeEventListener("scroll", () => {
				handleScroller();
			});
	}, []);

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

			allCategoryList.forEach(array => {
				if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
					const uniqueTpIds = Array.from(
						new Set(
							tpGameTypeSettingList.map(item => {
								if (item.categoryId === defProductType.Slots) {
									return item.tpId;
								}
								return null;
							})
						)
					);
					const unLimitTpGameTypeList = array[1].filter(
						({ tpId }) => !uniqueTpIds.includes(tpId)
					);
					if (unLimitTpGameTypeList.length > 0) {
						tempList.push(array[0]);
					}
				} else {
					tempList.push(array[0]);
				}
			});

			setCategoryList(tempList);
		}
	}, [activeProvider]);

	return (
		<>
			<Slider />
			<div className={`functionList${listFixed ? " active" : ""}`}>
				<div className="partnerSelect">
					<GameProviders
						selNav={activeProvider?.tpId}
						onChange={changeActiveProvider}
						sorted={providerList}
						activeProvider={activeProvider}
						tpGameTypeSettingList={tpGameTypeSettingList}
						pathTpId={pathTpId}
					/>
				</div>
				<div className="filterSelect">
					<Nav
						categoryList={categoryList}
						selNav={activeCategory}
						onChange={handleCategoryActive}
						memberType={userInfo.memberType}
					/>
				</div>
			</div>
			<Games
				selectGame={setSelGameInfo}
				gameList={gameList}
				favorite={favoriteList}
				setFavorite={setFavoriteList}
				providerList={providerList}
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
				<div className="slotpopup active">
					<div className="slotFunction">
						<img
							src={`${imageUrl}/${selGameInfo.brandName}/${
								selGameInfo.imgName[userInfo.langId] ??
								selGameInfo.imgName.en
							}`}
							alt={
								selGameInfo.gameName[userInfo.langId] ??
								selGameInfo.gameName.en
							}
						/>
						<div className="gameTitle">
							<div className="title text-org">
								{selGameInfo.gameName[userInfo.langId] ??
									selGameInfo.gameName.en}
							</div>
							<span
								onClick={onToggleFavorite}
								className={`icon icon-star-${
									_isFavorite ? "full" : "empty"
								}`}
							/>
						</div>
						<button
							className="icon icon-cancel-circle"
							onClick={() => setSelGameInfo(null)}
						/>
						<div className="btn-group">
							<button
								className="blue"
								data-testid="clickPlay"
								onClick={() => clickPlay(false)}>
								{i18n.lbl_Play}
							</button>
							{selGameInfo.playFree ? (
								<button
									data-testid="clickFreePlay"
									className="orange"
									onClick={() => clickPlay(true)}>
									{i18n.lbl_FreePlay}
								</button>
							) : null}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
Panel.propTypes = {
	searchInput: PropTypes.string
};
Panel.defaultProps = {
	searchInput: ""
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const [searchInput, setSearchInput] = useState("");
	const link = (
		<Link to={`?prev=${path.casino.root}`}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);
	const header = (
		<Header
			searchInput={searchInput}
			setSearchInput={setSearchInput}
			title={i18n.lbl_Slots}
			hideLogo={true}
			link={link}
		/>
	);

	return (
		<Layout header={header} mainClass="main casino">
			<Panel searchInput={searchInput} />
		</Layout>
	);
};

export default IndexPage;
