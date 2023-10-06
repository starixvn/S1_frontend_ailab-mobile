import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import PropTypes from "prop-types";
import {
	defNavPanel,
	navContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import { bannerImgUrl } from "../../config";
import { HOT_GAME_LIST } from "./def";
import { defAppType, GET_ENTER_PAGE } from "../../service/enterPage";
import { defTpGameType } from "../hook/useGetTpMaintainList";

const HotGames = ({ maintainList }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
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
		const isMaintain = maintainList.find(
			({ tpId: maintainTpId, tpGameType: maintainTpGameType }) =>
				maintainTpId === tpId &&
				(maintainTpGameType === tpGameType ||
					maintainTpGameType === defTpGameType.All)
		);

		if (isMaintain) {
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
		} else {
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
		}
	};

	return (
		<>
			<div className="home-title">
				<i className="icon-games" />
				{t("lbl_HOT_GAMES")}
			</div>
			<div className="home-hotgame mb-2">
				{HOT_GAME_LIST.map(({ displayKey, category, ...rest }) => {
					return (
						<a
							key={`${displayKey}_${category}`}
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

HotGames.defaultProps = {
	maintainList: []
};

HotGames.propTypes = {
	maintainList: PropTypes.arrayOf(PropTypes.any)
};

export default HotGames;
