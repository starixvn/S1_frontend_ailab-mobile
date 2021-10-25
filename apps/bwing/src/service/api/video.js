import { videoRequest } from "./base";

export const api_GetLiveStreamingList = lang =>
	videoRequest.post(`/GetLiveStreamingList/${lang}`);
