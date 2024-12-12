import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import {
	IGetNumberCaptchaArgs,
	IGetNumberCaptchaData,
	IRecaptchaInfoData
} from "./type";

const siteApiUrl = {
	getTpIds: "Site/GetTpIds",
	getIpCountry: "Site/GetIpCountry",
	getRecaptchaInfo: "Site/GetRecaptchaInfo",
	getNumberCaptcha: "Site/GetNumberCaptcha"
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
			IAxiosResponse<IRecaptchaInfoData>,
			void
		>({
			query: () => ({
				url: siteApiUrl.getRecaptchaInfo,
				method: "POST"
			})
		}),
		getNumberCaptcha: builder.query<
			IAxiosResponse<IGetNumberCaptchaData>,
			IGetNumberCaptchaArgs
		>({
			query: data => ({
				url: siteApiUrl.getNumberCaptcha,
				method: "POST",
				data
			})
		})
	})
});

export const {
	useGetTpIdsQuery,
	useGetIpCountryQuery,
	useGetRecaptchaInfoQuery,
	useLazyGetNumberCaptchaQuery
} = siteApi;
