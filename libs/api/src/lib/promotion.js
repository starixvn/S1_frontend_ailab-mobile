import BaseAPI, { defDeviceType } from "./base";

export class PromotionAPI extends BaseAPI {
	GetPromotionDetail = ({ langId, BonusCode }) =>
		this.promotionRequest.post(`/GetPromotionDetail/${langId}`, {
			BonusCode,
			DeviceType: window?.ReactNativeWebView
				? defDeviceType.NativeAPP
				: defDeviceType.Mobile
		});

	SetClaimPromotion = ({ langId, BonusCode, LockedAmount }) =>
		this.promotionRequest.post(`/SetClaimPromotion/${langId}`, {
			BonusCode,
			LockedAmount,
			DeviceType: window?.ReactNativeWebView
				? defDeviceType.NativeAPP
				: defDeviceType.Mobile
		});

	GetPromotionList = ({ langId }) =>
		this.promotionRequest.post(`/GetPromotionListV3/${langId}`, {
			DeviceType: window?.ReactNativeWebView
				? defDeviceType.NativeAPP
				: defDeviceType.Mobile
		});

	GetCustSpecificBonus = ({ BonusCode, TpId, PromoCategoryId }) =>
		this.accountRequest.post("/GetCustSpecificBonus", {
			BonusCode,
			TpId,
			PromoCategoryId
		});

	GetSpecialPromotionList = ({ langId, SpecialCode }) =>
		this.promotionRequest.post(`/GetSpecialPromotionListV2/${langId}`, {
			SpecialCode,
			DeviceType: defDeviceType.Mobile
		});

	SetSpecialCode = ({ langId, SpecialCode }) =>
		this.promotionRequest.post(`/SetSpecialCode/${langId}`, {
			SpecialCode,
			DeviceType: defDeviceType.Mobile
		});

	GetDepositPromotionList = ({ langId }) =>
		this.promotionRequest.post(`/GetDepositPromotionList/${langId}`, {
			DeviceType: defDeviceType.Mobile
		});

	SetDepositPromotionQueue = ({ langId, TransId, BonusCode }) =>
		this.promotionRequest.post(`/SetDepositPromotionQueue/${langId}`, {
			TransId,
			BonusCode,
			DeviceType: defDeviceType.Mobile
		});
}
