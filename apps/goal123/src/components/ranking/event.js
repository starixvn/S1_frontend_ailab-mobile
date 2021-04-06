import React from "react";
import PropTypes from "prop-types";
import { defEuroTourBtns } from "./def";
import BtnBar from "../common/btnBar";
import { useHandleSelect } from "./hook";
import PrizeList from "./prize";

const Event = ({ userInfo = {}, isOpen, i18n = {} }) => {
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defEuroTourBtns.FinalTournament.value
	});

	return (
		<div className={`rankContent${isOpen ? " open" : ""}`}>
			<div className="title">
				<p>{i18n.lbl_EuroEventTitle1}</p>
				<p>{i18n.lbl_EuroEventTitle2}</p>
			</div>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-records-btnsOfCategory"
				defBtns={defEuroTourBtns}
			/>
			<PrizeList userInfo={userInfo} category={selected} i18n={i18n} />
			<a
				href={`release.goal123.com/SiteSkin/goal123/Ranking/${userInfo.langId}4.html`}
				target="_blank"
				rel="noreferrer"
				className="more">
				{i18n.lbl_MoreDetails}
			</a>
		</div>
	);
};

Event.defaultProps = {
	isOpen: false
};

Event.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isOpen: PropTypes.bool
};

export default Event;
