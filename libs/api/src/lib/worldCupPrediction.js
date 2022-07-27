import BaseAPI from "./base";

export class WorldCupPredictionAPI extends BaseAPI {
	GetWorldCupPredictionSetting = ({ langId }) =>
		this.worldCupPredictionRequest.post(`/GetWorldCupPredictionSetting`, {
			LangId: langId
		});

	GetMemberDepositTicketInfo = () =>
		this.worldCupPredictionRequest.post(`/GetMemberDepositTicketInfo`);

	UserPollTickets = ({ ticketType, countryId }) =>
		this.worldCupPredictionRequest.post(`/UserPollTickets`, {
			ticketType,
			countryId
		});
}
