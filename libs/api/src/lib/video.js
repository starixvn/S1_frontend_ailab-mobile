import BaseAPI from "./base";

export class VideoAPI extends BaseAPI {
	GetLiveStreamingList = langId => {
		return this.videoRequest.post(`/GetLiveStreamingList/${langId}`);
	};
}
