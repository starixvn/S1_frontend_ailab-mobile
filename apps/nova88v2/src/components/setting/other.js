import React, { useContext } from "react";
import { userInfoContext, i18nContext } from "Context";
import { cloudBannerImgURL, siteInfo } from "../../config";
import Platform from "./other.platform";
import { getCombineLangId } from "../common/common";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	// const _siteInfo = siteInfo();

	// const socialMedia =
	// 	_siteInfo.socialMedia &&
	// 	Object.values(_siteInfo.socialMedia).map(v => {
	// 		return (
	// 			<a
	// 				key={`other-socialMedia-${v.displayKey}`}
	// 				href={v.link}
	// 				rel="noopener noreferrer"
	// 				target="_blank"
	// 				className={`icon icon-${v.icon}`}>
	// 				{i18n[v.displayKey]}
	// 			</a>
	// 		);
	// 	});

	return (
		<>
			<div className="webmap">
				<div>
					<span>{i18n.lbl_OurPolicies}</span>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/ResposibleGaming.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_ResposibleGaming}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/TermsConditions.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_TermsConditions}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/PrivacyPolicy.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_PrivacyPolicy}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/CookiePolicy.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_CookiePolicy}
					</a>
				</div>
				<div>
					<span>{i18n.lbl_HelpSupport}</span>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/RulesandRegulations.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_RuleRegulations}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/AccountTerms.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_AccountTerms}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/FAQ.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_FAQ}
					</a>
				</div>
				<div>
					<span>{i18n.lbl_Title}</span>
					<a
						style={{ fontWeight: "bold" }}
						href={siteInfo(userInfo.langId).affiliateLink}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_Affiliate?.toUpperCase()}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/AboutUs.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_AboutUs}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/Terms.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_Terms}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							userInfo.langId,
							userInfo.currencyId
						)}/ContactUs.html`}
						rel="noopener noreferrer"
						target="_blank">
						{i18n.lbl_ContactUs}
					</a>
				</div>
				{/* {socialMedia && socialMedia.length > 0 ? (
					<div>
						<span>{i18n.lbl_SocialMedia}</span>
						{socialMedia}
					</div>
				) : null} */}
			</div>
			<div className="partner">
				<Platform langId={userInfo.langId} isLogin={userInfo.isLogin} />
			</div>
		</>
	);
};
