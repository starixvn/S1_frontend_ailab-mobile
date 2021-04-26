import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "@reach/router";
import {
	userInfoContext,
	i18nContext,
	msgCountContext,
	defNavPanel,
	navContext
} from "./context";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";
import path from "../../path";
import Logo from "./logo";
import vipClub1 from "../../styles/img/vip/vip1.png";
import vipClub2 from "../../styles/img/vip/vip2.png";
import vipClub3 from "../../styles/img/vip/vip3.png";
import vipClub4 from "../../styles/img/vip/vip4.png";
import vipClub5 from "../../styles/img/vip/vip5.png";
import vipClub6 from "../../styles/img/vip/vip6.png";
import AppDownloadHint from "../home/appDownload";

const HeaderTitle = ({ title }) => (
	<>
		<div className="title">{title}</div>
		<LoginPanel hideBtn={true} />
		<JoinPanel hideBtn={true} />
	</>
);

HeaderTitle.propTypes = {
	title: PropTypes.string.isRequired
};

const Header = ({ title, hideLogo, showingAppHint, setAppHint }) => {
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const showSubMenu = () => {
		setNav(defNavPanel.subMenu);
	};

	return (
		<header className={title ? "header" : ""} id="header">
			{showingAppHint ? (
				<AppDownloadHint
					i18n={i18n}
					cookieName={`appDownloadHint${userInfo.userName}`}
					langId={userInfo.langId}
					setAppHint={setAppHint}
				/>
			) : null}
			<div>
				{hideLogo ? null : (
					<>
						<div className="menuBtnNew">
							<button onClick={showSubMenu}>
								<span>≡</span>
							</button>
						</div>
						<a href="/" className="logo">
							<Logo />
						</a>
					</>
				)}
				{title ? <HeaderTitle title={title} /> : <HeaderBtn />}
			</div>
		</header>
	);
};

Header.defaultProps = {
	hideLogo: null,
	showingAppHint: false,
	setAppHint: () => null
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	hideLogo: PropTypes.bool,
	showingAppHint: PropTypes.bool,
	setAppHint: PropTypes.func
};

const HeaderBtn = () => {
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
				medalImg = vipClub2;
				break;
			case 3:
				medalImg = vipClub3;
				break;
			case 4:
				medalImg = vipClub4;
				break;
			case 5:
				medalImg = vipClub5;
				break;
			case 6:
				medalImg = vipClub6;
				break;
			default:
				medalImg = vipClub1;
				break;
		}
		display = (
			<div className="headerBtnIn open">
				<img src={medalImg} alt={`VIP level${userInfo.userLevel}`} />
				<p onClick={ClickUserName}>{userInfo.userName}</p>
				<div className="headerButton">
					<Link
						to={path.message.root}
						className="icon icon-email active">
						{msgCount ? (
							<span className="amount">{msgCount}</span>
						) : null}
					</Link>
				</div>
			</div>
		);
	} else {
		display = (
			<div className="headerBtnOut open">
				<JoinPanel />
				<LoginPanel ButtonTitle={i18n.lbl_Login.toUpperCase()} />
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
