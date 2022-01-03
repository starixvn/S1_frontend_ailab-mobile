import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import RankList from "./rankList";
import { useGetRanking, useHandleSelectDay } from "./hook";
import { defDayBtns, defEuroDateBtns, defEuroTourBtns } from "./def";
import BtnBar from "../common/btnBar";
import { loadingContext } from "../common/context";
import { Prize } from "./prize";

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
		i18n,
		category: defEuroTourBtns.FinalTournament.value
	});
	const { loading, setLoading } = useContext(loadingContext);
	const currentDate = moment().format("YYYY-MM-DD");
	let selected = "2021022";
	if (moment(currentDate).isBetween("2021-04-13", "2021-05-12")) {
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
		i18n
	});

	return (
		<div className={`rankContent${isOpen ? " open" : ""}`}>
			<div className="title">{i18n[title]}</div>
			<BtnBar
				title={i18n.lbl_Tournament}
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
