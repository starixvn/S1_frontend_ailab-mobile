import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

const siteApiUrl = {
	getTpIds: "Site/GetTpIds",
	getIpCountry: "Site/GetIpCountry"
};

export const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getTpIds: builder.query<IAxiosResponse<number[]>, void>({
			query: () => ({
				url: siteApiUrl.getTpIds,
				method: "POST"
			})
		}),
		getIpCountry: builder.query<
			IAxiosResponse<{
				code: string;
				forbidden: boolean;
				message: string;
			}>,
			void
		>({
			query: () => ({
				url: siteApiUrl.getIpCountry,
				method: "POST"
			})
		})
	})
});

export const { useGetTpIdsQuery, useGetIpCountryQuery } = siteApi;
