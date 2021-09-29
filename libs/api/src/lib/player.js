import BaseAPI from "./base";

export class PlayerAPI extends BaseAPI {
	GetAppLink = () => this.playerRequest.post(`/GetAppLink`);
}
