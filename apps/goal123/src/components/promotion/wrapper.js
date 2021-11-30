import React, { useState, useContext } from "react";
import { promoPopBox, i18nContext } from "../common/context";

export default ({ children }) => {
	const [promoBox, setPromoBox] = useState({
		isOpen: false
	});

	const { i18n } = useContext(i18nContext);

	return (
		<promoPopBox.Provider value={{ promoBox, setPromoBox }}>
			{children}
			<PromotionInfoPopbox i18n={i18n} />
		</promoPopBox.Provider>
	);
};

const PromotionInfoPopbox = ({ i18n }) => {
	const { promoBox, setPromoBox } = useContext(promoPopBox);

	if (promoBox.promotionInfo === null) return null;

	const { isOpen: openPromoPopBox } = promoBox;

	const closePopbox = () => {
		setPromoBox({ isOpen: false });
		window.history.replaceState({}, "", `${window.location.pathname}`);
	};

	return (
		<div
			id="popup"
			className={`promospop${openPromoPopBox ? " active" : ""}`}>
			<div className="popTit">
				{i18n.lbl_Promotion}
				<div className="icon icon-close" onClick={closePopbox} />
			</div>
			<div className="promotions">{promoBox.content}</div>
		</div>
	);
};
