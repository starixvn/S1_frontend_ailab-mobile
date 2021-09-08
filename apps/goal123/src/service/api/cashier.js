import { cashierRequest } from "./base";

export const api_cashier_DepositReqLoadCardPay = ({
	langId,
	channelId,
	cardCode,
	cardSerial,
	real_amount
}) =>
	cashierRequest.post(
		`/${langId}/Cashier/DepositReqLoadCardPay?ChannelId=${channelId}&Code=${cardCode}&Serial=${cardSerial}&Amount=${real_amount}`
	);
