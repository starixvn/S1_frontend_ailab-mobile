import React, { useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import path from "../../path";
import oneGameImg from "../../styles/img/onegame/bg.jpg";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { Link } from "../../route/link";

const PopBoxOneGame = ({ tpId = 13 }) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const goToGame = () => {
		setPopBox({ isOpen: false });
		GET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId
		});
	};

	return (
		<div className="popTxt">
			<img src={oneGameImg} className="banner" alt="One Game" />
			<div className="btn-group">
				<button className="orange" onClick={goToGame}>
					{i18n.lbl_GoToGame.toUpperCase()}
				</button>
				<Link className="white" to={path.oneGame.root}>
					{i18n.lbl_GoToDownloadApp.toUpperCase()}
				</Link>
			</div>
		</div>
	);
};

export default PopBoxOneGame;
