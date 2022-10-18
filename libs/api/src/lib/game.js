import BaseAPI, { defDeviceType } from "./base";

export class GameAPI extends BaseAPI {
	GetSlotGamePage = ({ currencyId }) =>
		this.gameRequest.post(`/GetSlotGamePage`, {
			DeviceType: defDeviceType.Mobile,
			currencyId
		});
}
