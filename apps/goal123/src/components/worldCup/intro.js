import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";
import { bannerImgUrl } from "../../config";

const Intro = ({ scrollToEvent }) => {
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<div className="eventPage__top">
				<div className="awards">
					<div>{i18n.lbl_totalPrizePool}</div>
				</div>
				<div className="visual">
					<img
						className="a-bottom"
						src={`${bannerImgUrl}/h5/img/event/worldcup/athlete.png`}
						alt=""
					/>
					<img
						className="logo"
						src={`${bannerImgUrl}/img/worldcup/logo.png`}
						alt=""
					/>
				</div>
			</div>
			<div className="eventPage__middle">
				<div className="intro-visual__body">
					<img
						src={`${bannerImgUrl}/h5/img/event/worldcup/intro.png`}
						alt=""
					/>
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
