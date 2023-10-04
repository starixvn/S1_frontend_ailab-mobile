import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isExpiry } from "@ailab-mobile/promotion";
import HomeMatch from "../components/home/homeMatch";
import SportList from "../components/home/sportList";
import { api_hotEvent_GetDataList } from "../service/api/hotEvent";
import { popBoxContext, userInfoContext } from "../components/common/context";
import HotPromotion from "../components/home/hotPromotion";
import { api_promotion_GetPromotionList } from "../service/api/promotion";

export default () => {
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const [hotEventList, setHotEventList] = useState([]);
	const [promotionList, setPromotionList] = useState([]);
	const filterPromotionList = promotionList.filter(
		item =>
			!isExpiry({
				...item,
				isLogin: userInfo.isLogin
			})
	);
	const getHotEventList = async () => {
		try {
			const {
				data: { data }
			} = await api_hotEvent_GetDataList({
				langId: userInfo.langId
			});
			setHotEventList(data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getPromotionList = async () => {
		try {
			const {
				data: { data }
			} = await api_promotion_GetPromotionList({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			setPromotionList(data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	useEffect(() => {
		getHotEventList();
		getPromotionList();
	}, []);

	return (
		<div className="wrapper">
			<div className="col-12">
				<HomeMatch hotEventList={hotEventList} classNameType="lobby" />
				<SportList />
				<HotPromotion promotionList={filterPromotionList} />
			</div>
		</div>
	);
};
