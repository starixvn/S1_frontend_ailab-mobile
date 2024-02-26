import React from "react";
import PropTypes from "prop-types";
import { defPayType, defPayment } from "./deposit.def";

const Options = ({ i18n, selected, paymentList, handleSelect }) => {
	const rows = Object.keys(defPayment)
		.filter(
			key => paymentList[key]?.length > 0 || paymentList[key]?.openLink
		)
		.map(key => {
			const payment = defPayment[key];

			return (
				<div
					key={key}
					onClick={() => {
						handleSelect(key);
					}}>
					<div
						className={`bankName
						${selected === key ? " active" : ""}
						${key === defPayType.autoDeposit ? " fast" : ""}`}>
						<div className={payment.icon} />
						<i className="icon icon-icon32px_check" />
					</div>
					<div className="subtitle">{i18n[payment.displayKey]}</div>
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
	selected: PropTypes.string.isRequired,
	paymentList: PropTypes.objectOf(PropTypes.any).isRequired,
	handleSelect: PropTypes.func.isRequired
};

export default Options;
