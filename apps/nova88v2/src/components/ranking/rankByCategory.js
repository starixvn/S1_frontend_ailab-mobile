import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { defBtns } from "./def";
import { useGetRanking } from "./hook";
import RankList from "./rankList";
import { loadingContext } from "../common/context";
import no1 from "../../styles/img/champion.png";

const Ranking = ({
	isOpen,
	selected,
	i18n = {},
	userInfo: { isLogin, userName }
}) => {
	const { loading, setLoading } = useContext(loadingContext);
	const title = i18n[defBtns[selected]?.titleKey];
	const { datas, lastUpdTime, GetRankingDatas } = useGetRanking();

	useEffect(() => {
		GetRankingDatas({
			selected,
			userName,
			setLoading
		});
	}, [isOpen, selected]);

	return (
		<div className={`champion${isOpen ? " active" : ""}`}>
			<div className="title">{title}</div>
			{datas?.length > 0 && (
				<div className="userRankInfo">
					<img src={no1} alt="champion" />
					<div className="userRank">
						TOP 1<span>{datas[0]?.userName}</span>
					</div>
				</div>
			)}
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
