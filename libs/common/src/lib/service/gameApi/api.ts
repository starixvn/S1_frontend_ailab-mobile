import { getDeviceType } from "@ailab-mobile/api";
import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import { IGetSlotGamePageDataArgs, ISlotGamePageData } from "./type";

const gameApiUrl = {
	getSlotGamePage: "Game/GetSlotGamePage"
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
		})
	})
});

export const { useGetSlotGamePageQuery } = gameApi;
