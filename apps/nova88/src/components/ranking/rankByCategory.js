import React, { useContext } from "react";
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
			<div className="eventTitle">{i18n.lbl_Ranking_Top10}</div>
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

export default Ranking;
