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
import path from "../../path";
import SubMenu from "./submenu";
import { LOGOUT } from "../../service/auth";
import Logo from "../img/logo";
import { useGetBalance } from "./hook";
import AppDownloadHint from "./appDownloadHint";
import JoinPanel from "../join/join.refactor";
import LoginPanel from "../login/login";
import Filter from "./filter";
import vip1 from "../../styles/img/vip/vip1.png";
import vip2 from "../../styles/img/vip/vip2.png";
import vip3 from "../../styles/img/vip/vip3.png";
import vip4 from "../../styles/img/vip/vip4.png";
import vip5 from "../../styles/img/vip/vip5.png";
import vip6 from "../../styles/img/vip/vip6.png";

export default ({
	hideLogo,
	title,
	hideModal,
	selCategory,
	handleSelectCategory
}) => {
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

	const vipImg = [vip1, vip2, vip3, vip4, vip5, vip6];

	return (
		<header id="header">
			<AppDownloadHint i18n={i18n} root={root} />
			<div className="headerT">
				<BeforeLogin
					onClickSubMenu={onClickSubMenu}
					isShow={userInfo.isLogin === false}
					i18n={i18n}
					currencyId={userInfo.currencyId}
					userName={userInfo.userName}
					allBalance={allBalance}
					title={title}
					hideModal={hideModal}
					hideLogo={hideLogo}
				/>
				<AfterLogin
					onClickSubMenu={onClickSubMenu}
					isShow={userInfo.isLogin === true}
					hideLogo={hideLogo}
					i18n={i18n}
					currencyId={userInfo.currencyId}
					userName={userInfo.userName}
					userLevel={userInfo.userLevel}
					allBalance={allBalance}
					handleLogout={handleLogout}
					title={title}
					vipImg={vipImg}
				/>
			</div>
			{handleSelectCategory && (
				<Filter
					handleSelect={handleSelectCategory}
					selected={selCategory.type}
				/>
			)}
			<SubMenu />
		</header>
	);
};

const BeforeLogin = ({
	onClickSubMenu,
	isShow,
	title,
	hideModal,
	i18n,
	hideLogo
}) => {
	return isShow ? (
		<div className="headerTLogout">
			<div className="close noPos" onClick={onClickSubMenu}>
				<span />
				<span />
				<span />
				<span />
				<span />
				<span />
			</div>
			<div className="title">{title}</div>
			{!hideLogo && (
				<Link to={path.home.root}>
					<Logo />
				</Link>
			)}
			{!hideModal && (
				<div className="headerButton">
					<LoginPanel
						hideBtn={true}
						ButtonTitle={i18n.lbl_Login.toUpperCase()}
					/>
					<JoinPanel hideBtn={true} />
				</div>
			)}
		</div>
	) : null;
};

const AfterLogin = ({
	i18n,
	currencyId,
	userName,
	allBalance,
	isShow,
	onClickSubMenu,
	handleLogout,
	hideLogo,
	title,
	userLevel,
	vipImg
}) =>
	isShow ? (
		<>
			<div className="headerTLogout">
				<div className="close noPos" onClick={onClickSubMenu}>
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
				<div className="title">{title}</div>
				{!hideLogo && (
					<Link to={path.home.root}>
						<Logo />
					</Link>
				)}
				<button onClick={handleLogout} className="icon icon-exit" />
			</div>
			{!hideLogo && (
				<div className="headerTLogin">
					<div className="login">
						<Link
							to={`/${path.deposit.root}`}
							className="login-btn">
							{i18n.lbl_Deposit.toUpperCase()}
						</Link>
						<a className="icon icon-wallteIcon">
							<span>{i18n[`Currency_${currencyId}`]} </span>
							<span>{allBalance}</span>
						</a>
						<Link to={`/${path.member.root}`}>
							<img src={vipImg[userLevel - 1]} alt="bwing_vip" />
							<span>{userName}</span>
						</Link>
						<Link
							to={`/${path.message.root}`}
							className="icon icon-mailIcon"
						/>
					</div>
				</div>
			)}
		</>
	) : null;
