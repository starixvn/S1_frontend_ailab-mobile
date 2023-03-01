import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import { bannerImgUrl } from "../../config";

const Intro = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<img
				className="banner"
				src={`${bannerImgUrl}/h5/img/worldcup/h5bg.png`}
				alt=""
			/>
			<img
				className="logo"
				src={`${bannerImgUrl}/h5/img/event/worldcup/logo.png`}
				alt=""
			/>
			<div className="txtBox">
				<div className="info">
					<div className="bonus">
						6,888,000,000<span>VND</span>
					</div>
					<div className="txt">{i18n.lbl_prizeWorth}</div>
					<div className="yellow">{i18n.msg_iconForWorldCup}™</div>
					<div className="green">{i18n.msg_worldCuptitleIntro}</div>
				</div>
			</div>
			<img
				className="topwire"
				src={`${bannerImgUrl}/h5/img/worldcup/topwire.png`}
				alt=""
			/>
			<div className="title">Discover Qatar Stadiums</div>
			<div className="discover">
				<div className="list">
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/stadium1.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Al Bayt Stadium
								<div className="img" />
								<span>
									60,000-capacity arena Opening Match Venue 21
									November 2022
								</span>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/stadium2.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Education City Stadium
								<div className="img" />
								<span>
									40,000-capacity arena FIFA World Cup Quarter
									Finals
								</span>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/stadium3.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Stadium 974
								<div className="img" />
								<span>40,000-capacity arena</span>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/stadium4.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Khalifa International Stadium
								<div className="img" />
								<span>40,000-capacity arena Built in 1976</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img
				className="topwire"
				src={`${bannerImgUrl}/h5/img/worldcup/topwire.png`}
				alt=""
			/>
			<div className="title">Discover Qatar Player</div>
			<div className="discover1">
				<div className="list">
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/player1.png`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								kylian Mbappe
								<div className="img" />
								<span>Age: 24</span>
								<span>Score: 26 Goals</span>
								<img
									src={`${bannerImgUrl}/h5/img/worldcup/team1.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/player2.png`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Messi
								<div className="img" />
								<span>Age: 35</span>
								<span>Score: 81 Goals</span>
								<img
									src={`${bannerImgUrl}/h5/img/worldcup/team2.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/player3.png`}
							alt=""
						/>
						<div className="hoverBox active">
							<div>
								C.Ronaldo
								<div className="img" />
								<span>Age: 37</span>
								<span>Score: 115 Goals</span>
								<img
									src={`${bannerImgUrl}/h5/img/worldcup/team3.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/worldcup/player4.png`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Neymar
								<div className="img" />
								<span>Age: 30</span>
								<span>Score: 71 Goals</span>
								<img
									src={`${bannerImgUrl}/h5/img/worldcup/team4.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img
				className="topwire"
				src={`${bannerImgUrl}/h5/img/worldcup/topwire.png`}
				alt=""
			/>
		</>
	);
};

export default Intro;
