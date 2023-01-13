const ns = { commonTranslations: "commonTranslations" };

/* eslint-disable global-require */
const resources = {
	bd: require("./bd.json"),
	en: require("./en.json"),
	cs: require("./cs.json"),
	hi: require("./hi.json"),
	id: require("./id.json"),
	my: require("./my.json"),
	th: require("./th.json"),
	vn: require("./vn.json")
};

const fallbackNS = [ns.commonTranslations];

export const commonI18n = {
	ns,
	resources,
	fallbackNS
};
