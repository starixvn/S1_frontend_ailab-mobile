import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect, Link, useNavigate } from "@reach/router";
import classNames from "classnames";
import { isDateRange } from "@ailab-mobile/common";
import {
	userInfoContext,
	i18nContext,
	msgCountContext,
	navContext,
	defNavPanel,
	rootContext
} from "./context";
import path from "../../path";
import Logo from "./logo";
import AppDownloadHint from "../home/appDownload";
import { bannerImgUrl } from "../../config";
import MsgPopup from "./msgPopup";
import { eventTime } from "./eventTime";

const Header = ({ title, hideLogo, showingAppHint, setAppHint }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { root } = useContext(rootContext);
	const navigate = useNavigate();

	return (
		<header className={title ? "header" : ""} id="header">
			{/* {showingAppHint && (* /}
			{/*	<AppDownloadHint */}
			{/*		i18n={i18n} */}
			{/*		cookieName={`appDownloadHint${userInfo.userName}`} */}
			{/*		langId={userInfo.langId} */}
			{/*		setAppHint={setAppHint} */}
			{/*	/> */}
			{/* )} */}
			<div>
				{hideLogo ? null : isDateRange(eventTime.eventCup) ? (
					<a className="logo eurocuplogo">
						<div
							onClick={() => {
								root
									? window.location.reload()
									: navigate(`/${userInfo.langId}`);
							}}>
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/goal123-logo.png`}
								alt=""
							/>
						</div>
						<div
							onClick={() => {
								navigate(
									`/${userInfo.langId}/${path.euroCup.root}`
								);
							}}>
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/euro-logo-gif.webp`}
								alt=""
							/>
						</div>
					</a>
				) : (
					<a href="/" className={classNames("logo")}>
						<Logo />
					</a>
				)}
				{title ? <div className="title">{title}</div> : <HeaderBtn />}
			</div>
		</header>
	);
};

Header.defaultProps = {
	title: null,
	hideLogo: null,
	showingAppHint: false,
	setAppHint: () => null
};

Header.propTypes = {
	title: PropTypes.string,
	hideLogo: PropTypes.bool,
	showingAppHint: PropTypes.bool,
	setAppHint: PropTypes.func
};

const HeaderBtn = () => {
	const { setNav } = useContext(navContext);
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath, setRedirectPath]);

	const ClickUserName = () => {
		if (userInfo.isLogin) {
			setRedirectPath(`/${path.member.root}`);
		}
	};

	let display = null;
	if (redirectPath !== null) {
		display = <Redirect to={redirectPath} noThrow />;
	} else if (userInfo?.isLogin) {
		let medalImg = null;
		switch (userInfo.userLevel) {
			case 2:
				medalImg = `${bannerImgUrl}/h5/img/vip/vip2.png`;
				break;
			case 3:
				medalImg = `${bannerImgUrl}/h5/img/vip/vip3.png`;
				break;
			case 4:
				medalImg = `${bannerImgUrl}/h5/img/vip/vip4.png`;
				break;
			case 5:
				medalImg = `${bannerImgUrl}/h5/img/vip/vip5.png`;
				break;
			case 6:
				medalImg = `${bannerImgUrl}/h5/img/vip/vip6.png`;
				break;
			default:
				medalImg = `${bannerImgUrl}/h5/img/vip/vip1.png`;
				break;
		}
		display = (
			<div className="headerBtnIn open">
				<img src={medalImg} alt={`VIP level${userInfo.userLevel}`} />
				<p onClick={ClickUserName}>{userInfo.userName}</p>
				<div className="headerButton">
					<Link
						to={`/${path.message.root}`}
						className="icon icon-email active">
						{msgCount ? (
							<span className="amount">{msgCount}</span>
						) : null}
					</Link>
					<MsgPopup userInfo={userInfo} />
				</div>
			</div>
		);
	} else {
		display = (
			<div className="headerBtnOut open">
				<button
					className="registerBtn"
					onClick={() => setNav(defNavPanel.join)}>
					{i18n.lbl_JoinNow.toUpperCase()}
				</button>
				<button
					className="loginBtn"
					onClick={() => setNav(defNavPanel.login)}>
					{i18n.lbl_Login.toUpperCase()}
				</button>
			</div>
		);
	}

	return display;
};

const HeaderInfo = props => {
	return (
		<div className="headerInfo">
			<div className="MemberID" onClick={props.ClickUserName}>
				{props.userName}
			</div>
		</div>
	);
};

HeaderInfo.propTypes = {
	ClickUserName: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired
};

export default Header;
