import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import type { ITpMaintainData } from "./type";

export const authApiUrl = {
	checkSignIn: "Site/CheckSignIn",
	getMaintenance: "Site/GetTpMaintainList"
};

export const authApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// test and demo only
		checkSignIn: builder.query<IAxiosResponse<void>, null>({
			query: data => ({
				url: authApiUrl.checkSignIn,
				method: "POST",
				data
			})
		}),
		getMaintenance: builder.query<IAxiosResponse<ITpMaintainData[]>, null>({
			query: data => ({
				url: authApiUrl.getMaintenance,
				method: "POST",
				data
			})
		})
	})
});

export const { useCheckSignInQuery, useGetMaintenanceQuery } = authApi;
