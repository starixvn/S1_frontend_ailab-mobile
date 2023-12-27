import React, { useState, useContext } from "react";
import { Link } from "@Router";
import { userInfoContext } from "Context";
import { cloudBannerImgURL } from "../../config";
import path from "../../path";

const DragonEggPop = () => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);

	const [isSohow, setIsShow] = useState(true);

	return (
		isSohow && (
			<div className="eventLink dragonegg-float">
				<button
					className="icon icon-close"
					onClick={() => {
						setIsShow(prev => !prev);
					}}
				/>
				<Link
					className="wheelModule dragonegg-egg"
					to={path.dragonEgg.root}>
					<img
						className="dragonegg-egg-img"
						src={`${cloudBannerImgURL}/h5/img/event/dragonegg/entrance-${langId}.png`}
						alt="entrance"
					/>
				</Link>
			</div>
		)
	);
};

export default DragonEggPop;
