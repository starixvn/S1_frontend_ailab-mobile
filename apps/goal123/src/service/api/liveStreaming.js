import { liveStreamingRequest } from "./base";

export const api_liveStreaming_GetDataList = ({ langId, currencyId }) =>
	liveStreamingRequest.post(`/GetDataList/${langId}`, { currencyId });
