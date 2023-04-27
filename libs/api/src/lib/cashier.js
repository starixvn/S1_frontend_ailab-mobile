import BaseAPI from "./base";

export class CashierAPI extends BaseAPI {
	DepositReqOnlineBanking = ({
		langId,
		sysId,
		payId,
		channelId,
		real_amount,
		bonusCode
	}) => {
		const paramsUrl = [
			`payId=${payId}`,
			`ChannelId=${channelId}`,
			`Amount=${real_amount}`,
			sysId && `sysId=${sysId}`,
			bonusCode && `BonusCode=${bonusCode}`
		]
			.filter(Boolean)
			.join("&");

		return this.cashierRequest.get(
			`/${langId}/Cashier/DepositReqOnlineBanking?${paramsUrl}`
		);
	};

	DepositReqMobilePay = ({ langId, channelId, real_amount, bonusCode }) => {
		const paramsUrl = [
			`ChannelId=${channelId}`,
			`Amount=${real_amount}`,
			bonusCode && `BonusCode=${bonusCode}`
		]
			.filter(Boolean)
			.join("&");

		return this.cashierRequest.get(
			`/${langId}/Cashier/DepositReqMobilePay?${paramsUrl}`
		);
	};

	DepositReqCryptoPay = ({ langId, channelId, real_amount, bonusCode }) => {
		const paramsUrl = [
			`ChannelId=${channelId}`,
			`Amount=${real_amount}`,
			bonusCode && `BonusCode=${bonusCode}`
		]
			.filter(Boolean)
			.join("&");

		return this.cashierRequest.get(
			`/${langId}/Cashier/DepositReqCryptoPay?${paramsUrl}`
		);
	};

	DepositReqCryptoLocalPay = ({
		langId,
		channelId,
		real_amount,
		bonusCode
	}) => {
		const paramsUrl = [
			`ChannelId=${channelId}`,
			`Amount=${real_amount}`,
			bonusCode && `BonusCode=${bonusCode}`
		]
			.filter(Boolean)
			.join("&");

		return this.cashierRequest.get(
			`/${langId}/Cashier/DepositReqCryptoLocalPay?${paramsUrl}`
		);
	};
}
