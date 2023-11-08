import moment from "moment";
import Swiper from "react-id-swiper";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "Context";
import { useGetDataListQuery } from "@ailab-mobile/service";
import { cloudBannerImgURL } from "../../config";
import useHandleLogin from "../hook/useHandleLogin";
import { GET_ENTER_PAGE } from "../../service/enterPage";

const defSwipperConfig = {
	containerClass: "hotmatch-swiper-container",
	slidesPerView: 1.05,
	spaceBetween: 10
};

const HotMatch = () => {
	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);
	const { isLogin, langId } = userInfo;

	const { handleLogin } = useHandleLogin();

	const { data: { data: apiHotEventList = [] } = {} } = useGetDataListQuery({
		langId
	});

	// * 如果沒有資料，整個元件都不渲染
	if (apiHotEventList.length === 0) return null;

	const hotEventList = apiHotEventList.map(
		({
			tpId,
			gameId,
			matchId,
			homeOdds,
			awayOdds,
			handicap,
			battleTime,
			homeTeamPic,
			awayTeamPic,
			homeTeamName,
			awayTeamName,
			sportLeaguesTitle
		}) => {
			const formatHdp = hdp => {
				if (hdp === 0) return hdp;
				return `${hdp > 0 ? "+" : ""}${hdp}`;
			};

			const homeTeamHandicap = formatHdp(handicap);
			const awayTeamHandicap = formatHdp(handicap * -1);

			const onClickEvent = () => {
				GET_ENTER_PAGE({
					tpId,
					langId,
					gameId,
					isLogin,
					tpGameType: 1,
					matchid: matchId,
					loginCallback: handleLogin
				});
			};

			const eventTime = moment(battleTime).format("HH:mm");
			const eventDate = moment(battleTime).format("DD/MM/YYYY");

			return (
				<div key={`${matchId}-${battleTime}`}>
					<div className="home-hotmatch-item">
						<div className="title">
							<p>{sportLeaguesTitle}</p>
							<div>
								{eventDate}
								<div>{eventTime}</div>
							</div>
						</div>
						<div className="team">
							<div className="team-content">
								<div className="team-content-item">
									<img src={homeTeamPic} alt={homeTeamName} />
									<div>{homeTeamName}</div>
								</div>
								<div className="odds">
									<span>{homeTeamHandicap}</span>
									<span>{homeOdds}</span>
								</div>
							</div>
							<div className="team-content">
								<div className="team-content-item">
									<img src={awayTeamPic} alt={awayTeamName} />
									<div>{awayTeamName}</div>
								</div>
								<div className="odds">
									<span>{awayTeamHandicap}</span>
									<span>{awayOdds}</span>
								</div>
							</div>
						</div>
						<button className="btn-bet" onClick={onClickEvent}>
							{t("lbl_BetNow")}
						</button>
					</div>
				</div>
			);
		}
	);

	return (
		<div className="home-hotmatch">
			<div className="home-hotmatch-wrapper">
				<div className="top">
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/hotmatch-logo.png`}
						alt=""
					/>
					<div>{t("lbl_Sports").toUpperCase()}</div>
				</div>
			</div>
			<div className="home-hotmatch-swiper">
				<Swiper {...defSwipperConfig}>{hotEventList}</Swiper>
			</div>
		</div>
	);
};

export { HotMatch };
