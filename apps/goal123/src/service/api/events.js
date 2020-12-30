import { eventRequest } from "./base";

export const api_events_GetLeaderboardList = ({
	lBCategoryId = 0,
	TopNum = 10,
	BeforeDays = 0
}) =>
	eventRequest.post(`/GetLeaderboardList/`, {
		lBCategoryId,
		TopNum,
		BeforeDays
	});

export const api_events_GetCustRank = ({ LBCategoryId = 0, BeforeDays = 0 }) =>
	eventRequest.post(`/GetCustRank/`, {
		LBCategoryId,
		BeforeDays
	});
