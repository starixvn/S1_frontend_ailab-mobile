import React from "react";
import PropTypes from "prop-types";

const EventListTHB = ({ i18n }) => {
	return (
		<table className="eventList">
			<tbody>
				<tr className="title">
					<td colSpan="7" className="icon icon-nova88">
						{i18n.lbl_Vip_Service_Support}
					</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Deposit_Priority}</td>
				</tr>
				<tr>
					<td />
					<td />
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_WithDrawal_Priority}</td>
				</tr>
				<tr>
					<td />
					<td />
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Service_Support_At_Date}</td>
				</tr>
				<tr>
					<td />
					<td />
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
					<td>
						<i className="icon icon-checkmark" />
						{i18n.lbl_Vip_High}
					</td>
				</tr>
				<tr>
					<td colSpan="7">
						{i18n.lbl_Vip_Designated_Account_Manager}
					</td>
				</tr>
				<tr>
					<td />
					<td />
					<td />
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
				</tr>
				{/* <tr>
						<td colSpan="7">
							{i18n.lbl_Vip_Unlimited_Withdrawal_amount}
						</td>
					</tr>
					<tr>
						<td>{i18n.lbl_Vip_Status1}</td>
						<td>{i18n.lbl_Vip_Status1}</td>
						<td>{i18n.lbl_Vip_Status1}</td>
						<td>{i18n.lbl_Vip_Status1}</td>
						<td>{i18n.lbl_Vip_Status1}</td>
						<td>{i18n.lbl_Vip_Status1}</td>
					</tr> */}
				<tr className="title">
					<td colSpan="7" className="icon icon-nova88">
						{i18n.lbl_Vip_Exclusive_Bonus}
						<span className="text-org">(THB)</span>
					</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Tier_UpGrade_Bonus}</td>
				</tr>
				<tr>
					<td />
					<td>1,500</td>
					<td>2,500</td>
					<td>5,000</td>
					<td>10,000</td>
					<td>{i18n.lbl_Vip_ByInvitation}</td>
				</tr>
				<tr className="title">
					<td colSpan="7" className="icon icon-nova88">
						{i18n.lbl_Vip_Special_Rebate}
					</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Sport_Rebate}</td>
				</tr>
				<tr>
					<td>0.55%</td>
					<td>0.55%</td>
					<td>0.60%</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>1.00%</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_LiveCasino_Rebate}</td>
				</tr>
				<tr>
					<td>0.50%</td>
					<td>0.50%</td>
					<td>0.60%</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>1.00%</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_SlotFishing_Rebate}</td>
				</tr>
				<tr>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>0.90%</td>
					<td>1.00%</td>
					<td>1.10%</td>
					<td>1.20%</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_VirtualSport_Rebate}</td>
				</tr>
				<tr>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>0.90%</td>
					<td>1.00%</td>
					<td>1.10%</td>
					<td>1.20%</td>
				</tr>
				<tr className="title">
					<td colSpan="7" className="icon icon-nova88">
						{i18n.lbl_Vip_Referral_bonus_Program}
					</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Referral_bonus}</td>
				</tr>
				<tr>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
				</tr>
				<tr className="title">
					<td colSpan="7" className="icon icon-nova88">
						{i18n.lbl_Vip_Tire_Upgrade_Requirement}
						<span className="text-org">(THB)</span>
					</td>
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Monthly_Minimum_Deposit}</td>
				</tr>
				<tr>
					<td />
					<td>300,000</td>
					<td>800,000</td>
					<td>2,500,000</td>
					<td>4,500,000</td>
					<td>{i18n.lbl_Vip_ByInvitation}</td>
				</tr>
				<tr className="title">
					<td colSpan="7" className="icon icon-nova88">
						{i18n.lbl_Vip_Tier_Maintenance_Requirement}
						<span className="text-org">(THB)</span>
					</td>
				</tr>
				<tr>
					<td colSpan="7">
						{i18n.lbl_Vip_Minimum_Deposit_Within_Validity_Period}
					</td>
				</tr>
				<tr>
					<td />
					<td />
					<td>500,000</td>
					<td>1,000,000</td>
					<td>3,000,000</td>
					<td>5,000,000</td>
				</tr>
				<tr>
					<td colSpan="7">
						{i18n.lbl_Vip_Minimum_Turnover_Within_Validity_Period}
					</td>
				</tr>
				<tr>
					<td />
					<td />
					<td>5,000,000</td>
					<td>10,000,000</td>
					<td>30,000,000</td>
					<td>50,000,000</td>
				</tr>
				<tr>
					<td colSpan="7">
						{i18n.lbl_Vip_Ranking_Validity_Membership_renewal}
					</td>
				</tr>
				<tr className="lastTd">
					<td>{i18n.lbl_Vip_Normal}</td>
					<td>{i18n.lbl_Vip_Lifetime}</td>
					<td>{i18n.lbl_Vip_3Months}</td>
					<td>{i18n.lbl_Vip_3Months}</td>
					<td>{i18n.lbl_Vip_3Months}</td>
					<td>{i18n.lbl_Vip_3Months}</td>
				</tr>
			</tbody>
		</table>
	);
};

EventListTHB.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EventListTHB;
