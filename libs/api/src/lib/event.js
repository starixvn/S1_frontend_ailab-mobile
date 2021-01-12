import BaseAPI from "./base";

export class EventsAPI extends BaseAPI {
	deflBCategoryId = {
		sport: 1,
		casino: 2,
		liveCasino: 3
	};

	GetLeaderboardList = ({ lBCategoryId, TopNum = 10, BeforeDays = 0 }) =>
		this.evnetsRequest.post(`/GetLeaderboardList/`, {
			lBCategoryId,
			TopNum,
			BeforeDays
		});

	GetCustRank = ({ LBCategoryId, BeforeDays = 0 }) =>
		this.evnetsRequest.post(`/GetCustRank/`, {
			LBCategoryId,
			BeforeDays
		});
}
