import { useEffect, useState, useCallback, useRef } from "react";
import api from "../../../service/api";

export const useGetPromotions = ({ userInfo: { langId } }) => {
	const [promotion, setPromotion] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getPromotionListV2 = useCallback(() => {
		api.promotion.GetPromotionListV2({ langId }).then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				// const result = res.data.data.sort((a, b) =>
				// 	a.periodFrom > b.periodFrom ? -1 : 1
				// );

				setPromotion(res.data.data);
			}
		});
	}, [langId]);

	useEffect(() => {
		getPromotionListV2();
	}, [getPromotionListV2]);

	return { promotion, getPromotionListV2 };
};
