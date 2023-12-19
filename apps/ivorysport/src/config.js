import axios from "axios";
import { validImgLang, defCurrenyId } from "./components/common/common";

const siteName = "Ivorysport";
export const siteId = 5;

export const errorPageUrl = langId =>
	`https://error.0814media.net/404/index_${validImgLang(langId)}.html`;

export const siteInfo = () => {
	return {
		siteName,
		siteId: 5,
		langCookie: "IvorysportLangId",
		currencyCookie: "ivorysportCurrencyId",
		ageVerificationCookie: `${siteName}-age-verification`,
		siteDefaultLang: "en",
		siteDefaultCurrencyId: defCurrenyId.MYR,
		siteLangList: [
			"en",
			"cs",
			"th",
			"id",
			"vn", // * 暫時隱藏
			"my"
		],
		description:
			"Ivorysport is the world leading sportsbook offering one of the kind gambling experience in live betting covering all sports, casino, slots, keno, esports, rng casino, fantasy sports, virtual sports, lottery, live casino, live dealer, bingo, and racing."
	};
};

export const cloudImgURL = "https://image.0814media.net";
export const cloudBannerImgURL = "https://banner.ivorysport.com";
export const paymentImgURL = "http://payment.0814media.net";
export const sportImgURL = "https://sportsimgs.0814media.net";

const SiteURL =
	process.env.NODE_ENV === "production"
		? {
				siteName,
				apiURL: "",
				openURL: "",
				imgUrl: "",
				t_and_cURL: "https://banner.ivorysport.com",
				cloudImgURL
		  }
		: {
				siteName,
				appURL: "http://localhost:3000",
				apiURL: "",
				imgUrl: "http://stag.ivorysport.com",
				t_and_cURL: "https://banner.ivorysport.com",
				openURL: "http://stag.ivorysport.com",
				cloudImgURL
		  };

axios.defaults.baseURL = SiteURL.apiURL;

export default SiteURL;
