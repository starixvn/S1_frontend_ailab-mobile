import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "./slider";

const HotPromotion = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className="home-title">
				<i className="icon-promo" />
				{t("lbl_HotPromotions")}
			</div>
			<div className="home-promo mb-2">
				<Slider />
			</div>
			c
		</>
	);
};

export default HotPromotion;
