import BaseAPI from "./base";

export class MessageAPI extends BaseAPI {
	GetAnnouncement = langId =>
		this.messageRequest.post(`/GetAnnouncement/${langId}`);
}
