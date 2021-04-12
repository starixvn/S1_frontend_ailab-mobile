import React from "react";
import PropTypes from "prop-types";
import { defEuroTourBtns } from "./def";
import BtnBar from "../common/btnBar";
import { useHandleSelect } from "./hook";
import PrizeList from "./prize";
import config from "../../config";

const Event = ({ userInfo = {}, isOpen, i18n = {} }) => {
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defEuroTourBtns.FinalTournament.value
	});

	return (
		<div className={`rankInBox${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Event}</div>
			<div className="textBox">
				{selected === defEuroTourBtns.FinalTournament.value ? (
					<>
						<p>{i18n.lbl_EuroEventTitle1}</p>
						<p>{i18n.lbl_EuroEventTitle2}</p>
					</>
				) : (
					<p>{i18n.lbl_MonthlyTournament}</p>
				)}
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
				href={`${config.t_and_cURL}/SiteSkin/Bwing/Ranking/UEFAEuro-${userInfo.langId}.html`}
				target="_blank"
				rel="noreferrer"
				className="remind btn">
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
