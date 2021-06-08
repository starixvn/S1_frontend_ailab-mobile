import React, { useContext } from "react";
import { Link } from "@reach/router";
import {
	userInfoContext,
	i18nContext,
	popBoxContext,
	defNavPanel,
	navContext,
	rootContext
} from "../common/context";
// import JoinPanel from "../join/join";
import JoinPanel from "../join/join.refactor";
import LoginPanel from "../login/login";
import path from "../../path";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import Menu from "./header.menu";
import SubMenu from "./submenu";
import { LOGOUT } from "../../service/auth";
import Logo from "../img/logo";
import { useGetBalance } from "./hook";
import AppDownloadHint from "./appDownloadHint";

export default ({ hideLogo, title, showMenuBar }) => {
	const { i18n } = useContext(i18nContext);
	const { root } = useContext(rootContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const { allBalance } = useGetBalance({
		isLogin: userInfo.isLogin,
		i18n,
		setPopBox
	});
	const OnClickProduct = ({ tpId, gameId, langId, isLogin }) => {
		return GET_ENTER_PAGE({
			langId,
			tpId,
			gameId,
			isLogin: isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	const onClickSubMenu = () => {
		setNav(() => defNavPanel.subMenu);
	};

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
		});
	};

	const menu = showMenuBar ? (
		<Menu i18n={i18n} OnClickProduct={OnClickProduct} userInfo={userInfo} />
	) : null;

	const headerTitleBar = hideLogo ? (
		<div className="title">{title}</div>
	) : (
		<Link to="/">
			<Logo />
		</Link>
	);

	return userInfo.isLogin === null ? null : (
		<header id="header">
			<AppDownloadHint i18n={i18n} root={root} />
			<div className="headerT">
				<div className="headerTLogout">
					<div className="close noPos" onClick={onClickSubMenu}>
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
					{headerTitleBar}
					{userInfo.isLogin === true ? (
						<button
							className="icon icon-exit"
							onClick={handleLogout}
						/>
					) : (
						<BeforeLogin i18n={i18n} />
					)}
				</div>
				<AfterLogin
					isShow={userInfo.isLogin === true && !hideLogo}
					i18n={i18n}
					currencyId={userInfo.currencyId}
					userName={userInfo.userName}
					allBalance={allBalance}
				/>
			</div>
			{menu}
			<SubMenu />
		</header>
	);
};

const BeforeLogin = ({ i18n }) => (
	<div className="headerButton">
		<LoginPanel ButtonTitle={i18n.lbl_Login.toUpperCase()} />
		<JoinPanel />
	</div>
);

const AfterLogin = ({ i18n, currencyId, userName, allBalance, isShow }) =>
	isShow ? (
		<div className="headerTLogin">
			<div className="login">
				<Link to={`/${path.deposit.root}`} className="login-btn">
					{i18n.lbl_Deposit.toUpperCase()}
				</Link>
				<button className="icon icon-wallteIcon">
					<span>{i18n[`Currency_${currencyId}`]} </span>
					<span>{allBalance}</span>
				</button>
				<Link
					to={`/${path.member.root}`}
					className="icon icon-userIcon2">
					<span>{userName}</span>
				</Link>
				<Link
					to={`/${path.message.root}`}
					className="icon icon-mailIcon"
				/>
			</div>
		</div>
	) : null;
