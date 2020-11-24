import {
	accountAPI,
	accountStrictAPI,
	tpAPI,
	siteAPI,
	messageAPI,
	paymentAPI
} from "@ailab-mobile/api";

import config from "Config";

export default {
	account: new accountAPI(config),
	accountStrict: new accountStrictAPI(config),
	tp: new tpAPI(config),
	site: new siteAPI(config),
	message: new messageAPI(config),
	payment: new paymentAPI(config)
};
