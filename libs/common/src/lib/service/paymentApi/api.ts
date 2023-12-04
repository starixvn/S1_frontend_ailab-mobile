import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";
import { IDepositQuickTransferInfo } from "./type";

export const paymentApiUrl = {
	getDepositQuickTransfer: "Payment/GetPayInfoQuickTransfer"
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
		})
	})
});

export const { useLazyGetDepositQuickTransferQuery } = paymentApi;
