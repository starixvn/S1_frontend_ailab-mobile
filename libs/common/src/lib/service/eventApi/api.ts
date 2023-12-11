import { rootApi } from "../rootApi/api";
import { IGetLeaderboardSettingArgs, ILeaderboardSettingData } from "./type";
import { IAxiosResponse } from "../axiosBaseQuery";

export const eventApiUrl = {
	getLeaderboardSetting: "Events/GetLeaderboardSetting"
};

export const eventApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getLeaderboardSetting: builder.query<
			IAxiosResponse<ILeaderboardSettingData[]>,
			IGetLeaderboardSettingArgs
		>({
			query: data => ({
				url: eventApiUrl.getLeaderboardSetting,
				method: "POST",
				data
			})
		})
	})
});

export const { useGetLeaderboardSettingQuery } = eventApi;
