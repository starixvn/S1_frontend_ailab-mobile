import { IAxiosResponse, rootApi } from "@ailab-mobile/service";
import {
	CheckDrawPrizeResponse,
	DrawPrizeData,
	ICheckDrawPrizeArgs,
	IDrawPrizeArgs,
	IDrawPrizeRecordData,
	IGetDrawPrizeRecordListArgs
} from "./type";

export const angpaoApiUrl = {
	checkDrawPrize: "Events/CheckDrawPrize",
	drawPrize: "Events/DrawPrize",
	getDrawPrizeRecordList: "Events/GetCustDrawPrizeList"
};

export const angpaoApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * 檢查當日抽到的獎項、剩餘抽獎次數
		checkDrawPrize: builder.mutation<
			CheckDrawPrizeResponse,
			ICheckDrawPrizeArgs
		>({
			query: data => ({
				url: angpaoApiUrl.checkDrawPrize,
				method: "POST",
				data
			}),
			invalidatesTags: ["ANGPAO_POST"]
		}),
		// * 抽獎
		postDrawPrize: builder.mutation<
			IAxiosResponse<DrawPrizeData>,
			IDrawPrizeArgs
		>({
			query: data => ({
				url: angpaoApiUrl.drawPrize,
				method: "POST",
				data
			})
		}),
		// * 用戶中獎資訊列表
		getDrawPrizeRecordList: builder.query<
			IAxiosResponse<IDrawPrizeRecordData[]>,
			IGetDrawPrizeRecordListArgs
		>({
			query: data => ({
				url: angpaoApiUrl.getDrawPrizeRecordList,
				method: "POST",
				data
			}),
			providesTags: ["ANGPAO_POST"]
		})
	})
});

export const {
	useCheckDrawPrizeMutation,
	usePostDrawPrizeMutation,
	useGetDrawPrizeRecordListQuery
} = angpaoApi;
