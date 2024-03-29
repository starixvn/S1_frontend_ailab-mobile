import { euroCupRequest } from "./base";

export const api_cupEvent_GetCupEventPredictionSetting = ({ langId }) =>
	euroCupRequest.post(`/GetCupEventPredictionSetting`, {
		LangId: langId
	});

export const api_cupEvent_GetCupEventTicket = () =>
	euroCupRequest.post(`/GetCupEventTicket`);

export const api_cupEvent_GetMemberDeposit = () =>
	euroCupRequest.post(`/GetMemberDeposit`);

export const api_cupEvent_GetCupEventTicketSummary = () =>
	euroCupRequest.post(`/GetCupEventTicketSummary`);

export const api_cupEvent_MultiUserPollTickets = ({ userPollTicket, count }) =>
	euroCupRequest.post(`/MultiUserPollTickets`, {
		UserPollTicket: userPollTicket,
		count
	});
