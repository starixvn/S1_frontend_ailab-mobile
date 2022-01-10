import React, { useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import path from "../../path";
import { Link } from "../../route/link";
import { cloudBannerImgURL } from "../../config";

const PopBoxOneGame = ({ tpId = 13 }) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const goToGame = () => {
		setPopBox({ isOpen: false });
		GET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			tpGameType: 41
		});
	};

	return (
		<div className="popTxt">
			<img
				src={`${cloudBannerImgURL}/h5/img/1g/banner.jpg`}
				className="banner"
				alt="One Game"
			/>
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
