import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../path";
import eventImg from "../../styles/img/event/box/eventlink.png";
import eventEuro from "../../styles/img/event/box/eventlink_euro.png";
import eventVNImg from "../../styles/img/event/box/eventlink_vn.png";
import { euro_event_time } from "../../datas/productList";
import { isEventPeriod } from "../common/common";

const MysteryBox = ({ userInfo, setMysteryBox }) => {
	const closePop = () => {
		setMysteryBox(false);
	};

	return (
		<div className={`eventLink${userInfo.isLogin ? " afterlogin" : ""}`}>
			<button className="icon icon-close" onClick={closePop} />
			<Link to={path.mysteryBox.root}>
				{isEventPeriod(euro_event_time) ? (
					<img src={eventEuro} alt="Mystery Box" />
				) : (
					<img
						src={userInfo.langId === "vn" ? eventVNImg : eventImg}
						alt="Mystery Box"
					/>
				)}
			</Link>
		</div>
	);
};

MysteryBox.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setMysteryBox: PropTypes.func.isRequired
};

export default MysteryBox;
