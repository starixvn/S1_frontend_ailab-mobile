import React, { useContext } from "react";
import PropTypes from "prop-types";
import { cloudBannerImgURL } from "../../config";
import { i18nContext } from "../common/context";

const Intro = ({ scrollToEvent }) => {
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<div className="eventPage top">
				<div className="awards">
					<div>{i18n.lbl_totalPrizePool}</div>
				</div>
				<div className="visual">
					<img
						className="logo"
						src={`${cloudBannerImgURL}/img/worldcup/logo.png`}
						alt="logo"
					/>
					<img
						className="a-left"
						src={`${cloudBannerImgURL}/h5/img/event/worldcup/athlete.png`}
						alt="athlete"
					/>
					<img
						className="deco-line"
						src={`${cloudBannerImgURL}/h5/img/event/worldcup/deco-line.svg`}
						alt="deco-line"
					/>
				</div>
			</div>
			<div className="eventPage middle">
				<img
					className="deco-line"
					src={`${cloudBannerImgURL}/h5/img/event/worldcup/deco-line.svg`}
					alt="deco-line"
				/>
				<div className="item-wrapper">
					<div className="item-row">
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube01.png`}
								alt="cube01"
							/>
							<div className="info">
								<span>Lionel Messi - Argentina</span>
								Age 35 / Score 81 Goals
							</div>
						</div>
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube02.jpg`}
								alt="cube02"
							/>
							<div className="info">
								<span>Al Bayt Stadium</span>
								Opening Match Venue
							</div>
						</div>
					</div>
					<div className="item-row">
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube03.png`}
								alt="cube03"
							/>
							<div className="info">
								<span>C.Ronaldo - Protugal</span>
								Age 37 / Score 115 Goals
							</div>
						</div>
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube04.jpg`}
								alt="cube04"
							/>
							<div className="info">
								<span>Al Janoub Stadium</span>
								City of Al Wakrah
							</div>
						</div>
					</div>
					<div className="item-row">
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube05.jpg`}
								alt="cube05"
							/>
							<div className="info">
								<span>Lusail Stadium</span>
								FIFA World Cup Final Qatar 2022
							</div>
						</div>
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube06.png`}
								alt="cube06"
							/>
							<div className="info">
								<span>Karim Benzema - France</span>
								Age 35 / Score 36 Goals
							</div>
						</div>
					</div>
					<div className="item-row">
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube07.jpg`}
								alt="cube07"
							/>
							<div className="info">
								<span>Khalifa International Stadium</span>
								Built in 1976
							</div>
						</div>
						<div className="item">
							<img
								src={`${cloudBannerImgURL}/h5/img/event/worldcup/cube08.png`}
								alt="cube08"
							/>
							<div className="info">
								<span>Neymar - Brazil</span>
								Age 30 / Score 71 Goals
							</div>
						</div>
					</div>
				</div>
				<button className="btn-event" onClick={scrollToEvent}>
					{i18n.lbl_getStarted}
				</button>
			</div>
		</>
	);
};

Intro.propTypes = {
	scrollToEvent: PropTypes.func.isRequired
};

export default Intro;
