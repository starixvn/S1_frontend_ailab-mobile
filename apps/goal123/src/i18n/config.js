/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { commonI18n } from "@ailab-mobile/common";
import { GET_LANG_ID } from "../service/language";
import { siteInfo } from "../config";

export const langList = ["en", "vn"];
export const defaultLang = siteInfo().siteDefaultLang;

export default lang => {
	let _lang = lang || GET_LANG_ID();
	if (!langList.includes(_lang)) {
		_lang = defaultLang;
	}

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const localResources = require(`./${_lang}.json`);
	const commonResources = commonI18n.resources[_lang];

	// * [當前 app 翻譯 > 共用的默認翻譯 ]
	Object.keys(commonResources).forEach(key => {
		if (!localResources[key] && commonResources[key]) {
			localResources[key] = commonResources[key];
		}
	});

	return localResources;
};

export const ReplaceStr = (str, patterns) => {
	let result = str;
	Object.keys(patterns).forEach(p => {
		result = result.replace(`{{${p}}}`, patterns[p]);
	});

	return str;
};
