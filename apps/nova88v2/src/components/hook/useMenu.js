import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { useMenuData, products } from "@ailab-mobile/common";
import { popBoxContext, userInfoContext } from "Context";
import { siteId } from "../../config";
import { defCurrenyId } from "../common/common";
import { defMenuList, defMenuType } from "../../datas/defMenu";
import useHandleLogin from "./useHandleLogin";
import { useGotoGame, open9wSports } from "./useGotoGame";
import { GET_ENTER_PAGE } from "../../service/enterPage";

const useMenu = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { langId, isLogin } = userInfo;
	const { setPopBox } = useContext(popBoxContext);
	const { handleLogin } = useHandleLogin();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const menuData = useMenuData({
		siteId,
		currencyId: userInfo?.currencyId ?? defCurrenyId.MYR,
		memberType: userInfo?.memberType
	});

	const showLiveStreamingPopBox = () => {
		setPopBox({
			isOpen: true,
			title: t("lbl_Information"),
			content: (
				<div
					style={{
						color: "red"
					}}>
					{t("lbl_InaccessibleWithoutPermission")}
				</div>
			)
		});
	};

	const onClickProductItem = async product => {
		if (!product || product?.isInMaintain) return;

		const {
			tpId,
			gameId,
			tpGameIdNo,
			menuType,
			tpGameType,
			noPlay,
			path,
			parameter,
			isNeedLogin
		} = product || {};

		if (noPlay) {
			showLiveStreamingPopBox();
			return;
		}

		if (isNeedLogin && !userInfo?.isLogin) {
			handleLogin();
			return;
		}

		//* 特例的開啟方式加在這裡
		if (tpGameIdNo === products.Nova88Exchange.tpGameIdNo) {
			const result = await handleGoToGame({
				tpId,
				langId,
				gameId,
				isLogin,
				tpGameType
			});

			const { url, key, userId } = result ?? {};
			open9wSports({ url, key, userId });
			return;
		}

		const redirectAction = () => {
			const switchMethod = {
				[defMenuType.Link]: () => {
					if (path && parameter) {
						navigate(`${path}/${parameter}`);
						return;
					}

					navigate(path);
				},
				[defMenuType.entPage]: () => {
					return GET_ENTER_PAGE({
						tpId,
						langId,
						gameId,
						isLogin,
						tpGameType,
						loginCallback: handleLogin
					});
				},
				[defMenuType.useGoToGame]: () => {
					return handleGoToGame({
						tpId,
						langId,
						gameId,
						isLogin,
						tpGameType
					});
				},
				default: () => {
					return GET_ENTER_PAGE({
						tpId,
						langId,
						gameId,
						isLogin,
						tpGameType,
						loginCallback: handleLogin
					});
				}
				// * isUseGotoGame 已從 entPage 拉出來 目前只有 exchange
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
