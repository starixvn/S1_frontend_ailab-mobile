import React from "react";
import PropTypes from "prop-types";
import { knockoutsEvent, matchType } from "./fixture.matches.def";

const Prize = ({ matches, event, clickMatchType, i18n }) => {
	const knockoutData = Object.values(knockoutsEvent).find(
		el => el.eventName === event
	);

	return (
		<>
			<div className="group-prize">
				{matches === matchType.knockouts && knockoutData ? (
					<div className="prize">
						<div className="subtitle">
							{i18n[knockoutData.displayKey]}
						</div>
						<div>VND {knockoutData?.prize}</div>
					</div>
				) : (
					<>
						<div className="prize">
							<div className="subtitle">
								{i18n.lbl_groupStage1st}
							</div>
							<div>VND 178,000,000</div>
						</div>
						<div className="prize">
							<div className="subtitle">
								{i18n.lbl_groupStage2nd}
							</div>
							<div>VND 85,000,000</div>
						</div>
					</>
				)}
			</div>
			<div className="group-tab">
				<button
					className={matches === matchType.groups ? "active" : ""}
					onClick={clickMatchType.bind(this, matchType.groups)}>
					{i18n.lbl_group}
				</button>
				<button
					className={matches === matchType.knockouts ? "active" : ""}
					onClick={clickMatchType.bind(this, matchType.knockouts)}>
					{i18n.lbl_knockouts}
				</button>
			</div>
		</>
	);
};

Prize.defaultProps = {
	matches: null,
	event: null,
	clickMatchType: () => null,
	i18n: null
};

Prize.propTypes = {
	matches: PropTypes.string,
	event: PropTypes.string,
	clickMatchType: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string)
};

export default Prize;
