import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import {
	ICupEventPredictionSettingData,
	ICupEventPredictScoreData,
	ICupEventTicketData,
	ICupEventTicketSummaryData,
	IMemberDepositData,
	IPollTicketsArgs,
	IPredictCupEventScoreArgs
} from "./type";

export const cupEventApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		GetCupEventPredictionSetting: builder.query<
			IAxiosResponse<ICupEventPredictionSettingData>,
			{ langId: string }
		>({
			query: data => ({
				url: "CupEvent/GetCupEventPredictionSetting",
				method: "POST",
				data
			})
		}),
		GetCupEventTicket: builder.query<
			IAxiosResponse<ICupEventTicketData>,
			null
		>({
			query: data => ({
				url: "CupEvent/GetCupEventTicket",
				method: "POST",
				data
			}),
			providesTags: ["CUP_EVENT_POST"]
		}),
		GetMemberDeposit: builder.query<
			IAxiosResponse<IMemberDepositData[]>,
			null
		>({
			query: data => ({
				url: "CupEvent/GetMemberDeposit",
				method: "POST",
				data
			})
		}),
		GetCupEventTicketSummary: builder.query<
			IAxiosResponse<ICupEventTicketSummaryData[]>,
			{ langId: string }
		>({
			query: data => ({
				url: "CupEvent/GetCupEventTicketSummary",
				method: "POST",
				data
			}),
			providesTags: ["CUP_EVENT_POST"]
		}),
		GetCupEventPredictScore: builder.query<
			IAxiosResponse<ICupEventPredictScoreData>,
			null
		>({
			query: data => ({
				url: "CupEvent/GetCupEventPredictScore",
				method: "POST",
				data
			}),
			providesTags: ["CUP_EVENT_PREDICTSCORE"]
		}),
		MultiUserPollTickets: builder.mutation<
			IAxiosResponse<null>,
			IPollTicketsArgs
		>({
			query: data => ({
				url: "CupEvent/MultiUserPollTickets",
				method: "POST",
				data
			}),
			invalidatesTags: ["CUP_EVENT_POST"]
		}),
		PredictCupEventScore: builder.mutation<
			IAxiosResponse<null>,
			IPredictCupEventScoreArgs
		>({
			query: data => ({
				url: "CupEvent/PredictCupEventScore",
				method: "POST",
				data
			}),
			invalidatesTags: ["CUP_EVENT_PREDICTSCORE"]
		})
	})
});

export const {
	useGetCupEventPredictionSettingQuery,
	useGetCupEventTicketQuery,
	useGetMemberDepositQuery,
	useGetCupEventTicketSummaryQuery,
	useGetCupEventPredictScoreQuery,
	useMultiUserPollTicketsMutation,
	usePredictCupEventScoreMutation
} = cupEventApi;
