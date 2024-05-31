import { getDeviceType } from "@ailab-mobile/api";
import { IAxiosResponse } from "..";
import { rootApi } from "../rootApi/api";

const promotionApiUrl = {
	getPopUpPromotion: "Promotion/GetPopUpPromotion"
};

const promotionApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * null 代表沒有符合的 bonus
		getPopUpPromotion: builder.query<
			IAxiosResponse<{ bonusCode: null | string }>,
			{ langId: string }
		>({
			query: ({ langId }) => ({
				url: `${promotionApiUrl.getPopUpPromotion}/${langId}`,
				method: "POST",
				data: { deviceType: getDeviceType() }
			})
		})
	})
});

export const { useLazyGetPopUpPromotionQuery } = promotionApi;
