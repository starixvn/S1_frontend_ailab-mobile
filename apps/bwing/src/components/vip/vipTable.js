import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";
import { VIP_SPECIAL_REBATE } from "./def";

const VipTable = ({ vipBanner }) => {
	const { i18n } = useContext(i18nContext);

	return (
		<div className="vip-grade-table">
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content title">
					<div>{i18n.lbl_Vip_Service_Support}</div>
					<div>{vipBanner?.levelName || "-"}</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Deposit_Priority}</div>
					<div>{vipBanner?.depositPriority || "-"}</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_WithDrawal_Priority}</div>
					<div>{vipBanner?.withdrawalPriority || "-"}</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Service_Support_At_Date}</div>
					<div>{vipBanner?.serviceSupport || "-"}</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Designated_Account_Manager}</div>
					<div>
						{vipBanner?.designatedAccountManager ? (
							<i className="icon-check-blue" />
						) : (
							"-"
						)}
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Daily_Limit}</div>
					<div>{vipBanner?.withdrawalMax || "-"}</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_DAILY_TRANSACTIONS_COUNT}</div>
					<div>{vipBanner?.times || "-"}</div>
				</div>
			</div>
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content subtitle">
					<div>{i18n.lbl_Vip_Exclusive_Bonus} (VND)</div>
					<div> </div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Tier_UpGrade_Bonus}</div>
					<div>{vipBanner?.upBonus || "-"}</div>
				</div>
			</div>
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content subtitle">
					<div>{i18n.lbl_Vip_Special_Rebate}</div>
					<div> </div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Sport_Rebate}</div>
					<div>
						{vipBanner?.rebateCategory?.find(
							item => item.categoryId === VIP_SPECIAL_REBATE.sport
						)?.percentage || "-"}
						%
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_LiveCasino_Rebate}</div>
					<div>
						{vipBanner?.rebateCategory?.find(
							item =>
								item.categoryId ===
								VIP_SPECIAL_REBATE.liveCasino
						)?.percentage || "-"}
						%
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_SlotFishing_Rebate}</div>
					<div>
						{vipBanner?.rebateCategory?.find(
							item =>
								item.categoryId === VIP_SPECIAL_REBATE.casino
						)?.percentage || "-"}
						%
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_VirtualSport_Rebate}</div>
					<div>
						{vipBanner?.rebateCategory?.find(
							item =>
								item.categoryId ===
								VIP_SPECIAL_REBATE.virtualSports
						)?.percentage || "-"}
						%
					</div>
				</div>
			</div>
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content subtitle">
					<div>{i18n.lbl_Vip_Referral_bonus_Program}</div>
					<div> </div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Referral_bonus}</div>
					<div>
						{vipBanner?.referralBonus && (
							<i className="icon-check-blue" />
						)}
					</div>
				</div>
			</div>
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content subtitle">
					<div>{i18n.lbl_Vip_Tire_Upgrade_Requirement} (VND)</div>
					<div> </div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Monthly_Minimum_Deposit}</div>
					<div>{vipBanner?.upDeposit || "-"}</div>
				</div>
			</div>
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content subtitle">
					<div>{i18n.lbl_Vip_Tier_Maintenance_Requirement} (VND)</div>
					<div> </div>
				</div>
				<div className="vip-grade-table-content">
					<div>
						{i18n.lbl_Vip_Minimum_Deposit_Within_Validity_Period}
					</div>
					<div>{vipBanner?.downDeposit || "-"}</div>
				</div>
				<div className="vip-grade-table-content">
					<div>
						{i18n.lbl_Vip_Minimum_Turnover_Within_Validity_Period}
					</div>
					<div>{vipBanner?.downTurnover || "-"}</div>
				</div>
			</div>
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content subtitle">
					<div>
						{i18n.lbl_Vip_Ranking_Validity_Membership_renewal}
					</div>
					<div>
						{vipBanner?.rankingValidityMembershipRenewal || "-"}
					</div>
				</div>
			</div>
		</div>
	);
};

VipTable.propTypes = {
	vipBanner: PropTypes.objectOf(PropTypes.any).isRequired
};

export default VipTable;
