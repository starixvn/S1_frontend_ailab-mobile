import { defDeviceType, gameRequest } from "./base";

export const api_GetSlotGamePage = ({ currencyId }) =>
	gameRequest.post("/GetSlotGamePage", {
		DeviceType: defDeviceType.Mobile,
		currencyId
	});
