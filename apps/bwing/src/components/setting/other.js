import React, { useContext } from "react";
import { userInfoContext, i18nContext } from "../common/context";
import TandC from "../../service/t_and_c";
import { siteInfo } from "../../config";
import useGetSocialChannel, {
	defDisplayPage,
	channelIcon
} from "../hook/useGetSocialChannel";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Footer
	});

	const snsArr = socialChannel.map(el => (
		<a
			key={`channel-${el.channelName}`}
			className={channelIcon[el.channelName]}
			href={el.link}
			target="_blank"
			rel="noreferrer">
			{el.channelName}
		</a>
	));

	return (
		<div className="webmap">
			<div>
				<span>{i18n.lbl_OurPolicies}</span>
				<a
					href={TandC(userInfo.langId).OurPolicies}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_ResposibleGaming}
				</a>
				<a
					href={TandC(userInfo.langId).terms}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_TermsConditions}
				</a>
				<a
					href={TandC(userInfo.langId).PrivacyPolicy}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_PrivacyPolicy}
				</a>
				<a
					href={TandC(userInfo.langId).CookiePolicy}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_CookiePolicy}
				</a>
			</div>
			<div>
				<span>{i18n.lbl_HelpSupport}</span>
				<a
					href={TandC(userInfo.langId).RuleRegulations}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_RuleRegulations}
				</a>
				<a
					href={TandC(userInfo.langId).AccountTerms}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_AccountTerms}
				</a>
				<a
					href={TandC(userInfo.langId).FAQ}
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
					{i18n.lbl_Affiliates?.toUpperCase()}
				</a>
				<a
					href={TandC(userInfo.langId).AboutUs}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_AboutUs}
				</a>
				<a
					href={TandC(userInfo.langId).Terms}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_Terms}
				</a>
				<a
					href={TandC(userInfo.langId).ContactUs}
					rel="noopener noreferrer"
					target="_blank">
					{i18n.lbl_ContactUs}
				</a>
			</div>
			{socialChannel.length > 0 && (
				<div>
					<span>{i18n.lbl_SocialMedia}</span>
					{snsArr}
					{/* <a
						className="icon icon-tiktok"
						href="https://www.tiktok.com/@bwingpro"
						target="_blank"
						rel="noreferrer">
						Tiktok
					</a> */}
				</div>
			)}
		</div>
	);
};
