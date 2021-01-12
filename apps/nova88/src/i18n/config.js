/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { GET_LANG_ID } from "../service/language";
import { siteInfo } from "../config";

export const langList = siteInfo().siteLangList;
export const defaultLang = siteInfo().siteDefaultLang;

export default lang => {
	let _lang = GET_LANG_ID(lang);

	if (!langList.includes(_lang)) {
		_lang = defaultLang;
	}
	return require(`./${_lang}.json`);
};

export const ReplaceStr = (str, patterns) => {
	let result = str;
	Object.keys(patterns).forEach(p => {
		result = result.replace(`{{${p}}}`, patterns[p]);
	});

	return result;
};
