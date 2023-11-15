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
			query: ({ currencyId, deviceType, slotGameCategoryList }) => ({
				url: gameApiUrl.getSlotGamePage,
				method: "POST",
				data: { currencyId, deviceType, slotGameCategoryList }
			})
		})
	})
});

export const { useGetSlotGamePageQuery } = gameApi;
