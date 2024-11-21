import { cashierRequest } from "./base";

export const api_cashier_DepositReqLoadCardPay = ({
	langId,
	ChannelId,
	Code,
	Serial,
	Amount,
	BonusCode
}) =>
	cashierRequest.post(
		`/${langId}/Cashier/DepositReq?ChannelId=${ChannelId}&Code=${Code}&Serial=${Serial}&Amount=${Amount}${
			BonusCode ? `&BonusCode=${BonusCode}` : ""
		}`
	);

export const api_depositReqCryptoPay = ({
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

	return cashierRequest.get(
		`/${langId}/Cashier/DepositReqCryptoPay?${paramsUrl}`
	);
};

export const api_depositReqCryptoLocalPay = ({
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

	return cashierRequest.get(
		`/${langId}/Cashier/DepositReqCryptoLocalPay?${paramsUrl}`
	);
};
