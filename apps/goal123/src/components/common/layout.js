import classNames from "classnames";
import React, { useContext, Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { useMatch, useNavigate, useLocation } from "@reach/router";
import { isDateRange, products,isInApp } from "@ailab-mobile/common";
import Header from "./header";
import {
	navContext,
	i18nContext,
	defNavPanel,
	loadingContext,
	rootContext,
	userInfoContext,
	popBoxContext
} from "./context";
import path from "../../path";
import Loading from "./loading";
import { eventTime } from "./eventTime";
import LuckyWheel from "../luckyWheel/homePopBox";
import GoTopBtn from "./goTopBtn";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { api_liveStreaming_GetDataList } from "../../service/api/liveStreaming";
import { bannerImgUrl } from "../../config";
import DragonEggPop from "../dragonEgg/homeLink";
import LiveStreamingPop from "../liveStreamingPop";
import HomeHeader from "../newHome/components/HomeHeader";
import { setCookie, readCookie } from "./common";
import HomeFooter from "../newHome/components/HomeFooter";
import EuroCupLink from "../euroCup/EuroCupLink";

const Layout = ({ children, header, mainClass, title, goTopBtn, noHeader }) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	const { setNav } = useContext(navContext);
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { root } = useContext(rootContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [luckyWheel, setLuckyWheel] = useState(false);
	const [displayVgaming, setDisplayVgaming] = useState(true);
	const [displayLiveStreaming, setDisplayLiveStreaming] = useState(false);
	const [liveStreamingList, setLiveStreamingList] = useState([]);
	const [appHint, setAppHint] = useState(false);

	const _matchLogin = useMatch(`/${path.login.root}`) !== null;
	const position =
		nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join
			? { position: "fixed" }
			: {};

	const handleDownloadHint = () => {
		const cookieName = `appDownloadHint${userInfo.userName}`;

		setCookie(cookieName, "1", 1);
		setAppHint(false);
	};

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
		if (root) {
			setLuckyWheel(true);
		}
	}, [root]);

	useEffect(() => {
		if (userInfo.isLogin && userInfo.isResetPwd) {
			navigate(`${path.changePassword.root}`);
		}
	}, [window.location.pathname, userInfo.isResetPwd]);

	useEffect(() => {
		window.scroll(0, 0);
	}, [location]);

	useEffect(() => {
		const cookieName = `appDownloadHint${userInfo.userName}`;

		if (!isInApp() && userInfo.userName && readCookie(cookieName) !== "1") {
			setAppHint(true);
		}
	}, [userInfo.currencyId, userInfo.accountName]);

	useEffect(() => {
		const getLiveStreamingList = async () => {
			try {
				const {
					data: { data: resultList }
				} = await api_liveStreaming_GetDataList({
					langId: userInfo.langId,
					currencyId: 51
				});
				if (resultList.length > 0) {
					setDisplayLiveStreaming(true);
					// 根據開始時間+2hr判斷是否過期,並取前3項
					const filterList = resultList
						.filter(({ battleTime }) =>
							moment(battleTime).add(2, "hours").isAfter(moment())
						)
						.slice(0, 3);

					setLiveStreamingList(filterList);
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: error
				});
			}
		};

		getLiveStreamingList();
	}, [userInfo.langId, userInfo.isLogin]);

	return (
		<>
			<RotationHint i18n={i18n} />
			{!root &&
				(noHeader
					? null
					: header ?? <Header title={title} hideLogo={true} />)}

			{root && (
				<header id="header" className="header-index">
					<HomeHeader
						appHint={appHint}
						handleDownloadHint={handleDownloadHint}
					/>
				</header>
			)}

			{root ? (
				<main className={classNames("home", { active: appHint })}>
					{children}
					{loading ? <Loading /> : null}
				</main>
			) : (
				<main
					style={position}
					className={`${mainClass ?? ""}${
						appHint ? " openAppDownload" : ""
					} ${appHint && root ? "active" : ""}`}>
					{children}
					{loading ? <Loading /> : null}
				</main>
			)}

			{/* 歐冠杯期間顯示 */}
			{displayVgaming && root && isDateRange(eventTime.eventCup) && (
				<div className="eventLink vgaming">
					<button
						className="icon icon-close"
						onClick={() => setDisplayVgaming(false)}
					/>
					<img
						className="vgimg"
						src={`${bannerImgUrl}/h5/img/vgaming.gif`}
						alt="vgaming-link"
						onClick={() => clickGame(products.Vgaming)}
					/>
				</div>
			)}

			{root && (
				<LiveStreamingPop
					liveStreamingList={liveStreamingList}
					displayLiveStreaming={displayLiveStreaming}
					setDisplayLiveStreaming={setDisplayLiveStreaming}
				/>
			)}

			{/* 歐冠杯期間不顯示 */}
			{!isDateRange(eventTime.eventCup) && root && luckyWheel ? (
				<LuckyWheel userInfo={userInfo} setLuckyWheel={setLuckyWheel} />
			) : null}

			{/* 僅限過年期間顯示 */}
			{isDateRange(eventTime.dragonEgg) && root && <DragonEggPop />}

			{/* 歐冠杯期間顯示 */}
			{isDateRange(eventTime.eventCup) && root && <EuroCupLink />}
			{/* <Footer /> */}
			<HomeFooter />
			{goTopBtn && <GoTopBtn />}
		</>
	);
};

Layout.defaultProps = {
	goTopBtn: true,
	mainClass: "main",
	title: "",
	header: null,
	noHeader: false
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	goTopBtn: PropTypes.bool,
	mainClass: PropTypes.string,
	title: PropTypes.string,
	header: PropTypes.node,
	noHeader: PropTypes.bool
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
