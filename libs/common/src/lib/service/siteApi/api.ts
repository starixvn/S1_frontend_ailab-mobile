import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

const siteApiUrl = {
	getTpIds: "Site/GetTpIds",
	getIpCountry: "Site/GetIpCountry",
	getRecaptchaInfo: "Site/GetRecaptchaInfo"
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
		}),
		getRecaptchaInfo: builder.query<
			IAxiosResponse<{
				siteKey: string;
				country: string;
			}>,
			void
		>({
			query: () => ({
				url: siteApiUrl.getRecaptchaInfo,
				method: "POST"
			})
		})
	})
});

export const {
	useGetTpIdsQuery,
	useGetIpCountryQuery,
	useGetRecaptchaInfoQuery
} = siteApi;
