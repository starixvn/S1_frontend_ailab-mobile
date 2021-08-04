import BaseAPI from "./base";

export class PaymentAPI extends BaseAPI {
	GetBankInfoSysList = () => this.paymentRequest.post("/GetBankInfoSysList");

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

	DepositReqWireTransfer = ({
		amount,
		sysId,
		fromChannel,
		fromSysId,
		fromAccountNum
	}) =>
		this.paymentRequest.post("/DepositReqWireTransfer", {
			amount,
			sysId,
			fromChannel,
			fromSysId,
			fromAccountNum
		});

	GetDepositInfoRecent = () =>
		this.paymentRequest.post("/GetDepositInfoRecent");

	SetDepositCancel = TransId =>
		this.paymentRequest.post("/SetDepositCancel", { TransId });

	UploadReceipt = formData =>
		this.paymentRequest.post("/UploadReceipt", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
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
}
