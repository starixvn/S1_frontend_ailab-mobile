import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import { AccountAPI, PromotionAPI } from "@ailab-mobile/api";
import config from "Config";
import path from "Path";
import { defRuleCols } from "@ailab-mobile/promotion";
import {
	defNavPanel,
	i18nContext,
	navContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import useHandlePromotionInfo from "../promotion/promotionDetail/promotionInfo.popbox";
import { promotionUiSetting } from "../promotion/promotionUiSetting";

const HotPromotion = ({ promotionList }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);

	const { getPromotionDetail } = useHandlePromotionInfo({
		config: {
			uiSetting: promotionUiSetting,
			userInfo,
			i18n,
			api: {
				promotion: new PromotionAPI({ apiURL: config?.apiURL }),
				account: new AccountAPI({ apiURL: config?.apiURL })
			},
			path,
			ruleCols: [
				defRuleCols.minAmount,
				defRuleCols.bonus,
				defRuleCols.maxBonus,
				defRuleCols.rollOver,
				defRuleCols.remainingTime
			],
			setPopBox,
			visitorCurrency: { vn: 51, en: 51 },
			formatSetting: {
				isConvertRequired: false,
				digits: undefined,
				formatRequired: undefined
			},
			handleLogin: () => setNav(defNavPanel.login)
		}
	});

	const swiperParams = {
		spaceBetween: 10,
		slidesPerView: 1
	};

	return (
		<>
			<div className="home-title">
				<i className="icon-promo" />
				{t("lbl_HotPromotions")}
			</div>
			<div className="home-promo mb-2">
				<Swiper {...swiperParams}>
					{promotionList.map(({ banner, title, bonusCode }) => {
						return (
							<a
								key={`${bonusCode}_${title}`}
								onClick={() =>
									getPromotionDetail(
										userInfo.langId,
										bonusCode,
										"all"
									)
								}>
								<img src={banner} alt={title} />
							</a>
						);
					})}
				</Swiper>
			</div>
		</>
	);
};

HotPromotion.defaultProps = {
	promotionList: []
};

HotPromotion.propTypes = {
	promotionList: PropTypes.arrayOf(PropTypes.any)
};

export default HotPromotion;
