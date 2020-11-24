import React, { useContext, useState } from "react";
import Logo from "../../styles/img/logo.png";
import {
	userInfoContext,
	i18nContext,
	walletInfoContext,
	navContext,
	defNavPanel
} from "../common/context";
import { Link } from "@reach/router";
import path from "../../path";
// import { api_GetWalletInfo } from "../../service/api/account";
import { number_format } from "../common/common";
// import ReloadSpin from "../common/reloadSpin";
import { defGameInfo } from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import ShortcutBar from "./shortcutBar";
import LangDropdown from "../common/dropdown.language";
import { siteInfo } from "../../config";

const defSubMenus = langId => [
	{
		...defGameInfo.Sports,
		displayKey: "lbl_Sports"
	},
	// {
	// 	...defGameInfo.CockFighting,
	// 	displayKey: "lbl_CockFighting",
	// 	icon: "icon icon-cock"
	// },
	{
		displayKey: "lbl_Games",
		path: `/${path.games.root}`
	},
	{
		...defGameInfo.eSports,
		displayKey: "lbl_eSports"
	},
	{
		displayKey: "lbl_Slots",
		path: `/${path.casino.root}`
	},
	{
		displayKey: "lbl_LiveCasino",
		path: `/${path.liveCasino.root}`
	},
	{
		displayKey: "lbl_Fishing",
		path: `/${path.fishing.root}`
	},
	{
		displayKey: "lbl_Promotions",
		path: `/${path.promotion.root}`
	},
	{
		displayKey: "lbl_Affiliates",
		href: siteInfo(langId).affiliateLink
	}
];

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const { walletInfo } = useContext(walletInfoContext);
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

	const SetLanguage = langId => {
		if (langId !== userInfo.langId) {
			setUserInfo(prev => ({ ...prev, langId }));
		}
	};

	let openPanel = nav === defNavPanel.subMenu;

	return (
		<div className={`menu${openPanel ? " active" : ""}`}>
			<button
				onClick={closeNavPanel}
				className="icon icon-close"></button>

			<div className="menuTop">
				<div className="menuBtn open">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<img src={Logo} alt="Bwing" className="logoImg" />
			</div>

			<div className="menuContent">
				<div className="userText">
					<span>{i18n.lbl_Welcome} </span>
					<span>{userInfo.isLogin ? userInfo.userName : ""}</span>
				</div>
				{userInfo.isLogin ? (
					<div className="icon icon-wallteIcon" href="">
						<span>{i18n[`Currency_${userInfo.currencyId}`]} </span>
						<span>
							{!walletInfo.allBalance
								? 0
								: number_format(walletInfo.allBalance, false)}
						</span>
					</div>
				) : null}
				<LangDropdown
					onSelectItem={SetLanguage}
					mainKey="submenu-lang"
					langId={userInfo.langId}
				/>
			</div>

			{userInfo.isLogin ? <ShortcutBar /> : null}
			<SubMenuList
				i18n={i18n}
				userInfo={userInfo}
				setNav={setNav}
				closeNavPanel={closeNavPanel}
				handleSubMenu={handleSubMenu}
				isOpenSubMenu={isOpenSubMenu}
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
	const clickGame = ({ tpId, gameId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	const openLink = href => {
		window.open(href, "_blank");
	};

	let rows = defSubMenus(userInfo.langId).map(s => {
		let key = `submenu-${s.displayKey}`;
		let hasSubItem = false;
		let _subItems = null;

		if (s.subItems) {
			let subItemContent = s.subItems?.map(c => {
				return (
					<li
						key={`${key}-${c.displayKey}`}
						onClick={clickGame.bind(this, c)}>
						{i18n[c.displayKey] ?? c.displayKey}
						{_subItems}
					</li>
				);
			});

			hasSubItem = subItemContent.length > 0;
			if (hasSubItem) {
				let isOpen = isOpenSubMenu.includes(s.displayKey);
				_subItems = (
					<>
						<div className={`menuNavText${isOpen ? " open" : ""}`}>
							{i18n[s.displayKey].toUpperCase() ??
								s.displayKey.toUpperCase()}
							<i
								onClick={handleSubMenu.bind(this, s.displayKey)}
								className={`icon icon-arrow_drop_down${
									isOpen ? " open" : ""
								}`}></i>
						</div>
						<div className="menuNavOption">
							<ul>{subItemContent}</ul>
						</div>
					</>
				);
			}
		}

		if (s.path) {
			return (
				<Link
					to={s.path}
					onClick={closeNavPanel}
					key={key}
					className="menuNavTitle">
					{i18n[s.displayKey].toUpperCase() ??
						s.displayKey.toUpperCase()}
					{_subItems}
				</Link>
			);
		} else if (s.href) {
			return (
				<div
					className="menuNavTitle"
					key={key}
					onClick={openLink.bind(this, s.href)}>
					<div className="menuNavText">
						{i18n[s.displayKey].toUpperCase() ??
							s.displayKey.toUpperCase()}
					</div>
				</div>
			);
		} else {
			return hasSubItem ? (
				<div key={key} className="menuNavTitle">
					{_subItems}
				</div>
			) : (
				<button
					key={key}
					onClick={clickGame.bind(this, s)}
					className="menuNavTitle">
					{i18n[s.displayKey].toUpperCase() ??
						s.displayKey.toUpperCase()}
				</button>
			);
		}
	});

	return <div className="menuNav">{rows}</div>;
};
