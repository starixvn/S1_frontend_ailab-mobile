import React from "react";
import PropTypes from "prop-types";

const totalStep = 3;
const Panel = ({ step, total = totalStep }) => {
	let processBar = null;
	if (step === 1) {
		processBar = <div />;
	} else if (step === 2) {
		processBar = <div className="stepBar50" />;
	} else {
		processBar = <div className="stepBar100" />;
	}

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

Panel.defaultProps = {
	total: 1
};

Panel.propTypes = {
	step: PropTypes.number.isRequired,
	total: PropTypes.number
};

export default Panel;
