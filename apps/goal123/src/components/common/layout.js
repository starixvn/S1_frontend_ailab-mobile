import React, { useContext, Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMatch, Link } from "@reach/router";
import Footer from "./footer";
import Header from "./header";
import {
	navContext,
	i18nContext,
	defNavPanel,
	loadingContext,
	rootContext,
	userInfoContext
} from "./context";
import path from "../../path";
import Loading from "./loading";
import { isEventPeriod } from "./common";
import MysteryBox from "../mysteryBox/homePopBox";
import { eventTime } from "./eventTime";
import LuckyWheel from "../luckyWheel/homePopBox";
import GoTopBtn from "./goTopBtn";

// const defPageInfo = {
// 	leaderBoard: {
// 		titleKey: "lbl_Ranking",
// 		className: "main ranking",
// 		hideLogo: true
// 	},
// };

const Layout = ({
	children,
	header,
	mainClass = "main",
	title,
	appHint,
	goTopBtn
}) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { root } = useContext(rootContext);

	const [luckyWheel, setLuckyWheel] = useState(false);

	const _matchLogin = useMatch(`/${path.login.root}`) !== null;
	const position =
		nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join
			? { position: "fixed" }
			: {};

	useEffect(() => {
		if (root) {
			setLuckyWheel(true);
		}
	}, [root]);

	return (
		<>
			<RotationHint i18n={i18n} />
			{header ?? <Header title={title} hideLogo={true} />}
			<main
				style={position}
				className={`${mainClass ?? ""}${
					appHint ? " openAppDownload" : ""
				}`}>
				{children}
				{loading ? <Loading /> : null}
			</main>
			{isEventPeriod(eventTime.mysteryBox) && root && (
				<MysteryBox userInfo={userInfo} />
			)}
			{isEventPeriod(eventTime.luckyWheel) && root && luckyWheel ? (
				<LuckyWheel userInfo={userInfo} setLuckyWheel={setLuckyWheel} />
			) : null}
			<Footer />
			{goTopBtn && <GoTopBtn />}
		</>
	);
};

Layout.defaultProps = {
	goTopBtn: true
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	goTopBtn: PropTypes.bool
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

RotationHint.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Layout;
