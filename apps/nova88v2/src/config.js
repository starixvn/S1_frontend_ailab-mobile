import axios from "axios";
import { validImgLang, defCurrenyId } from "./components/common/common";

const siteName = "Nova88";
export const siteId = 1;

export const errorPageUrl = langId =>
	`https://error.0814media.net/404/index_${validImgLang(langId)}.html`;

export const siteInfo = langId => {
	return {
		siteName,
		siteId: 1,

		langCookie: "nova88LangId",
		currencyCookie: "nova88CurrencyId",
		siteDefaultLang: "en",
		siteDefaultCurrencyId: defCurrenyId.MYR,
		siteLangList: ["en", "cs", "th", "id", "hi", "bd", "my", "kh", "vn"],
		logo: "https://banner.0814media.net/h5/img/logo_en_w.png",
		description:
			"Nova88 is the world leading sportsbook offering one of the kind gambling experience in live betting covering all sports, casino, slots, keno, esports, rng casino, fantasy sports, virtual sports, lottery, live casino, live dealer, bingo, and racing.",
		iosIcon: "Nova88_256_2.png",
		socialMedia: {
			fb: {
				icon: "facebook2",
				link: "https://www.facebook.com/nova88official/",
				displayKey: "lbl_Facebook"
			},
			twitter: {
				icon: "twitter",
				link: "https://twitter.com/nova88official",
				displayKey: "lbl_Twitter"
			},
			ig: {
				icon: "instagram",
				link: "https://www.instagram.com/nova88_official/",
				displayKey: "lbl_Instagram"
			}
		},
		staticPromotions:
			"https://image.0814media.net/NovaPromotion/promotionList.json"
	};
};

export const cloudImgURL = "https://image.0814media.net";
export const cloudBannerImgURL = "https://banner.0814media.net";
export const paymentImgURL = "http://payment.0814media.net";
export const sportImgURL = "https://sportsimgs.0814media.net";

const SiteURL =
	process.env.NODE_ENV === "production"
		? {
				siteName,
				apiURL: "",
				openURL: "",
				imgUrl: "",
				t_and_cURL: "https://banner.0814media.net",
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
				t_and_cURL: "https://banner.0814media.net",
				openURL: "",
				cloudImgURL
		  };

axios.defaults.baseURL = SiteURL.apiURL;

export default SiteURL;
