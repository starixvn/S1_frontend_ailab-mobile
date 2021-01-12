import React from "react";
import PropTypes from "prop-types";
import { defBtnsOfCategory } from "./def";
import BtnBar from "../common/btnBar";
import { useHandleSelect } from "./hook";
import PrizeList from "./prize";
import config from "../../config";

const Event = ({ userInfo = {}, isOpen, i18n = {} }) => {
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtnsOfCategory.Sports.value
	});

	return (
		<div className={`rankEvent${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Event}</div>
			<div className="eventTitle">{i18n.lbl_EventTitle}</div>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-records-btnsOfCategory"
				defBtns={defBtnsOfCategory}
			/>
			<PrizeList userInfo={userInfo} category={selected} i18n={i18n} />
			<div className="btn-group">
				<a
					href={`${
						config.cloudImgURL
					}/NovaPromotion/iPhone12Giveaway/${userInfo.langId?.toUpperCase()}.html`}
					target="_blank"
					rel="noreferrer"
					className="orange openPopup">
					{i18n.lbl_MoreDetails}
				</a>
			</div>
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
