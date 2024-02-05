import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import RankList from "./rankList";
import {
	useGetRankWithStatus,
	useHandleSelectDay,
	useHandleSelectMonth,
	useHandleSelect,
	useGetMonthRank
} from "./hook";
import { defDayBtns, defBtnsOfCategory, defBtns } from "./def";
import BtnBar from "../common/btnBar";
import { loadingContext } from "../common/context";
import { Prize } from "./prize";
import DropDown from "../common/dropdown";

const Records = ({
	isOpen,
	i18n,
	userInfo: { isLogin, userName, currencyId, langId },
	isLastEvent,
	title
}) => {
	const defPrize = Prize({
		currencyId,
		langId,
		i18n
	});

	const generateMonthItems = () => {
		const today = moment().format("YYYY-MM");
		// * 過去的資料已經不可獲取,故以2024年為查詢起點
		const dataStart = moment("2024-01");
		const dataEnd = moment(today);
		const monthsList = [];

		while (dataEnd >= dataStart) {
			monthsList.push(dataStart.clone());
			dataStart.add(1, "month");
		}

		return monthsList.map((item, idx) => {
			const year = item.format("YYYY");
			const i18nMonth = item.format("M");
			const valueMonth = item.format("MM");
			const str = `${year}-${valueMonth}-01`;
			return {
				value: str,
				id: idx,
				displayText: `${i18n[`lbl_Month${i18nMonth}`]} ${year}`
			};
		});
	};

	const monthItems = generateMonthItems();
	const defaultVal =
		title === defBtns.GamesPoint.displayKey
			? defBtnsOfCategory.Sports.value
			: 0;
	const { loading, setLoading } = useContext(loadingContext);
	const { selectedDay, handleSelectDay } = useHandleSelectDay();
	const { selectedMonth, handleSelectMonth } = useHandleSelectMonth({
		initVal: { selectedVal: monthItems[0]?.value, selectedIdx: 0 }
	});
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defaultVal,
		isLogin
	});
	const { datas, lastUpdTime } = useGetRankWithStatus({
		isOpen,
		BeforeDays: isLastEvent ? 0 : selectedDay,
		isLogin,
		userName,
		setLoading,
		customTopNum: 50,
		selected
	});

	const { monthDatas } = useGetMonthRank({
		isOpen,
		SelectDays: selectedMonth.selectedVal,
		isLogin,
		userName,
		setLoading,
		customTopNum: 30,
		isMonth: true
	});
	const SelectMonth = idx => {
		handleSelectMonth({
			selectedVal: monthItems[idx].value,
			selectedIdx: idx
		});
	};

	return (
		<div className={`rankEvent${isOpen ? " active" : ""}`}>
			<div className="text-blue">{i18n[title]?.toUpperCase()}</div>
			{title === defBtns.Result.displayKey && (
				<DropDown
					i18n={i18n}
					mainKey="rank-Result"
					options={monthItems}
					selectedIdx={selectedMonth.selectedIdx}
					onSelectItem={SelectMonth}
					hideInfo={true}
				/>
			)}

			{title === defBtns.GamesPoint.displayKey && (
				<BtnBar
					title={i18n.lbl_Date}
					i18n={i18n}
					selected={selected}
					handleSelect={handleSelect}
					mainKey="leader-board-records-GPBtnBar"
					defBtns={defBtnsOfCategory}
				/>
			)}

			{title === defBtns.Ranking.displayKey && (
				<BtnBar
					title={i18n.lbl_Date}
					i18n={i18n}
					selected={selectedDay}
					handleSelect={handleSelectDay}
					mainKey="leader-board-records-rankBtnBar"
					defBtns={defDayBtns}
				/>
			)}

			<RankList
				isLastEvent={isLastEvent}
				loading={loading}
				i18n={i18n}
				datas={title === defBtns.Result.displayKey ? monthDatas : datas}
				selected="records"
				lastUpdTime={lastUpdTime}
				defPrize={defPrize}
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
