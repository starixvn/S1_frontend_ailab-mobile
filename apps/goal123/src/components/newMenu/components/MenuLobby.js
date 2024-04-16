import React, { useState, useContext } from "react";

import path from "apps/goal123/src/path";
import { useNavigate } from "@reach/router";
import { bannerImgUrl } from "apps/goal123/src/config";
import { GET_ENTER_PAGE } from "apps/goal123/src/service/enterPage";
import { products } from "@ailab-mobile/common";
import { userInfoContext, i18nContext, navContext } from "../../common/context";

import {
	useGetTpMaintainList,
	defTpGameType
} from "../../hook/useGetTpMaintainList";

export const defNavPanel = {
	login: "login",
	join: "join",
	subMenu: "subMenu"
};

const defSubMenus = [
	{
		displayKey: "lbl_Sports",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-sports.svg`,
		subItems: [
			{
				displayKey: "lbl_SabaSport",
				...products.Soccer
			},
			{
				displayText: "SBOBET",
				...products.SBOBET
			},
			{
				displayKey: "lbl_BTISport",
				...products.BtiSport
			},
			{
				displayKey: "lbl_SabaSoccer",
				...products.SabaSoccer
			},
			{
				displayKey: "lbl_eSports",
				...products.ESportALL
			},
			{
				displayKey: "lbl_VirtualSports",
				...products.VirtualSports
			}
		]
	},
	{
		displayKey: "lbl_Games",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-games.svg`,
		subItems: [
			{
				...products.KingMaker,
				displayKey: "lbl_KingMaker"
			},
			{
				...products.SabaSoccer,
				displayKey: "lbl_Vgaming"
			},
			{
				...products.V8Poker,
				displayKey: "lbl_V8Poker"
			},
			{
				...products.TableGame,
				displayKey: "lbl_tableGame"
			},
			{
				...products.VirtualSports,
				displayKey: "lbl_VirtualGames"
			}
		]
	},
	{
		displayKey: "lbl_Fishing",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-fishing.svg`,
		subItems: [
			{
				...products.Paradise,
				displayKey: "lbl_Paradise"
			},
			{
				...products.OneshotFishing,
				displayKey: "lbl_Oneshot_Fishing"
			},
			{
				...products.FishingGod,
				displayKey: "lbl_FishingSG1"
			},
			{
				...products.FishingWar,
				displayKey: "lbl_FishingSG2"
			}
		]
	},
	{
		displayKey: "lbl_Lottery",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-lottery.svg`,
		subItems: [
			{
				...products.VNLottery,
				displayKey: "GPI_VNLottery"
			},
			{
				...products.TCG,
				displayKey: "lbl_tcg"
			},
			{
				...products.Keno,
				displayKey: "lbl_Keno"
			},
			{
				...products.Lottery,
				displayKey: "lbl_Lottery"
			}
		]
	},
	{
		...products.ESportALL,
		displayKey: "lbl_eSports",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-esports.svg`,
		subItems: [
			{
				...products.ESportALL,
				displayKey: "lbl_Saba"
			},
			{
				...products.TFGaming,
				displayKey: "lbl_TFGaming"
			}
		]
	},
	{
		displayKey: "lbl_Slots",
		path: path.casino.root,
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-slots.svg`
	},
	{
		displayKey: "lbl_LiveCasino",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-casino.svg`,
		subItems: [
			{
				...products.PragmaticPlayCasino,
				displayText: "Pragmatic Play"
			},
			{
				...products.BigGaming,
				displayText: "Big Gaming"
			},
			{
				...products.YeebetCasino,
				displayText: "YEEBET"
			},
			{
				...products.SkywindCasino,
				displayText: "Skywind"
			},
			{
				...products.MicrogamingCasino,
				displayText: "Microgaming"
			},
			{
				...products.EvolutionGaming,
				displayText: "Evolution Gaming"
			},
			{
				...products.PlaytechCasino,
				displayText: "Playtech"
			},
			{
				...products.WMCasino,
				displayText: "WM Casino"
			},
			{
				...products.DreamGaming,
				displayText: "Dream Gaming"
			},
			{
				...products.AESexy,
				displayText: "AE Sexy"
			},
			{
				...products.AsiaGaming,
				displayText: "Asia Gaming"
			},
			{
				...products.Allbet,
				displayText: "Allbet"
			},
			{
				...products.SAGaming,
				displayText: "SA Gaming"
			},
			{
				...products.WE,
				displayText: "WE",
				tpGameType: 28
			}
		]
	}
];

const MenuLobby = () => {
	// menu lobby item and click logics
	const [isOpenSubMenu, setIsOpenSubMenu] = useState([]);
	const [clickTitle, setClickTitle] = useState(false);
	const [activeTitleKey, setActiveTitleKey] = useState(null);
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const navigate = useNavigate();

	const handleClickTitle = titleKey => {
		setActiveTitleKey(prevKey => (prevKey === titleKey ? null : titleKey));
	};

	const handleSubMenu = displayKey => {
		if (isOpenSubMenu.includes(displayKey)) {
			setIsOpenSubMenu(prevS => prevS.filter(s => s !== displayKey));
		} else {
			setIsOpenSubMenu(prevS => [...prevS, displayKey]);
		}
	};

	const closeNavPanel = () => {
		handleSideMenuPanel(false);
		setIsOpenSubMenu([]);
	};

	const { maintainList } = useGetTpMaintainList();
	const isUnderMaintain = ({ tpId, tpGameType }) =>
		maintainList?.some(
			m =>
				m.tpId === tpId &&
				(m.tpGameType === tpGameType ||
					m.tpGameType === defTpGameType.All)
		);

	const clickGame = ({ tpId, gameId, tpGameType }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			},
			tpGameType
		});
	};

	const rows = defSubMenus
		?.filter(
			menuItem =>
				menuItem.subItems ||
				!isUnderMaintain({
					tpId: menuItem.tpId,
					tpGameType: menuItem.tpGameType
				})
		)
		.map(menuItem => {
			const key = `submenu-${
				menuItem.displayKey || menuItem.displayText
			}`;
			let hasSubItem = false;
			let subItemElements = null;
			if (menuItem.subItems) {
				const filteredSubItems = menuItem.subItems
					?.filter(
						subItem =>
							!isUnderMaintain({
								tpId: subItem.tpId,
								tpGameType: subItem.tpGameType
							})
					)
					.map(subItem => {
						// 對照網站上的list
						return (
							<div className="lobby-item">
								<a
									key={`${key}-${
										subItem.displayKey ||
										subItem.displayText
									}`}
									onClick={clickGame.bind(this, subItem)}>
									<button>
										{i18n[
											subItem.displayKey
										]?.toUpperCase() ??
											subItem.displayText?.toUpperCase()}
										{subItemElements}
									</button>
								</a>
							</div>
						);
					});

				hasSubItem = filteredSubItems.length > 0;
				if (hasSubItem) {
					const isOpen = isOpenSubMenu.includes(
						menuItem.displayKey || menuItem.displayText
					);
					subItemElements = <a>{filteredSubItems}</a>;
				}
			}

			if (menuItem.path) {
				return (
					<div
						className="lobby-list"
						onClick={() => navigate(menuItem.path)}>
						<div className="list">
							<img
								src={menuItem.iconSrc}
								alt={
									i18n[menuItem.displayKey] ||
									menuItem.displayText
								}
							/>
							<span>
								{i18n[menuItem.displayKey]?.toUpperCase() ??
									menuItem.displayText.toUpperCase()}
							</span>
						</div>
					</div>
				);
			}

			return (
				hasSubItem && (
					<div
						className={`${
							activeTitleKey === menuItem.displayKey
								? "lobby-list active"
								: "lobby-list"
						}`}
						onClick={() => handleClickTitle(menuItem.displayKey)}>
						{/* <div className="hot-icon" /> */}
						<div className="list">
							<img src={menuItem.iconSrc} />
							<span>
								{i18n[menuItem.displayKey]?.toUpperCase() ??
									menuItem.displayText}
							</span>
						</div>
						{activeTitleKey === menuItem.displayKey && (
							<div className="lobby-item">{subItemElements}</div>
						)}
					</div>
				)
			);
		});

	return (
		<div className="menu-lobby">
			<div className="lobby">{rows}</div>
		</div>
	);
};

export default MenuLobby;
