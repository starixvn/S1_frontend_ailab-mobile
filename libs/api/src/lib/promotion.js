import { promotionRequest } from "./base";
import axios from "axios";

export class PromotionAPI {
	constructor({ apiUrl }) {
		this.promotionRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Promotion`
		});

		this.accountRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Account`
		});
	}

	promotion_GetCanJoinPromotionList = langId => {
		return this.promotionRequest.post(`/GetCanJoinPromotionList/${langId}`);
	};

	promotion_GetPromotionDetail = ({ langId, BonusCode }) =>
		promotionRequest.post(`/GetPromotionDetail/${langId}`, {
			BonusCode
		});

	promotion_SetClaimPromotion = ({ langId, BonusCode, LockedAmount }) =>
		promotionRequest.post(`/SetClaimPromotion/${langId}`, {
			BonusCode,
			LockedAmount
		});

	promotion_GetPromotionListV2 = ({ langId }) =>
		promotionRequest.post(`/GetPromotionListV2/${langId}`);

	account_GetCustSpecificBonus = ({ BonusCode, TpId, PromoCategoryId }) =>
		accountRequest.post("/GetCustSpecificBonus", {
			BonusCode,
			TpId,
			PromoCategoryId
		});
}

// export const api_promotion_GetCanJoinPromotionList = langId =>
// 	promotionRequest.post(`/GetCanJoinPromotionList/${langId}`);

// export const api_promotion_GetPromotionDetail = ({ langId, BonusCode }) =>
// 	promotionRequest.post(`/GetPromotionDetail/${langId}`, {
// 		BonusCode
// 	});

// export const api_promotion_SetClaimPromotion = ({
// 	langId,
// 	BonusCode,
// 	LockedAmount
// }) =>
// 	promotionRequest.post(`/SetClaimPromotion/${langId}`, {
// 		BonusCode,
// 		LockedAmount
// 	});

// export const api_promotion_GetPromotionListV2 = ({ langId }) =>
// 	promotionRequest.post(`/GetPromotionListV2/${langId}`);
