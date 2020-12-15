import React, { useContext } from "react";
import RankList from "./rankList";
import { useGetRanking, useHandleSelectDay } from "./hook";
import { defDayBtns } from "./def";
import { loadingContext } from "../common/context";
import Dropdown from "../common/dropdown";

const Records = ({ isOpen, i18n, userInfo: { isLogin, userName } }) => {
	const { loading, setLoading } = useContext(loadingContext);
	const { selectedDay, handleSelectDay } = useHandleSelectDay();
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		BeforeDays: selectedDay,
		isLogin,
		userName,
		setLoading
	});

	const dayPickerOpts = Object.keys(defDayBtns).map(k => {
		return { key: k, ...defDayBtns[k] };
	});

	return (
		<div className={`ranInBox${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Records?.toUpperCase()}</div>
			<div className="inputBox">
				<Dropdown
					i18n={i18n}
					mainKey="ranking-record-datepicker"
					options={dayPickerOpts}
					selectedIdx={selectedDay}
					onSelectItem={handleSelectDay}
				/>
			</div>
			<RankList
				loading={loading}
				i18n={i18n}
				datas={datas}
				lastUpdTime={lastUpdTime}
			/>
		</div>
	);
};

export default Records;
