import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";
import config from "../../config";
import path from "../../path";
import { popBoxContext } from "../common/context";

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
	const { handleLogin, handleJoin } = useHandleLogin();
	const ClickBetNow = e => {
		e.stopPropagation();
		GET_ENTER_PAGE({
			langId,
			tpId: tpId || 1,
			gameId: gameId || 1,
			matchid: matchID,
			isLogin: isLogin === true,
			loginCallback: handleLogin,
			tpGameType: 1
		});
	};

	const ClickLiveTv = () => {
		if (isStreamingPage) {
			if (isLogin) {
				if (actStatus === 1) {
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
				handleJoin();
			}
		} else {
			navigate(`/${langId}/${path.streaming.root}`);
		}
	};

	return (
		<div
			className={`liveTvModule${nowPlaying ? " active" : ""}`}
			onClick={ClickLiveTv}>
			<div className="title icon icon-youtube">{league}</div>
			<div className="liveTvInfo">
				<div>
					<div>{i18n.lbl_Streaming_Home.toUpperCase()}</div>
					<div>{home}</div>
				</div>
				<div>
					<div className="time">
						{nowPlaying
							? "LIVE"
							: moment(timeStart).format("MM/DD HH:mm")}
					</div>
					<div className="title">
						{homeScore !== null ? <span>{homeScore}</span> : null}
						VS{awayScore !== null ? <span>{awayScore}</span> : null}
					</div>
					{isStreamingPage ? (
						<div className="btn-group">
							<button className="title" onClick={ClickBetNow}>
								{i18n.lbl_BetNow?.toUpperCase()}
							</button>
						</div>
					) : null}
				</div>
				<div>
					<div>{i18n.lbl_Streaming_Away.toUpperCase()}</div>
					<div>{away}</div>
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
	tpId: null,
	gameId: null,
	actStatus: 1
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
