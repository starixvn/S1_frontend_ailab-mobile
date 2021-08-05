import ch from "../styles/img/ch.jpg";
import th from "../styles/img/th.jpg";
// import hi from "../styles/img/in.jpg";
import id from "../styles/img/id.jpg";
import cs from "../styles/img/cs.jpg";

export default {
	MY: {
		country: "MY",
		img: ch,
		lang: [{ value: "en", displayText: "English" }]
	},
	CS: {
		country: "CS",
		img: cs,
		lang: [{ value: "cs", displayText: "简体中文" }]
	},
	TH: {
		country: "TH",
		img: th,
		lang: [{ value: "th", displayText: "ภาษาไทย" }]
	},
	ID: {
		country: "ID",
		img: id,
		lang: [{ value: "id", displayText: "Indonesian" }]
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
