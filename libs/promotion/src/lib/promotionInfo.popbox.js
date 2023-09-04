import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { getUrlParameter } from "./common/common";
import PromotionContent from "./components/promotionContent";
import Wrapper from "./common/wrapper";
import { useHandlePopBox } from "./hook/useHandlePopBox";
import { useRefreshProcessBar } from "./hook/useRefreshProcessBar";

export const useHandlePromotionInfo = ({
	showAllPromosBtn = false,
	config
}) => {
	const { path, userInfo, api, setPromoBox, uiSetting } = config;

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
				bonusCode,
				currencyId: 51
			})
			.then(
				res => {
					if (res.data.errorCode === 0 && res.data.data) {
						setPromoBox({
							isOpen: true,
							content: (
								<PromotionInfoContent
									promotionInfo={{
										...res.data.data,
										filterType
									}}
									getPromotionDetail={getPromotionDetail}
									showAllPromosBtn={showAllPromosBtn}
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

export const PromotionInfo = props => (
	<Wrapper {...props}>
		<PromotionInfoContent />
	</Wrapper>
);

PromotionInfo.defaultProps = {
	formatSetting: {}
};

PromotionInfo.propTypes = {
	formatSetting: PropTypes.shape({
		isConvertRequired: PropTypes.bool,
		digits: PropTypes.number
	})
};

const PromotionInfoContent = ({
	promotionInfo,
	getPromotionDetail,
	config,
	filterType
}) => {
	const { refreshProcessBar, processBarInfo } = useRefreshProcessBar({
		config
	});

	if (promotionInfo === null) return null;

	return (
		<PromotionContent
			promotionInfo={promotionInfo}
			GetPromotionDetail={getPromotionDetail}
			RefreshProcessBar={refreshProcessBar}
			processBarInfo={processBarInfo}
			config={config}
			filterType={filterType}
		/>
	);
};

PromotionInfoContent.defaultProps = {
	promotionInfo: null,
	getPromotionDetail: null,
	config: null,
	filterType: null
};

PromotionInfoContent.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	getPromotionDetail: PropTypes.func,
	config: PropTypes.objectOf(PropTypes.any),
	filterType: PropTypes.string
};
