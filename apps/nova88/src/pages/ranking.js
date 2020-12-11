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
import BtnBar from "../components/ranking/btnBar";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);

	const handleLogin = () => {
		setNav(defNavPanel.login);
	};
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtns.Event.value,
		handleLogin: handleLogin,
		isLogin: isLogin
	});

	return (
		<>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-btnBar"
				defBtns={defBtns}
				btnListClass="tagBtn"
				isLogin={isLogin}
			/>
			<Event
				isOpen={defBtns[selected].elemType === defElemType.Event}
				i18n={i18n}
			/>
			<RankingByCategory
				isOpen={defBtns[selected].elemType === defElemType.Ranking}
				selected={selected}
				i18n={i18n}
				isLogin={isLogin}
			/>
			<Record
				isOpen={defBtns[selected].elemType === defElemType.Record}
				i18n={i18n}
				isLogin={isLogin}
			/>
		</>
	);
};
