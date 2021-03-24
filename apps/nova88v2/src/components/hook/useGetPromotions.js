import { useEffect, useState, useCallback, useRef } from "react";
import moment from "moment";
import api from "../../service/api";

const isExpiry = ({
	periodTo,
	custExpiryTime,
	isLogin,
	isJoin,
	promotionType
}) => {
	return isLogin &&
		isJoin &&
		promotionType !== defPromotionType.rebate &&
		promotionType !== defPromotionType.cashback
		? moment(moment.unix(custExpiryTime)).isBefore(new moment())
		: moment(moment.unix(periodTo)).isBefore(new moment());
};

export const useGetPromotions = ({ langId, isLogin, filterExpiry = true }) => {
	const [promotion, setPromotion] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getPromotionListV2 = useCallback(() => {
		api.promotion.getPromotionListV2({ langId }).then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				const result = res.data.data.sort((a, b) =>
					a.periodFrom > b.periodFrom ? -1 : 1
				);

				setPromotion(result);
			}
		});
	}, [langId]);

	useEffect(() => {
		getPromotionListV2();
	}, [getPromotionListV2]);

	const promotionList = filterExpiry
		? promotion.filter(p => !isExpiry({ ...p, isLogin }))
		: promotion;

	return { promotionList };
};
