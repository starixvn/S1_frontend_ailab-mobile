import config, { bannerImgUrl } from "../config";

export default langId => {
	return {
		terms: `${bannerImgUrl}/Static/${langId}/TermsConditions.html`,
		rule: `${bannerImgUrl}/Static/${langId}/RulesandRegulations.html`,
		OurPolicies: `${bannerImgUrl}/Static/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `${bannerImgUrl}/Static/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `${bannerImgUrl}/Static/${langId}/CookiePolicy.html`,
		RuleRegulations: `${bannerImgUrl}/Static/${langId}/RulesandRegulations.html`,
		AccountTerms: `${bannerImgUrl}/Static/${langId}/AccountTerms.html`,
		FAQ: `${bannerImgUrl}/Static/${langId}/FAQ.html`,
		AboutUs: `${bannerImgUrl}/Static/${langId}/AboutUs.html`,
		Terms: `${bannerImgUrl}/Static/${langId}/Terms.html`,
		ContactUs: `${bannerImgUrl}/Static/${langId}/ContactUs.html?url=${window.location.origin}`,
		HowToDeposit: `${config.t_and_cURL}/Static/${langId}/HowToDeposit.html`,
		HowToBet: `${config.t_and_cURL}/Static/${config.siteName}/Static/${langId}/HowToBet.html`,
		HowToWithdraw: `${config.t_and_cURL}/Static/${langId}/HowToWithdraw.html`,
		AngPow: `${config.t_and_cURL}/Static/${config.siteName}/ranking/${langId}3.html`,
		Referral: `${config.t_and_cURL}/Static/${config.siteName}/Static/${langId}/ReferralConditions.html`
	};
};
