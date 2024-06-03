import { useContext } from "react";
import { useMenuData } from "@ailab-mobile/common";
import { useNavigate } from "@reach/router";
import { defMenuList, defMenuType } from "../../datas/defMenu";
import { defNavPanel, navContext, userInfoContext } from "../common/context";
import { useGotoGame } from "./useGotoGame";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { siteId } from "../../config";

const useMenu = () => {
	const { userInfo } = useContext(userInfoContext);
	const { langId, isLogin } = userInfo || {};
	const { setNav } = useContext(navContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const navigate = useNavigate();

	const menuData = useMenuData({
		siteId,
		currencyId: 51
	});

	const onClickProductItem = async product => {
		console.log(product);
		if (!product || product?.isInMaintain) return;

		const {
			tpId,
			gameId,
			menuType,
			tpGameType,
			noPlay,
			path,
			parameter,
			appType
		} = product || {};

		if (noPlay) return;

		const redirectAction = () => {
			const switchMethod = {
				[defMenuType.Link]: () => {
					if (path && parameter) {
						navigate(`${path}/${parameter?.provider}`);
						return;
					}

					navigate(path);
				},
				[defMenuType.entPage]: () => {
					return GET_ENTER_PAGE({
						tpId,
						gameId,
						tpGameType,
						appType,
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
				default: () => {
					return GET_ENTER_PAGE({
						tpId,
						gameId,
						tpGameType,
						appType,
						langId,
						isLogin,
						loginCallback: () => {
							setNav(defNavPanel.login);
						}
					});
				}
			};

			return (switchMethod[menuType] || switchMethod.default)();
		};

		redirectAction();
	};

	const mergedMenus = menuData?.map(mainMenuItem => {
		const { lobbyCategoryId } = mainMenuItem || {};

		const defMainMenuItem = defMenuList.find(
			defMainItem => defMainItem.lobbyCategoryId === lobbyCategoryId
		);

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

export { useMenu };
