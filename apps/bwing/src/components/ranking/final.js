import React, { useContext } from "react";
import PropTypes from "prop-types";
import { defEuroDateBtns, defEuroTourBtns } from "./def";
import { useGetRanking, useHandleSelect } from "./hook";
import RankList from "./rankList";
import { loadingContext, defNavPanel, navContext } from "../common/context";
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
	const { setNav } = useContext(navContext);
	const { loading, setLoading } = useContext(loadingContext);
	const handleLogin = () => {
		setNav(defNavPanel.login);
	};

	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defEuroDateBtns[2021022].value,
		handleLogin,
		isLogin
	});

	// 	{key: "2021022", displayKey: "lbl_EuroDate2", value: "2021022", elemType: "EuroDate2"}
	// 1: {key: "2021023", displayKey: "lbl_EuroDate3", value: "2021023", elemType: "EuroDate3"}
	// 2: {key: "2021024", displayKey: "lbl_Final", value: "2021024", elemType: "EuroDate4"}

	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		isLogin,
		userName,
		setLoading
	});

	return (
		<div className={`rankInBox${isOpen ? " open" : ""}`}>
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
