import React from "react";

export const StreamingModule = ({
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
						{nowPlaying ? "LIVE" : timeStart}
					</div>
					<div className="title">
						{homeScore && <span>{homeScore}</span>}
						VS{awayScore && <span>{awayScore}</span>}
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
