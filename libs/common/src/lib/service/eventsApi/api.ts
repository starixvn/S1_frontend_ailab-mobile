import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import {
	ICheckPromotionMissionData,
	IGetCustBlessingsStickerData,
	IGetCustDrawPrizeListData,
	IDrawPrizeData
} from "./type";

const eventsApiUrl = {
	checkPromotionMission: "Events/CheckPromotionMission",
	getCustBlessingsSticker: "Events/GetCustBlessingsSticker",
	getCustDrawPrizeList: "Events/GetCustDrawPrizeList",
	drawPrize: "Events/DrawPrize",
	multiDrawPrize: "Events/MultiDrawPrize",
	claimNewYearBigPrize: "Events/ClaimNewYearBigPrize"
};

export const eventsApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		checkPromotionMission: builder.query<
			IAxiosResponse<ICheckPromotionMissionData>,
			void
		>({
			query: () => ({
				url: `${eventsApiUrl.checkPromotionMission}`,
				method: "POST"
			}),
			providesTags: ["DRAGONEGG_DRAW"]
		}),
		getCustBlessingsSticker: builder.query<
			IAxiosResponse<IGetCustBlessingsStickerData>,
			{ eventId: number }
		>({
			query: ({ eventId }) => ({
				url: `${eventsApiUrl.getCustBlessingsSticker}`,
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
				url: `${eventsApiUrl.getCustDrawPrizeList}`,
				method: "POST",
				data: { eventId }
			})
		}),
		drawPrize: builder.mutation<
			IAxiosResponse<IDrawPrizeData>,
			{ eventId: number }
		>({
			query: ({ eventId }) => ({
				url: `${eventsApiUrl.drawPrize}`,
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
				url: `${eventsApiUrl.multiDrawPrize}`,
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
				url: `${eventsApiUrl.claimNewYearBigPrize}`,
				method: "POST",
				data: { eventId }
			}),
			invalidatesTags: ["DRAGONEGG_BLESSING"]
		})
	})
});

export const {
	useCheckPromotionMissionQuery,
	useLazyCheckPromotionMissionQuery,
	useLazyGetCustBlessingsStickerQuery,
	useLazyGetCustDrawPrizeListQuery,
	useDrawPrizeMutation,
	useMultiDrawPrizeMutation,
	useClaimNewYearBigPrizeMutation
} = eventsApi;
