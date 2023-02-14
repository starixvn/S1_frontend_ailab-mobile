import { hotGameRequest, defDeviceType } from "./base";

export const api_HotGame_GetDataList = () =>
	hotGameRequest.post(`/GetDataList`, {
		DeviceType: defDeviceType.Mobile,
		CurrencyId: 51
	});
