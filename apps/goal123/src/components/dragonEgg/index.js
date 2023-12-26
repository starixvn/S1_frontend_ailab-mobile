import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import Task from "./task";
import Blessing from "./blessing";
import History from "./history";
import Info from "./info";

const DragonEgg = () => {
	const {
		userInfo: { isLogin, langId }
	} = useContext(userInfoContext);

	return (
		<>
			<img
				className="event-banner"
				src={`${bannerImgUrl}/h5/img/event/dragonegg/bn-${langId}.png`}
				alt="event-banner"
			/>
			{isLogin && (
				<>
					<Task />
					<Blessing />
					<History />
				</>
			)}
			<Info />
		</>
	);
};

export default DragonEgg;
