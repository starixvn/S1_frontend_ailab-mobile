import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
	defNavPanel,
	navContext,
	i18nContext,
	popBoxContext
} from "../common/context";
import { Autoplay } from "../common/swipperBanner";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { api_hotEvent_GetDataList } from "../../service/api/hotEvent";

const swipperParam = {
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	rebuildOnUpdate: true,
	loop: true,
	containerClass: "hotevent oddsHotEvent"
};

const EventSwipper = ({ userInfo }) => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
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
				// setPopBox({
				// 	isOpen: true,
				// 	content: i18n.msg_ApiServerError
				// });
			}
		);
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

	const arr = banner?.map(event => {
		const {
			battleTime,
			homeTeamPic,
			awayTeamPic,
			homeTeamName,
			awayTeamName,
			tpId,
			gameId,
			matchId,
			sportLeaguesTitle,
			homeOdds,
			awayOdds,
			handicap
		} = event;

		const eventDate = moment(battleTime).format("DD/MM");
		const eventTime = moment(battleTime).format("HH:mm");

		const hdpSymbol = hdp => {
			if (hdp === 0) return hdp;
			return `${hdp < 0 ? "" : "+"} ${hdp}`;
		};

		return (
			<div
				className="hotDiv"
				key={matchId}
				onClick={goToBet.bind(this, { tpId, gameId, matchId })}>
				<h1>{sportLeaguesTitle}</h1>
				<div className="teamL">
					<p>{homeTeamName}</p>
					<img src={homeTeamPic} alt={homeTeamName} />
				</div>
				<div className="odds">
					<div className="oddL">
						<span>{hdpSymbol(handicap)}</span>
						<span>{homeOdds}</span>
					</div>
					<div className="oddR">
						<span>{hdpSymbol(-handicap)}</span>
						<span>{awayOdds}</span>
					</div>
				</div>
				<div className="time">
					<div className="date">
						{eventDate}
						<span>{eventTime}</span>
					</div>
				</div>
				<div className="btn">
					<button>{i18n.lbl_BetNow}</button>
				</div>
				<div className="teamR">
					<img src={awayTeamPic} alt={awayTeamName} />
					<p>{awayTeamName}</p>
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
