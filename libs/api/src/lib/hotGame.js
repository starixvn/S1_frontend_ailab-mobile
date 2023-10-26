import BaseAPI, { defDeviceType } from "./base";

export class HotGameAPI extends BaseAPI {
	GetDataList = ({ currencyId }) =>
		this.hotGameRequest.post(`/GetDataList`, {
			DeviceType: defDeviceType.Mobile,
			CurrencyId: currencyId
		});
}
