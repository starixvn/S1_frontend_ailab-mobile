import { useState, useEffect, useContext } from "react";
import { userInfoContext } from "../../common/context";
import {
	api_promotion_GetRetentionPromotion,
	api_promotion_GetPromotionDetail
} from "../../../service/api/promotion";

const useRetentionPromotion = () => {
	const [retentionBonusCode, setRetentionBonusCode] = useState(null);
	const [loading, setLoading] = useState(true);
	const [promotionDetail, setPromotionDetail] = useState(null);
	const {
		userInfo: { isLogin, langId }
	} = useContext(userInfoContext);

	useEffect(() => {
		if (!isLogin) {
			return;
		}
		const fetchPromotionData = async () => {
			try {
				const response = await api_promotion_GetRetentionPromotion({
					langId
				});
				// Destructuring with response and giving default value to bonusCode
				const {
					data: { data: { bonusCode = "" } = {} } = {}
				} = response;
				setRetentionBonusCode(bonusCode);
				// Fetching promotion details and giving default value to promotionDetailsData
				const {
					data: { data: details = {} } = {}
				} = await api_promotion_GetPromotionDetail({
					langId,
					BonusCode: bonusCode
				});
				setPromotionDetail(details);
			} catch (error) {
				console.error("Error fetching promotion data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPromotionData();
	}, []);

	return { retentionBonusCode, promotionDetail, loading };
};

export default useRetentionPromotion;
