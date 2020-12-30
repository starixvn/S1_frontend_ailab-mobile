import React, { useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "../components/common/context";
import Event from "../components/ranking/event";
import RankingByCategory from "../components/ranking/rankByCategory";
import Record from "../components/ranking/records";
import { defBtns, defElemType } from "../components/ranking/def";
import { useHandleSelect } from "../components/ranking/hook";
import BtnBar from "../components/common/btnBar";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { isLogin } = userInfo;

	const handleLogin = () => {
		setNav(defNavPanel.login);
	};
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtns.Event.value,
		handleLogin: handleLogin,
		isLogin
	});

	return (
		<>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-btnBar"
				defBtns={defBtns}
				isLogin={isLogin}
			/>
			<Event
				isOpen={defBtns[selected].elemType === defElemType.Event}
				i18n={i18n}
				userInfo={userInfo}
			/>
			<RankingByCategory
				isOpen={defBtns[selected].elemType === defElemType.Ranking}
				i18n={i18n}
				userInfo={userInfo}
			/>
			<Record
				isOpen={defBtns[selected].elemType === defElemType.Record}
				i18n={i18n}
				userInfo={userInfo}
			/>
		</>
	);
};
