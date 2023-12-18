import React, { useContext } from "react";
import { useGetRecentlyViewedQuery } from "@ailab-mobile/service";
import { useTranslation } from "react-i18next";
import { defCategory, products, defLoginGameType } from "@ailab-mobile/common";
import {
	defNavPanel,
	navContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import { useGotoGame } from "./useGotoGame";
import { defDeviceType } from "../../service/api/base";
import useSetTimeout from "./useSetTimeout";
import { defMenuObj } from "../../datas/defMenu";
import {
	defAppType,
	GET_CASINO_ENTER_PAGE,
	GET_ENTER_PAGE
} from "../../service/enterPage";

const useRecentlyViewed = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);
	const { throttle } = useSetTimeout();
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const showMaintenancePopBox = () => {
		setPopBox({
			isOpen: true,
			content: t("lbl_underMaintenance"),
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						className="btn-gray"
						onClick={() => {
							setPopBox({ isOpen: false });
						}}>
						OK
					</button>
				</div>
			)
		});
	};

	const { data: recentlyViewedList = [] } = useGetRecentlyViewedQuery(
		{
			deviceType: defDeviceType.Desktop,
			currencyId: userInfo?.currencyId
		},
		{
			skip: !userInfo?.isLogin,
			selectFromResult: response => {
				const { data } = response;
				return { data: data?.data?.recentlyViewedList };
			}
		}
	);

	const mergedProducts = () => {
		const allDefProducts = Object.values(defMenuObj).flatMap(
			mainMenuItem => mainMenuItem?.subMenus
		);

		return recentlyViewedList.map(gameItem => {
			const defMenuProduct = allDefProducts.find(
				defGameItem => defGameItem.tpGameIdNo === gameItem.tpGameIdNo
			);
			// * 只選相關參數插入 避免前後端參數權責混淆
			const { menuType } = defMenuProduct || {};

			return { ...gameItem, menuType };
		});
	};

	const onClickRecentlyViewedProductItem = product => {
		if (!product) return;

		const { tpId, gameId, tpGameType, isMaintain, categoryId, bettype } =
			product || {};

		if (isMaintain) {
			showMaintenancePopBox();
			return;
		}

		// * Jira 4839 的需求 點擊直接進入該遊戲(Slot 是直接進遊戲) 若有大廳則導轉到大廳
		switch (true) {
			case categoryId === defCategory.Slots:
				throttle(
					() =>
						GET_CASINO_ENTER_PAGE({
							tpId,
							gameId,
							tpGameType,
							isFree: false,
							langId: userInfo.langId,
							execFunction:
								tpId === products.PGSoft.tpId
									? handleGoToGame.bind(this, {
											langId: userInfo.langId,
											tpId,
											gameId,
											isFun: false,
											tpGameType,
											loginGameType:
												defLoginGameType.returnHtml
									  })
									: null
						}),
					5000
				);

				break;
			default:
				GET_ENTER_PAGE({
					langId: userInfo.langId,
					tpId,
					gameId,
					isLogin: userInfo.isLogin === true,
					loginCallback: () => setNav(defNavPanel.login),
					tpGameType,
					bettype,
					appType: defAppType.desktop
				});
				break;
		}
	};

	return {
		recentlyViewedList: mergedProducts(),
		onClickRecentlyViewedProductItem
	};
};

export default useRecentlyViewed;
