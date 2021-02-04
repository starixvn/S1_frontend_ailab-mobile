import React from "react";
// import THBList from "./eventListTHB";
// import IDRList from "./eventListIDR";
import MYRList from "./eventListMYR";

const langToCurrency = {
	en: "MYR",
	cs: "MYR",
	th: "THB",
	id: "IDR"
};

export const EventList = ({ langId }) => {
	let content = null;
	if (langToCurrency[langId] === "THB") {
		// content = <THBList  />;
	} else if (langToCurrency[langId] === "IDR") {
		// content = <IDRList />;
	} else {
		content = <MYRList />;
	}

	return content;
};
