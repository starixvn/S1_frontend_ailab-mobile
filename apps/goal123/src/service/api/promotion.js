import { getDeviceType } from "@ailab-mobile/api";
import { promotionRequest } from "./base";

export const api_GetDepositPromotionList = ({ langId }) =>
	promotionRequest.post(`/GetDepositPromotionList/${langId}`, {
		DeviceType: getDeviceType()
	});

export const api_SetDepositPromotionQueue = ({ langId, TransId, BonusCode }) =>
	promotionRequest.post(`/SetDepositPromotionQueue/${langId}`, {
		TransId,
		BonusCode,
		DeviceType: getDeviceType()
	});

export const api_promotion_GetPromotionDetail = ({ langId, BonusCode }) =>
	promotionRequest.post(`/GetPromotionDetail/${langId}`, {
		BonusCode,
		DeviceType: getDeviceType()
	});

export const api_promotion_GetRebateExcludeGameList = ({
	langId,
	currencyId
}) =>
	promotionRequest.post(`/GetRebateExcludeGameList/${langId}`, {
		CurrencyId: currencyId
	});

export const api_promotion_GetRetentionPromotion = ({ langId }) =>
	promotionRequest.post(`/GetRetentionPromotion/${langId}`, {
		DeviceType: getDeviceType()
	});

export const api_promotion_SetClaimPromotion = ({
	langId,
	BonusCode,
	LockedAmount
}) =>
	promotionRequest.post(`/SetClaimPromotion/${langId}`, {
		BonusCode,
		LockedAmount,
		DeviceType: getDeviceType()
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
