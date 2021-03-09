import axios from "axios";

const siteName = "Nova88";
export const siteId = 1;

const getAffiliate = langId => {
	if (typeof window === `undefined`) return "";

	const fullPath = window.location.hostname;
	const arr = fullPath.split(".");

	return arr.length === 3
		? `https://aff.${arr
				.filter((p, idx) => idx !== 0)
				.join(".")}/?lang=${langId}`
		: `https://aff.${arr.join(".")}/?lang=${langId}`;
};

export const errorPageUrl = langId =>
	`https://error.n88media.com/404/index_${langId}.html`;

export const siteInfo = langId => {
	return {
		siteName,
		siteId: 1,
		affiliateLink: getAffiliate(langId),
		siteDefaultLang: "en",
		siteLangList: ["en", "cs", "th", "id"],
		logo:
			langId === "cs"
				? "https://image.n88media.com/SiteSkin/img/logo_cs.png"
				: "https://image.n88media.com/SiteSkin/img/logo_en.png",
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
				link: "https://www.instagram.com/nova88.net_official",
				displayKey: "lbl_Instagram"
			}
		},
		staticPromotions:
			"https://image.n88media.com/NovaPromotion/promotionList.json"
	};
};

const cloudImgURL = "https://image.n88media.com";

const SiteURL =
	process.env.NODE_ENV === "production"
		? {
				siteName,
				apiURL: "",
				openURL: "",
				imgUrl: "",
				t_and_cURL: "",
				cloudImgURL
		  }
		: {
				siteName,
				appURL: "http://localhost:3000",
				// apiURL: "http://localhost:60930",
				// imgUrl: "http://localhost:60930",
				// t_and_cURL: "http://localhost:60930",
				// openURL: "http://localhost:60930"

				apiURL: "http://www.n88dev.com",
				imgUrl: "http://www.n88dev.com",
				t_and_cURL: "http://www.n88dev.com",
				openURL: "http://www.n88dev.com",
				cloudImgURL
		  };

axios.defaults.baseURL = SiteURL.apiURL;

export default SiteURL;
