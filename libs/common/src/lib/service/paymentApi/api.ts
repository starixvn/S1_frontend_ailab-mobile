import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import { IDepositChatTransferInfo, IDepositQuickTransferInfo } from "./type";

export const paymentApiUrl = {
	getDepositQuickTransfer: "Payment/GetPayInfoQuickTransfer",
	getDepositChatTransfer: "Payment/GetPayInfoChatTransfer"
};

export const paymentApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getDepositQuickTransfer: builder.query<
			IAxiosResponse<{
				QuickTransfer: { data: IDepositQuickTransferInfo[] };
			}>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getDepositQuickTransfer,
				method: "POST"
			})
		}),
		getDepositChatTransfer: builder.query<
			IAxiosResponse<{
				ChatTransfer: { data: IDepositChatTransferInfo[] };
			}>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getDepositChatTransfer,
				method: "POST"
			})
		})
	})
});

export const {
	useLazyGetDepositQuickTransferQuery,
	useLazyGetDepositChatTransferQuery
} = paymentApi;
