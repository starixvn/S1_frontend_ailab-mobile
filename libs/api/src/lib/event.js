import BaseAPI from "./base";

export class eventsAPI extends BaseAPI {
	deflBCategoryId = {
		sport: 1,
		casino: 2,
		liveCasino: 3
	};
	GetLeaderboardList = ({ lBCategoryId, TopNum = 10, BeforeDays = 1 }) =>
		this.evnetsRequest.post(`/GetLeaderboardList/`, {
			lBCategoryId,
			TopNum,
			BeforeDays
		});
}
