import React from "react";

const stepDesc = [
	{
		descriptionKey: "lbl_SelectPaymentMethods"
	},
	{
		descriptionKey: "lbl_Step_SelectBank"
	},
	{
		descriptionKey: "lbl_EnterAmount"
	},
	{
		descriptionKey: "lbl_Confirm"
	}
];

const Panel = ({ step, i18n }) => {
	let rows = stepDesc.map((s, idx) => {
		return (
			<div
				key={`step-${idx}`}
				className={`process${idx + 1 <= step ? " active" : ""}`}>
				<span>{i18n[s.descriptionKey]}</span>
			</div>
		);
	});

	return <div className="processArea">{rows}</div>;
};

export default Panel;
