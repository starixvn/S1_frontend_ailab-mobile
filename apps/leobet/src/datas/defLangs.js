import { defCurrenyId } from "../components/common/common";
import { cloudBannerImgURL } from "../config";

export default {
	ID: {
		country: "ID",
		img: `${cloudBannerImgURL}/h5/img/id.jpg`,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "id", displayText: "Indonesian" }
		],
		countryName: "Indonesia",
		currencyId: defCurrenyId.IDR
	}
};
