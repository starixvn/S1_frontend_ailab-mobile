import React from "react";
import PropTypes from "prop-types";

const EventListIDR = ({ i18n }) => {
	return (
		<div className="vipPage">
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
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
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
						<td>
							<i className="icon icon-checkmark" />
							{i18n.lbl_Vip_High}
						</td>
					</tr>
					<tr>
						<td colSpan="7">{i18n.lbl_Vip_WithDrawal_Priority}</td>
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
							{i18n.lbl_Vip_Service_Support_At_Date}
						</td>
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
					<tr>
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
					</tr>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							{i18n.lbl_Vip_Exclusive_Bonus}
							<span className="text-org">(IDR)</span>
						</td>
					</tr>
					<tr>
						<td colSpan="7">{i18n.lbl_Vip_Tier_UpGrade_Bonus}</td>
					</tr>
					<tr>
						<td />
						<td>100('000)</td>
						<td>300('000)</td>
						<td>900('000)</td>
						<td>3,300('000)</td>
						<td>{i18n.lbl_Vip_Invisible}</td>
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
						<td>0.5%</td>
						<td>0.6%</td>
						<td>0.7%</td>
						<td>0.8%</td>
						<td>0.9%</td>
						<td>1%</td>
					</tr>
					<tr>
						<td colSpan="7">{i18n.lbl_Vip_SlotFishing_Rebate}</td>
					</tr>
					<tr>
						<td>0.8%</td>
						<td>1.0%</td>
						<td>1.2%</td>
						<td>1.3%</td>
						<td>1.5%</td>
						<td>1.7%</td>
					</tr>
					<tr>
						<td colSpan="7">{i18n.lbl_Vip_VirtualSport_Rebate}</td>
					</tr>
					<tr>
						<td>0.8%</td>
						<td>1.0%</td>
						<td>1.2%</td>
						<td>1.3%</td>
						<td>1.5%</td>
						<td>1.7%</td>
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
							<span className="text-org">(IDR)</span>
						</td>
					</tr>
					<tr>
						<td colSpan="7">
							{i18n.lbl_Vip_Monthly_Minimum_Deposit}
						</td>
					</tr>
					<tr>
						<td />
						<td>25,000('000)</td>
						<td>100,000('000)</td>
						<td>250,000('000)</td>
						<td>500,000('000)</td>
						<td>{i18n.lbl_Vip_Invisible}</td>
					</tr>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							{i18n.lbl_Vip_Tier_Maintenance_Requirement}
							<span className="text-org">(IDR)</span>
						</td>
					</tr>
					<tr>
						<td colSpan="7">
							{
								i18n.lbl_Vip_Minimum_Deposit_Within_Validity_Period
							}
						</td>
					</tr>
					<tr>
						<td />
						<td />
						<td>100,000('000)</td>
						<td>250,000('000)</td>
						<td>500,000('000)</td>
						<td>{i18n.lbl_Vip_Invisible}</td>
					</tr>
					<tr>
						<td colSpan="7">
							{
								i18n.lbl_Vip_Minimum_Turnover_Within_Validity_Period
							}
						</td>
					</tr>
					<tr>
						<td />
						<td />
						<td>100,000('000)</td>
						<td>250,000('000)</td>
						<td>500,000('000)</td>
						<td>{i18n.lbl_Vip_Invisible}</td>
					</tr>
					<tr>
						<td colSpan="7">
							{i18n.lbl_Vip_Ranking_Validity_Membership_renewal}
						</td>
					</tr>
					<tr className="lastTd">
						<td>{i18n.lbl_Vip_Normal}</td>
						<td>{i18n.lbl_Vip_Lifetime}</td>
						<td>3 {i18n.lbl_Vip_Months}</td>
						<td>3 {i18n.lbl_Vip_Months}</td>
						<td>3 {i18n.lbl_Vip_Months}</td>
						<td>3 {i18n.lbl_Vip_Months}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

EventListIDR.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EventListIDR;
