import React, { useContext, Component } from "react";
import PropTypes from "prop-types";
import { useMatch, useNavigate } from "@reach/router";
import Footer from "./footer";
import Header from "../header/header";
import {
	navContext,
	i18nContext,
	defNavPanel,
	loadingContext,
	userInfoContext
} from "./context";
import path from "../../path";
import Loading from "./loading";
import { isEventPeriod } from "./common";
import { LuckyWheelPop } from "../../pages/luckyWheel";
import Modal from "../join/modal";
import GotopBtn from "./goTopBtn";
import { eventTime } from "./eventTime";

const Layout = ({ children, header, mainClass }) => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);

	const _matchLogin =
		useMatch(`/${userInfo.langId}/${path.login.root}`) !== null;
	const isJoinPage =
		useMatch(`/${userInfo.langId}/${path.join.root}`) !== null;
	const isLoginPage =
		useMatch(`/${userInfo.langId}/${path.login.root}`) !== null;

	if ((isJoinPage || isLoginPage) && userInfo.isLogin) {
		navigate(`/${userInfo.langId}`);
	}

	const position =
		nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join
			? { position: "fixed" }
			: {};

	const _mainClass = mainClass ?? "";
	return (
		<>
			<RotationHint i18n={i18n} />
			{header ?? <Header title="" hideLogo={true} />}
			<main style={position} className={_mainClass}>
				{children}
				{loading ? <Loading /> : null}
			</main>
			{isEventPeriod(eventTime.luckyWheel) ? <LuckyWheelPop /> : null}
			<Footer />
			{userInfo.isLogin === false && (isJoinPage || isLoginPage) && (
				<Modal isJoin={isJoinPage} isLogin={isLoginPage} />
			)}
			{useMatch(`/${userInfo.langId}/${path.promotion.root}`) && (
				<GotopBtn />
			)}
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
	mainClass: null
};

Layout.propTypes = {
	children: PropTypes.node,
	header: PropTypes.node,
	mainClass: PropTypes.string
};

RotationHint.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Layout;
