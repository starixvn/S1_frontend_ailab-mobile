import { loginRequest, accountRequest } from "./base";

export const api_SetLanguage = lang =>
	accountRequest.post("/SetLanguage", { LangId: lang });

export const api_UserLogout = () => accountRequest.post("/SignOut");

export const api_UserLogin = (langId, data) =>
	loginRequest.post(`/SignIn/${langId}`, data);

export const api_onlineCheck = () => accountRequest.post("/onlineCheck");

export const api_GetBalnace = () => accountRequest.post("/GetBalance");

export const api_GetCustBankInfo = () =>
	accountRequest.post("/GetCustBankInfo");

export const api_GetMsgList = ({ PageNumber, PageSize }) =>
	accountRequest.post("/GetMsgList", { PageNumber, PageSize });

export const api_GetMsgContent = (MsgId, IsBatch) =>
	accountRequest.post("/GetMsgContent", {
		MsgId,
		IsBatch
	});

export const api_DelMsg = MsgIds =>
	accountRequest.post("/DelMsg", { DeleteList: MsgIds });

export const api_GetWalletInfo = () => accountRequest.post("/GetWalletInfo");

export const api_GetWithdrawalAvailableBalance = () =>
	accountRequest.post("/GetWithdrawalAvailableBalance");

export const api_SetFavoriteGame = (ProviderId, GameId, IsRemove) =>
	accountRequest.post(`/SetFavoriteGame`, { ProviderId, GameId, IsRemove });

export const api_GetFavoriteGame = () =>
	accountRequest.post("/GetFavoriteGame");

export const api_GetMsgCount = () => accountRequest.post("/GetMsgCount");

export const api_ChangePassword = ({ OldPassword, NewPassword }) =>
	accountRequest.post("/ChangePassword", { OldPassword, NewPassword });

export const api_account_GetCustBonusWallet = () =>
	accountRequest.post("/GetCustBonusWallet");

export const api_account_GetCustSpecificBonus = ({
	BonusCode,
	TpId,
	PromoCategoryId
}) =>
	accountRequest.post("/GetCustSpecificBonus", {
		BonusCode,
		TpId,
		PromoCategoryId
	});

export const api_account_ExistsPhoneNo = ({ AreaCode, Phone }) =>
	accountRequest.post(`/ExistsPhoneNo`, { AreaCode, PhoneNo: Phone });

export const api_account_GetTpWalletList = ({ ListType, langId }) =>
	accountRequest.post(`/GetTpWalletList/${langId}`, { ListType });

export const api_account_GetTpWalletBalance = ({ TpId }) =>
	accountRequest.post(`/GetTpWalletBalance`, { TpId });

export const api_account_GetReferralCode = () =>
	accountRequest.post("/GetReferralCode");

export const api_account_GetReferralSetting = () =>
	accountRequest.post("/GetReferralSetting");

export const api_account_GetReferralSummary = () =>
	accountRequest.post("/GetReferralSummary");

export const api_account_GetRefFriendList = ({
	StartDate,
	EndDate,
	PageNumber,
	PageSize
}) =>
	accountRequest.post("/GetRefFriendListV2", {
		StartDate,
		EndDate,
		PageNumber,
		PageSize
	});

export const api_account_GetWalletTransferStatus = () =>
	accountRequest.post("/GetWalletTransferStatus");

export const api_account_SetWalletTransferStatus = ({ AutoTransfer }) =>
	accountRequest.post("/SetWalletTransferStatus", { AutoTransfer });

export const api_account_GetPopupMsg = () =>
	accountRequest.post("/GetPopupMsg");

export const api_account_SetPopupMsgRead = () =>
	accountRequest.post("/SetPopupMsgRead");

export const api_account_GetReferralSettingDetail = () =>
	accountRequest.post("/GetReferralSettingDetail");

export const api_account_GetCustEWalletInfo = () =>
	accountRequest.post("/GetCustEWalletInfo");
