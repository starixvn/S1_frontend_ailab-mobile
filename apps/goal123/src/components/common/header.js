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

const Header = ({ title, hideLogo }) => {
	const { setNav } = useContext(navContext);
	const showSubMenu = () => {
		setNav(defNavPanel.subMenu);
	};

	return (
		<header className={title ? "header" : ""} id="header">
			{hideLogo ? null : (
				<>
					<div className="menuBtnNew">
						<button onClick={showSubMenu}>
							<span>≡</span>
						</button>
					</div>
					<a href="/">
						<Logo />
					</a>
				</>
			)}
			{title ? <HeaderTitle title={title} /> : <HeaderBtn />}
		</header>
	);
};

Header.defaultProps = {
	hideLogo: null
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	hideLogo: PropTypes.bool
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
		display = (
			<>
				<HeaderInfo
					userName={userInfo?.userName}
					currency={i18n[`Currency_${userInfo.currencyId}`]}
					ClickUserName={ClickUserName}
				/>
				<div className="headerButton">
					<Link to={path.message.root} className="icon icon-chat">
						{msgCount ? (
							<span className="amount">{msgCount}</span>
						) : null}
					</Link>
				</div>
			</>
		);
	} else {
		display = (
			<div className="headerButton">
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
