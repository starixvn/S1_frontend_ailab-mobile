import React from "react";

const totalStep = 3;
const Panel = ({ step = 1, total = totalStep }) => {
	const processBar =
		step === 1 ? (
			<div />
		) : step === 2 ? (
			<div className="stepBar50" />
		) : (
			<div className="stepBar100" />
		);

	const rows = [];
	for (let s = 1; s <= total; s++) {
		rows.push(
			<div key={`step-${s}`} className="circle">
				<div>
					{s <= step ? (
						<div className="icon icon-checkmark" />
					) : (
						<div>{s}</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="step">
			<div className="stepLine">{processBar}</div>
			{rows}
		</div>
	);
};

export default Panel;
