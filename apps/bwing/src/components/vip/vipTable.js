import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";
import { VipSpecialRebate } from "./def";
import { numFormatToDigits } from "../common/common";

const VipTable = ({ vipBanner }) => {
	const { i18n } = useContext(i18nContext);
	/**
	 * 將 input 轉為為數字，排除非數字字符串。
	 * 處理 GetVipBanner API 的數據，該數據可能包含混合的字符串和數字。
	 * @param {string | number} input - 可能是字符串或數字。
	 * @returns {string | number} - 更改過後的數字字符串，或未更動過的字串。 */
	const number_format_excludeString = input => {
		// 檢查輸入是否可以轉換為數字
		if (!isNaN(Number(input))) {
			return numFormatToDigits(Number(input), 0);
		}
		return input;
	};

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
					<div>
						{number_format_excludeString(
							vipBanner?.withdrawalMax
						) || "-"}
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_DAILY_TRANSACTIONS_COUNT}</div>
					<div>
						{number_format_excludeString(vipBanner?.times) || "-"}
					</div>
				</div>
			</div>
			<div className="vip-grade-table-item">
				<div className="vip-grade-table-content subtitle">
					<div>{i18n.lbl_Vip_Exclusive_Bonus} (VND)</div>
					<div> </div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_Tier_UpGrade_Bonus}</div>
					<div>
						{number_format_excludeString(vipBanner?.upBonus) || "-"}
					</div>
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
							item => item.categoryId === VipSpecialRebate.Sport
						)?.percentage || "-"}
						%
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_LiveCasino_Rebate}</div>
					<div>
						{vipBanner?.rebateCategory?.find(
							item =>
								item.categoryId === VipSpecialRebate.LiveCasino
						)?.percentage || "-"}
						%
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_SlotFishing_Rebate}</div>
					<div>
						{vipBanner?.rebateCategory?.find(
							item => item.categoryId === VipSpecialRebate.Casino
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
								VipSpecialRebate.VirtualSports
						)?.percentage || "-"}
						%
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>{i18n.lbl_Vip_ESport_Rebate}</div>
					<div>
						{vipBanner?.rebateCategory?.find(
							item => item.categoryId === VipSpecialRebate.ESports
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
					<div>
						{number_format_excludeString(vipBanner?.upDeposit) ||
							"-"}
					</div>
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
					<div>
						{number_format_excludeString(vipBanner?.downDeposit) ||
							"-"}
					</div>
				</div>
				<div className="vip-grade-table-content">
					<div>
						{i18n.lbl_Vip_Minimum_Turnover_Within_Validity_Period}
					</div>
					<div>
						{number_format_excludeString(vipBanner?.downTurnover) ||
							"-"}
					</div>
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
