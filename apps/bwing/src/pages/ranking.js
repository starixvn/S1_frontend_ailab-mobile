import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../components/common/context";
import Event from "../components/ranking/event";
import Final from "../components/ranking/final";
import Record from "../components/ranking/records";
import { defBtns, defElemType, defEuroBtns } from "../components/ranking/def";
import { useHandleSelect } from "../components/ranking/hook";
import useHandleLogin from "../components/hook/useHandleLogin";
import BtnBar from "../components/common/btnBar";
import TournamentPoints from "../components/ranking/tournamentPoints";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { isLogin } = userInfo;

	const { handleLogin } = useHandleLogin();
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtns.Event.value,
		handleLogin,
		isLogin
	});

	return (
		<>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-btnBar"
				defBtns={defEuroBtns}
				btnListClass="rankBotton"
				isLogin={isLogin}
			/>
			<Event
				isOpen={defEuroBtns[selected].elemType === defElemType.Event}
				i18n={i18n}
				userInfo={userInfo}
			/>
			<Final
				isOpen={defEuroBtns[selected].elemType === defElemType.Final}
				i18n={i18n}
				userInfo={userInfo}
			/>
			<TournamentPoints
				isOpen={
					defEuroBtns[selected].elemType === defElemType.Tournament
				}
				i18n={i18n}
				userInfo={userInfo}
			/>
			<Record
				isOpen={defEuroBtns[selected].elemType === defElemType.Record}
				i18n={i18n}
				userInfo={userInfo}
				title="lbl_Records"
			/>
		</>
	);
};
