import { defCurrenyId } from "../components/common/common";
import { cloudBannerImgURL } from "../config";

export default {
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
	VN: {
		country: "VN",
		img: `${cloudBannerImgURL}/h5/img/vn.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "vn", displayText: "Tiếng Việt" }
		],
		countryName: "VND",
		currencyId: defCurrenyId.VND
	}
};
