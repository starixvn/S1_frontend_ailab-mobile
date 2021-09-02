import { useEffect, useState, useCallback, useRef } from "react";
import moment from "moment";
import api from "../../service/api";
import { defPromotionType } from "../promotion/common/def";

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
		? moment(custExpiryTime).isBefore(new moment())
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

	const getPromotionList = useCallback(() => {
		api.promotion.GetPromotionList({ langId }).then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				const result = res.data.data.sort((a, b) =>
					a.periodFrom > b.periodFrom ? -1 : 1
				);

				setPromotion(result);
			}
		});
	}, [langId]);

	useEffect(() => {
		getPromotionList();
	}, [getPromotionList]);

	const promotionList = filterExpiry
		? promotion.filter(p => !isExpiry({ ...p, isLogin }))
		: promotion;

	return { promotionList };
};
