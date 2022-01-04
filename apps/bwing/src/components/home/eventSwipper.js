import React, { memo, useContext } from "react";
import moment from "moment";
import { AutoPlay, ClickLink, useGetBanner } from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";
import {
	userInfoContext,
	navContext,
	popBoxContext,
	i18nContext
} from "../common/context";
import tokyo from "../../styles/img/olympics/logo2.png";

const EventSwipper = memo(() => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder: [defBannerType.HotEvent],
		setPopBox,
		i18n
	});

	const rows = banner?.map((b, bIdx) => {
		const {
			sportBattleDateTime,
			sportTeamsHomePic,
			sportTeamsAwayPic,
			sportLeaguesId,
			sportTeamsHome,
			sportTeamsAway,
			homeOdds,
			awayOdds,
			handicap,
			leaguesId
		} = b;
		const datetime = moment(sportBattleDateTime).format("DD/MM HH:mm:ss");

		const hdpSymbol = hdp => {
			if (hdp === 0) return hdp;
			return `${hdp < 0 ? "" : "+"} ${hdp}`;
		};

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
						<div className="time">{datetime}</div>
						<p className="gameName">
							{leaguesId === 8 && (
								<img
									className="olympicsLogo"
									src={tokyo}
									alt="tokyo_olympics_logo"
								/>
							)}
							{sportLeaguesId}
						</p>
						<img
							className="teamL teamR"
							src={sportTeamsAwayPic}
							alt={sportTeamsAway}
						/>
					</div>
					<div className="homeaway">
						<p>{sportTeamsHome}</p>
						<p>{sportTeamsAway}</p>
					</div>
					<div className="odds">
						<div>
							<p>{hdpSymbol(handicap)}</p>
							<p>{homeOdds}</p>
						</div>
						<div>
							<p>{hdpSymbol(-handicap)}</p>
							<p>{awayOdds}</p>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return <AutoPlay Rows={rows} swiperClass="hotevent" />;
});

export default EventSwipper;
