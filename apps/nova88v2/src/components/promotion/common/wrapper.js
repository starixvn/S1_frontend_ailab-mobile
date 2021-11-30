import React, { useState, useContext } from "react";
import { PromotionAPI } from "@ailab-mobile/api";
import { isConvert } from "@ailab-mobile/common";
import { navigate } from "@reach/router";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import { Promotion as uiSetting } from "UISetting";
import { configContext } from "./context";
import { defWrapperCol, defRuleCols } from "./def";
import { promoPopBox } from "../../common/context";
import path from "../../../path";
import config from "../../../config";

export default ({
	children,
	ruleCols = [
		defRuleCols.minAmount,
		defRuleCols.bonus,
		defRuleCols.maxBonus,
		defRuleCols.rollOver,
		defRuleCols.remainingTime
	],
	formatSetting = {
		isConvertRequired: false,
		digits: 0,
		formatRequired: false
	}
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);

	const [promoBox, setPromoBox] = useState({
		isOpen: false
	});

	return (
		<promoPopBox.Provider value={{ promoBox, setPromoBox }}>
			<configContext.Provider
				value={{
					config,
					path,
					uiSetting,
					i18n,
					userInfo,
					setPopBox,
					api: {
						promotion: new PromotionAPI({ apiURL: config?.apiURL })
					},
					ruleCols,
					formatSetting: {
						[defWrapperCol.formatSetting.isConvertRequired]:
							formatSetting.isConvertRequired,
						[defWrapperCol.formatSetting.formatRequired]:
							formatSetting.formatRequired === undefined
								? isConvert(userInfo.currencyId)
								: formatSetting.formatRequired,
						[defWrapperCol.formatSetting.digits]:
							formatSetting.digits
					}
				}}>
				{children}
				<PromotionInfoPopbox i18n={i18n} />
			</configContext.Provider>
		</promoPopBox.Provider>
	);
};

const PromotionInfoPopbox = ({ i18n }) => {
	const { promoBox, setPromoBox } = useContext(promoPopBox);

	if (promoBox.promotionInfo === null) return null;

	const { isOpen: openPromoPopBox } = promoBox;

	const closePopbox = () => {
		setPromoBox({ isOpen: false });
		navigate(`${window.location.origin}${window.location.pathname}`);
	};

	return (
		<div
			id="popup"
			className={`promospop${openPromoPopBox ? " active" : ""}`}>
			<div className="pop">
				<div className="popTit">
					{i18n.lbl_Promotion}
					<div className="icon icon-close" onClick={closePopbox} />
				</div>
				{promoBox.content}
			</div>
		</div>
	);
};
