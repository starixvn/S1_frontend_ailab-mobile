import { promotionRequest, defDeviceType } from "./base";

export const api_GetDepositPromotionList = ({ langId }) =>
	promotionRequest.post(`/GetDepositPromotionList/${langId}`, {
		DeviceType: defDeviceType.Mobile
	});

export const api_SetDepositPromotionQueue = ({ langId, TransId, BonusCode }) =>
	promotionRequest.post(`/SetDepositPromotionQueue/${langId}`, {
		TransId,
		BonusCode,
		DeviceType: defDeviceType.Mobile
	});

export const api_promotion_GetPromotionDetail = ({ langId, BonusCode }) =>
	promotionRequest.post(`/GetPromotionDetail/${langId}`, {
		BonusCode,
		DeviceType: defDeviceType.Mobile
	});

// export const api_promotion_SetClaimPromotion = ({
// 	langId,
// 	BonusCode,
// 	LockedAmount
// }) =>
// 	promotionRequest.post(`/SetClaimPromotion/${langId}`, {
// 		BonusCode,
// 		LockedAmount
// 	});

// export const api_promotion_GetPromotionList = ({ langId }) =>
// 	promotionRequest.post(`/GetPromotionListV3/${langId}`, {
// 		DeviceType: defDeviceType.Mobile
// 	});
