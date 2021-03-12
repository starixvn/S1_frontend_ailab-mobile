import React from "react";
import PropTypes from "prop-types";

const EventListVND = ({ i18n }) => (
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
				<td colSpan="7">{i18n.lbl_Vip_Designated_Account_Manager}</td>
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
					<span className="text-org">(VND)</span>
				</td>
			</tr>
			<tr>
				<td colSpan="7">{i18n.lbl_Vip_Tier_UpGrade_Bonus}</td>
			</tr>
			<tr>
				<td />
				<td>333,123</td>
				<td>500,123</td>
				<td>1,123,123</td>
				<td>2,123,123</td>
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
				<td>0.5%</td>
				<td>0.6%</td>
				<td>0.7%</td>
				<td>0.8%</td>
				<td>0.9%</td>
				<td>1%</td>
			</tr>
			<tr>
				<td colSpan="7">{i18n.lbl_Vip_LiveCasino_Rebate}</td>
			</tr>
			<tr>
				<td>0.4%</td>
				<td>0.5%</td>
				<td>0.6%</td>
				<td>0.65%</td>
				<td>0.7%</td>
				<td>0.8%</td>
			</tr>
			<tr>
				<td colSpan="7">{i18n.lbl_Vip_SlotFishing_Rebate}</td>
			</tr>
			<tr>
				<td>0.7%</td>
				<td>0.8%</td>
				<td>0.9%</td>
				<td>1.1%</td>
				<td>1.3%</td>
				<td>1.5%</td>
			</tr>
			<tr>
				<td colSpan="7">{i18n.lbl_Vip_VirtualSport_Rebate}</td>
			</tr>
			<tr>
				<td>0.7%</td>
				<td>0.8%</td>
				<td>0.9%</td>
				<td>1.1%</td>
				<td>1.3%</td>
				<td>1.5%</td>
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
					<span className="text-org">(VND)</span>
				</td>
			</tr>
			<tr>
				<td colSpan="7">{i18n.lbl_Vip_Monthly_Minimum_Deposit}</td>
			</tr>
			<tr>
				<td />
				<td>88,123,000</td>
				<td>168,123,000</td>
				<td>388,123,000</td>
				<td>888,123,000</td>
				<td>{i18n.lbl_Vip_ByInvitation}</td>
			</tr>
			<tr className="title">
				<td colSpan="7" className="icon icon-nova88">
					{i18n.lbl_Vip_Tier_Maintenance_Requirement}
					<span className="text-org">(VND)</span>
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
				<td>468,123,000</td>
				<td>788,123,000</td>
				<td>1,388,123,000</td>
				<td>{i18n.lbl_Vip_ByInvitation}</td>
			</tr>
			<tr>
				<td colSpan="7">
					{i18n.lbl_Vip_Minimum_Turnover_Within_Validity_Period}
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td>10,888,123,000</td>
				<td>20,888,123,000</td>
				<td>50,888,123,000</td>
				<td>{i18n.lbl_Vip_ByInvitation}</td>
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

EventListVND.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EventListVND;
