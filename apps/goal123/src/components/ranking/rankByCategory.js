import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useGetRanking } from "./hook";
import RankList from "./rankList";
import { loadingContext } from "../common/context";

const Ranking = ({ isOpen, i18n = {}, userInfo: { isLogin, userName } }) => {
	const { loading, setLoading } = useContext(loadingContext);
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		isLogin,
		userName,
		setLoading
	});

	return (
		<div className={`rankContent${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Ranking?.toUpperCase()}</div>
			<RankList
				loading={loading}
				i18n={i18n}
				datas={datas}
				lastUpdTime={lastUpdTime}
			/>
		</div>
	);
};

Ranking.defaultProps = {
	isOpen: null
};

Ranking.propTypes = {
	isOpen: PropTypes.bool,
	userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Ranking;
