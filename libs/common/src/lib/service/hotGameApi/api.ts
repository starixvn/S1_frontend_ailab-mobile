import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

const hotGameApiUrl = {
	getDataList: "HotGame/GetDataList"
};

export const hotGameApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getHotGameDataList: builder.query<
			IAxiosResponse<{
				HotGame: {
					tpId: number;
					sort: number;
					gameId: string;
					tpName: string;
					tpLogo: string;
					gameName: string;
					gameLogo: string;
					tpGameType: number;
					tpCategory: number;
				}[];
				NewGame: {
					tpId: number;
					sort: number;
					gameId: string;
					tpName: string;
					tpLogo: string;
					gameName: string;
					gameLogo: string;
					tpGameType: number;
					tpCategory: number;
				}[];
			}>,
			{
				langId: string;
				currencyId: number;
				deviceType: number;
			}
		>({
			query: ({ langId, currencyId, deviceType }) => ({
				url: `${hotGameApiUrl.getDataList}/${langId}`,
				method: "POST",
				data: { currencyId, deviceType }
			})
		})
	})
});

export const { useGetHotGameDataListQuery } = hotGameApi;
