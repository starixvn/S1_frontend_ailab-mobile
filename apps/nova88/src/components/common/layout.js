import React, { useContext, Component } from "react";
import PropTypes from "prop-types";
import { useMatch, useLocation, Link } from "@reach/router";
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
import { eventTime as eventTimeAngPow } from "../../pages/angPow";
import eventImg from "../../styles/img/event/eventlink.png";
import eventIdImg from "../../styles/img/event/eventlink_id.png";
import { eventTime as eventTimeMysteryBox } from "../../pages/mysteryBox";
import MysteryBox from "../mysteryBox/homePopBox";
import SEO from "../seo";

const defPageInfo = {
	default: {
		titleKey: "",
		className: "",
		hideLogo: false
	},
	member: {
		titleKey: "lbl_MyAccount",
		className: "main",
		hideLogo: true
	},
	deposit: {
		titleKey: "lbl_Deposit",
		className: "main",
		hideLogo: true
	},
	depositHistory: {
		titleKey: "lbl_Deposit",
		className: "main",
		hideLogo: true
	},
	depositOld: {
		titleKey: "lbl_Deposit",
		className: "main",
		hideLogo: true
	},
	withdrawal: {
		titleKey: "lbl_Withdrawal",
		className: "main",
		hideLogo: true
	},
	transfer: {
		titleKey: "lbl_Transfer",
		className: "main",
		hideLogo: true
	},
	statement: {
		titleKey: "lbl_Statement",
		className: "main",
		hideLogo: true
	},
	message: {
		titleKey: "lbl_Message",
		className: "main Message",
		hideLogo: true
	},
	[`/message/announcement`]: {
		titleKey: "lbl_Message",
		className: "main Announcement",
		hideLogo: true
	},
	casino: {
		titleKey: "lbl_Casino",
		className: "main casino",
		hideLogo: true
	},
	forgetPassword: {
		titleKey: "lbl_ForgetPassword",
		className: "main",
		hideLogo: true
	},
	resetPassword: {
		titleKey: "lbl_ResetPassword",
		className: "main",
		hideLogo: true
	},
	changePassword: {
		titleKey: "lbl_ChangePassword",
		className: "main",
		hideLogo: true
	},
	setting: {
		titleKey: "lbl_Setting",
		className: "main",
		hideLogo: true
	},
	promotion: {
		titleKey: "lbl_Promotion",
		className: "main promotions",
		hideLogo: true
	},
	kyc: {
		titleKey: "lbl_SubmitPhotoId",
		className: "main kyc",
		hideLogo: true
	},
	kycWaiting: {
		titleKey: "lbl_WaitKYC",
		className: "main kyc",
		hideLogo: true
	},
	whoami: {
		titleKey: "Who AM I",
		className: "main",
		hideLogo: true
	},
	ranking: {
		titleKey: "lbl_Ranking",
		className: "main ranking",
		hideLogo: true
	},
	"/918kiss": {
		titleKey: "918 Kiss",
		className: "main casino kiss",
		hideLogo: true
	},
	financialLog: {
		titleKey: "lbl_financialLog",
		className: "main",
		hideLogo: true
	},
	referral: {
		titleKey: "lbl_friendReferral",
		className: "main",
		hideLogo: true
	},
	angPow: {
		titleKey: "lbl_NewYearAngPow",
		className: "main event",
		hideLogo: true
	},
	oneGame: {
		titleKey: "One Game",
		className: "main casino kiss",
		hideLogo: true
	},
	vip: {
		titleKey: "VIP",
		className: "main vip",
		hideLogo: true
	},
	mysteryBox: {
		titleKey: "lbl_MysteryBox_EventTitle",
		className: "main event2",
		hideLogo: true
	}
};

const GetPageInfo = locationPath => {
	const result = defPageInfo[locationPath];
	if (result) {
		return result;
	}
	let pageInfoKey =
		locationPath === "/"
			? []
			: Object.keys(path).filter(p => {
					const _location = locationPath.split("/");
					return _location?.[1] === path[p].root;
			  });

	pageInfoKey = pageInfoKey?.length > 0 ? pageInfoKey[0] : null;
	const pageInfo = defPageInfo[pageInfoKey] ?? null;

	return pageInfoKey && pageInfo
		? {
				titleKey: pageInfo.titleKey,
				className: pageInfo.className,
				hideLogo: pageInfo.hideLogo
		  }
		: defPageInfo.default;
};

const Layout = ({ children }) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const location = useLocation();
	const pageInfo = GetPageInfo(location.pathname);

	const _matchLogin = useMatch(`/${path.login.root}`) !== null;
	const position =
		nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join
			? { position: "fixed" }
			: {};

	return (
		<>
			<SEO />
			<RotationHint i18n={i18n} />
			<Header
				title={i18n[pageInfo.titleKey] ?? pageInfo.titleKey}
				hideLogo={pageInfo.hideLogo}
			/>
			<main style={position} className={pageInfo.className ?? ""}>
				{children}
				{loading ? <Loading /> : null}
			</main>
			{isEventPeriod(eventTimeAngPow.angPow) ? (
				<AngPow langId={userInfo.langId} />
			) : null}
			{isEventPeriod(eventTimeMysteryBox.mysteryBox) ? (
				<MysteryBox isLogin={userInfo.isLogin} />
			) : null}
			<Footer />
		</>
	);
};

class RotationHint extends Component {
	constructor(props) {
		super(props);
		this.state = { rotateClass: this.rotationChange() };
	}

	UNSAFE_componentWillMount() {
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

const AngPow = ({ langId }) => {
	const { root, setRoot } = useContext(rootContext);

	const closePop = () => {
		setRoot(false);
	};

	return root ? (
		<div className="eventLink">
			<button className="icon icon-close" onClick={closePop} />
			<Link to={path.angPow.root}>
				<img
					src={langId === "id" ? eventIdImg : eventImg}
					alt={langId === "id" ? "Ang Pao" : "Ang pow"}
				/>
			</Link>
		</div>
	) : null;
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

RotationHint.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

AngPow.propTypes = {
	langId: PropTypes.string.isRequired
};

export default Layout;
