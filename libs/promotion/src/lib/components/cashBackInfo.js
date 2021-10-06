import React, { useContext } from "react";
import PropTypes from "prop-types";
import { configContext } from "../common/context";
import { number_format } from "../common/common";

const CashBackInfo = ({ cashBackDetails }) => {
	const { i18n, formatSetting } = useContext(configContext);

	if (!cashBackDetails) return null;

	const { totalBonus, maxBonus, cashBackDetail } = cashBackDetails;
	const rows = cashBackDetail?.map(info => (
		<tr key={`CashbackInfo-${info.tpName}`}>
			<td>{info.tpName}</td>
			<td>{number_format(Math.abs(info.lossAmount), formatSetting)}</td>
			<td>{info.percentageName}</td>
			<td>{number_format(info.bonusAmount, formatSetting)}</td>
		</tr>
	));

	return (
		<div className="cashBack">
			<div className="title">{i18n.lbl_Cashback}</div>
			<table>
				<tbody>
					<tr>
						<td />
						<td>{i18n.lbl_LossAmount}</td>
						<td>{i18n.lbl_Percentage}</td>
						<td>{i18n.lbl_TotalAmount}</td>
					</tr>
					{rows}
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_TotalAmount}：</span>
						</td>
						<td colSpan="2">
							{number_format(totalBonus, formatSetting)}
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_MaxBonusAmount}：</span>
						</td>
						<td colSpan="2">
							{number_format(maxBonus, formatSetting)}
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<span>{i18n.lbl_ClaimAmount}：</span>
						</td>
						<td colSpan="2">
							{totalBonus > maxBonus
								? number_format(maxBonus, formatSetting)
								: number_format(totalBonus, formatSetting)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

CashBackInfo.defaultProps = {
	cashBackDetails: null
};

CashBackInfo.propTypes = {
	cashBackDetails: PropTypes.objectOf(PropTypes.any)
};

export default CashBackInfo;
