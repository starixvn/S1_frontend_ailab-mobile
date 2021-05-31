import React, { useContext, Component } from "react";
import PropTypes from "prop-types";
import { useMatch, useLocation, Link } from "@reach/router";
import Footer from "./footer";
import Header from "../header/header";
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
import { eventTime as angPowEventTime } from "../../pages/angPow";
import eventImg from "../../styles/img/event/angPao_en.png";
import eventVNImg from "../../styles/img/event/angPao_vn.png";
import MysteryBox from "../mysteryBox/homePopBox";
import { eventTime as mysteryBoxEventTime } from "../../pages/mysteryBox";

const defPageInfo = {
	default: {
		titleKey: "",
		className: "",
		hideLogo: false,
		showMenuBar: true
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
		className: "main",
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
	other: {
		titleKey: "lbl_Other",
		className: "main",
		hideLogo: true
	},
	howToDeposit: {
		titleKey: "lbl_HowToDepoist",
		className: "main",
		hideLogo: true
	},
	howToWithdraw: {
		titleKey: "lbl_HowToWithdrawal",
		className: "main",
		hideLogo: true
	},
	howToPlay: {
		titleKey: "lbl_HowToPlay",
		className: "main",
		hideLogo: true
	},
	financialLog: {
		titleKey: "lbl_FinancialLog",
		className: "main",
		hideLogo: true
	},
	leaderBoard: {
		titleKey: "lbl_Ranking",
		className: "main rankingNew",
		hideLogo: true
	},
	angPow: {
		titleKey: "lbl_NewYearAngPow",
		className: "main event",
		hideLogo: true
	},
	referral: {
		titleKey: "lbl_friendReferral",
		className: "main",
		hideLogo: true
	},
	mysteryBox: {
		titleKey: "lbl_MysteryBox_EventTitle",
		className: "main mysteryEvent",
		hideLogo: true
	},
	vip: {
		titleKey: "VIP",
		className: "main vip",
		hideLogo: true
	},
	sports: {
		titleKey: "",
		className: "mainLogin",
		hideLogo: false,
		showMenuBar: true
	},
	fishing: {
		className: "mainLogin",
		hideLogo: false,
		showMenuBar: true
	},
	liveCasino: {
		titleKey: "",
		className: "mainLogin",
		hideLogo: false,
		showMenuBar: true
	},
	games: {
		titleKey: "",
		className: "mainLogin",
		hideLogo: false,
		showMenuBar: true
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
		? { ...pageInfo, pageInfoKey }
		: defPageInfo.default;
};

const Layout = ({ children }) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { root } = useContext(rootContext);

	const location = useLocation();
	const pageInfo = GetPageInfo(location.pathname);

	if (root) {
		pageInfo.className = userInfo.isLogin ? "mainLogin" : "mainLogout";
	}

	const _matchLogin = useMatch(`/${path.login.root}`) !== null;
	let position =
		nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join
			? { position: "fixed" }
			: {};

	// temp for fix bwing forget pwd issue
	if (pageInfo.pageInfoKey === "forgetPassword") {
		position = { paddingTop: "24vw" };
	}

	return (
		<>
			<RotationHint i18n={i18n} />
			<Header
				title={i18n[pageInfo.titleKey] ?? pageInfo.titleKey}
				hideLogo={pageInfo.hideLogo}
				showMenuBar={pageInfo.showMenuBar === true}
			/>
			<main style={position} className={pageInfo.className ?? ""}>
				{children}
				{loading ? <Loading /> : null}
			</main>
			<Footer />
			{isEventPeriod(angPowEventTime.angPow) ? (
				<AngPow i18n={i18n} langId={userInfo.langId} />
			) : null}
			{isEventPeriod(mysteryBoxEventTime.mysteryBox) ? (
				<MysteryBox langId={userInfo.langId} />
			) : null}
		</>
	);
};

class RotationHint extends Component {
	constructor(props) {
		super(props);
		this.state = { rotateClass: this.rotationChange() };
		window.removeEventListener("orientationchange", this.OnRotate);
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

	UNSAFE_componentDidMount() {
		window.addEventListener("orientationchange", this.OnRotate);
	}

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

const AngPow = ({ i18n, langId }) => {
	const { root, setRoot } = useContext(rootContext);

	const closePop = () => {
		setRoot(false);
	};

	return root ? (
		<div className="angPao_module">
			<div className="angPao_close" onClick={closePop}>
				X
			</div>
			<Link to={path.angPow.root}>
				<img
					className="angPao"
					src={langId === "vn" ? eventVNImg : eventImg}
					alt={i18n.lbl_FreeAngPow}
				/>
			</Link>
		</div>
	) : null;
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

AngPow.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

export default Layout;
