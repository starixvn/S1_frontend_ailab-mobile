import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { defNavPanel, navContext } from "../common/context";
import { Autoplay, useGetBanner } from "../common/swipperBanner";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { defBannerType } from "../../service/api/site";

const swipperParam = {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	rebuildOnUpdate: true,
	loop: true,
	containerClass: "hotevent"
};

const EventSwipper = ({ userInfo }) => {
	const { setNav } = useContext(navContext);
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder: [defBannerType.HotEvent],
		params: { swipperParam }
	});

	const goToBet = ({ tpId, gameId, matchId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			matchid: matchId,
			isLogin: userInfo.isLogin,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
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
			matchId,
			bannerName
		} = event;

		const eventDate = moment(sportBattleDateTime).format("DD/MM");
		const eventTime = moment(sportBattleDateTime).format("HH:mm");

		return (
			<div
				className="hotDiv"
				key={`hotEvent-${bannerName}`}
				onClick={goToBet.bind(this, { tpId, gameId, matchId })}>
				<h1>{sportLeaguesId}</h1>
				<div className="teamL">
					<p>{sportTeamsHome}</p>
					<img src={sportTeamsHomePic} alt={sportTeamsHome} />
				</div>
				<div className="time">
					<div className="date">
						{eventDate}
						<span>{eventTime}</span>
					</div>
				</div>
				<div className="teamR">
					<img src={sportTeamsAwayPic} alt={sportTeamsAway} />
					<p>{sportTeamsAway}</p>
				</div>
			</div>
		);
	});

	return <Autoplay Rows={arr} params={swipperParam} />;
};

EventSwipper.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default EventSwipper;
