import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Autoplay, useGetBanner } from "../common/swipperBanner";
import api from "../../service/api";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";

const EventSwipper = ({ userInfo, i18n }) => {
	const { handleLogin } = useHandleLogin();
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder: [api.site.defBannerType.HotEvent]
	});

	const goToBet = ({ tpId, gameId, matchId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			matchid: matchId,
			isLogin: userInfo.isLogin,
			loginCallback: handleLogin
		});
	};

	const arr = banner?.map(event => {
		const {
			sportBattleDateTime,
			sportTeamsHomePic,
			sportTeamsAwayPic,
			sportLeaguesId,
			sportTeamsHome,
			sportTeamsAway,
			tpId,
			gameId,
			matchId
		} = event;

		const eventTime = moment(sportBattleDateTime).format(
			"DD/MM/YYYY HH:mm"
		);

		return (
			<div
				key={`hotEvent-${sportLeaguesId}`}
				onClick={goToBet.bind(this, { tpId, gameId, matchId })}>
				<div className="upcomingmatches">
					<div className="team">
						<div>{sportLeaguesId}</div>
						<div>
							<div className="teamL">
								<img
									src={sportTeamsHomePic}
									alt={sportTeamsHome}
								/>
								{sportTeamsHome}
							</div>
							<div
								className="btn-group"
								onClick={goToBet.bind(this, {
									tpId,
									gameId,
									matchId
								})}>
								<button className="title">
									{i18n.lbl_BetNow.toUpperCase()}
								</button>
							</div>
							<div className="teamR">
								<img
									src={sportTeamsAwayPic}
									alt={sportTeamsAway}
								/>
								{sportTeamsAway}
							</div>
						</div>
						<div> {eventTime}</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="moduleTitle icon icon-upcomingmatches">
				{i18n.lbl_UpcomingMatches}
			</div>
			<Autoplay Rows={arr} />
		</>
	);
};

EventSwipper.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EventSwipper;
