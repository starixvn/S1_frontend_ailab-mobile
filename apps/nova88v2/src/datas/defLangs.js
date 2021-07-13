import ch from "../styles/img/ch.jpg";
import th from "../styles/img/th.jpg";
// import hi from "../styles/img/in.jpg";
import id from "../styles/img/id.jpg";

export default {
	MY: {
		country: "MY",
		img: ch,
		lang: [
			{ value: "en", displayText: "English" },
			{ value: "cs", displayText: "简体中文" }
		]
	},
	TH: {
		country: "TH",
		img: th,
		lang: [
			// { value: "th_en", displayText: "English" },
			{ value: "th", displayText: "ภาษาไทย" }
		]
	},
	ID: {
		country: "ID",
		img: id,
		lang: [
			// { value: "id_en", displayText: "English" },
			{ value: "id", displayText: "Indonesian" }
		]
	}
	// HI: {
	// 	country: "HI",
	// 	img: hi,
	// 	lang: [
	// 		{ value: "hi_en", displayText: "English" },
	// 		{ value: "hi", displayText: "Hindi" }
	// 	]
	// }
};
