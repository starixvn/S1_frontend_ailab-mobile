import React, { useState } from "react";
import PropTypes from "prop-types";
import { defBtnsOfCategory } from "./def";
import PrizeList from "./prize";
import config from "../../config";
import FunctionList from "./functionList";

const Event = ({ userInfo = {}, isOpen, i18n = {} }) => {
	const [state, setState] = useState(defBtnsOfCategory.Sports.value);

	const saveSelected = selected => {
		setState(selected);
	};

	return (
		<div className={`rankEvent${isOpen ? " active" : ""}`}>
			<div className="title">{i18n.lbl_Event}</div>
			<FunctionList setSelectedGame={saveSelected} />
			<PrizeList userInfo={userInfo} category={state} i18n={i18n} />
			<div className="btn-group">
				<a
					href={`${
						config.cloudImgURL
					}/NovaPromotion/year-of-OX/${userInfo.langId?.toUpperCase()}.html`}
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
