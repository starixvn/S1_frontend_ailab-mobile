import BaseAPI, { defDeviceType } from "./base";

export class HotGameAPI extends BaseAPI {
	GetDataList = ({ currencyId, langId }) =>
		this.hotGameRequest.post(`/GetDataList/${langId}`, {
			DeviceType: defDeviceType.Mobile,
			CurrencyId: currencyId
		});
}
