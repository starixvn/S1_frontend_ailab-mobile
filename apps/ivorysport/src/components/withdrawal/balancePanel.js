import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const BalancePanel = ({ currencyId, i18n, balanceInfo, _isConvert }) => {
	return (
		<div className="formula">
			<div>
				<div />
				<div>
					<div>{i18n.lbl_Balance}</div>
					<div>
						{i18n[`Currency_${currencyId}`]}
						<span>
							{number_format(
								balanceInfo?.balance ?? 0,
								_isConvert
							)}
						</span>
					</div>
				</div>
			</div>
			<div>
				<div>-</div>
				<div>
					<div>{i18n.lbl_Deduction}</div>
					<div>
						{i18n[`Currency_${currencyId}`]}
						<span>
							{number_format(
								balanceInfo?.deduction ?? 0,
								_isConvert
							)}
						</span>
					</div>
				</div>
			</div>
			<div>
				<div>=</div>
				<div>
					<div>{i18n.lbl_EligibleWithdrawalAmount}</div>
					<div>
						{i18n[`Currency_${currencyId}`]}
						<span>
							{number_format(
								balanceInfo?.availableBalance ?? 0,
								_isConvert
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

BalancePanel.defaultProps = {
	currencyId: null,
	balanceInfo: {}
};

BalancePanel.propTypes = {
	currencyId: PropTypes.number,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	balanceInfo: PropTypes.objectOf(PropTypes.number),
	_isConvert: PropTypes.bool.isRequired
};

export default BalancePanel;
