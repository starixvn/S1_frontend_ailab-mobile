import BaseAPI, { defDeviceType } from "./base";

export class PaymentAPI extends BaseAPI {
	GetBankInfoSysList = () => this.paymentRequest.post("/GetBankInfoSysList");

	GetEWalletInfoSysList = () =>
		this.paymentRequest.post("/GetEWalletInfoSysList");

	GetDepositInfoHistory = ({ StartDate, EndDate, PageNumber }) =>
		this.paymentRequest.post("/GetDepositInfoHistory", {
			StartDate,
			EndDate,
			PageNumber
		});

	GetOnlinePaymentList = () =>
		this.paymentRequest.post("/GetOnlinePaymentList");

	GetOnlineBankInfoSysList = ({ payId }) =>
		this.paymentRequest.post("/GetOnlineBankInfoSysList", { payId });

	GetLocalBankInfo = ({ sysId }) =>
		this.paymentRequest.post("/GetLocalBankInfo", { sysId });

	GetOnlineBankInfo = ({ payId, sysId }) =>
		this.paymentRequest.post("/GetOnlineBankInfo", { payId, sysId });

	GetWithdrawalInfoHistory = ({ StartDate, EndDate, PageNumber }) =>
		this.paymentRequest.post("/GetWithdrawalInfoHistory", {
			StartDate,
			EndDate,
			PageNumber
		});

	GetStatement = ({ StartDate, EndDate, PageNumber }) =>
		this.paymentRequest.post("/GetStatement", {
			StartDate,
			EndDate,
			PageNumber
		});

	GetBankInfoOffList = () => this.paymentRequest.post("/GetBankInfoOffList");

	GetMobilePayGroupList = () =>
		this.paymentRequest.post("/GetMobilePayGroupList");

	DepositReqWireTransfer = ({ amount, sysId, bankId, code }) =>
		this.paymentRequest.post("/DepositReqWireTransfer", {
			amount,
			sysId,
			bankId,
			code
		});

	GetDepositInfoRecent = () =>
		this.paymentRequest.post("/GetDepositInfoRecent");

	SetDepositCancel = TransId =>
		this.paymentRequest.post("/SetDepositCancel", { TransId });

	UploadReceipt = (TransId, Receipt) =>
		this.paymentRequest.post("/UploadReceipt", {
			TransId,
			Receipt
		});

	SetDepositReceipt = (TransId, DepositTime, RefNo) =>
		this.paymentRequest.post("/SetDepositReceipt", {
			TransId,
			DepositTime,
			RefNo
		});

	GetMobilePayInfoList = GroupId =>
		this.paymentRequest.post("/GetMobilePayInfoList", {
			GroupId
		});

	WithdrawalReq = (AccountNo, amount, sysId, blackbox, IFSCCode) =>
		this.paymentRequest.post("/WithdrawalReq", {
			AccountNo,
			amount,
			sysId,
			blackbox,
			IFSCCode
		});

	WithdrawalEWalletReq = (AccountNo, amount, sysId, memo, blackbox) =>
		this.paymentRequest.post("/WithdrawalEWalletReq", {
			AccountNo,
			amount,
			sysId,
			memo,
			blackbox
		});

	WithdrawalUSDTReq = (AccountNo, amount, blackbox) =>
		this.paymentRequest.post("/WithdrawalUSDTReq", {
			AccountNo,
			amount,
			blackbox
		});

	WithdrawalCryptoReq = ({
		AccountNo,
		amount,
		blackbox,
		CurrencyId,
		ExchangeRate,
		ExchangeAmount
	}) =>
		this.paymentRequest.post("/WithdrawalCryptoReq", {
			AccountNo,
			amount,
			blackbox,
			CurrencyId,
			ExchangeRate,
			ExchangeAmount
		});

	GetWithdrawalInfoRecent = () =>
		this.paymentRequest.post("/GetWithdrawalInfoRecent");

	SetWithdrawalCancel = TransId =>
		this.paymentRequest.post("/SetWithdrawalCancel", { TransId });

	KycCheck = () => this.paymentRequest.post("/KycCheck");

	GetCryptoPayInfoList = () =>
		this.paymentRequest.post("/GetCryptoPayInfoList");

	CustTpBetRecordListDateRange = ({
		StartDate,
		EndDate,
		PageNumber,
		PageSize
	}) =>
		this.paymentRequest.post("/CustTpBetRecordListDateRange", {
			StartDate,
			EndDate,
			PageNumber,
			PageSize
		});

	GetCustTpBetRecordListOneDay = ({ SelDate, PageNumber, PageSize }) =>
		this.paymentRequest.post("/GetCustTpBetRecordListOneDay", {
			SelDate,
			PageNumber,
			PageSize
		});

	GetCustTpBetRecordListbyCategoryId = ({
		SelDate,
		CategoryId,
		PageNumber,
		PageSize
	}) =>
		this.paymentRequest.post("/GetCustTpBetRecordListbyCategoryId", {
			SelDate,
			CategoryId,
			PageNumber,
			PageSize
		});

	GetCustTpBetRecordDetailListbyGameType = ({
		SelDate,
		gameTypeId,
		PageNumber,
		PageSize
	}) =>
		this.paymentRequest.post("/GetCustTpBetRecordDetailListbyGameType", {
			SelDate,
			gameTypeId,
			PageNumber,
			PageSize
		});

	GetLocalBankInfo = ({ sysId }) =>
		this.paymentRequest.post("/GetLocalBankInfo", { sysId });

	GetBankInfoOffListStatus = () =>
		this.paymentRequest.post("/GetBankInfoOffListStatus", { queryType: 1 });

	GetWithdrawalLimit = () => this.paymentRequest.post("/GetWithdrawalLimit");

	GetExchangeInfo = ({ Amount, CurrencyName, Network }) =>
		this.paymentRequest.post("/GetExchangeInfo", {
			Amount,
			CurrencyName,
			Network
		});

	GetSupportCryptoInfo = () =>
		this.paymentRequest.post("/GetSupportCryptoInfo");

	CheckDepositSpecialCode = SpecialCode =>
		this.paymentRequest.post(`/CheckDepositSpecialCode`, {
			SpecialCode,
			DeviceType: defDeviceType.Mobile
		});

	GetAutoChannelBankGroupList = () =>
		this.paymentRequest.post("/GetAutoChannelBankGroupList");

	GetLineChannelForDpeosit = () =>
		this.paymentRequest.post("/GetLineChannelForDpeosit");

	DepositReqLocalPay = ({ groupId, amount, bonusCode }) =>
		this.paymentRequest.post("/DepositReqLocalPay", {
			groupId,
			amount,
			bonusCode
		});

	GetLoadCardPayGroupList = () =>
		this.paymentRequest.post("/GetLoadCardPayGroupList");

	GetLoadCardPayInfoList = groupId =>
		this.paymentRequest.post("/GetLoadCardPayInfoList", { groupId });

	GetQRPayGroupList = () => this.paymentRequest.post("/GetQRPayGroupList");

	GetQRPayInfoList = groupId =>
		this.paymentRequest.post("/GetQRPayInfoList", { groupId });

	GetWithdrawalBlockSetting = () =>
		this.paymentRequest.post("GetWithdrawalBlockSetting");
}
