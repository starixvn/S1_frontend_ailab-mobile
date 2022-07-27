import { worldCupPredictionRequest } from "./base";

export const api_worldCupPrediction_GetWorldCupPredictionSetting = ({
	langId
}) =>
	worldCupPredictionRequest.post(`/GetWorldCupPredictionSetting`, {
		LangId: langId
	});

export const api_worldCupPrediction_GetMemberDepositTicketInfo = () =>
	worldCupPredictionRequest.post(`/GetMemberDepositTicketInfo`);

export const api_worldCupPrediction_UserPollTickets = ({
	ticketType,
	countryId
}) =>
	worldCupPredictionRequest.post(`/UserPollTickets`, {
		ticketType,
		countryId
	});
