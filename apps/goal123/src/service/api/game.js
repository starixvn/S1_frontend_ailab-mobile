import { getDeviceType } from "@ailab-mobile/api";
import { gameRequest } from "./base";

export const api_GetSlotGamePage = ({ currencyId }) =>
	gameRequest.post("/GetSlotGamePage", {
		DeviceType: getDeviceType(),
		currencyId
	});

export const api_GetRecentlyViewed = ({ currencyId }) =>
	gameRequest.post(`/GetRecentlyViewed`, {
		DeviceType: getDeviceType(),
		currencyId
	});
