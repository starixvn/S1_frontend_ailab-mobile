import React, { useContext, useEffect, useRef } from "react";
import { Link } from "@reach/router";
import {
	userInfoContext,
	i18nContext,
	walletInfoContext,
	popBoxContext,
	defNavPanel,
	navContext
} from "../common/context";
import { api_GetWalletInfo } from "../../service/api/account";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";
import { number_format } from "../common/common";
import path from "../../path";
import Logo from "../../styles/img/logo.png";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import Menu from "./header.menu";
import SubMenu from "./submenu";
import { LOGOUT } from "../../service/auth";

const useGetBalance = ({ isLogin }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isLogin) {
			api_GetWalletInfo().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							let _data = res.data.data;
							let mainWalletBalance = _data.balance;

							let otherWalletBalance = _data.tpWallets?.reduce(
								(prev, curr) => {
									return prev + curr.balance;
								},
								0
							);

							setWalletInfo(prevState => ({
								...prevState,
								allBalance:
									mainWalletBalance + otherWalletBalance
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
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [isLogin, setPopBox, setWalletInfo]);

	return { walletInfo };
};

export default ({ hideLogo, title, showMenuBar }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { walletInfo } = useGetBalance(userInfo);

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
			<img src={Logo} alt="logo" />
		</Link>
	);

	return userInfo.isLogin === null ? null : (
		<header id="header">
			<div className="headerT">
				<div className="headerTLogout">
					<div className="close noPos" onClick={onClickSubMenu}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					{headerTitleBar}
					{userInfo.isLogin === true ? (
						<button
							className="icon icon-exit"
							onClick={handleLogout}></button>
					) : (
						<BeforeLogin i18n={i18n} />
					)}
				</div>
				<AfterLogin
					isShow={userInfo.isLogin === true && !hideLogo}
					i18n={i18n}
					currencyId={userInfo.currencyId}
					userName={userInfo.userName}
					allBalance={
						!walletInfo.allBalance
							? 0
							: number_format(walletInfo.allBalance, false)
					}
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
