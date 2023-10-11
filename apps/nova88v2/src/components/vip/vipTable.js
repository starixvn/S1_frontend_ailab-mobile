import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
	currCustomMapping,
	defCurrenyId,
	capitalizeFirstLetter
} from "../common/common";
import { i18nContext } from "../common/context";

const VipTable = ({
	selectedVipTableData,
	userInfo,
	vipActiveTabId,
	number_format_excludeString
}) => {
	const { i18n } = useContext(i18nContext);

	return (
		<div
			className={`viptable ${
				selectedVipTableData?.level === vipActiveTabId
					? selectedVipTableData?.levelName
							.toLowerCase()
							.split(" ")[0]
					: null
			}`}>
			<div className="viptable-item">
				<ul className="viptable-item-title">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_Service_Support)}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_Deposit_Priority)}
					</li>
					<li className="">
						<li
							className={`${
								selectedVipTableData?.depositPriority
									? "High"
									: null
							}`}
						/>
						{selectedVipTableData?.depositPriority}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_WithDrawal_Priority
						)}
					</li>
					<li className="">
						<li
							className={`${
								selectedVipTableData?.withdrawalPriority
									? "High"
									: null
							}`}
						/>
						{selectedVipTableData?.withdrawalPriority}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Service_Support_At_Date
						)}
					</li>
					<li className="">
						<li
							className={`${
								selectedVipTableData?.serviceSupport
									? "High"
									: null
							}`}
						/>
						{selectedVipTableData?.serviceSupport}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Designated_Account_Manager
						)}
					</li>
					<li
						className={`${
							selectedVipTableData?.designatedAccountManager
								? "High"
								: null
						}`}
					/>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(i18n.lbl_WithdrawalLimitation)}
					</li>
					<li>
						{number_format_excludeString(
							selectedVipTableData?.withdrawalMax.split(".")[0]
						)}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_DAILY_TRANSACTIONS_COUNT
						)}
					</li>
					<li>
						{number_format_excludeString(
							selectedVipTableData?.times
						)}
					</li>
				</ul>
			</div>
			<div className="viptable-item">
				<ul className="viptable-item-title">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_Exclusive_Bonus)}
						{`(${
							currCustomMapping[
								userInfo.currencyId ?? defCurrenyId.MYR
							]
						})`}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_Tier_UpGrade_Bonus)}
					</li>
					<li className="">
						{selectedVipTableData?.upBonus
							? number_format_excludeString(
									selectedVipTableData?.upBonus.split(".")[0]
							  )
							: null}
					</li>
				</ul>
			</div>
			<div className="viptable-item">
				<ul className="viptable-item-title">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_Special_Rebate)}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>{capitalizeFirstLetter(i18n.lbl_Vip_Sport_Rebate)}</li>
					<li className="">
						{selectedVipTableData?.rebateCategory[0]?.percentage}%
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_LiveCasino_Rebate)}
					</li>
					<li className="">
						{selectedVipTableData?.rebateCategory[2]?.percentage}%
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_SlotFishing_Rebate)}
					</li>
					<li className="">
						{selectedVipTableData?.rebateCategory[1]?.percentage}%
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_VirtualSport_Rebate
						)}
					</li>
					<li className="">
						{selectedVipTableData?.rebateCategory[3]?.percentage}%
					</li>
				</ul>
			</div>
			<div className="viptable-item">
				<ul className="viptable-item-title">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Referral_bonus_Program
						)}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(i18n.lbl_Vip_Referral_bonus)}
					</li>
					<li
						className={`${
							selectedVipTableData?.referralBonus ? "High" : null
						}`}
					/>
				</ul>
			</div>
			<div className="viptable-item">
				<ul className="viptable-item-title">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Tire_Upgrade_Requirement
						)}
						{`(${
							currCustomMapping[
								userInfo.currencyId ?? defCurrenyId.MYR
							]
						})`}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Monthly_Minimum_Deposit
						)}
					</li>
					<li className="">
						{selectedVipTableData?.upDeposit
							? number_format_excludeString(
									selectedVipTableData?.upDeposit.split(
										"."
									)[0]
							  )
							: null}
					</li>
				</ul>
			</div>
			<div className="viptable-item">
				<ul className="viptable-item-title">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Tier_Maintenance_Requirement
						)}
						{`(${
							currCustomMapping[
								userInfo.currencyId ?? defCurrenyId.MYR
							]
						})`}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Minimum_Deposit_Within_Validity_Period
						)}
					</li>
					<li className="">
						{selectedVipTableData?.downDeposit &&
						Number(selectedVipTableData?.downDeposit) !== 0
							? number_format_excludeString(
									selectedVipTableData?.downDeposit.split(
										"."
									)[0]
							  )
							: null}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Minimum_Turnover_Within_Validity_Period
						)}
					</li>
					<li className="">
						{selectedVipTableData?.downTurnover &&
						Number(selectedVipTableData?.downTurnover) !== 0
							? number_format_excludeString(
									selectedVipTableData?.downTurnover.split(
										"."
									)[0]
							  )
							: null}
					</li>
				</ul>
				<ul className="viptable-item-text">
					<li>
						{capitalizeFirstLetter(
							i18n.lbl_Vip_Ranking_Validity_Membership_renewal
						)}
					</li>
					<li className="">
						{selectedVipTableData?.rankingValidityMembershipRenewal}
					</li>
				</ul>
			</div>
		</div>
	);
};

VipTable.propTypes = {
	selectedVipTableData: PropTypes.objectOf(PropTypes.any).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	vipActiveTabId: PropTypes.number.isRequired,
	number_format_excludeString: PropTypes.func.isRequired
};

export default VipTable;
