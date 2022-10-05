import BaseAPI from "./base";

export class GameAPI extends BaseAPI {
	GetSlotGamePage = ({ deviceType }) =>
		this.gameRequest.post(`/GetSlotGamePage`, { deviceType });
}
