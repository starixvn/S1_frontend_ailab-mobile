import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Link } from "../route/link";
import Layout from "../components/common/layout";
import Header from "../components/header/header";
import Slider from "../components/casino/slider";
import Nav from "../components/casino/nav";
import GameProviders from "../components/casino/gameProviders";
import useHandleLogin from "../components/hook/useHandleLogin";
import { useGotoGame, defSpecialSetting } from "../components/hook/useGotoGame";
import useSetTimeout from "../components/hook/useSetTimeout";
import Games from "../components/casino/games";
import api from "../service/api";
import path from "../path";
import { GET_CASINO_ENTER_PAGE } from "../service/enterPage";
import { defSlotTpGameType } from "../datas/productList";

const Panel = ({ searchInput }) => {
	const { throttle } = useSetTimeout();
	const { handleLogin } = useHandleLogin();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [listFixed, setListFixed] = useState(false);
	const [providerList, setProviderList] = useState([]);
	const [activeProvider, setActiveProvider] = useState({});
	const [allCategoryList, setAllCategoryList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [activeCategory, setActiveCategory] = useState("");
	const [gameList, setGameList] = useState([]);
	const [favoriteList, setFavoriteList] = useState([]);
	const [imageUrl, setImageUrl] = useState("");
	const [slotDataList, setSlotDataList] = useState([]);
	const [selGameInfo, setSelGameInfo] = useState(null);
	const gameListRef = useRef(null);
	const splitList = window.location.href.split("/");
	const pathTpId = splitList[splitList.length - 1];
	const getSlotGameData = async () => {
		try {
			const res = await api.game.GetSlotGamePage({ deviceType: 2 });
			const { providerList: pList } = res.data.data;
			const targetProvider = pList.find(
				obj => obj.tpId === Number(pathTpId)
			);
			if (targetProvider) {
				const pFilterList = pList.filter(
					item => item.tpId !== targetProvider.tpId
				);
				pFilterList.unshift(targetProvider);
				setProviderList(pFilterList);
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
							const storageStr = localStorage.getItem("favorite");
							const storageList = storageStr.split("&");

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

			const _list = [];
			tempList.forEach(item => _list.push(item[0]));
			setCategoryList(_list);
			setActiveCategory(_list[1]);
			const targetList = Object.entries(res.data.data)?.find(
				item => item[0] === _list[1]
			)[1];
			setGameList(targetList);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: error
			});
		}
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
		setActiveProvider(provider);
	};

	const fList = localStorage.getItem("favorite");

	const renderSlot = () => {
		const targetList = slotDataList.find(
			item => item[0] === activeCategory
		);
		const filterHandle = item => {
			if (Object.keys(activeProvider).length > 0) {
				return (
					item.tpId === activeProvider?.tpId &&
					item.gameName?.[
						item.gameName[userInfo.langId] ? userInfo.langId : "en"
					]?.includes(searchInput)
				);
			}
			return item.gameName?.[
				item.gameName[userInfo.langId] ? userInfo.langId : "en"
			]?.includes(searchInput);
		};
		if (targetList) {
			if (targetList[0] === "myFavorite") {
				const tempList = [];
				const resultList = [];
				const tempFavoriteStr = localStorage.getItem("favorite");
				const tempFavoriteList = tempFavoriteStr.split("&");
				tempFavoriteList.forEach(str => {
					const chars = str.split("_");
					tempList.push({ tpId: chars[0], gameId: chars[1] });
				});
				const allList = slotDataList.find(item => item[0] === "all")[1];
				allList.forEach(allObj => {
					tempList.forEach(favObj => {
						if (
							allObj.tpId === Number(favObj.tpId) &&
							allObj.gameId === favObj.gameId
						) {
							resultList.push(allObj);
						}
					});
				});

				const filterList = resultList.filter(item =>
					filterHandle(item)
				);
				setGameList(filterList);
			} else {
				const filterList = targetList[1]?.filter(item =>
					filterHandle(item)
				);
				setGameList(filterList);
			}
		}
	};

	let storageStr = localStorage.getItem("favorite");
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
		renderSlot();
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
		} else {
			localStorage.setItem(
				"favorite",
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
							targetObj.tpId === defSpecialSetting.playTech
								? handleGoToGame.bind(this, {
										langId: userInfo.langId,
										tpId: targetObj.tpId,
										gameId: targetObj.gameId,
										isFun: freePlay,
										tpGameType:
											defSlotTpGameType.PT.tpGameType
								  })
								: null,
						tpGameType: Object.values(defSlotTpGameType).find(
							obj => targetObj.tpId === obj.tpId
						).tpGameType
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
			const filterList = activeProvider
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
			const tempFavoriteList = fList.split("&");
			tempFavoriteList.forEach(str => {
				const chars = str.split("_");
				tempList.push({ tpId: chars[0], gameId: chars[1] });
			});
			gameList.forEach(item => {
				tempList.forEach(obj => {
					if (
						item.tpId === Number(obj.tpId) &&
						item.gameId === obj.gameId
					) {
						resultList.push(item);
					}
				});
			});
			setGameList(resultList);
		}
	}, [fList]);

	useEffect(() => {
		getSlotGameData();
		const tempFavorite = localStorage.getItem("favorite");
		if (!tempFavorite) {
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
			allCategoryList.forEach(obj => tempList.push(Object.keys(obj)[0]));
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
					/>
				</div>
				<div className="filterSelect">
					<Nav
						categoryList={categoryList}
						selNav={activeCategory}
						onChange={handleCategoryActive}
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
				renderSlot={renderSlot}
				i18n={i18n}
				imgUrl={imageUrl}
				ref={gameListRef}
			/>

			{selGameInfo === null ? null : (
				<div className="slotpopup active">
					<div className="slotFunction">
						<img
							src={`${imageUrl}/${activeProvider?.tpName}/${
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
								{i18n.lbl_PlayNow}
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
		<Link to={path.home.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);
	const header = (
		<Header
			isShowInput={true}
			searchInput={searchInput}
			setSearchInput={setSearchInput}
			title={i18n.lbl_Slots}
			hideLogo={true}
			link={link}
		/>
	);

	return (
		<Layout
			header={header}
			mainClass="main casino"
			SEOPath={path.casino.root}>
			<Panel searchInput={searchInput} />
		</Layout>
	);
};

export default IndexPage;
