const siteName = "Goal123";
export const siteId = 2;

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
	`https://error.goal123.org/404/index_${langId}.html`;

export const siteInfo = langId => {
	return {
		siteName: "Goal123",
		langCookie: "goal123LangId",
		affiliateLink: getAffiliate(langId),
		siteDefaultLang: "vn",
		siteLangList: ["en", "vn"],
		liveChatId: 12171870
	};
};

export const bannerImgUrl = "https://banner.goal123.org";
export const sportsImgUrl = "https://sportsimgs.goal123.org";
export const paymentImgUrl = "https://payment.goal123.org";
export const cloudImgURL = "https://image.0814media.net";
export const usdtImgUrl = "https://payment.goal123.org";
export const bannerMediaUrl = "https://banner.0814media.net";
export const paymentNoSiteImgURL = "https://payment.0814media.net";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: "https://banner.goal123.org",
			bannerImgUrl,
			paymentImgUrl,
			paymentNoSiteImgURL
	  }
	: {
			siteName,
			appURL: "http://localhost:3000",
			// apiURL: "http://localhost:60930",
			// imgUrl: "http://localhost:60930",
			// t_and_cURL: "http://localhost:60930",
			// openURL: "http://localhost:60930"

			apiURL: "",
			imgUrl: "https://stag.goal123.com",
			t_and_cURL: "https://banner.goal123.org",
			openURL: "",
			bannerImgUrl,
			paymentImgUrl,
			paymentNoSiteImgURL
	  };
