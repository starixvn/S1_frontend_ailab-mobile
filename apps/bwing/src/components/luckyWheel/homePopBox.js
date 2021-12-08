import React, { useContext } from "react";
import { Link } from "@reach/router";
import { rootContext } from "../common/context";
import path from "../../path";
import luckwheel from "../../styles/img/luckybox/homeImg.png";
import luckwheelw from "../../styles/img/luckybox/homeImg-w.png";

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
						src={luckwheel}
						alt="luckyWheel"
					/>
					<img
						className="luckwheelw"
						src={luckwheelw}
						alt="luckyWheel"
					/>
				</Link>
			</div>
		)
	);
};

export default LuckyWheel;
