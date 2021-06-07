import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { rootContext } from "../common/context";
import path from "../../path";
import eventImg from "../../styles/img/mystery/homeImg.png";
import eventImgVN from "../../styles/img/mystery/homeImg_vn.png";
import { isEventPeriod } from "../common/common";
import { euro_event_time } from "../../datas/productList";
import eventImgEuro from "../../styles/img/BW215x231popup.png";

const MysteryBox = ({ langId }) => {
	const { root, setRoot } = useContext(rootContext);
	const closePop = () => {
		setRoot(false);
	};

	return root ? (
		<div className="mystery_module">
			<div className="mystery_close" onClick={closePop}>
				X
			</div>
			<Link to={path.mysteryBox.root}>
				{isEventPeriod(euro_event_time) ? (
					<img
						src={eventImgEuro}
						className="mystery"
						alt="Mystery Box"
					/>
				) : (
					<img
						src={userInfo.langId === "vn" ? eventImgVN : eventImg}
						alt="Mystery Box"
					/>
				)}
			</Link>
		</div>
	) : null;
};

MysteryBox.propTypes = {
	langId: PropTypes.string.isRequired
};

export default MysteryBox;
