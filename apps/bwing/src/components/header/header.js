import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "@reach/router";
import {
	userInfoContext,
	i18nContext,
	popBoxContext,
	defNavPanel,
	navContext
} from "../common/context";
import {
	api_GetBalnace,
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance
} from "../../service/api/account";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";
import { number_format } from "../common/common";
import path from "../../path";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import Menu from "./header.menu";
import SubMenu from "./submenu";
import { LOGOUT } from "../../service/auth";
import Logo from "../img/logo";
import { tpWalletsListType } from "../transfer/transfer";

export const useGetBalance = ({ isLogin, i18n, setPopBox }) => {
	const [mainWalletBalance, setMainWalletBalance] = useState(0);
	const [tpWalletsList, setTpWalletsList] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isLogin) {
			GetBalance();
		}
	}, [isLogin]);

	const GetBalance = () => {
		api_GetBalnace().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setMainWalletBalance(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
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

		api_account_GetTpWalletList({
			ListType: tpWalletsListType.allWallets
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						res.data.data?.forEach(i => {
							api_account_GetTpWalletBalance({
								TpId: i.tpId
							}).then(
								res => {
									if (res.data.errorCode === 0) {
										let data = res.data.data;
										let tpWalletData = {
											id: data.tpId,
											balance: data.balance
										};

										let tpWalletIdx = tpWalletsList.findIndex(
											wallet => wallet.id === i.tpId
										);

										if (tpWalletIdx !== -1) {
											setTpWalletsList(prev => {
												prev[
													tpWalletIdx
												] = tpWalletData;
												return prev;
											});
										} else {
											setTpWalletsList(prev => [
												...prev,
												tpWalletData
											]);
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
						});
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
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
	};

	let otherWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);
	let allWalletBalance = mainWalletBalance + otherWalletBalance;

	let allBalance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, false);

	return { allBalance };
};

export default ({ hideLogo, title, showMenuBar }) => {
	const { i18n } = useContext(i18nContext);
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
