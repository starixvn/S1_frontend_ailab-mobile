import { navigate } from "@reach/router";
import React, { useEffect, useContext } from "react";
import { useHandlePopBox, getUrlParameter } from "@ailab-mobile/promotion";
import { popBoxContext } from "../../common/context";
import PromotionInInfoContent from "./promotionInInfoContent";

const useHandlePromotionInfo = ({ config }) => {
	const { path, userInfo, api, uiSetting } = config;
	const { setPopBox } = useContext(popBoxContext);
	const { handleErrorPopBox } = useHandlePopBox(config);
	const urlBonusCode = getUrlParameter("BonusCode");

	useEffect(() => {
		if (
			userInfo.regTime &&
			window.location.pathname.includes(`${path.promotion.root}`)
		) {
			getPromotionDetail(userInfo.langId, urlBonusCode, null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [urlBonusCode, userInfo.regTime]);

	const getPromotionDetail = (langId, bonusCode, filterType) => {
		api.promotion
			.GetPromotionDetail({
				langId,
				bonusCode
			})
			.then(
				res => {
					if (res.data.errorCode === 0 && res.data.data) {
						setPopBox({
							isOpen: true,
							custContent: (
								<PromotionInInfoContent
									promotionInfo={{
										...res.data.data,
										filterType
									}}
									getPromotionDetail={getPromotionDetail}
									config={config}
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
				() => handleErrorPopBox({ uiSetting })
			);
	};

	return {
		getPromotionDetail
	};
};

export default useHandlePromotionInfo;
