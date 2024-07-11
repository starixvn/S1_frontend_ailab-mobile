import { useMenuData } from "@ailab-mobile/common";
import { useContext } from "react";
import { useNavigate } from "@reach/router";
import { siteId } from "../../config";
import { defMenuType, defMenuObj } from "../../datas/defMenu";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { userInfoContext, navContext, defNavPanel } from "../common/context";
import { useGotoGame } from "./useGotoGame";

const useMenu = () => {
	const { userInfo } = useContext(userInfoContext);
	const { langId, isLogin } = userInfo;
	const { setNav } = useContext(navContext);
	const navigate = useNavigate();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const menuData = useMenuData({
		siteId,
		currencyId: 51
	});

	const onClickProductItem = async product => {
		if (!product || product?.isInMaintain) return;
		const { tpId, gameId, menuType, tpGameType, noPlay, path, betType } =
			product || {};

		if (noPlay) return;

		const redirectAction = () => {
			const switchMethod = {
				[defMenuType.Link]: () => {
					navigate(path);
				},
				[defMenuType.entPage]: () => {
					return GET_ENTER_PAGE({
						tpId,
						gameId,
						tpGameType,
						betType,
						langId,
						isLogin,
						loginCallback: () => {
							setNav(defNavPanel.login);
						}
					});
				},
				[defMenuType.useGoToGame]: () => {
					return handleGoToGame({
						tpId,
						gameId,
						tpGameType,
						langId,
						isLogin
					});
				},
				default: () => null
			};

			return (switchMethod[menuType] || switchMethod.default)();
		};

		redirectAction();
	};

	const mergedMenus = Object.values(menuData)?.map(mainMenuItem => {
		const { lobbyCategoryId } = mainMenuItem || {};
		const defMainMenuItem = defMenuObj[lobbyCategoryId];

		const { data = [], subMenus = [], ...rest } = {
			...mainMenuItem,
			...(defMainMenuItem && defMainMenuItem)
		};

		const subMenuList = data.map(subMenuItem => {
			// * subMenu 是插入的相關資料 因此不會影響順序
			subMenus?.forEach(defSubItem => {
				if (subMenuItem?.tpGameIdNo === defSubItem.tpGameIdNo) {
					Object.assign(subMenuItem, defSubItem);
				}
			});

			return { ...subMenuItem };
		});

		return { ...rest, data: subMenuList };
	});

	return { menuList: mergedMenus, onClickProductItem };
};

export default useMenu;
