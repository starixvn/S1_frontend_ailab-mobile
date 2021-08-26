import BaseAPI from "./base";

export class EventsAPI extends BaseAPI {
	deflBCategoryId = {
		sport: 1,
		casino: 2,
		liveCasino: 3
	};

	GetLeaderboardListMonth = ({
		lBCategoryId = 0,
		TopNum,
		SelectDays,
		EventCode
	}) =>
		this.evnetsRequest.post(`/GetLeaderboardListMonth/`, {
			lBCategoryId,
			TopNum,
			SelectDays,
			EventCode
		});

	GetCustRankMonth = ({ LBCategoryId = 0, SelectDays, EventCode }) =>
		this.evnetsRequest.post(`/GetCustRankMonth/`, {
			LBCategoryId,
			SelectDays,
			EventCode
		});

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

	GetLeaderboardListV2 = ({
		lBCategoryId,
		TopNum = 10,
		BeforeDays = 0,
		EventCode
	}) =>
		this.evnetsRequest.post(`/GetLeaderboardListV2/`, {
			lBCategoryId,
			TopNum,
			BeforeDays,
			EventCode
		});

	GetCustRankV2 = ({ LBCategoryId, BeforeDays = 0, EventCode }) =>
		this.evnetsRequest.post(`/GetCustRankV2/`, {
			LBCategoryId,
			BeforeDays,
			EventCode
		});

	GetLeaderboardListV3 = ({
		lBCategoryId,
		TopNum = 10,
		BeforeDays = 0,
		EventCode
	}) =>
		this.evnetsRequest.post(`/GetLeaderboardListV3/`, {
			lBCategoryId,
			TopNum,
			BeforeDays,
			EventCode
		});

	CheckDrawPrize = ({ eventId }) =>
		this.evnetsRequest.post(`/CheckDrawPrize/`, {
			eventId
		});

	DrawPrize = ({ eventId }) =>
		this.evnetsRequest.post(`/DrawPrize/`, {
			eventId
		});

	GetCustDrawPrizeList = ({ eventId }) =>
		this.evnetsRequest.post(`/GetCustDrawPrizeList/`, {
			eventId
		});
}
