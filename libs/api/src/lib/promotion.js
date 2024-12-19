import BaseAPI, { defDeviceType, getDeviceType } from "./base";

export class PromotionAPI extends BaseAPI {
	GetPromotionDetail = ({ langId, bonusCode, currencyId }) =>
		this.promotionRequest.post(`/GetPromotionDetail/${langId}`, {
			BonusCode: bonusCode,
			DeviceType: getDeviceType(),
			CurrencyId: currencyId
		});

	SetClaimPromotion = ({ langId, BonusCode, LockedAmount }) =>
		this.promotionRequest.post(`/SetClaimPromotion/${langId}`, {
			BonusCode,
			LockedAmount,
			DeviceType: getDeviceType()
		});

	// 2024/12/16 為了後台新功能：first deposit, redeposit, special deposit有在名單內可以直接領取的API(直接送給後端，少一層請客服處理的流程)
	SetClaimPromotionForUploadCustList = ({
		langId,
		BonusCode,
		LockedAmount
	}) =>
		this.promotionRequest.post(
			`/SetClaimPromotionForUploadCustList/${langId}`,
			{
				BonusCode,
				LockedAmount,
				DeviceType: getDeviceType()
			}
		);

	GetPromotionList = ({ langId, currencyId }) =>
		this.promotionRequest.post(`/GetPromotionListV3/${langId}`, {
			DeviceType: getDeviceType(),
			CurrencyId: currencyId
		});

	// 2024/12/16 為了後台新功能：first deposit, redeposit, special deposit有在名單內可以直接領取的API
	GetPromotionUploadCustList = ({ langId, currencyId }) =>
		this.promotionRequest.post(`/GetPromotionUploadCustList/${langId}`, {
			DeviceType: getDeviceType(),
			CurrencyId: currencyId
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
			DeviceType: getDeviceType()
		});

	SetSpecialCode = ({ langId, SpecialCode }) =>
		this.promotionRequest.post(`/SetSpecialCode/${langId}`, {
			SpecialCode,
			DeviceType: defDeviceType.Mobile
		});

	GetDepositPromotionList = ({ langId }) =>
		this.promotionRequest.post(`/GetDepositPromotionList/${langId}`, {
			DeviceType: getDeviceType()
		});

	SetDepositPromotionQueue = ({ langId, TransId, BonusCode }) =>
		this.promotionRequest.post(`/SetDepositPromotionQueue/${langId}`, {
			TransId,
			BonusCode,
			DeviceType: getDeviceType()
		});

	GetRebateExcludeGameList = ({ langId, currencyId }) =>
		this.promotionRequest.post(`/GetRebateExcludeGameList/${langId}`, {
			CurrencyId: currencyId
		});
}
