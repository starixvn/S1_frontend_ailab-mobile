import BaseAPI from "./base";

export class LiveStreamingAPI extends BaseAPI {
	GetDataList = ({ langId, currencyId }) =>
		this.liveStreamingRequest.post(`/getDataList/${langId}`, {
			currencyId
		});
}
