import { eventRequest } from "./base";

export const api_events_GetLeaderboardList = async ({
	lBCategoryId = 0,
	TopNum = 10,
	BeforeDays = 0,
	EventCode
}) => {
	try {
		return await eventRequest.post(`/GetLeaderboardList/`, {
			lBCategoryId,
			TopNum,
			BeforeDays,
			EventCode
		});
	} catch (e) {
		return {
			data: {
				data: [],
				errorCode: 0
			}
		};
	}
};

export const api_events_GetCustRank = ({
	LBCategoryId = 0,
	BeforeDays = 0,
	EventCode
}) =>
	eventRequest.post(`/GetCustRank/`, {
		LBCategoryId,
		BeforeDays,
		EventCode
	});

export const api_events_CheckDrawPrize = ({ eventId }) =>
	eventRequest.post(`/CheckDrawPrize/`, {
		eventId
	});

export const api_events_DrawPrize = ({ eventId }) =>
	eventRequest.post(`/DrawPrize/`, {
		eventId
	});

export const api_events_GetCustDrawPrizeList = ({ eventId }) =>
	eventRequest.post(`/GetCustDrawPrizeList/`, {
		eventId
	});

export const api_events_GetDisplayDrawPrizeList = ({ eventId }) =>
	eventRequest.post(`/GetDisplayDrawPrizeList/`, {
		eventId
	});
