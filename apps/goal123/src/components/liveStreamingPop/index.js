import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDateRange } from "@ailab-mobile/common";
import {
	defNavPanel,
	navContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { bannerImgUrl } from "../../config";
import { eventTime } from "../common/eventTime";

const LiveStreamingLink = ({
	liveStreamingList,
	displayLiveStreaming,
	setDisplayLiveStreaming
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);
	const {
		userInfo: { langId, isLogin }
	} = useContext(userInfoContext);

	const isWithinTwoHours = startTime =>
		moment().isBetween(
			moment(startTime),
			moment(startTime).add(2, "hours"),
			null,
			"[]"
		);

	const handleBetting = ({ tpId, gameId, matchId }) => {
		GET_ENTER_PAGE({
			tpId,
			langId,
			gameId,
			isLogin,
			tpGameType: 1,
			matchid: matchId,
			loginCallback: () => {
				setNav(defNavPanel.login);
				setPopBox({ isOpen: false });
			},
			liveStreamingId: true
		});
	};

	const handleLiveSteamingModalOpen = () => {
		setPopBox({
			isOpen: true,
			className: "livesportspop active",
			custContent: (
				<div className={`livesports ${langId}`}>
					<div>
						{liveStreamingList.map(
							({
								sportLeaguesTitle,
								homeTeamPic,
								homeTeamName,
								battleTime,
								awayTeamPic,
								awayTeamName,
								tpId,
								gameId,
								matchId
							}) => (
								<div
									className={`livesports-item ${
										isWithinTwoHours(battleTime)
											? ""
											: "next"
									}`}
									onClick={() =>
										handleBetting({
											tpId,
											gameId,
											matchId
										})
									}>
									<div className="top">
										<div>{sportLeaguesTitle}</div>
										<div>
											{isWithinTwoHours(battleTime)
												? // LIVE字樣不翻譯
												  "LIVE"
												: t("lbl_Next")}
										</div>
									</div>
									<div className="bottom">
										<div className="bottom-team">
											<div>
												<img
													src={homeTeamPic}
													alt={homeTeamName}
												/>
											</div>
											<div>{homeTeamName}</div>
										</div>
										<div className="bottom-time">
											<img
												src={`${bannerImgUrl}/h5/img/vs.png`}
												alt=""
											/>
											<div>
												<div>
													{moment(battleTime).format(
														"DD MMM"
													)}
												</div>
												<div>
													{moment(battleTime).format(
														"hh:mm A"
													)}
												</div>
											</div>
										</div>
										<div className="bottom-team">
											<div>
												<img
													src={awayTeamPic}
													alt={awayTeamName}
												/>
											</div>
											<div>{awayTeamName}</div>
										</div>
									</div>
								</div>
							)
						)}
					</div>

					<img
						onClick={() => setPopBox({ isOpen: false })}
						src={`${bannerImgUrl}/h5/img/promosBackPopup/delet.png`}
						alt=""
						className="closepop"
					/>
				</div>
			)
		});
	};

	return displayLiveStreaming ? (
		<div
			className={classNames("eventLink livesports", {
				eurocup: isDateRange(eventTime.eventCup)
			})}>
			<button
				className="icon icon-close"
				onClick={() => setDisplayLiveStreaming(false)}
			/>
			<a className="" onClick={handleLiveSteamingModalOpen}>
				<img
					src={`${bannerImgUrl}/h5/img/livesports.png`}
					alt="livesports"
				/>
			</a>
		</div>
	) : null;
};
LiveStreamingLink.defaultProps = {
	liveStreamingList: []
};

LiveStreamingLink.propTypes = {
	liveStreamingList: PropTypes.arrayOf(PropTypes.any),
	displayLiveStreaming: PropTypes.bool.isRequired,
	setDisplayLiveStreaming: PropTypes.func.isRequired
};

export default LiveStreamingLink;
