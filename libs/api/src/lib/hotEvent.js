import BaseAPI from "./base";

export class HotEventAPI extends BaseAPI {
	GetDataList = ({ langId }) =>
		this.hotEventRequest.post(`/GetDataList/${langId}`);
}
