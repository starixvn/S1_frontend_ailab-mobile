import React from "react";
import moment from "moment";

export const StreamingModule = ({
	i18n,
	league,
	home,
	away,
	nowPlaying,
	homeScore,
	awayScore,
	timeStart
}) => {
	return (
		<div className={`liveTvModule${nowPlaying ? " active" : ""}`}>
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
						{homeScore && <span>{homeScore}</span>}
						VS{awayScore && <span>{awayScore}</span>}
					</div>
					<div className="btn-group">
						<button className="title" onClick={}>
							{i18n.lbl_BetNow?.toUpperCase()}
						</button>
					</div>
				</div>
				<div>
					<div>AWAY</div>
					<div>{away}</div>
				</div>
			</div>
		</div>
	);
};
