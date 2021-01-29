import React, { memo, useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { AutoPlay, ClickLink, useGetBanner } from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";
import { userInfoContext, navContext } from "../common/context";

const EventSwipper = memo(() => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder: [defBannerType.HotEvent]
	});

	const rows = banner?.map(b => {
		const {
			sportBattleDateTime,
			sportTeamsHomePic,
			sportTeamsAwayPic,
			sportLeaguesId,
			sportTeamsHome,
			sportTeamsAway
		} = b;

		return (
			<HotEventContent
				key={b.sportLeaguesId}
				sportBattleDateTime={sportBattleDateTime}
				sportTeamsHomePic={sportTeamsHomePic}
				sportTeamsAwayPic={sportTeamsAwayPic}
				sportLeaguesId={sportLeaguesId}
				sportTeamsHome={sportTeamsHome}
				sportTeamsAway={sportTeamsAway}
				// eslint-disable-next-line react/jsx-no-bind
				OnClickEvent={ClickLink.bind(this, {
					...b,
					isLogin: userInfo.isLogin,
					lang: userInfo.langId,
					setNav
				})}
			/>
		);
	});

	return <AutoPlay Rows={rows} />;
});

const HotEventContent = ({
	sportBattleDateTime,
	sportTeamsHomePic,
	sportTeamsAwayPic,
	sportLeaguesId,
	sportTeamsHome,
	sportTeamsAway,
	OnClickEvent
}) => {
	const datetime = moment(sportBattleDateTime).format("DD/MM HH:mm:ss");
	return (
		<div className="eventImg" onClick={OnClickEvent}>
			<div className="team">
				<img
					className="teamL"
					src={sportTeamsHomePic}
					alt={sportTeamsHome}
				/>
				<p className="gameName">{sportLeaguesId}</p>
				<img
					className="teamL teamR"
					src={sportTeamsAwayPic}
					alt={sportTeamsAway}
				/>
			</div>
			<div className="teamName">
				<p>{sportTeamsHome}</p>
				<p>{sportTeamsAway}</p>
			</div>
			<div className="time">{datetime}</div>
		</div>
	);
};

HotEventContent.propTypes = {
	sportBattleDateTime: PropTypes.string.isRequired,
	sportTeamsHomePic: PropTypes.string.isRequired,
	sportTeamsAwayPic: PropTypes.string.isRequired,
	sportLeaguesId: PropTypes.string.isRequired,
	sportTeamsHome: PropTypes.string.isRequired,
	sportTeamsAway: PropTypes.string.isRequired,
	OnClickEvent: PropTypes.func.isRequired
};

export default EventSwipper;
