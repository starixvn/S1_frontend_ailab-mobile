import React, { useContext } from "react";
import { Link } from "@reach/router";
import { rootContext } from "../common/context";
import path from "../../path";
import { bannerImgUrl } from "../../config";

const LuckyWheel = ({ setLuckyWheel }) => {
	const { root } = useContext(rootContext);
	const closePop = () => {
		setLuckyWheel(false);
	};

	return (
		root && (
			<div className="eventLink luckywheel">
				<button className="icon-close-white-bg" onClick={closePop}>
					X
				</button>
				<Link to={`/${path.luckyWheel.root}`}>
					<img
						src={`${bannerImgUrl}/h5/img/4.0/luckywheel.gif`}
						alt="luckyWheel"
					/>
				</Link>
			</div>
		)
	);
};

export default LuckyWheel;
