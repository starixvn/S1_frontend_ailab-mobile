import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import PromotionContent from "./components/promotionContent";
import { userInfoContext, promoPopBox } from "../common/context";
import { configContext } from "./common/context";
import { useHandlePopBox } from "./hook/useHandlePopBox";
import api from "../../service/api";
import path from "../../path";
import { useRefreshProcessBar } from "./hook/useRefreshProcessBar";
import { getUrlParameter } from "../common/common";

export const useHandlePromotionInfo = ({
	showAllPromosBtn = false,
	filterType
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPromoBox } = useContext(promoPopBox);
	const { handleErrorPopBox } = useHandlePopBox();
	const urlBonusCode = getUrlParameter("BonusCode");

	useEffect(() => {
		if (window.location.pathname.includes(`${path.promotion.root}`)) {
			getPromotionDetail(userInfo.langId, urlBonusCode);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [urlBonusCode]);

	const getPromotionDetail = (langId, bonusCode) => {
		api.promotion
			.GetPromotionDetail({
				langId,
				bonusCode,
				currencyId: userInfo.currencyId
			})
			.then(
				res => {
					if (res.data.errorCode === 0 && res.data.data) {
						setPromoBox({
							isOpen: true,
							content: (
								<PromotionInfoContent
									promotionInfo={res.data.data}
									getPromotionDetail={getPromotionDetail}
									showAllPromosBtn={showAllPromosBtn}
									filterType={filterType}
								/>
							)
						});
					} else {
						if (res.data.errorCode !== 0) {
							handleErrorPopBox({ ...res.data, uiSetting });
						}

						navigate(
							`${window.location.origin}${window.location.pathname}`
						);
					}
				},
				() => {
					if (isMountedRef.current) {
						handleErrorPopBox({ uiSetting });
					}
				}
			);
	};

	return {
		getPromotionDetail
	};
};

export const PromotionInfoContent = ({
	promotionInfo,
	getPromotionDetail,
	showAllPromosBtn,
	filterType
}) => {
	const { userInfo, i18n, ruleCols } = useContext(configContext);
	const { refreshProcessBar, processBarInfo } = useRefreshProcessBar();

	if (promotionInfo === null) return null;

	return (
		<div className="promotions">
			<PromotionContent
				path={path}
				promotionInfo={promotionInfo}
				i18n={i18n}
				GetPromotionDetail={getPromotionDetail}
				ruleCols={ruleCols}
				currencyId={userInfo.currencyId}
				filterType={filterType}
				refreshProcessBar={refreshProcessBar}
				langId={userInfo.langId}
				showAllPromosBtn={showAllPromosBtn}
				processBarInfo={processBarInfo}
			/>
		</div>
	);
};

PromotionInfoContent.defaultProps = {
	promotionInfo: null,
	getPromotionDetail: () => null,
	showAllPromosBtn: () => null,
	filterType: null
};

PromotionInfoContent.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	getPromotionDetail: PropTypes.func,
	showAllPromosBtn: PropTypes.func,
	filterType: PropTypes.string
};
