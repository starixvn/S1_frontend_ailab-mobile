import config from "../config";

export default langId => {
	return {
		terms: `${config.t_and_cURL}/Static/${langId}/TermsConditions.html`,
		rule: `${config.t_and_cURL}/Static/${langId}/RulesandRegulations.html`,
		OurPolicies: `${config.t_and_cURL}/Static/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `${config.t_and_cURL}/Static/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `${config.t_and_cURL}/Static/${langId}/CookiePolicy.html`,
		RuleRegulations: `${config.t_and_cURL}/Static/${langId}/RulesandRegulations.html`,
		AccountTerms: `${config.t_and_cURL}/Static/${langId}/AccountTerms.html`,
		FAQ: `${config.t_and_cURL}/Static/${langId}/FAQ.html`,
		AboutUs: `${config.t_and_cURL}/Static/${langId}/AboutUs.html`,
		Terms: `${config.t_and_cURL}/Static/${langId}/Terms.html`,
		ContactUs: `${config.t_and_cURL}/Static/${langId}/ContactUs.html`,
		AngPow: `${config.t_and_cURL}/Static/${config.siteName}/ranking/${langId}3.html`,
		Referral: `${config.t_and_cURL}/Static/${config.siteName}/Static/${langId}/ReferralConditions.html`,
		HowToDeposit: `${config.t_and_cURL}/Static/${langId}/HowToDeposit.html`,
		HowToWithdraw: `${config.t_and_cURL}/Static/${langId}/HowToWithdrawal.html`
	};
};
