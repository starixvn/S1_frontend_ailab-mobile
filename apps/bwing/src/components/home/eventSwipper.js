import React, { memo, useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { AutoPlay } from "../common/swipperBanner";
import {
	userInfoContext,
	navContext,
	popBoxContext,
	i18nContext,
	defNavPanel
} from "../common/context";
import { api_hotEvent_GetDataList } from "../../service/api/hotEvent";
import { GET_ENTER_PAGE } from "../../service/enterPage";

const EventSwipper = memo(() => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [banner, setBanner] = useState([]);
	const timeRef = useRef(null);
	const getHotEventDataList = () => {
		api_hotEvent_GetDataList({ langId: userInfo.langId }).then(
			res => {
				const { errorCode, data, message } = res.data;
				if (errorCode === 0) {
					setBanner(data);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${errorCode}] ${message}`
					});
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);
	};

	const goToBet = ({ tpId, gameId, matchId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			matchid: matchId,
			isLogin: userInfo.isLogin,
			loginCallback: () => {
				setNav(defNavPanel.login);
			},
			tpGameType: 1
		});
	};

	useEffect(() => {
		getHotEventDataList();
		const interval = setInterval(() => {
			getHotEventDataList();
		}, 60000);
		timeRef.current = interval;

		return () => {
			clearInterval(timeRef.current);
		};
	}, []);

	const rows = banner?.map(b => {
		const {
			tpId,
			gameId,
			matchId,
			battleTime,
			homeTeamPic,
			awayTeamPic,
			sportLeaguesTitle,
			homeTeamName,
			awayTeamName,
			homeOdds,
			awayOdds,
			handicap
		} = b;
		const datetime = moment(battleTime).format("DD/MM HH:mm:ss");

		const hdpSymbol = hdp => {
			if (hdp === 0) return hdp;
			return `${hdp < 0 ? "" : "+"} ${hdp}`;
		};

		return (
			<div
				key={`HotEvent-${sportLeaguesTitle}`}
				onClick={() => {
					goToBet({ tpId, gameId, matchId });
				}}>
				<div className="eventImg">
					<div className="team">
						<img
							className="teamL"
							src={homeTeamPic}
							alt={homeTeamName}
						/>
						<div className="time">{datetime}</div>
						<p className="gameName">{sportLeaguesTitle}</p>
						<img
							className="teamL teamR"
							src={awayTeamPic}
							alt={awayTeamName}
						/>
					</div>
					<div className="homeaway">
						<p>{homeTeamName}</p>
						<p>{awayTeamName}</p>
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
