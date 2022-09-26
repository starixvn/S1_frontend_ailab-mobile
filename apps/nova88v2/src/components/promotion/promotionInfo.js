import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getUrlParameter } from "@ailab-mobile/common";
import { isClaimed, isNew } from "./common/common";
import PromotionContent from "./components/promotionContent";
import Wrapper from "./common/wrapper";
import { configContext } from "./common/context";
import { popBoxContext } from "../common/context";

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
	const { setPopBox } = useContext(popBoxContext);
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
					bonusCode: _bonusCode,
					currencyId: userInfo.currencyId
				})
				.then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								setPromotionInfo(res.data.data);
							} else {
								setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
		}
	}, [userInfo.isLogin, userInfo.langId, i18n.msg_ApiServerError]);

	const GetPromotionDetail = (langId, _bonusCode) => {
		api.promotion
			.GetPromotionDetail({
				langId,
				bonusCode: _bonusCode,
				currencyId: userInfo.currencyId
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPromotionInfo(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
	};

	if (promotionInfo === null) return null;
	const { popBox } = uiSetting;
	const _isClaimed = isClaimed(promotionInfo);
	const _isNew = _isClaimed ? false : isNew(promotionInfo);

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
