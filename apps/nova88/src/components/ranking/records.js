import React from "react";
import RankList from "./rankList";
import { useGetRanking, useHandleSelect, useHandleSelectDay } from "./hook";
import { defBtnsOfCategory, defDayBtns } from "./def";
import BtnBar from "../common/btnBar";

const Records = ({ isOpen, i18n, userInfo: { isLogin, userName } }) => {
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtnsOfCategory.Sports.value,
		isLogin
	});
	const { selectedDay, handleSelectDay } = useHandleSelectDay();
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		BeforeDays: selectedDay,
		isLogin,
		userName
	});

	return (
		<div className={`records${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Records}</div>
			<div className="text">{i18n.lbl_Game_type}</div>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-records-btnsOfCategory"
				defBtns={defBtnsOfCategory}
				isLogin={isLogin}
			/>
			<div className="text">{i18n.lbl_Date}</div>
			<BtnBar
				i18n={i18n}
				selected={selectedDay}
				handleSelect={handleSelectDay}
				mainKey="leader-board-records-dayBtnBar"
				defBtns={defDayBtns}
			/>
			<RankList
				i18n={i18n}
				datas={datas}
				selected={selected}
				lastUpdTime={lastUpdTime}
			/>
		</div>
	);
};

export default Records;
