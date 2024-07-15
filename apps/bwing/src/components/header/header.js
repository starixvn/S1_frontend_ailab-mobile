import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "@reach/router";
import classNames from "classnames";
import { isDateRange } from "@ailab-mobile/common";
import {
	i18nContext,
	userInfoContext,
	msgCountContext
} from "../common/context";
import path from "../../path";
import SubMenu from "./submenu";
import Logo from "../img/logo";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import useGetBonusBalance from "../hook/useGetBonusBalance";
import { bannerImgUrl } from "../../config";
import MsgPopup from "./msgPopup";
import { tpWalletsListType } from "../transfer/transfer.def";
import { number_format } from "../common/common";
import { eventTime } from "../common/eventTime";

const vipImg = [
	`${bannerImgUrl}/h5/img/4.0/vip/vip1.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip2.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip3.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip4.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip5.png`,
	`${bannerImgUrl}/h5/img/4.0/vip/vip6.png`
];

const Header = ({ hideLogo, title, iconClassName, appHint, setAppHint }) => {
	const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { isLogin } = userInfo;

	const handleSideMenuPanel = isOpen => {
		setIsOpenSideMenu(isOpen);
	};

	return (
		<header>
			<div
				className={`${classNames("header", {
					"euro-header": isDateRange(eventTime.euroCup),
					"olympic-header": isDateRange(eventTime.olympic)
				})}`}>
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
						<a className="logo">
							<Logo />
							{/* TODO: 歐洲盃期間LOGO => 結束後可刪 */}
							{isDateRange(eventTime.euroCup) && (
								<img
									className="euro-index-logo"
									src={`${bannerImgUrl}/h5/img/event/eurocup/bwing-euro.webp`}
									alt="euro-logo-gif"
									onClick={() =>
										navigate(`/${path.euroCup.root}`)
									}
								/>
							)}

							{/* 巴黎奧運期間顯示 */}
							{isDateRange(eventTime.olympic) && (
								<img
									className="olympic-index-logo"
									src={`${bannerImgUrl}/h5/img/event/olympic/bwing-logoh5.webp`}
									alt="olympic-logo-gif"
								/>
							)}
						</a>
					)}
				</div>
				<AfterLogin hideLogo={hideLogo} isShow={isLogin === true} />
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

	const [showBalance, setShowBalance] = useState(true);

	const { userName, userLevel, currencyId, isLogin } = userInfo;

	const { mainWalletInfo } = useGetBalance({
		isLogin
	});

	const { tpWalletsList } = useGetTpBalance({
		isLogin,
		listType: tpWalletsListType.allWallets
	});
	const { bonusWallets } = useGetBonusBalance({
		isLogin
	});

	const tpWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);

	const bonusWalletsBalance = Object.values(bonusWallets).reduce(
		(prev, curr) => {
			return prev + curr.bonus;
		},
		0
	);

	const allWalletBalance =
		mainWalletInfo.balance + tpWalletBalance + bonusWalletsBalance;

	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, false);

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
						{msgCount ? (
							<div className="number">{msgCount}</div>
						) : null}
						<MsgPopup userInfo={userInfo} />
					</Link>
				</div>
				<a className="walletbtn icon-wallet">
					<span>{i18n[`Currency_${currencyId}`]}</span>
					<span>{showBalance ? balance : "*****"}</span>
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
