const siteName = "Bwing";
export const siteId = 3;

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
	`https://error.bw88.io/404/index_${langId}.html`;

export const siteInfo = langId => {
	return {
		siteName: "Bwing",
		langCookie: "bwingLangId",
		affiliateLink: getAffiliate(langId),
		siteDefaultLang: "vn",
		siteLangList: ["en", "vn"],
		liveChatId: 12145020,
		skypeId: "skype:live:.cid.ae9eac1a78556dc6?chat",
		telegramId: "https://t.me/Bwingcsd",
		zaloId: "https://zalo.me/Bwingcsd",
		facebookId: "https://www.facebook.com/Bwingtttt/",
		twitterId: "https://twitter.com/bwingofficial",
		youtubeId:
			"https://www.youtube.com/channel/UCDvFS9eTrOEYuVjb3BNQ3bg/featured",
		tiktokId: "https://www.tiktok.com/@bwingpro"
	};
};

export const bannerImgUrl = "https://banner.bw88.io";
export const sportsImgUrl = "https://sportsimgs.bw88.io";
export const paymentImgUrl = "https://payment.bw88.io";
export const cloudImgURL = "https://image.0814media.net";
export const usdtImgUrl = "https://payment.bw88.io";
export const bannerMediaUrl = "https://banner.0814media.net";
export const paymentNoSiteImgURL = "https://payment.0814media.net";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: "https://banner.0814media.net",
			bannerImgUrl,
			sportsImgUrl,
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
			imgUrl: "https://stag.bwing.com",
			t_and_cURL: "https://banner.0814media.net",
			openURL: "",
			bannerImgUrl,
			sportsImgUrl,
			paymentImgUrl,
			paymentNoSiteImgURL
	  };
