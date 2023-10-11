import React from "react";
import PropTypes from "prop-types";
import { currencyIdToCurrency, capitalizeFirstLetter } from "../common/common";
import { defbanner } from "./def";
import { Autoplay } from "../common/swipperBanner";

const VipBanner = ({
	i18n,
	userInfo,
	vipBanner,
	number_format_excludeString
}) => {
	const currencyName = currencyIdToCurrency[userInfo?.currencyId];

	let bannerLangId = userInfo?.langId;
	if (userInfo?.langId === "en") {
		bannerLangId = "";
	}

	const rows = defbanner(bannerLangId).map(item => {
		const upBonus = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.upBonus;
		const upDeposit = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.upDeposit;
		const rankingValidityMembershipRenewal = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.rankingValidityMembershipRenewal;
		const referralBonus = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.referralBonus;
		const rebateCategoryList = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.rebateCategory;

		return (
			<div className={item.levelText} key={item.level}>
				<img className="vipbanner" src={item.url} alt="" />
				<div className="vipinfo">
					{i18n.lbl_Vip_Monthly_Minimum_Deposit}
					<span>
						{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
						{item.level === 1 || item.level === 6
							? null
							: currencyName}{" "}
						{upDeposit
							? number_format_excludeString(
									upDeposit.split(".")[0]
							  )
							: i18n.lbl_Vip_NoRestrictions}
					</span>
					{upBonus && (
						<div className="rewardinfo">
							{i18n.lbl_Vip_Tier_UpGrade_Bonus}
							<span>
								{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
								{item.level === 1 || item.level === 6
									? null
									: currencyName}{" "}
								{upBonus
									? number_format_excludeString(
											upBonus.split(".")[0]
									  )
									: null}
							</span>
						</div>
					)}
				</div>
				<div className="viprule">
					<div className="viprule-item">
						<span>
							{capitalizeFirstLetter(
								i18n.lbl_Vip_Ranking_Validity_Membership_renewal
							)}
						</span>
						<span>{rankingValidityMembershipRenewal}</span>
					</div>
					<div className="viprule-item">
						<span>
							{capitalizeFirstLetter(
								i18n.lbl_Vip_Referral_bonus_Program
							)}
						</span>
						<span>{referralBonus ? "Yes" : "No"}</span>
					</div>
					<div className="viprule-item">
						<span>
							{capitalizeFirstLetter(
								i18n.lbl_Vip_Special_Rebate_UP_TO
							)}
						</span>
						<span>
							{rebateCategoryList &&
								Math.max(
									...rebateCategoryList?.map(
										({ percentage }) => percentage
									)
								)}
							%
						</span>
					</div>
				</div>
			</div>
		);
	});

	return <Autoplay Rows={rows} />;
};

VipBanner.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	vipBanner: PropTypes.arrayOf(PropTypes.any).isRequired,
	number_format_excludeString: PropTypes.func.isRequired
};

export default VipBanner;
