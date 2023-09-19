import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { defNavPanel, navContext, userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import { HOT_GAME_LIST } from "./def";
import { defAppType, GET_ENTER_PAGE } from "../../service/enterPage";

const HotGames = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const navigate = useNavigate();

	const handleHotGameClick = ({
		href,
		tpId,
		gameId,
		tpGameType,
		hasDesktopLink
	}) => {
		if (tpId) {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: () => setNav(defNavPanel.login),
				tpGameType,
				appType: hasDesktopLink ? defAppType.desktop : null
			});
		}
		if (href) {
			navigate(href);
		}
	};

	return (
		<>
			<div className="home-title">
				<i className="icon-games">{t("lbl_HOT_GAMES")}</i>
			</div>
			<div className="home-hotgame mb-2">
				{HOT_GAME_LIST.map(({ displayKey, category, ...rest }) => {
					return (
						<a
							className="home-hotgame-item"
							onClick={() => handleHotGameClick({ ...rest })}>
							<img
								src={`${bannerImgUrl}/h5/img/4.0/hotgames/${category}.png`}
								alt={category}
							/>
							<div className="subtitle">{t(displayKey)}</div>
						</a>
					);
				})}
			</div>
		</>
	);
};

export default HotGames;
