import BaseAPI from "./base";

export class AccountAPI extends BaseAPI {
	SetLanguage = lang =>
		this.accountRequest.post("/SetLanguage", { LangId: lang });

	UserLogout = () => this.accountRequest.post("/SignOut");

	UserLogin = data => this.loginRequest.post("/SignIn", data);

	onlineCheck = () => this.accountRequest.post("/onlineCheck");

	GetBalnace = () => this.accountRequest.post("/GetBalance");

	GetCustBankInfo = () => this.accountRequest.post("/GetCustBankInfo");

	GetCustEWalletInfo = () => this.accountRequest.post("/GetCustEWalletInfo");

	GetMsgList = ({ PageNumber, PageSize }) =>
		this.accountRequest.post("/GetMsgList", { PageNumber, PageSize });

	GetMsgContent = (MsgId, IsBatch) =>
		this.accountRequest.post("/GetMsgContent", {
			MsgId,
			IsBatch
		});

	DelMsg = MsgIds =>
		this.accountRequest.post("/DelMsg", { DeleteList: MsgIds });

	GetWalletInfo = () => this.accountRequest.post("/GetWalletInfo");

	GetWithdrawalAvailableBalance = () =>
		this.accountRequest.post("/GetWithdrawalAvailableBalance");

	SetFavoriteGame = ({ ProviderId, GameId, IsRemove }) =>
		this.accountRequest.post(`/SetFavoriteGame`, {
			ProviderId,
			GameId,
			IsRemove
		});

	GetFavoriteGame = () => this.accountRequest.post("/GetFavoriteGame");

	GetMsgCount = () => this.accountRequest.post("/GetMsgCount");

	ChangePassword = ({ OldPassword, NewPassword }) =>
		this.accountRequest.post("/ChangePassword", {
			OldPassword,
			NewPassword
		});

	GetCustBonusWallet = () => this.accountRequest.post("/GetCustBonusWallet");

	GetCustSpecificBonus = ({ BonusCode, TpId, PromoCategoryId }) =>
		this.accountRequest.post("/GetCustSpecificBonus", {
			BonusCode,
			TpId,
			PromoCategoryId
		});

	GetTpWalletList = ({ ListType, langId }) =>
		this.accountRequest.post(`/GetTpWalletList/${langId}`, {
			ListType
		});

	GetTpWalletBalance = ({ TpId }) =>
		this.accountRequest.post("/GetTpWalletBalance", {
			TpId
		});

	GetReferralCode = () => this.accountRequest.post("/GetReferralCode");

	GetReferralSetting = () => this.accountRequest.post("/GetReferralSetting");

	GetReferralSummary = () => this.accountRequest.post("/GetReferralSummary");

	GetRefFriendList = ({ StartDate, EndDate, PageNumber, PageSize }) =>
		this.accountRequest.post("/GetRefFriendListV2", {
			StartDate,
			EndDate,
			PageNumber,
			PageSize
		});

	SetMsgReadV2 = ({ SetList }) =>
		this.accountRequest.post("/SetMsgReadV2", { SetList });

	GetWalletTransferStatus = () =>
		this.accountRequest.post("/GetWalletTransferStatus");

	SetWalletTransferStatus = ({ AutoTransfer }) =>
		this.accountRequest.post("/SetWalletTransferStatus", { AutoTransfer });

	GetPopupMsg = () => this.accountRequest.post("/GetPopupMsg");

	SetPopupMsgRead = () => this.accountRequest.post("/SetPopupMsgRead");

	GetReferralSettingDetail = () =>
		this.accountRequest.post("/GetReferralSettingDetail");

	ExistsPhoneNo = ({ AreaCode, Phone }) =>
		this.accountRequest.post(`/ExistsPhoneNo`, {
			AreaCode,
			PhoneNo: Phone
		});

	GetCustTpGameTypeSetting = () =>
		this.accountRequest.post(`/GetCustTpGameTypeSetting`);
}
