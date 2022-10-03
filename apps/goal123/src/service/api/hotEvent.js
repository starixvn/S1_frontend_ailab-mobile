import { hotEventRequest } from "./base";

export const api_hotEvent_GetDataList = ({ langId }) =>
	hotEventRequest.post(`/GetDataList/${langId}`);
