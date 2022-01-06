import ch from "../styles/img/ch.jpg";
import th from "../styles/img/th.jpg";
import hi from "../styles/img/in.jpg";
import id from "../styles/img/id.jpg";
import { defCurrenyId } from "../components/common/common";

export default isLogin => ({
	MY: {
		country: "MY",
		img: ch,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "cs", displayText: "简体中文" }
		],
		countryName: "Malaysia",
		currencyId: defCurrenyId.MYR
	},
	TH: {
		country: "TH",
		img: th,
		lang: isLogin
			? [
					{ value: "th_en", displayText: "English" },
					{ value: "th", displayText: "ภาษาไทย" },
					{ value: "cs", displayText: "简体中文" }
			  ]
			: [
					{ value: "th_en", displayText: "English" },
					{ value: "th", displayText: "ภาษาไทย" }
			  ],
		countryName: "Thailand",
		currencyId: defCurrenyId.THB
	},
	ID: {
		country: "ID",
		img: id,
		lang: [
			{ value: "id_en", displayText: "English" },
			{ value: "id", displayText: "Indonesian" }
		],
		countryName: "Indonesia",
		currencyId: defCurrenyId.IDR
	},
	HI: {
		country: "HI",
		img: hi,
		lang: [
			{ value: "hi_en", displayText: "English" },
			{ value: "hi", displayText: "Hindi" }
		],
		countryName: "India",
		currencyId: defCurrenyId.INR
	}
});
