import BaseAPI, { getDeviceType } from "./base";

export class GameAPI extends BaseAPI {
	GetSlotGamePage = ({ currencyId }) =>
		this.gameRequest.post(`/GetSlotGamePage`, {
			DeviceType: getDeviceType(),
			currencyId
		});

	GetRecentlyViewed = ({ currencyId }) =>
		this.gameRequest.post(`/GetRecentlyViewed`, {
			DeviceType: getDeviceType(),
			currencyId
		});
}
