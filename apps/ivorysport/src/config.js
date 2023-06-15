import axios from "axios";
import { validImgLang, defCurrenyId } from "./components/common/common";

const siteName = "Ivorysport";
export const siteId = 1;

export const errorPageUrl = langId =>
	`https://error.0814media.net/404/index_${validImgLang(langId)}.html`;

export const siteInfo = langId => {
	return {
		siteName,
		siteId: 1,
		langCookie: "IvorysportLangId",
		currencyCookie: "ivorysportCurrencyId",
		siteDefaultLang: "en",
		siteDefaultCurrencyId: defCurrenyId.MYR,
		siteLangList: ["en", "cs", "th", "id", "vn"],
		logo: "https://banner.ivorysport.com/h5/img/logo_en_w.png",
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
				// apiURL: "http://localhost:60930",
				// imgUrl: "http://localhost:60930",
				// t_and_cURL: "http://localhost:60930",
				// openURL: "http://localhost:60930"

				apiURL: "",
				imgUrl: "https://www.n88dev.com",
				t_and_cURL: "https://banner.ivorysport.com",
				openURL: "https://www.n88dev.com",
				cloudImgURL
		  };

axios.defaults.baseURL = SiteURL.apiURL;

export default SiteURL;
