import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../baseApi";
import { axiosBaseQuery } from "../axiosBaseQuery";

/*
 * 配置初始定義的 createApi，減少初始 bundle 的大小，定義後調用 injectEndpoints 來定義額外的 api
 * https://redux-toolkit.js.org/rtk-query/usage/code-splitting
 */

export const rootApi = createApi({
	reducerPath: "rootApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: [
		"AUTH_API_POST",
		"ANGPAO_POST",
		"DRAGONEGG_DRAW",
		"DRAGONEGG_BLESSING",
		"CUP_EVENT_POST"
	],
	endpoints: () => ({})
});
