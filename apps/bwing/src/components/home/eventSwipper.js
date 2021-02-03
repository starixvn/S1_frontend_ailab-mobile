import React, { memo, useContext } from "react";
import moment from "moment";
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

	const rows = banner?.map((b, bIdx) => {
		const {
			sportBattleDateTime,
			sportTeamsHomePic,
			sportTeamsAwayPic,
			sportLeaguesId,
			sportTeamsHome,
			sportTeamsAway
		} = b;
		const datetime = moment(sportBattleDateTime).format("DD/MM HH:mm:ss");
		return (
			<div
				key={`HotEvent-${bIdx}`}
				onClick={ClickLink.bind(this, {
					...b,
					isLogin: userInfo.isLogin,
					lang: userInfo.langId,
					setNav
				})}>
				<div
					// eslint-disable-next-line react/no-array-index-key
					className="eventImg">
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
			</div>
		);
	});

	return <AutoPlay Rows={rows} />;
});

export default EventSwipper;
