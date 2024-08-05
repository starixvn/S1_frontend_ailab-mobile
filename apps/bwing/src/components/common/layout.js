import React, { useContext, Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "@reach/router";
import { isDateRange, products } from "@ailab-mobile/common";
import Footer from "./footer";
import Header from "../header/header";
import {
	defNavPanel,
	i18nContext,
	loadingContext,
	navContext,
	rootContext,
	userInfoContext
} from "./context";
import path from "../../path";
import Loading from "./loading";
import LuckyWheel from "../luckyWheel/homePopBox";
import MysteryBox from "../mysteryBox/homePopBox";
import { eventTime } from "./eventTime";
import Login from "../login/login";
import Join from "../join/join";
import GoTopBtn from "./goTopBtn";
import { bannerImgUrl } from "../../config";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import DragonEggPop from "../dragonEgg/homeLink";
import EuroCupLink from "../euroCup/EuroCupLink";

export const defPageInfo = {
	default: {
		titleKey: "",
		className: "",
		hideLogo: false,
		showMenuBar: true,
		hideModal: true
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
		iconClassName: "icon-slots-blue",
		titleKey: "lbl_Slots",
		className: "lobby slots",
		hideLogo: true
	},
	forgetPassword: {
		titleKey: "lbl_ForgetPassword",
		className: "main forget",
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
		className: "lobby promotion",
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
		className: "account",
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
	referral: {
		titleKey: "lbl_Referral",
		className: "main referral",
		hideLogo: true
	},
	"referral/history": {
		titleKey: "lbl_ReferralHistory",
		className: "main",
		hideLogo: true
	},
	mysteryBox: {
		titleKey: "lbl_MysteryBox_EventTitle",
		className: "main mysteryEvent",
		hideLogo: true
	},
	vip: {
		titleKey: "lbl_VIP",
		className: "main vip",
		hideLogo: true
	},
	sports: {
		titleKey: "lbl_Sports",
		className: "lobby sports",
		iconClassName: "icon-soccer-blue",
		hideLogo: false,
		showMenuBar: true
	},
	fishing: {
		titleKey: "lbl_Fishing",
		className: "lobby fishing",
		iconClassName: "icon-fishing-blue",
		hideLogo: false,
		showMenuBar: true
	},
	liveCasino: {
		titleKey: "lbl_LiveCasino",
		className: "lobby livacasino",
		iconClassName: "icon-livecasino-blue",
		hideLogo: false,
		showMenuBar: true
	},
	games: {
		titleKey: "lbl_Games",
		className: "lobby games",
		iconClassName: "icon-games-blue",
		hideLogo: false,
		showMenuBar: true
	},
	lottery: {
		titleKey: "lbl_Lottery",
		className: "lobby lottery",
		iconClassName: "icon-lottery-blue",
		hideLogo: false,
		showMenuBar: true
	},
	eSports: {
		titleKey: "lbl_eSports",
		className: "lobby esports",
		iconClassName: "icon-esports-blue",
		hideLogo: false,
		showMenuBar: true
	},
	cockfighting: {
		titleKey: "lbl_Cockfighting",
		className: "lobby cockfighting",
		iconClassName: "icon-cockfighting-blue",
		hideLogo: false,
		showMenuBar: true
	},
	streaming: {
		titleKey: "lbl_LiveStreaming",
		iconClassName: "icon-lottery-blue",
		className: "lobby news",
		hideLogo: true,
		showMenuBar: true
	},
	home: {
		titleKey: "",
		className: "home",
		hideLogo: false,
		showMenuBar: true,
		hideBtn: true,
		hideModal: true
	},
	luckyWheel: {
		titleKey: "lbl_LuckyWheel",
		className: "main luckyboxEvent",
		hideLogo: true
	},
	angpao: {
		titleKey: "Label_AngpaoNewYearTitle",
		className: "angpaoEvent",
		hideLogo: true
	},
	um: {
		onlyContent: true
	},
	worldCup: {
		titleKey: "lbl_FIFAWorldCup",
		className: "",
		hideLogo: true
	},
	news: {
		titleKey: "lbl_SiteNews",
		className: "lobby news",
		hideLogo: true
	},
	"euro-cup": {
		titleKey: "lbl_CupEvent_Euro2024",
		className: "euro",
		hideLogo: true
	},
	survey: {
		titleKey: "lbl_Survey",
		className: "survey",
		hideLogo: true
	},

	// 設計那邊的結構class是下在裡面那層 所以這邊沒加
	retention: {
		titleKey: "Label_Retention_SurpriseReward"
	},
	leaderBoard: {
		titleKey: "lbl_LeaderBoard",
		className: "leaderboard",
		iconClassName: "icon-leaderboard-blue"
	},
	// 設計那邊的結構class是下在裡面那層 所以這邊沒加
	retention: {
		titleKey: "Label_Retention_SurpriseReward",
		iconClassName: "icon-leaderboard-blue",
		hideLogo: true
	}
};

export const GetPageInfo = locationPath => {
	const newLocationPath = locationPath.substring(1);
	// const result = defPageInfo[locationPath];
	// 如果網址是“／”（表示newLocationPath為empty string，就回傳home的資料，不然就回傳null
	const result =
		defPageInfo[newLocationPath === "" ? "home" : newLocationPath] ?? null;
	return result !== null ? result : defPageInfo.default; // 如果是null就使用default的資料至少不要讓網站掛掉

	// old logic:
	// let pageInfoKey =
	// 	locationPath === path.home.root
	// 		? []
	// 		: Object.keys(path).filter(p => {
	// 				const _location = locationPath.split("/");
	// 				return _location?.[1] === path[p].root;
	// 		  });

	// pageInfoKey = pageInfoKey?.length > 0 ? pageInfoKey[0] : null;
	// const pageInfo = defPageInfo[pageInfoKey] ?? null;
	// if (locationPath === path.home.root) return defPageInfo.home;
	// return pageInfoKey && pageInfo
	// 	? { ...pageInfo, pageInfoKey }
	// 	: defPageInfo.default;
};

const Layout = ({ children }) => {
	const { i18n } = useContext(i18nContext);
	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { root } = useContext(rootContext);
	const { setNav } = useContext(navContext);
	const location = useLocation();
	const navigate = useNavigate();
	const pageInfo = GetPageInfo(location.pathname);
	const [luckyWheel, setLuckyWheel] = useState(false);
	const [displayVgaming, setDisplayVgaming] = useState(true);
	const [appHint, setAppHint] = useState(false);
	const clickGame = ({ tpId, gameId, tpGameType }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			},
			tpGameType
		});
	};

	useEffect(() => {
		if (root) setLuckyWheel(true);
	}, [root]);

	useEffect(() => {
		window.scroll(0, 0);
	}, [location]);

	useEffect(() => {
		if (userInfo.isLogin && userInfo.isResetPwd) {
			navigate(`${path.changePassword.root}`);
			setLoading(false);
		}
	}, [window.location.pathname, userInfo.isResetPwd]);

	if (
		location.pathname?.split("/")[
			location.pathname?.split("/").length - 1
		] === "rebateExclude"
	) {
		return children;
	}

	return pageInfo.onlyContent ? (
		children
	) : (
		<>
			<RotationHint i18n={i18n} />
			{pageInfo.customHeader ? (
				children
			) : (
				<>
					<Login />
					<Join />
					<Header
						icon={pageInfo?.icon}
						hideModal={pageInfo.hideModal}
						hideBtn={pageInfo.hideBtn}
						title={i18n[pageInfo.titleKey] ?? pageInfo.titleKey}
						iconClassName={pageInfo.iconClassName}
						hideLogo={pageInfo.hideLogo}
						showMenuBar={pageInfo.showMenuBar === true}
						appHint={appHint}
						setAppHint={setAppHint}
					/>

					<main
						className={`${pageInfo.className ?? ""} ${
							appHint && root ? "active" : ""
						}`}>
						{children}
					</main>
				</>
			)}
			{loading ? <Loading /> : null}
			<Footer />
			{/* 右下角 Vgaming 進入點 */}
			{displayVgaming && root && !isDateRange(eventTime.euroCup) && (
				<div className="eventLink vgaming">
					<button
						className="icon-close-white-bg"
						onClick={() => setDisplayVgaming(false)}
					/>
					<img
						className="vgimg"
						src={`${bannerImgUrl}/h5/img/4.0/vgaming.gif`}
						alt="vgaming-link"
						onClick={() => clickGame(products.Vgaming)}
					/>
				</div>
			)}

			{/* 僅限過年期間顯示 */}
			{!isDateRange(eventTime.dragonEgg) && luckyWheel && root && (
				<LuckyWheel setLuckyWheel={setLuckyWheel} />
			)}

			{isDateRange(eventTime.euroCup) && root && <EuroCupLink />}

			{isDateRange(eventTime.dragonEgg) && root && <DragonEggPop />}

			{isDateRange(eventTime.mysteryBox) && root && <MysteryBox />}
			{pageInfo.goTopBtn === false ? null : <GoTopBtn />}
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

RotationHint.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
