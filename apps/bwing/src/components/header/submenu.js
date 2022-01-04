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
// import ReloadSpin from "../common/reloadSpin";
import { defSubMenus } from "../../datas/defMenu";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import ShortcutBar from "./shortcutBar";
import LangDropdown from "../common/dropdown.language";
import { api_SetLanguage } from "../../service/api/account";
import { useGetBalance } from "./hook";

export default ({ handleSideMenuPanel, isOpenSideMenu }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const [isOpenSubMenu, setIsOpenSubMenu] = useState([]);
	const { setPopBox } = useContext(popBoxContext);
	const { maintainList } = useGetTpMaintainList();
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
		handleSideMenuPanel(false);
		setIsOpenSubMenu([]);
	};

	const SetLanguage = async langId => {
		if (langId !== userInfo.langId) {
			if (userInfo.isLogin) {
				try {
					await api_SetLanguage(langId);
				} catch (error) {
					console.error(error);
				}
			}

			setUserInfo(prev => ({ ...prev, langId }));
		}
	};

	return (
		<div className={`menu${isOpenSideMenu ? " active" : ""}`}>
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

			{userInfo.isLogin && (
				<ShortcutBar closeSubMenu={() => handleSideMenuPanel(false)} />
			)}
			<SubMenuList
				i18n={i18n}
				userInfo={userInfo}
				setNav={setNav}
				closeNavPanel={closeNavPanel}
				handleSubMenu={handleSubMenu}
				isOpenSubMenu={isOpenSubMenu}
				maintainList={maintainList}
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
	isOpenSubMenu,
	maintainList
}) => {
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
	const openLink = href => {
		window.open(href, "_blank");
	};
	const rows = defSubMenus()
		?.filter(
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
								onClick={() =>
									clickGame({
										tpId: c.tpId,
										gameId: c.gameId,
										userInfo,
										tpGameType: c.tpGameType
									})
								}>
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
						{i18n[s.displayKey]?.toUpperCase() ??
							s.displayKey?.toUpperCase()}
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
							{i18n[s.displayKey]?.toUpperCase() ??
								s.displayKey?.toUpperCase()}
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
					{i18n[s.displayKey]?.toUpperCase() ??
						s.displayKey?.toUpperCase()}
				</button>
			);
		});

	return <div className="menuNav">{rows}</div>;
};
