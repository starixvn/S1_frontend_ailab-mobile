import React from "react";
import champion from "../../styles/img/champion.png";
import RankItems from "./rankItems";
import { useGetRanking, useHandleSelect, useHandleSelectDay } from "./hook";
import { defBtnsOfCategory, defDayBtns } from "./def";
import BtnBar from "./btnBar";
import moment from "moment";

const Records = ({ isOpen, i18n }) => {
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtnsOfCategory.Sports.value
	});
	const { selectedDay, handleSelectDay } = useHandleSelectDay();
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		BeforeDays: selectedDay
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
			<div className="rankList">
				<ul>
					<li>{i18n.lbl_Ranking}</li>
					<li>{i18n.lbl_Username}</li>
					<li>{i18n.lbl_Points}</li>
				</ul>
				<RankItems datas={datas} selected={selected} i18n={i18n} />
			</div>
			<div className="text">
				{i18n.lbl_LastUpdTime?.replace(
					"{{time}}",
					moment(lastUpdTime).format("YYYY-MM-DD H:mm:ss")
				)}
			</div>
		</div>
	);
};

export default Records;
