import BaseAPI from "./base";

export class CashierAPI extends BaseAPI {
	DepositReqOnlineBanking = ({
		langId,
		sysId,
		payId,
		channelId,
		real_amount
	}) =>
		this.cashierRequest.get(
			`/${langId}/Cashier/DepositReqOnlineBanking?payId=${payId}&ChannelId=${channelId}&Amount=${real_amount}${
				sysId ? `&sysId=${sysId}` : ""
			}`
		);

	DepositReqMobilePay = ({ langId, channelId, real_amount }) =>
		this.cashierRequest.get(
			`/${langId}/Cashier/DepositReqMobilePay?ChannelId=${channelId}&Amount=${real_amount}`
		);

	DepositReqCryptoPay = ({ langId, channelId, real_amount }) =>
		this.cashierRequest.get(
			`/${langId}/Cashier/DepositReqCryptoPay?ChannelId=${channelId}&Amount=${real_amount}`
		);
}
