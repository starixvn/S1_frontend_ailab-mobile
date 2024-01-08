import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import { IGetPopUpDataListArgs, IPopupData } from "./type";

const bigWinApiUrl = {
	gePopupDataList: "BigWin/GetPopUpDataList"
};

export const bigWinApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPopUpDataList: builder.query<
			IAxiosResponse<IPopupData[]>,
			IGetPopUpDataListArgs
		>({
			query: data => ({
				url: bigWinApiUrl.gePopupDataList,
				method: "POST",
				data
			})
		})
	})
});

export const { useLazyGetPopUpDataListQuery } = bigWinApi;
