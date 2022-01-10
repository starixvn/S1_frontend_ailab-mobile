import React, { useContext } from "react";
import { Link } from "@reach/router";
import { rootContext } from "../common/context";
import path from "../../path";
import { bannerImgUrl } from "../../config";

const LuckyWheel = ({ setLuckyWheel }) => {
	const { root, setRoot } = useContext(rootContext);
	const closePop = () => {
		setLuckyWheel(false);
		setRoot(false);
	};

	return (
		root && (
			<div className="wheelModuel">
				<button className="icon_close" onClick={closePop}>
					X
				</button>
				<Link to={`/${path.luckyWheel.root}`}>
					<img
						className="luckwheel"
						src={`${bannerImgUrl}/h5/img/luckybox/homeImg.png`}
						alt="luckyWheel"
					/>
					<img
						className="luckwheelw"
						src={`${bannerImgUrl}/h5/img/luckybox/homeImg-w.png`}
						alt="luckyWheel"
					/>
				</Link>
			</div>
		)
	);
};

export default LuckyWheel;
