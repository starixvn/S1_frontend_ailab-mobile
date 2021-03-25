import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getUrlParameter } from "@ailab-mobile/common";
import { isClaimed, isNew, isExpiry } from "./common/common";
import PromotionContent from "./components/promotionContent";
import Wrapper from "./common/wrapper";
import { configContext } from "./common/context";
import { useHandlePopBox } from "./hook/useHandlePopBox";

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

const PromotionInfoContent = () => {
	const { path, userInfo, i18n, uiSetting, api, ruleCols } = useContext(
		configContext
	);
	const { handleErrorPopBox } = useHandlePopBox();
	const [promotionInfo, setPromotionInfo] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin !== null) {
			const _bonusCode = getUrlParameter("bonusCode");

			api.promotion
				.GetPromotionDetail({
					langId: userInfo.langId,
					BonusCode: _bonusCode
				})
				.then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								setPromotionInfo(res.data.data);
							} else {
								handleErrorPopBox({ ...res.data, uiSetting });
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							handleErrorPopBox({ uiSetting });
						}
					}
				);
		}
	}, [userInfo.isLogin, userInfo.langId, i18n.msg_ApiServerError]);

	const GetPromotionDetail = (langId, _bonusCode) => {
		api.promotion
			.GetPromotionDetail({
				langId,
				BonusCode: _bonusCode
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPromotionInfo(res.data.data);
						} else {
							handleErrorPopBox({ ...res.data, uiSetting });
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						handleErrorPopBox({ uiSetting });
					}
				}
			);
	};

	if (promotionInfo === null) return null;
	const { popBox } = uiSetting;
	const _isClaimed = isClaimed(promotionInfo);
	const _isNew = _isClaimed ? false : isNew(promotionInfo);
	const _isExpiry = isExpiry({ ...promotionInfo, isLogin: userInfo.isLogin });

	const urlParams = {};
	window.location.search
		?.substring(1)
		.split("&")
		.forEach(u => {
			const pattern = u.split("=");
			if (pattern.length >= 2) {
				urlParams[pattern[0]] = isNaN(pattern[1])
					? pattern[1]
					: Number(pattern[1]);
			}
		});
	return (
		<PromotionContent
			path={path}
			uiSetting={{ popBox }}
			promotionInfo={promotionInfo}
			i18n={i18n}
			_isExpiry={_isExpiry}
			_isClaimed={_isClaimed}
			_isNew={_isNew}
			GetPromotionDetail={GetPromotionDetail}
			ruleCols={ruleCols}
			currencyId={userInfo.currencyId}
			urlParameters={urlParams}
			Class={
				getUrlParameter("tab") === "Expired"
					? "promodule"
					: "proInfomodule"
			}
		/>
	);
};
