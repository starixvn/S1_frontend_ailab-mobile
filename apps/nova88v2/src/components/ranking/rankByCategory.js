import React, { useContext } from "react";
import PropTypes from "prop-types";
import { defBtns } from "./def";
import { useGetRanking } from "./hook";
import RankList from "./rankList";
import { loadingContext } from "../common/context";

const Ranking = ({
	isOpen,
	selected,
	i18n = {},
	userInfo: { isLogin, userName }
}) => {
	const { loading, setLoading } = useContext(loadingContext);
	const title = i18n[defBtns[selected]?.titleKey];
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		isLogin,
		userName,
		setLoading
	});

	return (
		<div className={`champion${isOpen ? " open" : ""}`}>
			<div className="title">{title}</div>
			<RankList
				loading={loading}
				i18n={i18n}
				datas={datas}
				selected={selected}
				lastUpdTime={lastUpdTime}
			/>
		</div>
	);
};

Ranking.defaultProps = {
	isOpen: false,
	selected: ""
};

Ranking.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isOpen: PropTypes.bool,
	selected: PropTypes.string
};

export default Ranking;
