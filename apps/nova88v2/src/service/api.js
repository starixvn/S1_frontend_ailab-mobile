import {
	AccountAPI,
	AccountStrictAPI,
	TpAPI,
	SiteAPI,
	MessageAPI,
	PaymentAPI,
	EventsAPI,
	VideoAPI,
	PromotionAPI,
	CashierAPI,
	PlayerAPI,
	LineLoginAPI,
	WorldCupPredictionAPI,
	HotEventAPI,
  GameAPI
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
	video: new VideoAPI(config),
	promotion: new PromotionAPI(config),
	cashier: new CashierAPI(config),
	player: new PlayerAPI(config),
	lineLogin: new LineLoginAPI(config),
	worldCupPrediction: new WorldCupPredictionAPI(config),
	hotEvent: new HotEventAPI(config),
  game: new GameAPI(config)
};
