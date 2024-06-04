import { useContext } from "react";
import { useGetRecentlyViewedQuery } from "@ailab-mobile/service";
import { defCategory, products, defLoginGameType } from "@ailab-mobile/common";
import { defNavPanel, navContext, userInfoContext } from "../common/context";
import { useGotoGame } from "./useGotoGame";
import useSetTimeout from "./useSetTimeout";
import { defMenuList } from "../../datas/defMenu";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";

const useRecentlyViewed = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { throttle } = useSetTimeout();
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const { data: recentlyViewedList = [] } = useGetRecentlyViewedQuery(
		{
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
		const allDefProducts = Object.values(defMenuList).flatMap(
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
		if (!product || product?.isMaintain) return;

		const { tpId, gameId, tpGameType, categoryId, bettype } = product || {};

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
					bettype
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
