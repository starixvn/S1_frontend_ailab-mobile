/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { commonI18n } from "@ailab-mobile/common";
import { siteInfo } from "../config";

export const defLangList = siteInfo().siteLangList;
export const defaultLang = siteInfo().siteDefaultLang;

const setResources = () => {
	const result = {};
	defLangList.forEach(l => {
		result[l] = {
			// * 共用的默認翻譯
			[commonI18n.ns.commonTranslations]: commonI18n.resources?.[l],
			// * 當前 app 翻譯
			translations: require(`./${l}.json`)
		};
	});

	return result;
};

i18n.use(initReactI18next).init({
	fallbackLng: defaultLang,
	resources: setResources(),
	fallbackNS: [
		// * 配置使用順序，當 commonI18n 的 fallbackNS 找不到翻譯時，則使用當前 app 的 "translations"
		...commonI18n.fallbackNS,
		"translations"
	],
	defaultNS: "translations",
	returnObjects: true,
	debug: process.env.NODE_ENV === "development",
	interpolation: {
		escapeValue: false
	},
	react: {
		wait: true
	}
});
