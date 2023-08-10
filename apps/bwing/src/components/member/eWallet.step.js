import React from "react";
import PropTypes from "prop-types";

export const defStep = {
	initPanel: 1,
	eWalletPanel: 2,
	eWalletAccountPanel: 3
};

const stepDesc = [
	{
		descriptionKey: "lbl_E-Wallet_Step_1"
	},
	{
		descriptionKey: "lbl_E-Wallet_Step_2"
	},
	{
		descriptionKey: "lbl_E-Wallet_Step_3"
	}
];

const Panel = ({ step, i18n }) => {
	const rows = stepDesc.map((s, idx) => {
		return (
			<div
				key={`step-${idx}`}
				className={`process${idx + 1 <= step ? " active" : ""}`}>
				<span>{i18n[s.descriptionKey]}</span>
			</div>
		);
	});

	return (
		<div className="processArea" data-testid="step">
			{rows}
		</div>
	);
};

Panel.propTypes = {
	step: PropTypes.number.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Panel;
