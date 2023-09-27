import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import moment from "moment/moment";
import Swiper from "react-id-swiper";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { defNavPanel, navContext, userInfoContext } from "../common/context";

const HomeMatch = ({ hotEventList, classNameType }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	const hdpSymbol = hdp => {
		if (hdp === 0) return hdp;
		return `${hdp < 0 ? "" : "+"} ${hdp}`;
	};

	const handleGoToBet = ({ tpId, gameId, matchId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			matchid: matchId,
			isLogin: userInfo.isLogin,
			loginCallback: () => setNav(defNavPanel.login),
			tpGameType: 1
		});
	};

	const swiperParams = {
		spaceBetween: 10,
		slidesPerView: 1.3,
		initialSlide: 1.5,
		centeredSlides: true,
		loop: true
	};

	return (
		<>
			<div className={`${classNameType}-title`}>
				<i className="icon-soccer" />
				{t("lbl_Fabulous_Sports_Experience")}
			</div>
			<div className={`${classNameType}-match mb-2`}>
				<Swiper {...swiperParams}>
					{hotEventList.map(
						({
							tpId,
							gameId,
							sportLeaguesTitle,
							homeTeamPic,
							awayTeamPic,
							homeTeamName,
							awayTeamName,
							battleTime,
							matchId,
							handicap,
							homeOdds,
							awayOdds
						}) => (
							<div key={`${tpId}_${gameId}_${matchId}`}>
								<div
									key={`hotEvent-${sportLeaguesTitle}-${matchId}`}
									className={`${classNameType}-match-item`}
									onClick={() =>
										handleGoToBet({ tpId, gameId, matchId })
									}>
									<div
										className={`${classNameType}-match-league`}>
										{sportLeaguesTitle}
									</div>
									<div
										className={`${classNameType}-match-content`}>
										<div
											className={`${classNameType}-match-team left`}>
											<img
												src={homeTeamPic}
												alt={homeTeamName}
											/>
											<div className="name">
												{homeTeamName}
											</div>
										</div>
										<div
											className={`${classNameType}-match-time`}>
											<div>
												{moment(battleTime).format(
													"MM/DD HH:mm"
												)}
											</div>
										</div>
										<div
											className={`${classNameType}-match-team right`}>
											<img
												src={awayTeamPic}
												alt={awayTeamName}
											/>
											<div className="name">
												{awayTeamName}
											</div>
										</div>
									</div>
									<div
										className={`${classNameType}-match-odds`}>
										<div>
											<span>{hdpSymbol(handicap)}</span>
											<span>{homeOdds}</span>
										</div>
										<button
											onClick={() =>
												handleGoToBet({
													tpId,
													gameId,
													matchId
												})
											}>
											<span>{t("lbl_BetNow")}</span>
										</button>
										<div>
											<span>{hdpSymbol(-handicap)}</span>
											<span>{awayOdds}</span>
										</div>
									</div>
								</div>
							</div>
						)
					)}
				</Swiper>
			</div>
		</>
	);
};

HomeMatch.defaultProps = {
	hotEventList: [],
	classNameType: "home"
};

HomeMatch.propTypes = {
	hotEventList: PropTypes.arrayOf(PropTypes.any),
	classNameType: PropTypes.string
};

export default HomeMatch;
