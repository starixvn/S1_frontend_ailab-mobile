import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import Task from "./task";
import Blessing from "./blessing";
import History from "./history";
import Info from "./info";

const DragonEgg = () => {
	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);

	return (
		<>
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
