import React, { useContext } from "react";
import { i18nContext } from "../components/common/context";
import Event from "../components/ranking/event";
import Ranking from "../components/ranking/ranking";
import Record from "../components/ranking/records";
import { defBtns, defElemType } from "../components/ranking/def";
import { useHandleSelect } from "../components/ranking/hook";
import BtnBar from "../components/ranking/btnBar";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtns.Event.value
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
			/>
			<Event
				isOpen={defBtns[selected].elemType === defElemType.Event}
				i18n={i18n}
			/>
			<Ranking
				isOpen={defBtns[selected].elemType === defElemType.Ranking}
				selected={selected}
				i18n={i18n}
			/>
			<Record
				isOpen={defBtns[selected].elemType === defElemType.Record}
				i18n={i18n}
			/>
		</>
	);
};
