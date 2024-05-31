import BaseAPI, { getDeviceType } from "./base";

export class HotGameAPI extends BaseAPI {
	GetDataList = ({ currencyId, langId }) =>
		this.hotGameRequest.post(`/GetDataList/${langId}`, {
			DeviceType: getDeviceType(),
			CurrencyId: currencyId
		});
}
