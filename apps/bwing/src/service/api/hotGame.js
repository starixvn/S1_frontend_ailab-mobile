import { hotGameRequest, defDeviceType } from "./base";

export const api_HotGame_GetDataList = langId =>
	hotGameRequest.post(`/GetDataList/${langId}`, {
		DeviceType: defDeviceType.Mobile,
		CurrencyId: 51
	});
