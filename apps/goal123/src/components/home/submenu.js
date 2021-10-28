import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import Logo from "../../styles/img/logo.png";
import {
	userInfoContext,
	i18nContext,
	popBoxContext,
	navContext,
	defNavPanel
} from "../common/context";
import path from "../../path";
import { api_SetLanguage } from "../../service/api/account";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import { defGameInfo } from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import ShortcutBar from "./shortcutBar";
import TandC from "../../service/t_and_c";
import Skype from "../../styles/img/sk_1.png";
import Telegram from "../../styles/img/te_1.png";
import Zalo from "../../styles/img/zalo_1.png";
import Lang_en from "../../styles/img/en.jpg";
import Lang_vn from "../../styles/img/vn.jpg";
import { siteInfo } from "../../config";
import DefLangs from "../../datas/defLangs";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";

const defSubMenus = [
	{
		displayKey: "lbl_Sports",
		icon: "icon icon-sports",
		subItems: [
			{
				displayKey: "lbl_SabaSport",
				...defGameInfo.Sports
			}
			// {
			// 	displayKey: "lbl_BTISport",
			// 	...defGameInfo.BTISport,
			// }
		]
	},
	{
		displayKey: "lbl_Games",
		icon: "icon icon-kelo",
		subItems: [
			{
				...defGameInfo.tcg,
				displayKey: "lbl_tcg"
			},
			{
				...defGameInfo.sabaClub,
				displayKey: "lbl_Vgaming"
			},
			{
				...defGameInfo.kingMaker,
				displayKey: "lbl_KingMaker"
			},
			{
				...defGameInfo.V8Poker,
				displayKey: "lbl_V8Poker"
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
		displayKey: "lbl_Fishing",
		icon: "icon icon-game",
		subItems: [
			{
				...defGameInfo.fish_AB3,
				displayKey: "lbl_Paradise"
			},
			{
				...defGameInfo.fish_AT01,
				displayKey: "lbl_Oneshot_Fishing"
			},
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING"
			},
			{
				...defGameInfo.ICG_FISHING_OF_SAVIORS,
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS"
			},
			{
				...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS"
			},
			{
				...defGameInfo.Fishing,
				displayKey: "lbl_FishingGG"
			},
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
		...defGameInfo.eSports,
		displayKey: "lbl_eSports",
		icon: "icon icon-e-sports"
	},
	{
		displayKey: "lbl_Slots",
		path: path.casino.root,
		icon: "icon icon-casino"
	},
	{
		displayKey: "lbl_LiveCasino",
		icon: "icon icon-livecasino",
		subItems: [
			{
				...defGameInfo.LIVEcasinoPP,
				displayKey: "Pragmatic Play"
			},
			{
				...defGameInfo.LIVEcasinoN2,
				displayKey: "n2-LIVE"
			},
			{
				...defGameInfo.LIVEcasinoWM,
				displayKey: "WM Casino"
			},
			{
				...defGameInfo.LIVEcasinoDG,
				displayKey: "Dream Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAE,
				displayKey: "AE Casino"
			},
			{
				...defGameInfo.LIVEcasinoAG,
				displayKey: "Asia Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAB,
				displayKey: "Allbet"
			},
			{
				...defGameInfo.LIVEcasinoSA,
				displayKey: "SA Gaming"
			},
			{
				...defGameInfo.LIVEcasinoEB,
				displayKey: "eBET"
			}
		]
	},
	{
		displayKey: "lbl_Promotions",
		path: path.promotion.root,
		icon: "icon icon-gift"
	},
	{
		displayKey: "lbl_APPDownload",
		href: `${window.location.origin}/${path.appDownload.root}`,
		icon: "icon icon-mobile"
	},
	{
		displayKey: "lbl_VIP",
		path: path.vip.root,
		icon: "icon icon-vip"
	}
	// {
	// 	displayKey: "lbl_Ranking",
	// 	path: path.leaderBoard.root,
	// 	icon: "icon icon-icon32px_top"
	// }
];

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [isOpenSubMenu, setIsOpenSubMenu] = useState([]);

	const handleSubMenu = displayKey => {
		if (isOpenSubMenu.includes(displayKey)) {
			setIsOpenSubMenu(prevS => prevS.filter(s => s !== displayKey));
		} else {
			setIsOpenSubMenu(prevS => [...prevS, displayKey]);
		}
	};

	const closeNavPanel = () => {
		setNav(() => null);
		setIsOpenSubMenu([]);
	};

	const openPanel = nav === defNavPanel.subMenu;

	return (
		<div className={`submenuNew${openPanel ? " open" : ""}`}>
			<div className="close open" onClick={closeNavPanel}>
				<span />
				<span />
				<span />
				<span />
				<span />
				<span />
			</div>
			<img src={Logo} alt="Goal123" />
			{userInfo.isLogin ? (
				<>
					<WalletInfo i18n={i18n} userInfo={userInfo} />
					<ShortcutBar />
				</>
			) : null}
			<SubMenuList
				i18n={i18n}
				userInfo={userInfo}
				setNav={setNav}
				closeNavPanel={closeNavPanel}
				handleSubMenu={handleSubMenu}
				isOpenSubMenu={isOpenSubMenu}
			/>
			<ContactUs i18n={i18n} />
			<LangSwitch
				setPopBox={setPopBox}
				userInfo={userInfo}
				setUserInfo={setUserInfo}
			/>
		</div>
	);
};

const SubMenuList = ({
	i18n,
	userInfo,
	setNav,
	closeNavPanel,
	handleSubMenu,
	isOpenSubMenu
}) => {
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
		.filter(
			s =>
				s.subItems ||
				!isUnderMaintain({ tpId: s.tpId, tpGameType: s.tpGameType })
		)
		.map(s => {
			const key = `submenu-${s.displayKey}`;
			let hasSubItem = false;
			let _subItems = null;
			if (s.subItems) {
				const subItemContent = s.subItems
					?.filter(
						c =>
							!isUnderMaintain({
								tpId: c.tpId,
								tpGameType: c.tpGameType
							})
					)
					.map(c => {
						return (
							<li
								key={`${key}-${c.displayKey}`}
								onClick={clickGame.bind(this, c)}>
								<button>
									{i18n[c.displayKey]?.toUpperCase() ??
										c.displayKey}
									{_subItems}
								</button>
							</li>
						);
					});

				hasSubItem = subItemContent.length > 0;
				if (hasSubItem) {
					const isOpen = isOpenSubMenu.includes(s.displayKey);
					_subItems = (
						<>
							<i
								className={`icon icon-keyboard_arrow_right1${
									isOpen ? " open" : ""
								}`}
							/>
							<ul className={isOpen ? "open" : ""}>
								{subItemContent}
							</ul>
						</>
					);
				}
			}

			if (s.path) {
				return (
					<Link
						to={`/${s.path}`}
						onClick={closeNavPanel}
						key={key}
						className={s.icon}>
						{i18n[s.displayKey]?.toUpperCase() ?? s.displayKey}
						{_subItems}
					</Link>
				);
			}
			if (s.href) {
				return (
					<a
						key={key}
						className={s.icon}
						href={s.href}
						target="_blank"
						rel="noreferrer">
						{i18n[s.displayKey]?.toUpperCase() ?? s.displayKey}
					</a>
				);
			}

			return hasSubItem ? (
				<div
					key={key}
					onClick={handleSubMenu.bind(this, s.displayKey)}
					className={s.icon}>
					{i18n[s.displayKey]?.toUpperCase() ?? s.displayKey}
					{_subItems}
				</div>
			) : (
				<button
					key={key}
					onClick={clickGame.bind(this, s)}
					className={s.icon}>
					{i18n[s.displayKey]?.toUpperCase() ?? s.displayKey}
				</button>
			);
		});

	return <div className="side-nav">{rows}</div>;
};

SubMenuList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.shape({
		isLogin: PropTypes.bool,
		currencyId: PropTypes.number,
		langId: PropTypes.string
	}).isRequired,
	setNav: PropTypes.func.isRequired,
	closeNavPanel: PropTypes.func.isRequired,
	handleSubMenu: PropTypes.func.isRequired,
	isOpenSubMenu: PropTypes.arrayOf(PropTypes.string).isRequired
};

