import { useContext, useCallback } from "react";
import { GET_ENTER_PAGE } from "apps/goal123/src/service/enterPage";
import { userInfoContext, navContext, defNavPanel } from "../../common/context";

const useClickGame = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	const clickGame = useCallback(
		({ tpId, gameId, tpGameType }) => {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: () => {
					setNav(defNavPanel.login);
				},
				tpGameType
			});
		},
		[userInfo, setNav, defNavPanel]
	);

	return clickGame;
};

export default useClickGame;
