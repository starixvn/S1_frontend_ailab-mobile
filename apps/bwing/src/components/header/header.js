import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	msgCountContext
} from "../common/context";
import path from "../../path";
import SubMenu from "./submenu";
import Logo from "../img/logo";
import { useGetBalance } from "./hook";
// import AppDownloadHint from "./appDownloadHint";
import { bannerImgUrl } from "../../config";
import MsgPopup from "./msgPopup";

const vipImg = [
	`${bannerImgUrl}/h5/img/4.0/vip/vip1.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip2.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip3.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip4.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip5.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip6.png`
];

const Header = ({ hideLogo, title, appHint, setAppHint, iconClassName }) => {
	const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

	const { userInfo } = useContext(userInfoContext);

	const handleSideMenuPanel = isOpen => {
		setIsOpenSideMenu(isOpen);
	};

	return (
		<header>
			{/* <AppDownloadHint
				i18n={i18n}
				root={root}
				appHint={appHint}
				setAppHint={setAppHint}
			/> */}
			<div className="header">
				<div className="header-content">
					<button
						className="menubtn icon-menu"
						onClick={() => handleSideMenuPanel(true)}
					/>
					{title && (
						<div className="header-title">
							{iconClassName && <i className={iconClassName} />}
							{title}
						</div>
					)}
					{!hideLogo && !title && (
						<a href="/" className="logo">
							<Logo />
						</a>
					)}
				</div>
				<AfterLogin
					hideLogo={hideLogo}
					isShow={userInfo.isLogin === true}
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
	iconClassName: null,
	appHint: false,
	setAppHint: () => null
};

Header.propTypes = {
	hideLogo: PropTypes.bool,
	title: PropTypes.string,
	appHint: PropTypes.bool,
	setAppHint: PropTypes.func,
	iconClassName: PropTypes.string
};

const AfterLogin = ({ isShow, hideLogo }) => {
	const { i18n } = useContext(i18nContext);
	const { msgCount } = useContext(msgCountContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [showBalance, setShowBalance] = useState(true);

	const { userName, userLevel, currencyId } = userInfo;

	const { allBalance } = useGetBalance({
		i18n,
		isLogin: userInfo.isLogin,
		setPopBox
	});

	const isOnHomePage = window.location.pathname === "/";

	return (
		isShow &&
		!hideLogo &&
		isOnHomePage && (
			<div className="header-memberinfo">
				<div>
					<Link to={`/${path.member.root}`} className="memberbtn">
						<img src={vipImg[userLevel - 1]} alt="bwing_vip" />
						<span>{userName}</span>
					</Link>
					<Link
						className="messagebtn icon-message"
						to={`/${path.message.root}`}>
						{msgCount && <div className="number">{msgCount}</div>}
						<MsgPopup userInfo={userInfo} />
					</Link>
				</div>
				<a className="walletbtn icon-wallet">
					<span>{i18n[`Currency_${currencyId}`]}</span>
					<span>{showBalance ? allBalance : "*****"}</span>
					{showBalance ? (
						<button
							type="button"
							className="icon-visible"
							onClick={() => setShowBalance(!showBalance)}
						/>
					) : (
						<button
							type="button"
							className="icon-unvisible"
							onClick={() => setShowBalance(!showBalance)}
						/>
					)}
				</a>
			</div>
		)
	);
};

AfterLogin.defaultProps = {
	isShow: null,
	hideLogo: null
};

AfterLogin.propTypes = {
	isShow: PropTypes.bool,
	hideLogo: PropTypes.bool
};

export default Header;
