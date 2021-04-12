import React, { useContext } from "react";
import PropTypes from "prop-types";
import { defEuroDateBtns, defEuroTourBtns } from "./def";
import { useGetRanking, useHandleSelect } from "./hook";
import RankList from "./rankList";
import { loadingContext, defNavPanel } from "../common/context";
import BtnBar from "../common/btnBar";
import { Prize } from "./prize";

const Final = ({
	isOpen,
	i18n = {},
	userInfo: { isLogin, userName, currencyId, langId }
}) => {
	const defPrize = Prize({
		currencyId,
		langId,
		i18n,
		category: defEuroTourBtns.FinalTournament.value
	});
	const { loading, setLoading } = useContext(loadingContext);

	const handleLogin = () => {
		setNav(defNavPanel.login);
	};

	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defEuroDateBtns[2021022].value,
		handleLogin,
		isLogin
	});
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		isLogin,
		userName,
		setLoading
	});

	return (
		<div className={`rankContent${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Final}</div>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="euroFinal-date-btnBar"
				defBtns={defEuroDateBtns}
				isLogin={isLogin}
			/>
			<RankList
				loading={loading}
				i18n={i18n}
				datas={datas}
				selected={selected}
				lastUpdTime={lastUpdTime}
				defPrize={defPrize}
			/>
		</div>
	);
};

Final.defaultProps = {
	isOpen: false
};

Final.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isOpen: PropTypes.bool
};

export default Final;
