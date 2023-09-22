import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import classNames from "classnames";
import {
	userInfoContext,
	i18nContext,
	popBoxContext,
	navContext,
	rootContext
} from "../common/context";
import path from "../../path";
import SubMenu from "./submenu";
import { LOGOUT } from "../../service/auth";
import Logo from "../img/logo";
import { useGetBalance } from "./hook";
import AppDownloadHint from "./appDownloadHint";
import { bannerImgUrl } from "../../config";
import MsgPopup from "./msgPopup";

const Header = ({ hideLogo, title, appHint, setAppHint }) => {
	const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
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

	const handleSideMenuPanel = isOpen => {
		setIsOpenSideMenu(isOpen);
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

	const vipImg = [
		`${bannerImgUrl}/h5/img/vip/vip1.png`,
		`${bannerImgUrl}/h5/img/vip/vip2.png`,
		`${bannerImgUrl}/h5/img/vip/vip3.png`,
		`${bannerImgUrl}/h5/img/vip/vip4.png`,
		`${bannerImgUrl}/h5/img/vip/vip5.png`,
		`${bannerImgUrl}/h5/img/vip/vip6.png`
	];

	return (
		<header id="header">
			<AppDownloadHint
				i18n={i18n}
				root={root}
				appHint={appHint}
				setAppHint={setAppHint}
			/>
			<div className="headerT">
				<BeforeLogin
					onClickSubMenu={() => handleSideMenuPanel(true)}
					isShow={userInfo.isLogin === false}
					title={title}
					hideLogo={hideLogo}
				/>
				<AfterLogin
					onClickSubMenu={() => handleSideMenuPanel(true)}
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
					userInfo={userInfo}
				/>
			</div>
			<SubMenu
				handleSideMenuPanel={handleSideMenuPanel}
				isOpenSideMenu={isOpenSideMenu}
			/>
		</header>
	);
};

Header.defaultProps = {
	hideLogo: null,
	title: null,
	appHint: false,
	setAppHint: () => null
};

Header.propTypes = {
	hideLogo: PropTypes.bool,
	title: PropTypes.string,
	appHint: PropTypes.bool,
	setAppHint: PropTypes.func
};

const BeforeLogin = ({ onClickSubMenu, isShow, title, hideLogo }) => {
	return isShow ? (
		<div className={classNames("headerTLogout")}>
			<div className="close noPos" onClick={onClickSubMenu}>
				<span />
				<span />
				<span />
				<span />
				<span />
				<span />
			</div>
			{title && <div className="heardTitle">{title}</div>}
			{!hideLogo && (
				<a href="/">
					<Logo />
				</a>
			)}
		</div>
	) : null;
};

BeforeLogin.defaultProps = {
	hideLogo: null,
	title: null,
	isShow: null,
	onClickSubMenu: () => null
};

BeforeLogin.propTypes = {
	hideLogo: PropTypes.bool,
	title: PropTypes.string,
	isShow: PropTypes.bool,
	onClickSubMenu: PropTypes.func
};

const AfterLogin = ({
	onClickSubMenu,
	isShow,
	i18n,
	currencyId,
	userName,
	userLevel,
	allBalance,
	handleLogout,
	hideLogo,
	title,
	vipImg,
	userInfo
}) => {
	return (
		isShow && (
			<>
				<div className={classNames("headerTLogout")}>
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
						<a href="/">
							<Logo />
						</a>
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
								{userLevel >= 0 && (
									<img
										src={vipImg[userLevel - 1]}
										alt="bwing_vip"
									/>
								)}
								<span>{userName}</span>
							</Link>
							<Link
								to={`/${path.message.root}`}
								className="icon icon-mailIcon">
								<MsgPopup userInfo={userInfo} />
							</Link>
						</div>
					</div>
				)}
			</>
		)
	);
};

AfterLogin.defaultProps = {
	hideLogo: null,
	title: null,
	isShow: null,
	onClickSubMenu: () => null,
	i18n: null,
	currencyId: null,
	userName: null,
	userLevel: null,
	allBalance: null,
	handleLogout: () => null,
	vipImg: null,
	userInfo: null
};

AfterLogin.propTypes = {
	hideLogo: PropTypes.bool,
	title: PropTypes.string,
	isShow: PropTypes.bool,
	onClickSubMenu: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string),
	currencyId: PropTypes.number,
	userName: PropTypes.string,
	userLevel: PropTypes.number,
	allBalance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleLogout: PropTypes.func,
	vipImg: PropTypes.arrayOf(PropTypes.string),
	userInfo: PropTypes.objectOf(PropTypes.any)
};

export default Header;
