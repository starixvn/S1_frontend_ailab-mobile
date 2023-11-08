import { useEffect, useState, useCallback, useRef, useContext } from "react";
import moment from "moment";
import api from "../../service/api";
import { popBoxContext, i18nContext } from "../common/context";
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

export const useGetPromotions = ({
	langId,
	isLogin,
	filterExpiry = true,
	currencyId
}) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
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
					if (res.data.data !== null) {
						const result = res.data.data.sort((a, b) =>
							a.periodFrom > b.periodFrom ? -1 : 1
						);

						setPromotion(result);
					}
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

	useEffect(() => {
		if (langId) getPromotionList();
	}, [langId]);

	const promotionList = filterExpiry
		? promotion.filter(p => !isExpiry({ ...p, isLogin }))
		: promotion;

	return { promotionList };
};
