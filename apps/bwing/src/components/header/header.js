import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback
} from "react";
import { Link } from "@reach/router";
import {
	userInfoContext,
	i18nContext,
	walletInfoContext,
	popBoxContext,
	msgCountContext,
	defNavPanel,
	navContext
} from "../common/context";
import { api_GetWalletInfo } from "../../service/api/account";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";
import ReloadSpin from "../common/reloadSpin";
import { number_format } from "../common/common";
import path from "../../path";
import Logo from "../../styles/img/logo.png";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import Menu from "./header.menu";
import SubMenu from "./submenu";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);
	const [processing, setProcessing] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const GetBalance = useCallback(() => {
		if (!processing) {
			setProcessing(true);

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
						setProcessing(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);
		}
	}, []);

	useEffect(() => {
		if (userInfo.isLogin) {
			GetBalance();
		}
	}, [userInfo.isLogin, GetBalance]);

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
					<Link to="/">
						<img src={Logo} alt="logo" />
					</Link>
				</div>
				{userInfo.isLogin === true ? (
					<AfterLogin
						i18n={i18n}
						currencyId={userInfo.currencyId}
						userName={userInfo.userName}
						allBalance={
							!walletInfo.allBalance
								? 0
								: number_format(walletInfo.allBalance, false)
						}
					/>
				) : (
					<BeforeLogin i18n={i18n} />
				)}
			</div>
			<Menu
				i18n={i18n}
				OnClickProduct={OnClickProduct}
				userInfo={userInfo}
			/>
			<SubMenu />
		</header>
	);
};

const BeforeLogin = ({ i18n }) => (
	<div className="headerButton">
		<JoinPanel />
		<LoginPanel ButtonTitle={i18n.lbl_Login} />
	</div>
);

const AfterLogin = ({ i18n, currencyId, userName, allBalance }) => {
	return (
		<div className="headerTLogin">
			<div className="login">
				<Link to={`/${path.deposit.root}`} className="login-btn">
					{i18n.lbl_Deposit}
				</Link>
				<button className="icon icon-wallteIcon">
					<span>{i18n[`Currency_${currencyId}`]}</span>
					<span>{number_format(allBalance, false)}</span>
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
	);
};
