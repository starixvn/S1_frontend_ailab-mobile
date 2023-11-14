import { defCurrenyId } from "../components/common/common";
import { cloudBannerImgURL } from "../config";

export const defLangGroups = {
	MY: {
		country: "MY",
		img: `${cloudBannerImgURL}/h5/img/ch.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "cs", displayText: "简体中文" },
			{ value: "my", displayText: "Malay" }
		],
		countryName: "Malaysia",
		currencyId: defCurrenyId.MYR
	},
	TH: {
		country: "TH",
		img: `${cloudBannerImgURL}/h5/img/th.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "th", displayText: "ภาษาไทย" }
		],
		countryName: "Thailand",
		currencyId: defCurrenyId.THB
	},
	VN: {
		country: "VN",
		img: `${cloudBannerImgURL}/h5/img/vn.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "vn", displayText: "Tiếng Việt" }
		],
		countryName: "Vietnam",
		currencyId: defCurrenyId.VND
	},
	ID: {
		country: "ID",
		img: `${cloudBannerImgURL}/h5/img/id.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "id", displayText: "Indonesian" }
		],
		countryName: "Indonesia",
		currencyId: defCurrenyId.IDR
	},
	HI: {
		country: "HI",
		img: `${cloudBannerImgURL}/h5/img/in.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "hi", displayText: "Hindi" }
		],
		countryName: "India",
		currencyId: defCurrenyId.INR
	},
	BD: {
		country: "BD",
		img: `${cloudBannerImgURL}/h5/img/bd.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "bd", displayText: "বাংলা" }
		],
		countryName: "Bangladesh",
		currencyId: defCurrenyId.BDT
	},
	KH: {
		country: "KH",
		img: `${cloudBannerImgURL}/h5/img/kh.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "kh", displayText: "ខ្មែរ" }
		],
		countryName: "Cambodia",
		currencyId: defCurrenyId.KHM
	},
	CS: {
		country: "CS",
		img: `${cloudBannerImgURL}/h5/img/cs.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "cs", displayText: "简体中文" }
		],
		countryName: "China",
		currencyId: defCurrenyId.CNY
	},
	GB: {
		country: "GB",
		img: `${cloudBannerImgURL}/h5/img/gb.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "cs", displayText: "简体中文" }
		],
		countryName: "Global",
		currencyId: defCurrenyId.USD
	}
};

export default defLangGroups;
