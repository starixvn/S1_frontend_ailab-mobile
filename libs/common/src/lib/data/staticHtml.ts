import { siteIdEnum } from "../utils";

const { Nova88 } = siteIdEnum;

export const staticPagesUrl = (langId: string) => {
	// * nova88 不需要此字串，其餘品牌需要，未來與後端溝通調整一次後可重構成一致
	const dynamicStatic =
		Number(process.env.REACT_APP_SITE_ID) === Nova88 ? "" : "/Static";

	const baseURL = `${process.env.REACT_APP_STATIC_HTML_URL}/Static/${process.env.REACT_APP_SITE_NAME}${dynamicStatic}/${langId}`;

	return {
		termsConditions: `${baseURL}/TermsConditions.html`,
		rulesandRegulations: `${baseURL}/RulesandRegulations.html`,
		resposibleGaming: `${baseURL}/ResposibleGaming.html`,
		privacyPolicy: `${baseURL}/PrivacyPolicy.html`,
		cookiePolicy: `${baseURL}/CookiePolicy.html`,
		accountTerms: `${baseURL}/AccountTerms.html`,
		faq: `${baseURL}/FAQ.html`,
		aboutUs: `${baseURL}/AboutUs.html`,
		terms: `${baseURL}/Terms.html`,
		contactUs: `${baseURL}/ContactUs.html`,
		howToDeposit: `${baseURL}/HowToDeposit.html`,
		howToWithdraw: `${baseURL}/HowToWithdraw.html`,
		howToPlay: `${baseURL}/HowToBet.html`
	};
};
