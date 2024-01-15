import { paymentRequest, defDeviceType } from "./base";

export const api_GetBankInfoSysList = () =>
	paymentRequest.post("/GetBankInfoSysList");

export const api_GetDepositInfoHistory = ({ StartDate, EndDate, PageNumber }) =>
	paymentRequest.post("/GetDepositInfoHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_GetAutoChannelBankGroupList = () =>
	paymentRequest.post("/GetAutoChannelBankGroupList");

export const api_GetCryptoPayInfoList = () =>
	paymentRequest.post("/GetCryptoPayInfoList");

export const api_GetWithdrawalInfoHistory = ({
	StartDate,
	EndDate,
	PageNumber
}) =>
	paymentRequest.post("/GetWithdrawalInfoHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_GetStatement = ({ StartDate, EndDate, PageNumber }) =>
	paymentRequest.post("/GetStatement", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_GetBankInfoOffList = () =>
	paymentRequest.post("/GetBankInfoOffList");

export const api_GetMobilePayGroupList = () =>
	paymentRequest.post("/GetMobilePayGroupList");

export const api_DepositReqWireTransfer = ({ amount, sysId, bankId, code }) =>
	paymentRequest.post("/DepositReqWireTransfer", {
		amount,
		sysId,
		bankId,
		code
	});

export const api_GetDepositInfoRecent = () =>
	paymentRequest.post("/GetDepositInfoRecent");

export const api_SetDepositCancel = TransId =>
	paymentRequest.post("/SetDepositCancel", { TransId });

export const api_UploadReceipt = (TransId, Receipt) =>
	paymentRequest.post("/UploadReceipt", {
		TransId,
		Receipt
	});

export const api_SetDepositReceipt = (TransId, DepositTime, RefNo) =>
	paymentRequest.post("/SetDepositReceipt", {
		TransId,
		DepositTime,
		RefNo
	});

export const api_GetMobilePayInfoList = GroupId =>
	paymentRequest.post("/GetMobilePayInfoList", {
		GroupId
	});

export const api_WithdrawalReq = (AccountNo, amount, sysId) =>
	paymentRequest.post("/WithdrawalReq", {
		AccountNo,
		amount,
		sysId
	});

export const api_GetWithdrawalInfoRecent = () =>
	paymentRequest.post("/GetWithdrawalInfoRecent");

export const api_SetWithdrawalCancel = TransId =>
	paymentRequest.post("/SetWithdrawalCancel", { TransId });

export const api_KycCheck = () => paymentRequest.post("/KycCheck");

export const api_CustTpBetRecordListDateRange = ({
	StartDate,
	EndDate,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/CustTpBetRecordListDateRange", {
		StartDate,
		EndDate,
		PageNumber,
		PageSize
	});

export const api_GetCustTpBetRecordListOneDay = ({
	SelDate,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/GetCustTpBetRecordListOneDay", {
		SelDate,
		PageNumber,
		PageSize
	});

export const api_GetCustTpBetRecordListbyCategoryId = ({
	SelDate,
	CategoryId,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/GetCustTpBetRecordListbyCategoryId", {
		SelDate,
		CategoryId,
		PageNumber,
		PageSize
	});

export const api_GetCustTpBetRecordDetailListbyGameType = ({
	SelDate,
	gameTypeId,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/GetCustTpBetRecordDetailListbyGameType", {
		SelDate,
		gameTypeId,
		PageNumber,
		PageSize
	});

export const api_payment_GetLocalBankInfo = ({ sysId }) =>
	paymentRequest.post("/GetLocalBankInfo", { sysId });

export const api_payment_GetLoadCardPayGroupList = () =>
	paymentRequest.post("/GetLoadCardPayGroupList");

export const api_payment_GetLoadCardPayInfoList = ({ groupId }) =>
	paymentRequest.post("/GetLoadCardPayInfoList", { groupId });

export const api_payment_GetWithdrawalLimit = () =>
	paymentRequest.post("/GetWithdrawalLimit");

export const api_payment_CheckDepositSpecialCode = SpecialCode =>
	paymentRequest.post("/CheckDepositSpecialCode", {
		SpecialCode,
		DeviceType: defDeviceType.Mobile
	});

export const api_WithdrawalUSDTReq = (AccountNo, amount) =>
	paymentRequest.post("/WithdrawalUSDTReq", {
		AccountNo,
		amount
	});

export const api_payment_GetSupportCryptoInfo = () =>
	paymentRequest.post("/GetSupportCryptoInfo");

export const api_WithdrawalCryptoReq = ({
	AccountNo,
	amount,
	blackbox,
	CurrencyId,
	ExchangeRate,
	ExchangeAmount
}) =>
	paymentRequest.post("/WithdrawalCryptoReq", {
		AccountNo,
		amount,
		blackbox,
		CurrencyId,
		ExchangeRate,
		ExchangeAmount
	});

export const api_payment_GetSupportNetwork = () =>
	paymentRequest.post("/GetSupportNetwork", { CurrencyId: 96 });

export const api_GetQRPayGroupList = () =>
	paymentRequest.post("/GetQRPayGroupList");

export const api_GetQRPayInfoList = GroupId =>
	paymentRequest.post("/GetQRPayInfoList", {
		GroupId
	});

export const api_payment_GetExchangeInfo = ({
	Amount,
	CurrencyName,
	Network
}) =>
	paymentRequest.post("/GetExchangeInfo", {
		Amount,
		CurrencyName,
		Network
	});

export const api_payment_DepositReqLocalPay = ({
	groupId,
	amount,
	bonusCode
}) =>
	paymentRequest.post("/DepositReqLocalPay", {
		groupId,
		amount,
		bonusCode
	});

export const api_payment_GetEWalletInfoSysList = () =>
	paymentRequest.post("/GetEWalletInfoSysList");

export const api_payment_WithdrawalEWalletReq = ({
	AccountNo,
	amount,
	sysId,
	memo
}) =>
	paymentRequest.post("/WithdrawalEWalletReq", {
		AccountNo,
		amount,
		sysId,
		memo
	});

export const api_payment_GetWithdrawalBlockSetting = () =>
	paymentRequest.post("GetWithdrawalBlockSetting");
