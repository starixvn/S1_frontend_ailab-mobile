import moment from "moment";
import Swiper from "react-id-swiper";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "Context";
import { useGetPromotions } from "../hook/useGetPromotions";
import { useHandlePromotionInfo } from "../promotion/promotionInfo.popbox";

const defSwipperConfig = {
	containerClass: "home-promos",
	slidesPerView: 1.05,
	spaceBetween: 10
};

const Promotion = () => {
	const { t } = useTranslation();
	const {
		userInfo: { langId, isLogin, currencyId }
	} = useContext(userInfoContext);
	const { promotionList = [] } = useGetPromotions({
		langId,
		isLogin,
		currencyId
	});
	const { getPromotionDetail } = useHandlePromotionInfo({});

	// * 如果沒有資料，整個元件都不渲染
	if (promotionList.length === 0) return null;

	const promoList = promotionList.map(
		({ title, banner, displayFrom, displayTo, bonusCode }) => {
			const onClickPromotion = () =>
				getPromotionDetail(langId, bonusCode);

			const timezone = moment().format("Z");
			const isDisplay =
				moment.unix(displayFrom).subtract(timezone).diff(moment()) <=
					0 &&
				moment.unix(displayTo).subtract(timezone).diff(moment()) >= 0;

			return (
				isDisplay && (
					<div key={bonusCode} onClick={onClickPromotion}>
						<div>
							<img src={banner} alt={title} />
						</div>
					</div>
				)
			);
		}
	);

	return (
		<>
			<div className="home-title">{t("lbl_Promotion")}</div>
			<Swiper {...defSwipperConfig}>{promoList}</Swiper>
		</>
	);
};

export { Promotion };
