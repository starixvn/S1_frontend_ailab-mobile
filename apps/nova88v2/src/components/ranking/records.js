import React, { useContext } from "react";
import PropTypes from "prop-types";
import RankList from "./rankList";
import { useGetRanking } from "./hook";
import { loadingContext } from "../common/context";
import FunctionList from "./functionList";

const Records = ({
	isOpen,
	i18n,
	userInfo: { userName },
	isLastEvent,
	title
}) => {
	const { loading, setLoading } = useContext(loadingContext);

	const { datas, lastUpdTime, GetRankingDatas } = useGetRanking();

	const getRank = (selected, selectedDay) => {
		GetRankingDatas({
			selected,
			BeforeDays: isLastEvent ? 0 : selectedDay,
			userName,
			setLoading,
			isLastEvent
		});
	};

	return (
		<div className={`records${isOpen ? " active" : ""}`}>
			<div className="title">{title}</div>
			<FunctionList displayDate={!isLastEvent} onSubmit={getRank} />
			<RankList
				isLastEvent={isLastEvent}
				loading={loading}
				i18n={i18n}
				datas={datas}
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
