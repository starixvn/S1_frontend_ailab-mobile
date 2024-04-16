import classNames from "classnames";
import { menuIconTypeEnum, products } from "@ailab-mobile/common";
import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "@reach/router";
import {
	defCol,
	defMenuType,
	defMenuList,
	isShowEventIcon
} from "apps/goal123/src/datas/defMenu";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../../hook/useGetTpMaintainList";
import { defNavPanel, navContext, popBoxContext } from "../../common/context";
import { defAppType, GET_ENTER_PAGE } from "../../../service/enterPage";
import { api_GetTpIds } from "../../../service/api/site";
import { useGotoGame } from "../../hook/useGotoGame";
import { useMenu } from "../../hook/useMenu";
import { bannerImgUrl } from "../../../config";
import path from "../../../path";

const HomeMenu = ({ i18n, userInfo }) => {
	const navigate = useNavigate();
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [selectedCategory, setSelectedCategory] = useState(defCol.hotGame);
	const [showingTpIds, setShowningTpIds] = useState(null);
	const [selectedCol, setSelectedCol] = useState(defCol.hotGame);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { maintainList } = useGetTpMaintainList();
	const { menuList = [], onClickProductItem } = useMenu();

	// * 非靜態遊戲 須從 useMenu 裡面拿遊戲資料
	const hotGameList = useMemo(() => {
		const allProducts = menuList.flatMap(
			mainMenuItem => mainMenuItem?.data
		);

		const SoccerItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.Soccer.tpGameIdNo
		);

		const SabaSoccerItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.SabaSoccer.tpGameIdNo
		);

		const VGamingItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.Vgaming.tpGameIdNo
		);
		const VirtualSportsItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.VirtualSports.tpGameIdNo
		);
		const KenoItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.Keno.tpGameIdNo
		);
		const V8PokerItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.V8Poker.tpGameIdNo
		);
		const ESportALLItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.ESportALL.tpGameIdNo
		);

		return [
			SoccerItem,
			SabaSoccerItem,
			{
				defSubMenuImage: `${bannerImgUrl}/h5/img/hotgame/slots.jpg`,
				menuType: defMenuType.Link,
				defDisplayKey: "lbl_Slots",
				path: path.casino.root
			},
			VGamingItem,
			VirtualSportsItem,
			KenoItem,
			V8PokerItem,
			ESportALLItem
		].filter(item => item);
	}, [menuList]);

	const isMountedRef = useRef(null);

	const selectedSubMenus = () => {
		const switchSubMenu = {
			[defCol.hotGame]: () => hotGameList,
			default: () =>
				menuList?.find(({ category }) => category === selectedCategory)
					?.data || []
		};

		return (switchSubMenu[selectedCategory] || switchSubMenu.default)();
	};

	const onClickCategory = category => {
		if (category !== selectedCategory) setSelectedCategory(category);
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setShowningTpIds(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	}, [setShowningTpIds, userInfo.isLogin]);

	const showSubPanel = ({ panel }) => {
		if (selectedCol !== panel) {
			setSelectedCol(panel);
		}
	};

	const clickGame = ({
		tpId,
		gameId,
		useGotoGame: _useGotoGame,
		tpGameType,
		appType
	}) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			},
			execFunction: _useGotoGame
				? handleGoToGame.bind(this, {
						isLogin: userInfo.isLogin === true,
						langId: userInfo.langId,
						tpId,
						gameId,
						tpGameType
				  })
				: null,
			tpGameType,
			appType
		});
	};

	const clickLink = ({ type, item }) => {
		if (type === defMenuType.Link) {
			navigate(`/${item?.path}`);
		}
		if (type === defMenuType.entPage) {
			const { tpId, gameId, tpGameType } = item;
			clickGame({ tpId, gameId, tpGameType });
		}
	};

	const SubGame = ({ game, underMaintain }) => {
		// const showingEventIcon = getEventIcon({ eventIcon: game?.eventIcon });

		const onMenuClick = () => {
			if (!underMaintain) {
				if (game.category) {
					// 如果有 category 參數則跳轉首頁 menu 路由
					setSelectedCol(game.category);
				} else {
					clickGame({
						tpId: game.tpId,
						gameId: game.gameId,
						useGotoGame: game.useGotoGame,
						tpGameType: game.tpGameType
					});
				}
			}
		};

		return (
			<div
				className="gamelist-item"
				key={game.spanText || game.spanTextKey}
				onClick={() => onMenuClick(game)}>
				{/* {showingEventIcon !== "" ? (
					<div className={` ${showingEventIcon}`} />
				) : null} */}
				<div className="gamelist-img">
					<img
						src={game.img}
						alt={game.spanText || game.spanTextKey}
					/>
				</div>
				<div className="gamelist-title">
					{game.spanText || i18n[game.spanTextKey]}
				</div>
				{/* {game?.hasDesktopLink && (
					<div className="switchbtn">
						<button
							onClick={
								underMaintain
									? () => null
									: e => {
											e.stopPropagation();
											clickGame({
												tpId: game.tpId,
												gameId: game.gameId,
												useGotoGame: game.useGotoGame,
												tpGameType: game.tpGameType,
												appType: defAppType.desktop
											});
									  }
							}>
							{i18n.lbl_Sportsbook_Desktop}
						</button>
						<button>{i18n.lbl_Sportsbook_PlayNow}</button>
					</div>
				)} */}
				{underMaintain ? (
					<div className="under-maintenance">
						{i18n.lbl_underMaintenance}
					</div>
				) : null}
			</div>
		);
	};

	const gameArr = defMenuList.map(item => {
		const _subIcon = item?.items?.filter(subItem =>
			// subItem.eventIcon &&
			subItem.tpId
				? showingTpIds === null || showingTpIds.includes(subItem.tpId)
				: true
		);

		// const showingEventIcon = getEventIcon({
		// 	subIcon: _subIcon,
		// 	eventIcon: item?.eventIcon
		// });

		const imgSrc =
			selectedCol === item.category
				? item.img.replace(".svg", "-active.svg") // 如果当前类别被选中，使用带有-active的图片
				: item.img; // 否则使用默认图片

		// * 如果時間不在範圍內不渲染元件
		if (item?.isEventPeriod) {
			return null;
		}

		// ${showingEventIcon !== "" ? ` ${showingEventIcon}` : ""}

		return (
			<button
				key={`menu-${item.category}`}
				className={`${item?.className ?? ""} ${
					selectedCol === item.category ? "active" : ""
				}`}
				onClick={
					item.link
						? clickLink.bind(this, { type: item?.type, item })
						: showSubPanel.bind(this, { panel: item.category })
				}>
				<div className="category-icon">
					<img src={imgSrc} alt={item.category} />
				</div>
				<span>{i18n[item.translateKey]}</span>
			</button>
		);
	});

	const subGameArr = useMemo(() => {
		// 獲取當前選擇類別下的所有遊戲
		const games =
			defMenuList.find(item => item.category === selectedCol)?.items ||
			[];

		// 過濾出應該顯示的遊戲項目
		return games
			.filter(subItem => {
				return showingTpIds
					? showingTpIds.includes(subItem.tpId) ||
							subItem.spanTextKey === "lbl_Slots"
					: true;
			})
			.map(subItem => {
				const underMaintain = maintainList?.some(
					m =>
						m.tpId === subItem.tpId &&
						(m.tpGameType === subItem.tpGameType ||
							m.tpGameType === defTpGameType.All)
				);

				// 渲染每個遊戲項目
				return (
					<SubGame
						key={`${subItem.tpId}-${subItem.gameId}`}
						game={subItem}
						underMaintain={underMaintain}
						clickGame={clickGame}
						i18n={i18n}
					/>
				);
			});
	}, [selectedCol, maintainList, showingTpIds]);

	const mainMenus = menuList.map(mainMenuItem => {
		const { category, defDisplayKey, data, mainMenuImage } =
			mainMenuItem || {};

		// * 查看 subMenu 是否有在顯示範圍的 New Icon
		const isNew = data.some(subMenuItem => {
			const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

			return (
				isShowEventIcon(iconStartTime, iconEndTime) &&
				iconType === menuIconTypeEnum.New
			);
		});

		// * 動態特例 Crypto Sport
		const cryptoSportItem = data?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.CryptoSports.tpGameIdNo
		);

		return (
			<>
				{cryptoSportItem && (
					<button onClick={() => onClickProductItem(cryptoSportItem)}>
						<img
							src={`${bannerImgUrl}/h5/img/hotgameicon/cryptosports.png`}
							alt={category}
						/>
					</button>
				)}
				<button
					key={category}
					className={classNames({
						active: selectedCategory === category,
						// * 目前只用 New Tag
						newicon: isNew
					})}
					onClick={() => onClickCategory(category)}>
					<img src={mainMenuImage} alt={category} />
					<p>{i18n[defDisplayKey]}</p>
				</button>
			</>
		);
	});

	const subMenus = selectedSubMenus().map(subMenuItem => {
		const {
			tpGameIdNo,
			productName,
			currencyGameName,
			iconType,
			iconStartTime,
			iconEndTime,
			isInMaintain,
			mobileHeaderPicUrl,
			hasDesktopLink,
			defSubMenuImage,
			defDisplayKey
		} = subMenuItem || {};
		// * 後端這裡是字串格式 需做處理
		const suBMenuImage =
			(mobileHeaderPicUrl && JSON.parse(mobileHeaderPicUrl)[0]) ||
			defSubMenuImage;

		const isNew =
			isShowEventIcon(iconStartTime, iconEndTime) &&
			iconType === menuIconTypeEnum.New;

		const displayName =
			currencyGameName &&
			currencyGameName[userInfo?.langId] &&
			currencyGameName[userInfo?.langId];

		return (
			<div
				className={classNames("gamelist-item", {
					active: isInMaintain
				})}
				key={`${tpGameIdNo}${productName}`}
				onClick={() => onClickProductItem(subMenuItem)}>
				{isNew && <div className="new-icon" />}

				<div className="gamelist-img">
					<img src={suBMenuImage} alt={productName} />
				</div>
				<div className="gamelist-title">
					{displayName ||
						subMenuItem?.productName ||
						i18n[defDisplayKey]}
				</div>

				{isInMaintain && (
					<div className="maintenance">
						{i18n.lbl_underMaintenance}
					</div>
				)}
			</div>
		);
	});

	const subPanelArr = (
		<div className="home-gamelist">
			<div className="gamelist-box active">{subMenus}</div>
		</div>
	);

	return (
		<>
			<div className="home-sidebar">
				<div className="sidebar-tab">{mainMenus}</div>
			</div>
			{subPanelArr}
		</>
	);
};

export default HomeMenu;
