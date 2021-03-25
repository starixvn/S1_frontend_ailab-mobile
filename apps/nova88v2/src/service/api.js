import {
	AccountAPI,
	AccountStrictAPI,
	TpAPI,
	SiteAPI,
	MessageAPI,
	PaymentAPI,
	EventsAPI,
	PromotionAPI
} from "@ailab-mobile/api";

import config from "../config";

export default {
	account: new AccountAPI(config),
	accountStrict: new AccountStrictAPI(config),
	tp: new TpAPI(config),
	site: new SiteAPI(config),
	message: new MessageAPI(config),
	payment: new PaymentAPI(config),
	events: new EventsAPI(config),
	promotion: new PromotionAPI(config)
};
