import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../path";
import spinImg from "../../styles/img/event/wheel/eventlink/spin.png";
import spinVNImg from "../../styles/img/event/wheel/eventlink/spin_vn.png";
import inner from "../../styles/img/event/wheel/eventlink/inner.png";

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
					src={userInfo.langId === "vn" ? spinVNImg : spinImg}
					alt="luckyWheel"
				/>
				<img className="inner" src={inner} alt="luckyWheel" />
			</Link>
		</div>
	);
};

LuckyWheel.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setLuckyWheel: PropTypes.func.isRequired
};

export default LuckyWheel;
