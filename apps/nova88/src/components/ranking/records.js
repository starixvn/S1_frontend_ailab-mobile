import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import RankList from "./rankList";
import { useGetRanking, useHandleSelect, useHandleSelectDay } from "./hook";
import { defBtnsOfCategory, defDayBtns, defEuroDateBtns } from "./def";
import BtnBar from "../common/btnBar";
import { loadingContext } from "../common/context";

const Records = ({
	isOpen,
	i18n,
	userInfo: { isLogin, userName },
	isLastEvent,
	title
}) => {
	const { loading, setLoading } = useContext(loadingContext);
	const currentDate = moment().format("YYYY-MM-DD");
	// const { selected, handleSelect } = useHandleSelect({
	// 	defaultSelect: defBtnsOfCategory.Sports.value,
	// 	isLogin
	// });
	let selected = 0;
	if (moment(currentDate).isBetween("2021-03-13", "2021-04-12")) {
		selected = defEuroDateBtns[2021021].value;
	} else if (moment(currentDate).isBetween("2021-04-13", "2021-05-12")) {
		selected = defEuroDateBtns[2021022].value;
	} else if (moment(currentDate).isBetween("2021-05-13", "2021-06-12")) {
		selected = defEuroDateBtns[2021023].value;
	} else if (moment(currentDate).isAfter("2021-06-12")) {
		selected = defEuroDateBtns[2021024].value;
	}

	const { selectedDay, handleSelectDay } = useHandleSelectDay();
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		BeforeDays: isLastEvent ? 0 : selectedDay,
		isLogin,
		userName,
		setLoading,
		isLastEvent,
		topNum: 9
	});

	return (
		<div className={`records${isOpen ? " open" : ""}`}>
			<div className="title">{title}</div>
			{/* <BtnBar
				title={i18n.lbl_Game_type}
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-records-btnsOfCategory"
				defBtns={defBtnsOfCategory}
				isLogin={isLogin}
			/> */}
			{/* {isLastEvent ? null : (
				<BtnBar
					title={i18n.lbl_Date}
					i18n={i18n}
					selected={selectedDay}
					handleSelect={handleSelectDay}
					mainKey="leader-board-records-dayBtnBar"
					defBtns={defDayBtns}
				/>
			)} */}
			<BtnBar
				title={i18n.lbl_Date}
				i18n={i18n}
				selected={selectedDay}
				handleSelect={handleSelectDay}
				mainKey="leader-board-records-dayBtnBar"
				defBtns={defDayBtns}
			/>
			<RankList
				isLastEvent={isLastEvent}
				loading={loading}
				i18n={i18n}
				datas={datas}
				selected="records"
				lastUpdTime={lastUpdTime}
			/>
		</div>
	);
};

Records.defaultProps = {
	isOpen: false,
	isLastEvent: false,
	title: ""
};

Records.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isOpen: PropTypes.bool,
	isLastEvent: PropTypes.bool,
	title: PropTypes.string
};

export default Records;
