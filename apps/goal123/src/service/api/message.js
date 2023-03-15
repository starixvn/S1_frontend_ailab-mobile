import { messageRequest } from "./base";

export const api_GetAnnouncement = ({ langId, currencyId }) =>
	messageRequest.post(`/GetAnnouncement/${langId}`, { currencyId });
