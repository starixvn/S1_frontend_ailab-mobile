import { useEffect, useState, useCallback, useRef } from "react";

export const useGetPromotions = ({ api, userInfo: { langId } }) => {
	const [promotion, setPromotion] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getPromotionList = useCallback(async () => {
		// 將需要Member list才有的promotion合併進原本的promotion list
		const {
			data: { data: promoCustListData }
		} = await api.promotion.GetPromotionUploadCustList({
			langId
		});
		api.promotion.GetPromotionList({ langId }).then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setPromotion([...res.data.data, ...promoCustListData]);
			}
		});
	}, [api.promotion, langId]);

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api.account
			.GetCustSpecificBonus({
				BonusCode: bonusCode,
				TpId: tpId,
				PromoCategoryId: categoryId
			})
			.then(({ data: { data, errorCode } }) => {
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
				}
			});
	};

	useEffect(() => {
		getPromotionList();
	}, [getPromotionList]);
	return { promotion, getPromotionList, refreshProcessBar };
};
