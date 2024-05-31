import { getDeviceType } from "@ailab-mobile/api";
import { hotGameRequest } from "./base";

export const api_HotGame_GetDataList = langId =>
	hotGameRequest.post(`/GetDataList/${langId}`, {
		DeviceType: getDeviceType(),
		CurrencyId: 51
	});
