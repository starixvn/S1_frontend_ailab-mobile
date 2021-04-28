import BaseAPI from "./base";

export class PromotionAPI extends BaseAPI {
	GetPromotionDetail = ({ langId, BonusCode }) =>
		this.promotionRequest.post(`/GetPromotionDetail/${langId}`, {
			BonusCode
		});

	SetClaimPromotion = ({ langId, BonusCode, LockedAmount }) =>
		this.promotionRequest.post(`/SetClaimPromotion/${langId}`, {
			BonusCode,
			LockedAmount
		});

	GetPromotionListV2 = ({ langId }) =>
		this.promotionRequest.post(`/GetPromotionListV2/${langId}`);

	GetCustSpecificBonus = ({ BonusCode, TpId, PromoCategoryId }) =>
		this.accountRequest.post("/GetCustSpecificBonus", {
			BonusCode,
			TpId,
			PromoCategoryId
		});

	GetSpecialPromotionList = ({ langId, SpecialCode }) =>
		this.promotionRequest.post(`/GetSpecialPromotionList/${langId}`, {
			SpecialCode
		});

	SetSpecialCode = ({ langId, SpecialCode }) =>
		this.promotionRequest.post(`/SetSpecialCode/${langId}`, {
			SpecialCode
		});
}
