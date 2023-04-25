import { useEffect, useState, useCallback, useRef, useContext } from "react";
import api from "../../../service/api";
import { popBoxContext, i18nContext } from "../../common/context";

export const useGetPromotions = ({ userInfo: { langId, currencyId } }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [promotion, setPromotion] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getPromotionList = useCallback(() => {
		api.promotion.GetPromotionList({ langId, currencyId }).then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setPromotion(res.data.data || []);
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);
	}, [langId]);

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api.account
			.GetCustSpecificBonus({
				BonusCode: bonusCode,
				TpId: tpId,
				PromoCategoryId: categoryId
			})
			.then(
				({ data: { data, errorCode, message } }) => {
					const success = errorCode === 0;
					if (success) {
						let idx = null;
						let newPromoList = [];

						idx = promotion.findIndex(
							x =>
								x.bonusCode === bonusCode &&
								x.tpId === tpId &&
								x.categoryId === categoryId
						);
						if (idx !== -1) {
							newPromoList = [...promotion];
							if (data) {
								newPromoList[idx].custRollOver = data.rollover;
								newPromoList[idx].custTurnOver = data.turnover;
							}
						}

						setPromotion(newPromoList);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
	};

	useEffect(() => {
		getPromotionList();
	}, [getPromotionList]);

	return { promotion, getPromotionList, refreshProcessBar };
};