const WalletInfo = ({ i18n, userInfo }) => {
	const [showingBalance, setShowingBalance] = useState(true);
	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});

	const otherWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);
	const allWalletBalance = mainWalletInfo.balance + otherWalletBalance;

	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, false);

	const clickReloadSpin = () => {
		GetBalance();
		GetTpWalletList({ langId: userInfo.langId });
	};

	const clickEye = () => {
		setShowingBalance(prev => !prev);
	};

	return (
		<div className="side-info">
			<div>
				{i18n.lbl_Welcome} {userInfo.userName}
			</div>
			<div>
				<span>{i18n.lbl_Balance}</span>
				<button
					className={`icon icon-eye${
						showingBalance ? "" : "-blocked"
					}`}
					onClick={clickEye}
				/>
				{i18n[`Currency_${userInfo.currencyId}`]}{" "}
				{showingBalance ? balance : "*****"}
				<ReloadSpin func={clickReloadSpin} />
			</div>
		</div>
	);
};

WalletInfo.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.shape({
		isLogin: PropTypes.bool,
		currencyId: PropTypes.number,
		langId: PropTypes.string,
		userName: PropTypes.string
	}).isRequired
};

const ContactUs = ({ i18n }) => {
	return (
		<div className="contact">
			<div>{i18n.lbl_ContactUs.toUpperCase()}</div>
			<a
				href="skype:live:.cid.d357533c71e50fb5?chat"
				target="_blank"
				rel="noreferrer noopener">
				<img src={Skype} alt="skype" />
			</a>
			<a
				href="https://t.me/Goal123csd"
				target="_blank"
				rel="noreferrer noopener">
				<img src={Telegram} alt="telegram" />
			</a>
			<a
				href="https://zalo.me/Goal123csd"
				target="_blank"
				rel="noreferrer noopener">
				<img src={Zalo} alt="zalo" />
			</a>
		</div>
	);
};

