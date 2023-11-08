import React, { useContext, Component, useEffect } from "react";
import PropTypes from "prop-types";
import { isDateRange } from "@ailab-mobile/common";
import { AngpaoFloatLink } from "@ailab-mobile/components";
import { useMatch, useNavigate } from "@reach/router";
import { Footer } from "./footer";
import Header from "../header/header";
import {
	navContext,
	i18nContext,
	defNavPanel,
	loadingContext,
	userInfoContext,
	rootContext
} from "./context";
import path from "../../path";
import Loading from "./loading";
import { isEventPeriod, readCookie } from "./common";
import { LuckyWheelPop } from "../../pages/luckyWheel";
import { MysteryBoxPop } from "../../pages/mysteryBox";

import Modal from "../join/modal";
import GoTopBtn from "./goTopBtn";
import { eventTime } from "./eventTime";
import { angpaoAllowedCurrencies, angPaoEventPeriod } from "../../pages/angpao";

const Layout = ({ children, header, mainClass, goTopBtn, noHeader }) => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	const { root } = useContext(rootContext);
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);

	const _matchLogin =
		useMatch(`/${userInfo.langId}/${path.login.root}`) !== null;
	const isJoinPage =
		useMatch(`/${userInfo.langId}/${path.join.root}`) !== null;
	const isLoginPage =
		useMatch(`/${userInfo.langId}/${path.login.root}`) !== null;

	if (isLoginPage && userInfo.isLogin) {
		navigate(`/${userInfo.langId}`);
	}

	const position =
		nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join
			? { position: "fixed" }
			: {};

	const _mainClass = mainClass ?? "";

	let showHeader = noHeader ? null : header;
	if (!header && !noHeader) showHeader = <Header title="" hideLogo={true} />;

	useEffect(() => {
		if (userInfo.isLogin && userInfo.isResetPwd) {
			navigate(`/${userInfo.langId}/${path.changePassword.root}`);
		}
	}, [window.location.pathname, userInfo.isResetPwd]);

	return (
		<>
			<RotationHint i18n={i18n} />
			{showHeader}
			<main
				style={position}
				className={`${_mainClass} ${
					readCookie("AppDownloadHint") !== "1" && root
						? "active"
						: ""
				}`}>
				{children}
				{loading ? <Loading /> : null}
			</main>

			{/* 僅限過年期間不顯示 */}
			{isEventPeriod(eventTime.luckyWheel) &&
			!isDateRange(angPaoEventPeriod) ? (
				<LuckyWheelPop />
			) : null}

			{/* 僅限過年期間顯示且只支援部分幣別 */}
			{isDateRange(angPaoEventPeriod) &&
				angpaoAllowedCurrencies.includes(userInfo.currencyId) &&
				root && <AngpaoFloatLink />}

			{isEventPeriod(eventTime.mysteryBox) ? <MysteryBoxPop /> : null}
			<Footer />
			{(isJoinPage || isLoginPage) && (
				<Modal isJoin={isJoinPage} isLogin={isLoginPage} />
			)}
			{goTopBtn && <GoTopBtn />}
		</>
	);
};

class RotationHint extends Component {
	constructor(props) {
		super(props);
		this.state = { rotateClass: this.rotationChange() };
		window.removeEventListener("orientationchange", this.OnRotate);
	}

	componentDidMount() {
		window.addEventListener("orientationchange", this.OnRotate);
	}

	rotationChange = () => {
		switch (window.orientation) {
			case 0:
				return "";
			case -90:
				return "in right";
			case 90:
				return "in";
			case 180:
				return "";
			default:
				return "";
		}
	};

	OnRotate = () => {
		const rotateClass = this.rotationChange();
		this.setState({ rotateClass });
	};

	render() {
		return (
			<div
				className={`Straight-lock${
					this.state.rotateClass ? ` ${this.state.rotateClass}` : ""
				}`}>
				<div className="icon icon-mobile img-rotate">
					<i className="icon icon-spinner11" />
				</div>
				<div className="text">
					{this.props.i18n.lbl_RotationHint_1}
					<br />
					{this.props.i18n.lbl_RotationHint_2}
					<br />
					<span className="text-org">
						{this.props.i18n.lbl_RotationHint_3}
					</span>
					<br />
					{this.props.i18n.lbl_RotationHint_4}
				</div>
			</div>
		);
	}
}

Layout.defaultProps = {
	children: null,
	header: null,
	mainClass: null,
	goTopBtn: true,
	noHeader: false
};

Layout.propTypes = {
	children: PropTypes.node,
	header: PropTypes.node,
	mainClass: PropTypes.string,
	goTopBtn: PropTypes.bool,
	noHeader: PropTypes.bool
};

RotationHint.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Layout;
