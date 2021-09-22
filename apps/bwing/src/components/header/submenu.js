import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import Logo from "../img/logo";
import {
	userInfoContext,
	i18nContext,
	navContext,
	defNavPanel,
	popBoxContext
} from "../common/context";
import path from "../../path";
// import ReloadSpin from "../common/reloadSpin";
import { defGameInfo } from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import ShortcutBar from "./shortcutBar";
import LangDropdown from "../common/dropdown.language";
import { siteInfo } from "../../config";
import { api_SetLanguage } from "../../service/api/account";
import { useGetBalance } from "./hook";
import { isEventPeriod } from "../common/common";

const defSubMenus = langId => [
	{
		displayKey: "lbl_Sports",
		path: `/${path.sports.root}`
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
		displayKey: "lbl_APP_DOWNLOAD",
		path: `/${path.appDownload.root}`
	},
	{
		displayKey: "lbl_Affiliates",
		href: siteInfo(langId).affiliateLink
	},
	{
		displayKey: "lbl_Other",
		path: `/${path.other.root}`
	}
];

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const [isOpenSubMenu, setIsOpenSubMenu] = useState([]);
	const { setPopBox } = useContext(popBoxContext);

	const { allBalance } = useGetBalance({
		isLogin: userInfo.isLogin,
		i18n,
		setPopBox
	});

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

	const SetLanguage = async langId => {
		if (langId !== userInfo.langId) {
			if (userInfo.isLogin) {
				try {
					await api_SetLanguage(langId);
				} catch (error) {
					//
				}
			}

			setUserInfo(prev => ({ ...prev, langId }));
		}
	};

	const openPanel = nav === defNavPanel.subMenu;

	return (
		<div className={`menu${openPanel ? " active" : ""}`}>
			<button onClick={closeNavPanel} className="icon icon-close" />

			<div className="menuTop">
				<div className="menuBtn open">
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
				<Logo />
			</div>

			<div className="menuContent">
				<div className="userText">
					<span>{i18n.lbl_Welcome} </span>
					<span>{userInfo.isLogin ? userInfo.userName : ""}</span>
				</div>
				{userInfo.isLogin ? (
					<div className="icon icon-wallteIcon" href="">
						<span>{i18n[`Currency_${userInfo.currencyId}`]} </span>
						<span>{allBalance}</span>
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

	const openLink = href => {
		window.open(href, "_blank");
	};

	const rows = defSubMenus(userInfo.langId)
		?.filter(s => !s.eventPeriod || isEventPeriod({ ...s.eventPeriod }))
		.map(s => {
			const key = `submenu-${s.displayKey}`;
			let hasSubItem = false;
			let _subItems = null;

			if (s.subItems) {
				const subItemContent = s.subItems?.map(c => {
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
					const isOpen = isOpenSubMenu.includes(s.displayKey);
					_subItems = (
						<>
							<div
								className={`menuNavText${
									isOpen ? " open" : ""
								}`}>
								{i18n[s.displayKey].toUpperCase() ??
									s.displayKey.toUpperCase()}
								<i
									onClick={handleSubMenu.bind(
										this,
										s.displayKey
									)}
									className={`icon icon-arrow_drop_down${
										isOpen ? " open" : ""
									}`}
								/>
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
			}
			if (s.href) {
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
			}
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
		});

	return <div className="menuNav">{rows}</div>;
};
