import React from "react";

export const defStep = {
	initPanel: 1,
	bankPanel: 2,
	accountPanel: 3
};

const stepDesc = [
	{
		descriptionKey: "lbl_Bank_Step_1"
	},
	{
		descriptionKey: "lbl_Bank_Step_2"
	},
	{
		descriptionKey: "lbl_Bank_Step_3"
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
