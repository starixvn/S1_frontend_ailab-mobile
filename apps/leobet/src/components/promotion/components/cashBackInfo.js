import React from "react";
import PropTypes from "prop-types";
import { number_format, isConvert } from "../../common/common";

const CashbackInfo = ({ bonusCode, cashBackDetails, i18n, currencyId }) => {
	if (!cashBackDetails) return null;

	const {
		totalBonus,
		maxBonus,
		cashBackDetail,
		totalLossAmount,
		minLossAmount,
		percentage,
		originalTotalBonus
	} = cashBackDetails;

	const rows = cashBackDetail?.map(c => (
		<tr key={`CashbackInfo-${bonusCode}-${c.tpName}`}>
			<td>{c.tpName}</td>
			<td>
				{number_format(c.lossAmountWithBonus, isConvert(currencyId))}
			</td>
			<td>{number_format(c.lossAmount, isConvert(currencyId))}</td>
		</tr>
	));

	return (
		<div className="cashBack newStyle">
			<div className="title">{i18n.lbl_CashBack}</div>
			<table>
				<tbody>
					<tr>
						<td />
						<td>{i18n.lbl_LossWithBonus}</td>
						<td>{i18n.lbl_NetLoss}</td>
					</tr>
					{rows}
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_TotalNetLoss}：</span>
							<span>
								{number_format(
									totalLossAmount,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_MinNetLossRequired}：</span>
							<span>
								{number_format(
									minLossAmount,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_Percentage}：</span>
							<span>{percentage}</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_TotalBonus}：</span>
							<span>
								{number_format(
									originalTotalBonus,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_MaxBonus}：</span>
							<span>
								{number_format(maxBonus, isConvert(currencyId))}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{i18n.lbl_TotalBonusClaimable}：</span>
							<span>
								{number_format(
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
