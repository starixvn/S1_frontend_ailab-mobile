import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

export const accountApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getRefFriendDetail: builder.query<
			IAxiosResponse<
				{
					settledDate: string;
					userName: string;
					currencyName: string;
					totalDeposit: number;
					rewardAmount: number;
				}[]
			>,
			{
				startDate: string;
				endDate: string;
				pageNumber: string;
				pageSize: string;
			}
		>({
			query: data => ({
				url: "Account/GetRefFriendDetail",
				method: "POST",
				data
			})
		}),
		getReferralSummaryV2: builder.query<
			IAxiosResponse<{
				amountCount: number;
				amountSum: number;
				conditionCount: number;
				hasReferral: boolean;
				referralCount: number;
			}>,
			null
		>({
			query: () => ({
				url: "Account/GetReferralSummaryV2",
				method: "POST"
			})
		}),
		getReferralSettingDetail: builder.query<
			IAxiosResponse<{
				referralReward: number;
				invitationLimit: number;
				agentValidBet: number;
				agentDeposit: number;
				memberReward: number;
				vaildBet: number;
				deposit: number;
				periodDays: number;
				depositRewardPercentage: number;
				minPayout: number;
				maxPayout: number;
				referralContent: {
					langId: string;
					bannerUrl: string;
					title: string;
					description: string;
					detail: string;
					type: number;
				};
			}>,
			null
		>({
			query: () => ({
				url: "Account/GetReferralSettingDetail",
				method: "POST"
			})
		}),
		getReferralCode: builder.query<IAxiosResponse<string>, null>({
			query: () => ({
				url: "Account/getReferralCode",
				method: "POST"
			})
		})
	})
});

export const {
	useLazyGetRefFriendDetailQuery,
	useLazyGetReferralSettingDetailQuery,
	useGetReferralSummaryV2Query,
	useGetReferralCodeQuery
} = accountApi;
