import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../path";
import { bannerImgUrl } from "../../config";

const LuckyWheel = ({ setLuckyWheel }) => {
	const closePop = () => {
		setLuckyWheel(false);
	};

	return (
		<div className="eventLink wheel">
			<button className="icon icon-close" onClick={closePop} />
			<Link to={`/${path.luckyWheel.root}`}>
				<img
					src={`${bannerImgUrl}/h5/img/event/retention/entrance.gif`}
					alt="luckyWheel"
				/>
			</Link>
		</div>
	);
};

LuckyWheel.propTypes = {
	setLuckyWheel: PropTypes.func.isRequired
};

export default LuckyWheel;
