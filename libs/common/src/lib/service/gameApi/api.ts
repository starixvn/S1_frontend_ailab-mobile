import { getDeviceType } from "@ailab-mobile/api";
import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import type {
	IGetSlotGamePageDataArgs,
	ISlotGamePageData,
	ILobbyHeaderData,
	IRecentlyViewData
} from "./type";

const gameApiUrl = {
	getSlotGamePage: "Game/GetSlotGamePage",
	getLobbyHeader: "Game/GetLobbyHeader",
	getRecentlyViewed: "Game/GetRecentlyViewed"
};

export const gameApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getSlotGamePage: builder.query<
			IAxiosResponse<ISlotGamePageData>,
			IGetSlotGamePageDataArgs
		>({
			query: ({ currencyId, slotGameCategoryList }) => ({
				url: gameApiUrl.getSlotGamePage,
				method: "POST",
				data: {
					currencyId,
					slotGameCategoryList,
					deviceType: getDeviceType()
				}
			})
		}),
		getLobbyHeader: builder.query<
			IAxiosResponse<ILobbyHeaderData[]>,
			{
				siteId: number;
				currencyId: number;
			}
		>({
			query: data => ({
				url: gameApiUrl.getLobbyHeader,
				method: "POST",
				data
			})
		}),
		getRecentlyViewed: builder.query<
			IAxiosResponse<IRecentlyViewData[]>,
			{
				deviceType: number;
				currencyId: number;
			}
		>({
			query: ({ currencyId }) => ({
				url: gameApiUrl.getRecentlyViewed,
				method: "POST",
				data: {
					currencyId,
					deviceType: getDeviceType()
				}
			})
		})
	})
});

export const {
	useGetSlotGamePageQuery,
	useGetLobbyHeaderQuery,
	useGetRecentlyViewedQuery
} = gameApi;
