import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";
import config from "../../config";
import path from "../../path";

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
	channel
}) => {
	const navigate = useNavigate();
	const { handleLogin } = useHandleLogin();
	const ClickBetNow = e => {
		e.stopPropagation();
		GET_ENTER_PAGE({
			langId,
			tpId: 1,
			gameId: 1,
			matchid: matchID,
			isLogin: isLogin === true,
			loginCallback: handleLogin
		});
	};

	const ClickLiveTv = () => {
		if (isStreamingPage) {
			console.log(
				`${config.openURL}/${langId}/liveStreamingEntPage?ch=${channel}`
			);
			window.open(
				`${config.openURL}/${langId}/liveStreamingEntPage?ch=${channel}`
			);
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
					<div>HOME</div>
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
					<div>AWAY</div>
					<div>{away}</div>
				</div>
			</div>
		</div>
	);
};

StreamingModule.defaultProps = {
	isStreamingPage: false
};

StreamingModule.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool.isRequired,
	isStreamingPage: PropTypes.bool,
	league: PropTypes.string.isRequired,
	home: PropTypes.string.isRequired,
	away: PropTypes.string.isRequired,
	nowPlaying: PropTypes.bool.isRequired,
	homeScore: PropTypes.number.isRequired,
	awayScore: PropTypes.number.isRequired,
	timeStart: PropTypes.string.isRequired,
	matchID: PropTypes.number.isRequired,
	channel: PropTypes.number.isRequired
};
