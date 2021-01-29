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

export const api_events_GetLeaderboardListV2 = ({
	lBCategoryId = 0,
	TopNum = 10,
	BeforeDays = 0,
	EventCode
}) =>
	eventRequest.post(`/GetLeaderboardListV2/`, {
		lBCategoryId,
		TopNum,
		BeforeDays,
		EventCode
	});

export const api_events_GetCustRank = ({ LBCategoryId = 0, BeforeDays = 0 }) =>
	eventRequest.post(`/GetCustRank/`, {
		LBCategoryId,
		BeforeDays
	});

export const api_events_GetCustRankV2 = ({
	LBCategoryId = 0,
	BeforeDays = 0,
	EventCode
}) =>
	eventRequest.post(`/GetCustRankV2/`, {
		LBCategoryId,
		BeforeDays,
		EventCode
	});

export const api_events_CheckDrawPrize = ({ eventId = 0 }) =>
	eventRequest.post(`/CheckDrawPrize/`, {
		eventId
	});

export const api_events_DrawPrize = ({ eventId = 0 }) =>
	eventRequest.post(`/DrawPrize/`, {
		eventId
	});

export const api_events_GetCustDrawPrizeList = ({ eventId = 0 }) =>
	eventRequest.post(`/GetCustDrawPrizeList/`, {
		eventId
	});
