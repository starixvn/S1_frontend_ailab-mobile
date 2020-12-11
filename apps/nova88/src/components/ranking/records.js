import React from "react";
import champion from "../../styles/img/champion.png";
import RankList from "./rankList";
import { useGetRanking, useHandleSelect, useHandleSelectDay } from "./hook";
import { defBtnsOfCategory, defDayBtns } from "./def";
import BtnBar from "./btnBar";

const Records = ({ isOpen, i18n, isLogin }) => {
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtnsOfCategory.Sports.value,
		isLogin
	});
	const { selectedDay, handleSelectDay } = useHandleSelectDay();
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		BeforeDays: selectedDay,
		isLogin
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
			<div className="highest">
				<img src={champion} alt="champion" />
				{/* <div className="mwt_border">
					<span className="arrow_t_int"></span>
					<span className="arrow_t_out"></span>
					<div className="text-org">MYR 10,000,000.00</div>
				</div> */}
			</div>
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
