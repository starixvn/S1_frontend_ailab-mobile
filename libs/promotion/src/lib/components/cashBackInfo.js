import React, { useContext } from "react";
import PropTypes from "prop-types";
import { configContext } from "../common/context";
import { number_format } from "../common/common";

const CashBackInfo = ({ cashBackDetails, config }) => {
	const { i18n, formatSetting } = useContext(configContext) ?? config;

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
	const rows = cashBackDetail?.map(info => (
		<tr key={`CashbackInfo-${info.tpName}`}>
			<td>{info.tpName}</td>
			<td>{number_format(info.lossAmountWithBonus, formatSetting)}</td>
			<td>{number_format(info.lossAmount, formatSetting)}</td>
		</tr>
	));

	return (
		<div className="cashBack">
			<div className="title">{i18n.lbl_Cashback}</div>
			<table>
				<tbody>
					<tr>
						<td />
						<td>{i18n.lbl_LossWithBonus}</td>
						<td>{i18n.lbl_NetLoss}</td>
					</tr>
					{rows}
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_TotalNetLoss}：</span>
						</td>
						<td colSpan="2">
							{number_format(totalLossAmount, formatSetting)}
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_MinNetLossRequired}：</span>
						</td>
						<td colSpan="2">
							{number_format(minLossAmount, formatSetting)}
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_Percentage}：</span>
						</td>
						<td colSpan="2">{percentage}</td>
					</tr>
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_TotalBonus}：</span>
						</td>
						<td colSpan="2">
							{number_format(originalTotalBonus, formatSetting)}
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_MaxBonus}：</span>
						</td>
						<td colSpan="2">
							{number_format(maxBonus, formatSetting)}
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_TotalBonusClaimable}：</span>
						</td>
						<td colSpan="2">
							{number_format(totalBonus, formatSetting)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

CashBackInfo.defaultProps = {
	cashBackDetails: null,
	config: null
};

CashBackInfo.propTypes = {
	cashBackDetails: PropTypes.objectOf(PropTypes.any),
	config: PropTypes.objectOf(PropTypes.any)
};

export default CashBackInfo;
