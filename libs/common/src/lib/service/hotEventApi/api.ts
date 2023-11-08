import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

const siteApiUrl = {
	getDataList: "HotEvent/GetDataList"
};

export const hotEventApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getDataList: builder.query<
			IAxiosResponse<
				{
					sportLeaguesTitle: string;
					matchId: number;
					tpId: string;
					gameId: string;
					homeTeamName: string;
					awayTeamName: string;
					battleTime: string;
					homeOdds: number;
					awayOdds: number;
					handicap: number;
					backgroundPic: string;
					homeTeamPic: string;
					awayTeamPic: string;
				}[]
			>,
			{ langId: string }
		>({
			query: ({ langId }) => ({
				url: `${siteApiUrl.getDataList}/${langId}`,
				method: "POST"
			})
		})
	})
});

export const { useGetDataListQuery } = hotEventApi;
