import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { loadingContext } from "../common/context";
import RankList from "./rankList";
import { useGetRanking } from "./hook";
import { defEuroDateBtns, defEuroTourBtns } from "./def";
import { Prize } from "./prize";

const TournamentPoints = ({ isOpen, userInfo, i18n = {} }) => {
	const { isLogin, userName, currencyId, langId } = userInfo;
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

	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		isLogin,
		userName,
		setLoading,
		selected
	});
	const defPrize = Prize({
		currencyId,
		langId,
		i18n,
		category: defEuroTourBtns.FinalTournament.value
	});

	return (
		<div className={`rankInBox${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_TournamentPoints}</div>
			<div className="eventTitle">
				{i18n.lbl_Sports}, {i18n.lbl_LiveCasino} & {i18n.lbl_Slots}
			</div>
			<RankList
				loading={loading}
				i18n={i18n}
				datas={datas}
				selected=""
				lastUpdTime={lastUpdTime}
				defPrize={defPrize}
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
