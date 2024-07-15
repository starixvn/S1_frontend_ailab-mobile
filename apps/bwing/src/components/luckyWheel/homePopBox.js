import React, { useContext } from "react";
import { Link } from "@reach/router";
import classNames from "classnames";
import { isDateRange } from "@ailab-mobile/common";
import { rootContext } from "../common/context";
import path from "../../path";
import { bannerImgUrl } from "../../config";
import { eventTime } from "../common/eventTime";

const LuckyWheel = ({ setLuckyWheel }) => {
	const { root } = useContext(rootContext);
	const closePop = () => {
		setLuckyWheel(false);
	};

	return (
		root && (
			<div
				className={classNames("eventLink luckywheel", {
					eurocup: isDateRange(eventTime.euroCup)
				})}>
				<button className="icon-close-white-bg" onClick={closePop} />
				<Link to={`/${path.luckyWheel.root}`}>
					<img
						src={`${bannerImgUrl}/h5/img/event/retention/entrance.webp`}
						alt="luckyWheel"
					/>
				</Link>
			</div>
		)
	);
};

export default LuckyWheel;
