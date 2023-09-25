import { newsRequest } from "./base";

export const api_GetNews = ({
	langId,
	PageNumber = 1,
	PageSize = 2,
	currencyId
}) =>
	newsRequest.post(`/GetNews/${langId}`, {
		PageNumber,
		PageSize,
		currencyId
	});
