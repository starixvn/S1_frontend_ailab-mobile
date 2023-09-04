import { IAxiosResponse } from "..";
import { rootApi } from "../rootApi/api";

const promotionApiUrl = {
	getPopUpPromotion: "Promotion/GetPopUpPromotion"
};

const promotionApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * null 代表沒有符合的 bonus
		getPopUpPromotion: builder.query<
			IAxiosResponse<{
				bonusCode: null | string;
			}>,
			{
				deviceType: number;
				langId: string;
			}
		>({
			query: ({ deviceType, langId }) => ({
				url: `${promotionApiUrl.getPopUpPromotion}/${langId}`,
				method: "POST",
				data: { deviceType }
			})
		})
	})
});

export const { useLazyGetPopUpPromotionQuery } = promotionApi;
