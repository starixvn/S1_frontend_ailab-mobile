import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import {
	ICupEventPredictionSettingData,
	ICupEventTicketData,
	ICupEventTicketSummaryData,
	IMemberDepositData,
	IPollTicketsArgs
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
		})
	})
});

export const {
	useGetCupEventPredictionSettingQuery,
	useGetCupEventTicketQuery,
	useGetMemberDepositQuery,
	useGetCupEventTicketSummaryQuery,
	useMultiUserPollTicketsMutation
} = cupEventApi;
