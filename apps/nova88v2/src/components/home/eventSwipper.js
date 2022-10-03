import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Autoplay } from "../common/swipperBanner";
import api from "../../service/api";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";

const swipperParam = {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	rebuildOnUpdate: true,
	loop: true,
	containerClass: "upcomingmatches"
};

const EventSwipper = ({ userInfo, i18n }) => {
	const [banner, setBanner] = useState([]);
	const { handleLogin } = useHandleLogin();

	useEffect(() => {
		api.hotEvent.GetDataList({ langId: userInfo.langId }).then(
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
	}, []);

	const goToBet = ({ tpId, gameId, matchId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			matchid: matchId,
			isLogin: userInfo.isLogin,
			loginCallback: handleLogin,
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
			handicap,
			backgroundPic
		} = event;

		const eventDate = moment(battleTime).format("DD/MM/YYYY");
		const eventTime = moment(battleTime).format("HH:mm");

		const hdpSymbol = hdp => {
			if (hdp === 0) return hdp;
			return `${hdp < 0 ? "" : "+"} ${hdp}`;
		};

		return (
			<div
				key={`hotEvent-${sportLeaguesTitle}-${matchId}`}
				onClick={goToBet.bind(this, { tpId, gameId, matchId })}>
				<div className="teamNew">
					<img src={backgroundPic} alt="bg_pic" />
					<div className="gamename">{sportLeaguesTitle}</div>
					<div>
						<div className="teamL">
							<div>
								<img src={homeTeamPic} alt={homeTeamName} />
							</div>
							<div>{homeTeamName}</div>
							<div>{hdpSymbol(handicap)}</div>
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
							<div>
								<img src={awayTeamPic} alt={awayTeamName} />
							</div>
							<div>{awayTeamName}</div>
							<div>{hdpSymbol(-handicap)}</div>
						</div>
					</div>
					<div className="odds">
						<div>
							<div>{homeOdds}</div>
							<div>{i18n.lbl_Streaming_Home}</div>
						</div>
						<div>
							<div>{eventDate}</div>
							<div>{eventTime}</div>
						</div>
						<div>
							<div>{awayOdds}</div>
							<div>{i18n.lbl_Streaming_Away}</div>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		banner.length > 0 && (
			<>
				<div className="moduleTitle icon icon-upcomingmatches">
					{i18n.lbl_UpcomingMatches}
				</div>
				<Autoplay Rows={arr} params={swipperParam} />
			</>
		)
	);
};

EventSwipper.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EventSwipper;
