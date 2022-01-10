import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../path";
import { bannerImgUrl } from "../../config";

const LuckyWheel = ({ userInfo, setLuckyWheel }) => {
	const closePop = () => {
		setLuckyWheel(false);
	};

	return (
		<div className="eventLink wheel">
			<button className="icon icon-close" onClick={closePop} />
			<Link to={`/${path.luckyWheel.root}`}>
				<img
					className="spin"
					src={
						userInfo.langId === "vn"
							? `${bannerImgUrl}/h5/img/event/wheel/eventlink/spin_vn.png`
							: `${bannerImgUrl}/h5/img/event/wheel/eventlink/spin.png`
					}
					alt="luckyWheel"
				/>
				<img
					className="inner"
					src={`${bannerImgUrl}/h5/img/event/wheel/eventlink/inner.png`}
					alt="luckyWheel"
				/>
			</Link>
		</div>
	);
};

LuckyWheel.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setLuckyWheel: PropTypes.func.isRequired
};

export default LuckyWheel;
