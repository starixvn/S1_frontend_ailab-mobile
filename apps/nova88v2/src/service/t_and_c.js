import config, { cloudImgURL, siteInfo } from "../config";

export default langId => {
	return {
		terms: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/TermsConditions.html`,
		rule: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/RulesandRegulations.html`,
		OurPolicies: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/CookiePolicy.html`,
		RuleRegulations: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/RulesandRegulations.html`,
		AccountTerms: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/AccountTerms.html`,
		FAQ: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/FAQ.html`,
		AboutUs: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/AboutUs.html`,
		Terms: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/Terms.html`,
		ContactUs: `${config.t_and_cURL}/Static/${
			siteInfo(langId).siteName
		}/${langId}/ContactUs.html`,
		Referral: `${cloudImgURL}/NovaPromotion/referral/${langId.toUpperCase()}.html`
	};
};
