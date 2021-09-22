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
		`/${langId}/Cashier/DepositReqLoadCardPay?ChannelId=${ChannelId}&Code=${Code}&Serial=${Serial}&Amount=${Amount}${
			BonusCode ? `&BonusCode=${BonusCode}` : ""
		}`
	);
