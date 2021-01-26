import React, { useContext } from "react";
import PropTypes from "prop-types";
import RankList from "./rankList";
import { useGetRanking, useHandleSelectDay } from "./hook";
import { defDayBtns } from "./def";
import { loadingContext } from "../common/context";
import Dropdown from "../common/dropdown";

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

	const dayPickerOpts = Object.keys(defDayBtns).map(k => {
		return { key: k, ...defDayBtns[k] };
	});

	const selectedIdx = dayPickerOpts.findIndex(x => x.value === selectedDay);

	return (
		<div className={`rankInBox${isOpen ? " open" : ""}`}>
			<div className="title">{title?.toUpperCase()}</div>
			{isLastEvent ? null : (
				<div className="inputBox">
					<Dropdown
						i18n={i18n}
						mainKey="ranking-record-datepicker"
						options={dayPickerOpts}
						selectedIdx={selectedIdx}
						onSelectItem={handleSelectDay}
					/>
				</div>
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
