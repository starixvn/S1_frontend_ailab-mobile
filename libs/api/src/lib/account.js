import BaseAPI from "./base";

export class AccountAPI extends BaseAPI {
	SetLanguage = lang =>
		this.accountRequest.post("/SetLanguage", { LangId: lang });

	UserLogout = () => this.accountRequest.post("/SignOut");

	UserLogin = data => this.loginRequest.post("/SignIn", data);

	onlineCheck = () => this.accountRequest.post("/onlineCheck");

	GetBalnace = () => this.accountRequest.post("/GetBalance");

	GetCustBankInfo = () => this.accountRequest.post("/GetCustBankInfo");

	GetMsgList = ({ PageNumber }) =>
		this.accountRequest.post("/GetMsgList", { PageNumber });

	GetMsgContent = MsgId =>
		this.accountRequest.post("/GetMsgContent", {
			MsgId
		});

	DelMsg = MsgIds => this.accountRequest.post("/DelMsg", { MsgIds });

	GetWalletInfo = () => this.accountRequest.post("/GetWalletInfo");

	GetWithdrawalAvailableBalance = () =>
		this.accountRequest.post("/GetWithdrawalAvailableBalance");

	SetFavoriteGame = (ProviderId, GameId, IsRemove) =>
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

	GetTpWalletList = ({ ListType }) =>
		this.accountRequest.post("/GetTpWalletList", {
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
		this.accountRequest.post("/GetRefFriendList", {
			StartDate,
			EndDate,
			PageNumber,
			PageSize
		});

	SetMsgRead = ({ MsgIds }) =>
		this.accountRequest.post("/SetMsgRead", { MsgIds });

	GetWalletTransferStatus = () =>
		this.accountRequest.post("/GetWalletTransferStatus");

	SetWalletTransferStatus = ({ AutoTransfer }) =>
		this.accountRequest.post("/SetWalletTransferStatus", { AutoTransfer });
}