ContactUs.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

const languageList = () => {
	const _siteInfo = siteInfo();
	return _siteInfo.siteLangList.map(l => DefLangs[l]);
};

const LangSwitch = ({ setPopBox, userInfo, setUserInfo }) => {
	const [userLanguage, setUserLanguage] = useState("vn");
	const isMountedRef = useRef(null);
	const _languageList = languageList();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.langId && isMountedRef.current) {
			setUserLanguage(() => {
				return _languageList.find(l => l.value === userInfo.langId) ===
					undefined
					? "en"
					: userInfo.langId;
			});
		}
	}, [userInfo.langId, _languageList]);

	const selectLanguage = language => {
		if (userLanguage !== language) {
			const langId = language;
			setUserLanguage(language);

			if (userInfo.isLogin) {
				api_SetLanguage(langId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								setUserInfo(prevState => ({
									...prevState,
									langId
								}));
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: res.data.message
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			} else {
				setUserInfo(prevState => ({
					...prevState,
					langId
				}));
			}
		}
	};

	return (
		<div className="language">
			<div
				className={userInfo.langId === "en" ? "open" : ""}
				onClick={selectLanguage.bind(this, "en")}>
				<img src={Lang_en} alt="English" />
				English
			</div>
			<div
				className={userInfo.langId === "vn" ? "open" : ""}
				onClick={selectLanguage.bind(this, "vn")}>
				<img src={Lang_vn} alt="Tiếng Việt" />
				Tiếng Việt
			</div>
		</div>
	);
};

LangSwitch.propTypes = {
	setPopBox: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setUserInfo: PropTypes.func.isRequired
};
