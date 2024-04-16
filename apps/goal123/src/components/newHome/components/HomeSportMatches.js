import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useNavigate } from "@reach/router";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation } from "swiper";
import { useTranslation } from "react-i18next";
import { api_hotEvent_GetDataList } from "../../../service/api/hotEvent";
import { userInfoContext } from "../../common/context";
import { bannerImgUrl } from "../../../config";

const HomeSportMatches = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("1"); // 1: football, 2: basketball
	const [apiData, setApiData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const langId = userInfo?.langId;

	useEffect(() => {
		const getHotEventDataList = () => {
			api_hotEvent_GetDataList({ langId }).then(res => {
				const { errorCode, data } = res.data;
				if (errorCode === 0 && data) {
					setApiData(data);
				}
			});
		};
		getHotEventDataList();
	}, []);

	useEffect(() => {
		// 根據activeTab從apiData中過濾賽事數據
		const filtered = apiData.filter(item => item.gameId === activeTab);
		setFilteredData(filtered);
	}, [apiData, activeTab]);

	const handleTabClick = (event, tab) => {
		event.preventDefault();
		setActiveTab(tab);
	};

	const filteredApiData = apiData.filter(item => {
		const gameIdForActiveTab = activeTab === "1" ? "1" : "2";
		return item.gameId === gameIdForActiveTab;
	});

	const swiperParams = {
		slidesPerView: 1.2,
		spaceBetween: 25
	};

	const onClickEvent = (gameId, matchId) => {
		const gameType = gameId === "1" ? "Soccer" : "basketball";
		const queryParams = new URLSearchParams({
			game: gameType,
			matchId
		}).toString();

		const targetUrl = `/${userInfo.langId}/sports?${queryParams}`;

		navigate(targetUrl);
	};

	// 目前api收不到資料 dummy data可測樣式ok
	// const dummytestingData = [
	// 	{
	// 		sportLeaguesTitle: "Premier League",
	// 		battleTime: "2024-04-15T15:00:00Z",
	// 		homeTeamPic: "home_team_pic_url",
	// 		homeTeamName: "Home Team",
	// 		awayTeamPic: "away_team_pic_url",
	// 		awayTeamName: "Away Team",
	// 		handicap: 0.5,
	// 		homeOdds: 1.8,
	// 		awayOdds: 2.0,
	// 		gameId: "1",
	// 		matchId: "123456"
	// 	},
	// 	{
	// 		sportLeaguesTitle: "Premier League",
	// 		battleTime: "2024-04-15T15:00:00Z",
	// 		homeTeamPic: "home_team_pic_url",
	// 		homeTeamName: "Home Team 1",
	// 		awayTeamPic: "away_team_pic_url",
	// 		awayTeamName: "Away Team 1",
	// 		handicap: 0.5,
	// 		homeOdds: 1.8,
	// 		awayOdds: 2.0,
	// 		gameId: "1",
	// 		matchId: "123456"
	// 	},
	// 	{
	// 		sportLeaguesTitle: "La Liga",
	// 		battleTime: "2024-04-16T16:30:00Z",
	// 		homeTeamPic: "home_team_pic_url",
	// 		homeTeamName: "Home Team 2",
	// 		awayTeamPic: "away_team_pic_url",
	// 		awayTeamName: "Away Team 2",
	// 		handicap: 0.75,
	// 		homeOdds: 1.9,
	// 		awayOdds: 2.1,
	// 		gameId: "1",
	// 		matchId: "789012"
	// 	},
	// 	{
	// 		sportLeaguesTitle: "NBA",
	// 		battleTime: "2024-04-17T19:00:00Z",
	// 		homeTeamPic: "home_team_pic_url",
	// 		homeTeamName: "Home Team 3",
	// 		awayTeamPic: "away_team_pic_url",
	// 		awayTeamName: "Away Team 3",
	// 		handicap: 5.5,
	// 		homeOdds: 1.95,
	// 		awayOdds: 2.05,
	// 		gameId: "2",
	// 		matchId: "345678"
	// 	},
	// 	{
	// 		sportLeaguesTitle: "UEFA Champions League",
	// 		battleTime: "2024-04-18T20:00:00Z",
	// 		homeTeamPic: "home_team_pic_url",
	// 		homeTeamName: "Home Team 4",
	// 		awayTeamPic: "away_team_pic_url",
	// 		awayTeamName: "Away Team 4",
	// 		handicap: 1.0,
	// 		homeOdds: 2.0,
	// 		awayOdds: 1.9,
	// 		gameId: "1",
	// 		matchId: "901234"
	// 	},
	// 	{
	// 		sportLeaguesTitle: "NCAA",
	// 		battleTime: "2024-04-19T14:00:00Z",
	// 		homeTeamPic: "home_team_pic_url",
	// 		homeTeamName: "Home Team 5",
	// 		awayTeamPic: "away_team_pic_url",
	// 		awayTeamName: "Away Team 5",
	// 		handicap: 7.5,
	// 		homeOdds: 2.1,
	// 		awayOdds: 1.8,
	// 		gameId: "2",
	// 		matchId: "567890"
	// 	}
	// ];

	return (
		<div className="home-sports">
			<div>
				<div className="home-title">{t("lbl_Sports")}</div>
				<div className="sports-menu">
					<a
						href="#"
						className={activeTab === "1" ? "active" : ""}
						onClick={e => handleTabClick(e, "1")}>
						{t("lbl_Home_Football")}
					</a>
					<a
						href="#"
						className={activeTab === "2" ? "active" : ""}
						onClick={e => handleTabClick(e, "2")}>
						{t("lbl_Basketball")}
					</a>
				</div>
			</div>
			<div className="ambassador">
				<img
					src={`${bannerImgUrl}/h5/img/home-page/hotmatches-bg.png`}
					alt="ambassador"
				/>
				<span>{t("lbl_Home_Ambassador")}2023-2024 </span>
				<span>Michael Ballack</span>
			</div>

			<Swiper
				className="sports-hotmatches"
				modules={[Navigation]}
				{...swiperParams}>
				<div className="swiper-wrapper">
					{filteredApiData &&
						filteredApiData.map((item, index) => {
							return (
								<SwiperSlide className="swiper-slide">
									<div className="sports-item" key={index}>
										<div className="title">
											{item?.sportLeaguesTitle}
										</div>
										<div className="date">
											<span>
												{moment(
													item?.battleTime
												).format("YYYY-MM-DD HH:mm")}
											</span>
										</div>
										<div className="team-content">
											<div className="team-item">
												<img
													src={item?.homeTeamPic}
													alt={item?.homeTeamName}
												/>
												<div className="team-name">
													{item?.homeTeamName}
												</div>
												<div className="odds">
													<div className="handicap">
														{item?.handicap}
													</div>
													<div>{item?.homeOdds}</div>
												</div>
											</div>
											<div className="team-item">
												<img
													src={item?.awayTeamPic}
													alt={item?.awayTeamName}
												/>
												<div className="team-name">
													{item?.awayTeamName}
												</div>
												<div className="odds">
													<div className="handicap">
														{item?.handicap * -1}
													</div>
													<div>{item?.awayOdds}</div>
												</div>
											</div>
										</div>
										<button
											className="btn-bet"
											onClick={() =>
												onClickEvent(
													item.gameId,
													item.matchId
												)
											}>
											{t("lbl_BetNow")}
										</button>
									</div>
								</SwiperSlide>
							);
						})}
				</div>
			</Swiper>
		</div>
	);
};

export default HomeSportMatches;
