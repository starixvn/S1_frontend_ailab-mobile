import React, { useState, useContext } from "react";
import path from "apps/goal123/src/path";
import { useNavigate } from "@reach/router";
import { bannerImgUrl } from "apps/goal123/src/config";
import { GET_ENTER_PAGE } from "apps/goal123/src/service/enterPage";
import { userInfoContext, i18nContext } from "../../../common/context";

import {
	useGetTpMaintainList,
	defTpGameType
} from "../../../hook/useGetTpMaintainList";
import { defGameInfo } from "../../../../datas/productList";

const defSubMenus = [
	{
		displayKey: "lbl_Sports",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-sports.svg`,
		subItems: [
			{
				displayKey: "lbl_SabaSport",
				...defGameInfo.Sports
			},
			// {
			// 	displayKey: "lbl_CryptoSports",
			// 	...defGameInfo.CryptoSports
			// },
			{
				displayText: "SBOBET",
				...defGameInfo.SBOSport
			},
			{
				displayKey: "lbl_BTISport",
				...defGameInfo.BTISport
			},
			{
				displayKey: "lbl_SabaSoccer",
				...defGameInfo.SabaSoccer
			},
			{
				displayKey: "lbl_eSports",
				...defGameInfo.eSports
			},
			{
				displayKey: "lbl_Basketball",
				...defGameInfo.Basketball
			},
			{
				displayKey: "lbl_Volleyball",
				...defGameInfo.Volleyball
			},
			{
				displayKey: "lbl_VirtualSports",
				...defGameInfo.VirtualSports
			}
		]
	},
	{
		displayKey: "lbl_Games",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-games.svg`,
		subItems: [
			{
				...defGameInfo.kingMaker,
				displayKey: "lbl_KingMaker"
			},
			{
				...defGameInfo.sabaClub,
				displayKey: "lbl_Vgaming"
			},
			// {
			// 	...defGameInfo.MaxGame,
			// 	displayText: "Max Game"
			// },
			{
				...defGameInfo.V8Poker,
				displayKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.tableGame,
				displayKey: "lbl_tableGame"
			}
			// {
			// 	...defGameInfo.VirtualGame,
			// 	displayKey: "lbl_VirtualGames"
			// }
		]
	},
	{
		displayKey: "lbl_Fishing",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-fishing.svg`,
		subItems: [
			{
				...defGameInfo.fish_AB3,
				displayKey: "lbl_Paradise"
			},
			{
				...defGameInfo.fish_AT01,
				displayKey: "lbl_Oneshot_Fishing"
			},
			// {
			// 	...defGameInfo.ICG_DRAGONBALL_FISHING,
			// 	displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING"
			// },
			// {
			// 	...defGameInfo.ICG_FISHING_OF_SAVIORS,
			// 	displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS"
			// },
			// {
			// 	...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
			// 	displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS"
			// },

			{
				...defGameInfo.FishingSG,
				displayKey: "lbl_FishingSG1"
			},
			{
				...defGameInfo.FishingSGW,
				displayKey: "lbl_FishingSG2"
			}
		]
	},
	{
		displayKey: "lbl_Lottery",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-lottery.svg`,
		subItems: [
			{
				...defGameInfo.GPI_VNLottery,
				displayKey: "GPI_VNLottery"
			},
			{
				...defGameInfo.tcg,
				displayKey: "lbl_tcg"
			},
			{
				...defGameInfo.Keno,
				displayKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				displayKey: "lbl_Lottery"
			}
		]
	},
	{
		...defGameInfo.eSports,
		displayKey: "lbl_eSports",
		iconSrc: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-esports.svg`,
		subItems: [
			{
				...defGameInfo.eSports,
				displayKey: "lbl_Saba"
			},
			{
				...defGameInfo.eSports_TFGaming,
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
				...defGameInfo.LIVEcasinoPP,
				displayText: "Pragmatic Play"
			},
			{
				...defGameInfo.LIVEcasinoBG,
				displayText: "Big Gaming"
			},
			{
				...defGameInfo.LIVEcasinoYEEBET,
				displayText: "YEEBET"
			},
			{
				...defGameInfo.LIVEcasinoSkywind,
				displayText: "Skywind"
			},
			{
				...defGameInfo.LIVEcasinoMG,
				displayText: "Microgaming"
			},
			{
				...defGameInfo.LIVEcasinoEVO,
				displayText: "Evolution Gaming"
			},
			{
				...defGameInfo.LIVEcasino_PlayTech,
				displayText: "Playtech"
			},
			{
				...defGameInfo.LIVEcasinoWM,
				displayText: "WM Casino"
			},
			{
				...defGameInfo.LIVEcasinoDG,
				displayText: "Dream Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAE,
				displayText: "AE Sexy"
			},
			{
				...defGameInfo.LIVEcasinoAG,
				displayText: "Asia Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAB,
				displayText: "Allbet"
			},
			{
				...defGameInfo.LIVEcasinoSA,
				displayText: "SA Gaming"
			},
			{
				...defGameInfo.LIVEcasinoEB,
				displayText: "eBET",
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
