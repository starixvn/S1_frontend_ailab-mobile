import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "Context";
import { CurrenciesEnum } from "@ailab-mobile/common";
import { defPayment } from "./deposit.def";

const Options = ({ i18n, selectedOption, handleSelect, paymentList }) => {
	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);

	const rows = Object.keys(defPayment)
		.filter(key => paymentList[key]?.length > 0)
		.map(key => {
			const pay = defPayment[key];

			// 10/29/24 調整vnd時候的quick bank 顯示為 bank transfer
			const finalDisplayLabelKey =
				currencyId === CurrenciesEnum.VN &&
				pay.displayKey === "lbl_DepositType9"
					? "lbl_DepositType3"
					: pay.displayKey;

			return (
				<div key={key} onClick={handleSelect.bind(this, key)}>
					<div
						className={`bankName${
							selectedOption === key ? " active" : ""
						}`}>
						<div className={pay.icon} />
						<i className="icon icon-icon32px_check" />
					</div>
					<div className="subtitle">{i18n[finalDisplayLabelKey]}</div>
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
