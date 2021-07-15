import React from "react";
import PropTypes from "prop-types";
import { number_format, isConvert } from "../../common/common";

const CashbackInfo = ({ bonusCode, cashBackDetails, i18n, currencyId }) => {
	if (!cashBackDetails) return null;

	const { totalBonus, maxBonus, cashBackDetail } = cashBackDetails;

	const rows = cashBackDetail?.map(c => (
		<tr key={`CashbackInfo-${bonusCode}-${c.tpName}`}>
			<td>{c.tpName}</td>
			<td>
				{number_format(Math.abs(c.lossAmount), isConvert(currencyId))}
			</td>
			<td>{c.percentageName}</td>
			<td>{number_format(c.bonusAmount, isConvert(currencyId))}</td>
		</tr>
	));

	return (
		<div className="cashBack">
			<div className="title">{i18n.lbl_CashBack}</div>
			<table>
				<tbody>
					<tr>
						<td />
						<td>{i18n.lbl_LossAmount}</td>
						<td>{i18n.lbl_Percentage}</td>
						<td>{i18n.lbl_BonusAmount}</td>
					</tr>
					{rows}
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_TotalAmount}：</span>
							<span>
								{number_format(
									totalBonus,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_MaxBonusAmount}：</span>
							<span>
								{number_format(maxBonus, isConvert(currencyId))}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_ClaimAmount}：</span>
							<span>
								{totalBonus > maxBonus
									? number_format(
											maxBonus,
											isConvert(currencyId)
									  )
									: number_format(
											totalBonus,
											isConvert(currencyId)
									  )}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

CashbackInfo.defaultProps = {
	cashBackDetails: null,
	bonusCode: null,
	currencyId: null
};

CashbackInfo.propTypes = {
	bonusCode: PropTypes.string,
	cashBackDetails: PropTypes.objectOf(PropTypes.any),
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number
};

export default CashbackInfo;
