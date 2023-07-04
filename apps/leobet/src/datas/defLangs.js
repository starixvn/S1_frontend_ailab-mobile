import { defCurrenyId } from "../components/common/common";
import { cloudBannerImgURL } from "../config";

export default {
	HI: {
		country: "HI",
		img: `${cloudBannerImgURL}/h5/img/in.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "hi", displayText: "Hindi" }
		],
		countryName: "India",
		currencyId: defCurrenyId.INR
	}
};
