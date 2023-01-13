import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

export const authApiUrl = {
	checkSignIn: "Site/CheckSignIn"
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
		})
	})
});

export const { useCheckSignInQuery } = authApi;
