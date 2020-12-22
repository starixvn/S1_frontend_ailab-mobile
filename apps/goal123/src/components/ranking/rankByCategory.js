import React, { useContext } from "react";
import { defBtns } from "./def";
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

export default Ranking;
