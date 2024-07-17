import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import {
	ICustRankData,
	ICustRankMonthData,
	IGetCustRankArgs,
	IGetCustRankMonthArgs,
	IGetLeaderBoardData,
	IGetLeaderBoardListArgs,
	IGetLeaderBoardListMonthArgs,
	ILeaderBoardMonthData,
	ILeaderboardData,
	ICheckPromotionMissionData,
	IGetCustBlessingsStickerData,
	IGetCustDrawPrizeListData,
	IDrawPrizeData
} from "./type";

export const eventApiUrl = {
	getLeaderBoardListMonth: "Events/GetLeaderboardListMonth",
	getLeaderBoardList: "Events/GetLeaderboardList",
	getLeaderboardSetting: "Events/GetLeaderboardSetting",
	getCustRank: "Events/GetCustRank",
	getCustRankMonth: "Events/GetCustRankMonth",
	checkPromotionMission: "Events/CheckPromotionMission",
	getCustBlessingsSticker: "Events/GetCustBlessingsSticker",
	getCustDrawPrizeList: "Events/GetCustDrawPrizeList",
	drawPrize: "Events/DrawPrize",
	multiDrawPrize: "Events/MultiDrawPrize",
	claimNewYearBigPrize: "Events/ClaimNewYearBigPrize"
};

export const eventsApi = rootApi.injectEndpoints({
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
		getLeaderBoardList: builder.query<
			IAxiosResponse<IGetLeaderBoardData[]>,
			IGetLeaderBoardListArgs
		>({
			query: data => ({
				url: eventApiUrl.getLeaderBoardList,
				method: "POST",
				data
			})
		}),
		getCustRank: builder.query<
			IAxiosResponse<ICustRankData>,
			IGetCustRankArgs
		>({
			query: data => ({
				url: eventApiUrl.getCustRank,
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
		getLeaderboardSetting: builder.query<
			IAxiosResponse<ILeaderboardData>,
			{ siteId: number; currencyId: number }
		>({
			query: data => ({
				url: eventApiUrl.getLeaderboardSetting,
				method: "POST",
				data
			})
		}),
		checkPromotionMission: builder.query<
			IAxiosResponse<ICheckPromotionMissionData>,
			void
		>({
			query: () => ({
				url: `${eventApiUrl.checkPromotionMission}`,
				method: "POST"
			}),
			providesTags: ["DRAGONEGG_DRAW"]
		}),
		getCustBlessingsSticker: builder.query<
			IAxiosResponse<IGetCustBlessingsStickerData>,
			{ eventId: number }
		>({
			query: ({ eventId }) => ({
				url: `${eventApiUrl.getCustBlessingsSticker}`,
				method: "POST",
				data: { eventId }
			}),
			providesTags: ["DRAGONEGG_BLESSING"]
		}),
		getCustDrawPrizeList: builder.query<
			IAxiosResponse<IGetCustDrawPrizeListData[]>,
			{ eventId: number }
		>({
			query: ({ eventId }) => ({
				url: `${eventApiUrl.getCustDrawPrizeList}`,
				method: "POST",
				data: { eventId }
			})
		}),
		drawPrize: builder.mutation<
			IAxiosResponse<IDrawPrizeData>,
			{ eventId: number }
		>({
			query: ({ eventId }) => ({
				url: `${eventApiUrl.drawPrize}`,
				method: "POST",
				data: { eventId }
			}),
			invalidatesTags: ["DRAGONEGG_DRAW", "DRAGONEGG_BLESSING"]
		}),
		multiDrawPrize: builder.mutation<
			IAxiosResponse<IDrawPrizeData[]>,
			{ eventId: number; drawTimes: number }
		>({
			query: ({ eventId, drawTimes }) => ({
				url: `${eventApiUrl.multiDrawPrize}`,
				method: "POST",
				data: { eventId, drawTimes }
			}),
			invalidatesTags: ["DRAGONEGG_DRAW", "DRAGONEGG_BLESSING"]
		}),
		claimNewYearBigPrize: builder.mutation<
			IAxiosResponse<void>,
			{ eventId: number }
		>({
			query: ({ eventId }) => ({
				url: `${eventApiUrl.claimNewYearBigPrize}`,
				method: "POST",
				data: { eventId }
			}),
			invalidatesTags: ["DRAGONEGG_BLESSING"]
		})
	})
});

export const {
	useGetLeaderBoardListMonthQuery,
	useGetLeaderBoardListQuery,
	useGetCustRankQuery,
	useGetCustRankMonthQuery,
	useGetLeaderboardSettingQuery,
	useCheckPromotionMissionQuery,
	useLazyCheckPromotionMissionQuery,
	useLazyGetCustBlessingsStickerQuery,
	useLazyGetCustDrawPrizeListQuery,
	useDrawPrizeMutation,
	useMultiDrawPrizeMutation,
	useClaimNewYearBigPrizeMutation
} = eventsApi;
