import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import {
	navContext,
	defNavPanel,
	popBoxContext,
	userInfoContext
} from "../common/context";
import config from "../../config";
import path from "../../path";
import { GET_ENTER_PAGE } from "../../service/enterPage";

export const StreamingModule = ({
	isStreamingPage,
	league,
	home,
	away,
	nowPlaying,
	homeScore,
	awayScore,
	timeStart,
	matchID,
	channel,
	tpId,
	gameId,
	actStatus
}) => {
	const {
		userInfo: { isLogin, langId }
	} = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();
	const { setNav } = useContext(navContext);
	const { t } = useTranslation();

	const handleLogin = () => {
		setNav(defNavPanel.login);
	};

	const ClickLiveTv = e => {
		if (isStreamingPage) {
			if (!isLogin) {
				handleLogin();
			} else if (actStatus === 1) {
				setPopBox({
					isOpen: true,
					content: t("lbl_streaming_please_make_deposit"),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="blue"
								onClick={() =>
									setPopBox(() => ({
										isOpen: false
									}))
								}>
								{t("lbl_Close")}
							</button>
						</div>
					)
				});
			} else {
				window.open(
					`${config.openURL}/${langId}/liveStreamingEntPage?ch=${channel}`
				);
			}
		} else {
			navigate(`/${path.streaming.root}`);
		}
	};

	const clickSportBook = () => {
		if (!isLogin) {
			handleLogin();
		} else {
			GET_ENTER_PAGE({
				langId,
				tpId,
				gameId,
				matchid: matchID,
				isLogin,
				loginCallback: handleLogin
			});
		}
	};

	// const tags = () => {
	// 	if (window.location.pathname === `/${path.streaming.root}`) {
	// 		if (nowPlaying) {
	// 			return (
	// 				<>
	// 					<span
	// 						className="started"
	// 						onClick={e => {
	// 							e.stopPropagation();
	// 							ClickLiveTv();
	// 						}}>
	// 						{t("lbl_Started")}
	// 					</span>
	// 					<button
	// 						onClick={e => {
	// 							e.stopPropagation();
	// 							clickSportBook();
	// 						}}
	// 						className="sportsbook">
	// 						{t("lbl_Streaming_SPORTSBOOK")}
	// 					</button>
	// 				</>
	// 			);
	// 		}
	// 		return (
	// 			<>
	// 				<span className="started">{t("lbl_Not_Started")}</span>
	// 				<button className="sportsbook">
	// 					{t("lbl_Streaming_SPORTSBOOK")}
	// 				</button>
	// 			</>
	// 		);
	// 	}
	//
	// 	return null;
	// };

	return (
		<>
			<div className="home-livesports-item">
				<div className="home-livesports-league">{league}</div>
				<div className="home-livesports-team left">
					<div>{t("lbl_Streaming_Home").toUpperCase()}</div>
					<div className="name">{home}</div>
				</div>
				<div className="home-livesports-score">
					<span> {homeScore ?? 0}</span>
					<span> {awayScore ?? 0} </span>
				</div>
				<div className="home-livesports-team right">
					<div>{t("lbl_Streaming_Away").toUpperCase()}</div>
					<div className="name">{away}</div>
				</div>
			</div>
			{/*
			<div className="liveBox">
				<div>
					<div className="gametitle">{league}</div>
					<button
						className={`youtube${nowPlaying ? "" : " close"}`}
					/>
					{tags()}
				</div>
				<div className="teamName">
					<div>
						<h1>{t("lbl_Streaming_Home").toUpperCase()}</h1>
						<p>{home}</p>
					</div>
					<div className={nowPlaying ? " active" : ""}>
						<div className="point">{homeScore ?? 0}</div>
						<div>
							<img
								src={`${bannerImgUrl}/h5/img/vsIcon.png`}
								alt=""
							/>
							<p>
								{nowPlaying
									? "LIVE"
									: moment(timeStart).format("MM/DD HH:mm")}
							</p>
						</div>
						<div className="point">{awayScore ?? 0}</div>
					</div>
					<div>
						<h1>{t("lbl_Streaming_Away").toUpperCase()}</h1>
						<p>{away}</p>
					</div>
				</div>
			</div>
			*/}
		</>
	);
};

StreamingModule.defaultProps = {
	isStreamingPage: false,
	homeScore: null,
	awayScore: null,
	actStatus: 1,
	tpId: null,
	gameId: null
};

StreamingModule.propTypes = {
	isStreamingPage: PropTypes.bool,
	league: PropTypes.string.isRequired,
	home: PropTypes.string.isRequired,
	away: PropTypes.string.isRequired,
	nowPlaying: PropTypes.bool.isRequired,
	homeScore: PropTypes.number,
	awayScore: PropTypes.number,
	timeStart: PropTypes.string.isRequired,
	matchID: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	channel: PropTypes.number.isRequired,
	tpId: PropTypes.number,
	gameId: PropTypes.number,
	actStatus: PropTypes.number
};
