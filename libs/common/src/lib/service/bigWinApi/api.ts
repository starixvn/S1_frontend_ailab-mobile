import { getDeviceType } from "@ailab-mobile/api";
import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import { IPopupData } from "./type";

const bigWinApiUrl = {
	getPopupDataList: "BigWin/GetPopUpDataList"
};

export const bigWinApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPopUpDataList: builder.query<IAxiosResponse<IPopupData[]>, void>({
			query: () => ({
				url: bigWinApiUrl.getPopupDataList,
				method: "POST",
				data: { deviceType: getDeviceType() }
			})
		})
	})
});

export const { useLazyGetPopUpDataListQuery } = bigWinApi;
