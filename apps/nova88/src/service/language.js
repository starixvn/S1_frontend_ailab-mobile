import { siteInfo } from "../config";

export const isVaildLang = langId => {
	const { siteLangList } = siteInfo();
	return siteLangList.includes(langId);
};

const GetCookie = name => {
	if (typeof document === `undefined`) return null;
	const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
	return match ? match[2] : null;
};

export const GET_LANG_ID = userLangId => {
	const _siteInfo = siteInfo();
	const { siteDefaultLang: siteDefLangId, siteLangList } = _siteInfo;

	let langId = userLangId ?? GetCookie("LangId");
	const browserDefLang =
		typeof window !== `undefined` ? navigator.language.toLowerCase() : null;

	if (!langId && browserDefLang) {
		if (
			browserDefLang.startsWith("ms") ||
			browserDefLang.startsWith("zh-tw") ||
			browserDefLang.startsWith("zh-hk")
		) {
			langId = "cs";
		} else if (browserDefLang.startsWith("zh")) {
			langId = "cs";
		} else if (browserDefLang.startsWith("th")) {
			langId = "th";
		} else if (browserDefLang.startsWith("vi")) {
			langId = "vn";
		} else if (browserDefLang.startsWith("id")) {
			langId = "id";
		} else if (browserDefLang.startsWith("jp")) {
			langId = "jp";
		} else if (browserDefLang.startsWith("ko")) {
			langId = "ko";
		} else if (
			browserDefLang.startsWith("pa") ||
			browserDefLang.startsWith("ta")
		) {
			langId = "hi";
		} else if (browserDefLang.startsWith("en")) {
			langId = "en";
		} else {
			langId = siteDefLangId;
		}
	}

	if (!langId || !siteLangList.includes(langId)) {
		langId = siteDefLangId;
	}

	return langId;
};
