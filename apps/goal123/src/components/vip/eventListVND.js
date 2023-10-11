import React from "react";
import PropTypes from "prop-types";
import { numFormatToDigits } from "../common/common";

const EventListVND = ({ i18n, vipBanner }) => {
	// * 因 GetVipBanner response 裡有參雜 string number 故須額外判斷與顯示
	const number_format_excludeString = input => {
		if (!isNaN(Number(input))) {
			return numFormatToDigits(Number(input), 0);
		}

		return input;
	};

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
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.depositPriority ? (
								<i className="icon icon-checkmark" />
							) : null}{" "}
							{item?.depositPriority}
						</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_WithDrawal_Priority}</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.withdrawalPriority ? (
								<i className="icon icon-checkmark" />
							) : null}{" "}
							{item?.withdrawalPriority}
						</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Service_Support_At_Date}</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.serviceSupport ? (
								<i className="icon icon-checkmark" />
							) : null}{" "}
							{item?.serviceSupport}
						</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">
						{i18n.lbl_Vip_Designated_Account_Manager}
					</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.designatedAccountManager && (
								<i className="icon icon-checkmark" />
							)}
						</td>
					))}
				</tr>

				<tr>
					<td colSpan="7">{i18n.lbl_Vip_Daily_Limit}</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{number_format_excludeString(
								item?.withdrawalMax.split(".")[0]
							)}
						</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_DAILY_TRANSACTIONS_COUNT}</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{number_format_excludeString(item?.times)}</td>
					))}
				</tr>
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
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.upBonus
								? number_format_excludeString(
										item?.upBonus.split(".")[0]
								  )
								: null}
						</td>
					))}
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
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[0].percentage}%</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_LiveCasino_Rebate}</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[2].percentage}%</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_SlotFishing_Rebate}</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[1].percentage}%</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">{i18n.lbl_Vip_VirtualSport_Rebate}</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[3].percentage}%</td>
					))}
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
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.referralBonus && (
								<i className="icon icon-checkmark" />
							)}
						</td>
					))}
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
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.upDeposit
								? number_format_excludeString(
										item?.upDeposit.split(".")[0]
								  )
								: null}
						</td>
					))}
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
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.downDeposit &&
							Number(item?.downDeposit) !== 0
								? number_format_excludeString(
										item?.downDeposit.split(".")[0]
								  )
								: null}
						</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">
						{i18n.lbl_Vip_Minimum_Turnover_Within_Validity_Period}
					</td>
				</tr>
				<tr>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.downTurnover &&
							Number(item?.downTurnover) !== 0
								? number_format_excludeString(
										item?.downTurnover.split(".")[0]
								  )
								: null}
						</td>
					))}
				</tr>
				<tr>
					<td colSpan="7">
						{i18n.lbl_Vip_Ranking_Validity_Membership_renewal}
					</td>
				</tr>
				<tr className="lastTd">
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rankingValidityMembershipRenewal}</td>
					))}
				</tr>
			</tbody>
		</table>
	);
};

EventListVND.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	vipBanner: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default EventListVND;
