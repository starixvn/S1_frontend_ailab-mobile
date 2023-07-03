import { useEffect } from "react";
import {
	useGotoGame,
	defSpecialSetting,
	open9wSports,
	defOpenType
} from "../components/hook/useGotoGame";
import { getUrlParameter } from "../components/common/common";
import { siteInfo } from "../config";

export default () => {
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const token = getUrlParameter("token");
	const langId = getUrlParameter("langId")
		? getUrlParameter("langId")
		: siteInfo("en").siteDefaultLang;
	const tpId = isNaN(getUrlParameter("tpId"))
		? getUrlParameter("tpId")
		: Number(getUrlParameter("tpId"));
	const gameId = getUrlParameter("gameId");
	const isFun = getUrlParameter("isFun"); // free play 1, else 0

	useEffect(() => {
		const appGoToGame = async () => {
			if (tpId === defSpecialSetting.sports_9w) {
				const result = await handleGoToGame({
					isLogin: true,
					langId,
					tpId,
					gameId
				});
				const { url, key, userId } = result ?? {};
				open9wSports({ url, key, userId });
			} else {
				handleGoToGame({
					isLogin: true,
					langId,
					tpId,
					gameId,
					isFun,
					token,
					openType: defOpenType._self
				});
			}
		};

		appGoToGame();
	}, [langId, tpId, gameId, isFun, token]);

	return null;
};
