import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { loadingContext } from "../common/context";
import RankList from "./rankList";
import { useGetRanking } from "./hook";
import { defEuroDateBtns } from "./def";

const TournamentPoints = ({ isOpen, userInfo, i18n = {} }) => {
	const { isLogin, userName, currencyId, langId } = userInfo;
	const { loading, setLoading } = useContext(loadingContext);
	const currentDate = moment().format("YYYY-MM-DD");

	let selected = "2021021";
	if (moment(currentDate).isBetween("2021-03-13", "2021-04-12")) {
		selected = defEuroDateBtns[2021021].value;
	} else if (moment(currentDate).isBetween("2021-04-13", "2021-05-12")) {
		selected = defEuroDateBtns[2021022].value;
	} else if (moment(currentDate).isBetween("2021-05-13", "2021-06-12")) {
		selected = defEuroDateBtns[2021023].value;
	} else if (moment(currentDate).isAfter("2021-06-12")) {
		selected = defEuroDateBtns[2021024].value;
	}

	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		isLogin,
		userName,
		setLoading,
		selected
	});

	return (
		<div className={`champion${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_TournamentPoints}</div>
			<div className="eventTitle">
				{i18n.lbl_Sports}, {i18n.lbl_LiveCasino} & {i18n.lbl_Casino}
			</div>
			<RankList
				loading={loading}
				i18n={i18n}
				datas={datas}
				selected=""
				lastUpdTime={lastUpdTime}
				currencyId={currencyId}
				langId={langId}
			/>
		</div>
	);
};
TournamentPoints.defaultProps = {
	isOpen: false
};

TournamentPoints.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isOpen: PropTypes.bool
};

export default TournamentPoints;
