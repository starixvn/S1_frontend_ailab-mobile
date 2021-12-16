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

const bannerImgUrl = "https://banner.bw88.io";

export const usdtImgUrl = "https://payment.bw88.io";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: "",
			bannerImgUrl
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
			t_and_cURL: "https://stag.bwing.com",
			openURL: "",
			bannerImgUrl
	  };
