import BaseAPI, { defDeviceType } from "./base";

export class PromotionAPI extends BaseAPI {
	GetPromotionDetail = ({ langId, BonusCode }) =>
		this.promotionRequest.post(`/GetPromotionDetail/${langId}`, {
			BonusCode,
			DeviceType: defDeviceType.Mobile
		});

	SetClaimPromotion = ({ langId, BonusCode, LockedAmount }) =>
		this.promotionRequest.post(`/SetClaimPromotion/${langId}`, {
			BonusCode,
			LockedAmount,
			DeviceType: defDeviceType.Mobile
		});

	GetPromotionList = ({ langId }) =>
		this.promotionRequest.post(`/GetPromotionListV3/${langId}`, {
			DeviceType: defDeviceType.Mobile
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
}
