import React, { useContext, useEffect, useState, useRef } from "react";
import { userInfoContext, i18nContext } from "Context";
import {
	api_promotion_GetPromotionDetail,
	api_account_GetCustSpecificBonus
} from "@ailab-mobile/api";
import { getUrlParameter } from "@ailab-mobile/common";
import { isClaimed, isNew, isExpiry } from "./common/common";
import PromotionContent from "./components/promotionContent";

export const PromotionInfo = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [promotionInfo, setPromotionInfo] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (userInfo.isLogin !== null) {
			let _bonusCode = getUrlParameter("bonusCode");

			api_promotion_GetPromotionDetail({
				langId: userInfo.langId,
				BonusCode: _bonusCode
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPromotionInfo(res.data.data);
						} else {
							alert(res.data.message);
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						alert(i18n.msg_ApiServerError);
					}
				}
			);
		}
	}, [userInfo.isLogin, userInfo.langId, i18n.msg_ApiServerError]);

	const GetPromotionDetail = (langId, _bonusCode) => {
		api_promotion_GetPromotionDetail({
			langId: langId,
			BonusCode: _bonusCode
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setPromotionInfo(res.data.data);
					} else {
						alert(res.data.message);
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					alert(i18n.msg_ApiServerError);
				}
			}
		);
	};

	const RefreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api_account_GetCustSpecificBonus({
			BonusCode: bonusCode,
			TpId: tpId,
			PromoCategoryId: categoryId
		}).then(res => {
			if (
				isMountedRef.current &&
				res.data.errorCode === 0 &&
				res.data.data
			) {
				setPromotionInfo(prevS => ({
					...prevS,
					custRollOver: res.data.data.rollover,
					custTurnOver: res.data.data.turnover
				}));
			}
		});
	};

	if (promotionInfo === null) return null;

	let _isClaimed = isClaimed(promotionInfo);
	let _isNew = _isClaimed ? false : isNew(promotionInfo);
	let _isExpiry = isExpiry({ ...promotionInfo, isLogin: userInfo.isLogin });

	return (
		<PromotionContent
			promotionInfo={promotionInfo}
			i18n={i18n}
			userInfo={userInfo}
			_isExpiry={_isExpiry}
			_isClaimed={_isClaimed}
			_isNew={_isNew}
			GetPromotionDetail={GetPromotionDetail}
			RefreshProcessBar={RefreshProcessBar}
		/>
	);
};
