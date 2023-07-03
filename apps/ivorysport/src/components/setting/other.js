import React, { useContext } from "react";
import { userInfoContext, i18nContext } from "Context";
import { cloudBannerImgURL } from "../../config";
import Platform from "./other.platform";
import { defCurrenyId, getCombineLangId } from "../common/common";
import { getCurrencyLink } from "../../datas/productList";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

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
						href={`${cloudBannerImgURL}/Static/en/TermsConditions.html`}
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

					{/* // * FAQ 還沒有 KHM 的文案，所以不給使用者連結 */}
					{userInfo.currencyId !== defCurrenyId.KHM && (
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								userInfo.langId,
								userInfo.currencyId
							)}/FAQ.html`}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_FAQ}
						</a>
					)}
				</div>
				<div>
					<span>{i18n.lbl_Title}</span>
					<a
						style={{ fontWeight: "bold" }}
						href={getCurrencyLink(
							userInfo.currencyId,
							userInfo.langId
						)}
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
			</div>
			<div className="partner">
				<Platform langId={userInfo.langId} isLogin={userInfo.isLogin} />
			</div>
		</>
	);
};
