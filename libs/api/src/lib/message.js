import BaseAPI from "./base";

export class MessageAPI extends BaseAPI {
	GetAnnouncement = ({ langId, currencyId }) =>
		this.messageRequest.post(`/GetAnnouncement/${langId}`, { currencyId });
}
