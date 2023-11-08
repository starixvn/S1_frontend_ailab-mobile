import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

const accountApiUrl = {
	getRefFriendDetail: "Account/GetRefFriendDetail",
	getReferralSummary: "Account/GetReferralSummaryV2",
	getReferralSettingDetail: "Account/GetReferralSettingDetail",
	getReferralCode: "Account/GetReferralCode",
	setLanguage: "Account/SetLanguage",
	getCustBonusWallet: "Account/GetCustBonusWallet",
	getCustVIPProgress: "Account/GetCustVIPProgress"
};

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
				url: accountApiUrl.getRefFriendDetail,
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
				url: accountApiUrl.getReferralSummary,
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
				url: accountApiUrl.getReferralSettingDetail,
				method: "POST"
			})
		}),
		getReferralCode: builder.query<IAxiosResponse<string>, null>({
			query: () => ({
				url: accountApiUrl.getReferralCode,
				method: "POST"
			})
		}),
		setLanguage: builder.mutation<IAxiosResponse<void>, { langId: string }>(
			{
				query: ({ langId }) => ({
					url: accountApiUrl.setLanguage,
					method: "POST",
					data: { langId }
				})
			}
		),
		getCustBonusWallet: builder.query<
			IAxiosResponse<
				{
					tpId: number;
					bonus: number;
					status: number;
					bonusId: number;
					rollover: number;
					turnover: number;
					fullFillType: number;
					promoCategoryId: number;
					expiryTime: null | string;
				}[]
			>,
			void
		>({
			query: () => ({
				url: accountApiUrl.getCustBonusWallet,
				method: "POST"
			})
		}),
		getCustVIPProgress: builder.query<
			IAxiosResponse<{
				currentVipLevel: null | number;
				upDeposit: null | number;
				actualDeposit: null | number;
				downDeposit: null | number;
				downTurnover: null | number;
			}>,
			void
		>({
			query: () => ({
				url: accountApiUrl.getCustVIPProgress,
				method: "POST"
			})
		})
	})
});

export const {
	useLazyGetRefFriendDetailQuery,
	useLazyGetReferralSettingDetailQuery,
	useGetReferralSummaryV2Query,
	useGetReferralCodeQuery,
	useSetLanguageMutation,
	useGetCustBonusWalletQuery,
	useGetCustVIPProgressQuery
} = accountApi;
