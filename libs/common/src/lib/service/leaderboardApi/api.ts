import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import {
	ICustRankMonthData,
	IGetCustRankMonthArgs,
	IGetLeaderBoardListMonthArgs,
	ILeaderBoardMonthData,
	ILeaderboardData
} from "./type";

export const eventApiUrl = {
	getLeaderBoardListMonth: "Events/GetLeaderboardListMonth",
	getLeaderBoardList: "Events/GetLeaderboardList",

	/** 積分頁面 url */
	getLeaderboardSetting: "Events/GetLeaderboardSetting",
	getCustRank: "Events/GetCustRank",
	getCustRankMonth: "Events/GetCustRankMonth"
};

export const leaderboardApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getLeaderBoardListMonth: builder.query<
			IAxiosResponse<ILeaderBoardMonthData[]>,
			IGetLeaderBoardListMonthArgs
		>({
			query: data => ({
				url: eventApiUrl.getLeaderBoardListMonth,
				method: "POST",
				data
			})
		}),
		getCustRankMonth: builder.query<
			IAxiosResponse<ICustRankMonthData>,
			IGetCustRankMonthArgs
		>({
			query: data => ({
				url: eventApiUrl.getCustRankMonth,
				method: "POST",
				data
			})
		}),
		/** 積分頁面 */
		getLeaderboardSetting: builder.query<
			IAxiosResponse<ILeaderboardData>,
			{ siteId: number; currencyId: number }
		>({
			query: data => ({
				url: eventApiUrl.getLeaderboardSetting,
				method: "POST",
				data
			})
		})
	})
});

export const {
	/** 積分頁面 api */
	useGetLeaderboardSettingQuery,
	useGetLeaderBoardListMonthQuery,
	useGetCustRankMonthQuery
} = leaderboardApi;
