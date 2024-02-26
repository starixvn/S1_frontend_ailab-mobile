import React from "react";
import PropTypes from "prop-types";
import { defPayment } from "./deposit.def";

const Options = ({ i18n, selectedOption, handleSelect, paymentList }) => {
	const rows = Object.keys(defPayment)
		.filter(key => paymentList[key]?.length > 0)
		.map(key => {
			const pay = defPayment[key];
			return (
				<div
					key={key}
					onClick={() => {
						handleSelect(key);
					}}>
					<div
						className={`bankName${
							selectedOption === key ? " active" : ""
						}`}>
						<div className={pay.icon} />
						<i className="icon icon-icon32px_check" />
					</div>
					<div className="subtitle">{i18n[pay.displayKey]}</div>
				</div>
			);
		});

	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{i18n.lbl_DepositOptions}
			</div>
			<div className="selectModule">{rows}</div>
		</>
	);
};

Options.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	selectedOption: PropTypes.string.isRequired,
	handleSelect: PropTypes.func.isRequired,
	paymentList: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Options;
