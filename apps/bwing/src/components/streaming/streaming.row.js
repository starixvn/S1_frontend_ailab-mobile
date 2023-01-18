import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { navContext, defNavPanel, popBoxContext } from "../common/context";
import config, { bannerImgUrl } from "../../config";
import path from "../../path";
import { GET_ENTER_PAGE } from "../../service/enterPage";

export const StreamingModule = ({
	i18n,
	langId,
	isLogin,
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
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();
	const { setNav } = useContext(navContext);
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
					content: i18n.lbl_streaming_please_make_deposit,
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
								{i18n.lbl_Close}
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

	const tags = () => {
		if (window.location.pathname === `/${path.streaming.root}`) {
			if (nowPlaying) {
				return (
					<>
						<span
							className="started"
							onClick={e => {
								e.stopPropagation();
								ClickLiveTv();
							}}>
							{i18n.lbl_Started}
						</span>
						<button
							onClick={e => {
								e.stopPropagation();
								clickSportBook();
							}}
							className="sportsbook">
							{i18n.lbl_Streaming_SPORTSBOOK}
						</button>
					</>
				);
			}
			return (
				<>
					<span className="started">{i18n.lbl_Not_Started}</span>
					<button className="sportsbook">
						{i18n.lbl_Streaming_SPORTSBOOK}
					</button>
				</>
			);
		}

		return null;
	};

	return (
		<div className="liveBox">
			<div>
				<div className="gametitle">{league}</div>
				<button className={`youtube${nowPlaying ? "" : " close"}`} />
				{tags()}
			</div>
			<div className="teamName">
				<div>
					<h1>{i18n.lbl_Streaming_Home.toUpperCase()}</h1>
					<p>{home}</p>
				</div>
				<div className={nowPlaying ? " active" : ""}>
					<div className="point">{homeScore ?? 0}</div>
					<div>
						<img src={`${bannerImgUrl}/h5/img/vsIcon.png`} alt="" />
						<p>
							{nowPlaying
								? "LIVE"
								: moment(timeStart).format("MM/DD HH:mm")}
						</p>
					</div>
					<div className="point">{awayScore ?? 0}</div>
				</div>
				<div>
					<h1>{i18n.lbl_Streaming_Away.toUpperCase()}</h1>
					<p>{away}</p>
				</div>
			</div>
		</div>
	);
};

StreamingModule.defaultProps = {
	isStreamingPage: false,
	homeScore: null,
	awayScore: null,
	isLogin: null,
	actStatus: 1,
	tpId: null,
	gameId: null
};

StreamingModule.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool,
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
