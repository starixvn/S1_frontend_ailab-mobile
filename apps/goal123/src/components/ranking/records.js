import React, { useContext } from "react";
import PropTypes from "prop-types";
import RankList from "./rankList";
import { useGetRanking, useHandleSelectDay } from "./hook";
import { defDayBtns } from "./def";
import { loadingContext } from "../common/context";
import BtnBar from "../common/btnBar";

const Records = ({
	isOpen,
	i18n,
	userInfo: { isLogin, userName },
	isLastEvent = false,
	title = ""
}) => {
	const { loading, setLoading } = useContext(loadingContext);
	const { selectedDay, handleSelectDay } = useHandleSelectDay();
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		BeforeDays: isLastEvent ? 0 : selectedDay,
		isLogin,
		userName,
		setLoading,
		isLastEvent
	});

	return (
		<div className={`rankContent${isOpen ? " open" : ""}`}>
			<div className="title">{title?.toUpperCase()}</div>
			{isLastEvent ? null : (
				<BtnBar
					i18n={i18n}
					selected={selectedDay}
					handleSelect={handleSelectDay}
					mainKey="leader-board-records-dayBtnBar"
					defBtns={defDayBtns}
					btnListClass="dateSelector"
				/>
			)}
			<RankList
				loading={loading}
				i18n={i18n}
				datas={datas}
				lastUpdTime={lastUpdTime}
				isLastEvent={isLastEvent}
			/>
		</div>
	);
};

Records.defaultProps = {
	isOpen: null
};

Records.propTypes = {
	isOpen: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Records;
