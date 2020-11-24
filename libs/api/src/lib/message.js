import BaseAPI from "./base";

export class messageAPI extends BaseAPI {
	GetAnnouncement = langId =>
		this.messageRequest.post(`/GetAnnouncement/${langId}`);
}
