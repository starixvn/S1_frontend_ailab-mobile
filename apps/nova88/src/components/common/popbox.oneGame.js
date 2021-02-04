import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import path from "../../path";
import oneGameImg from "../../styles/img/onegame/bg.jpg";
import { GET_ENTER_PAGE } from "../../service/enterPage";

const PopBoxOneGame = ({ setRedirect }) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const goToGame = () => {
		setPopBox({ isOpen: false });
		GET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId: 13
		});
	};

	const toDownloadPage = () => {
		setPopBox({ isOpen: false });
		setRedirect({
			redirect: true,
			path: `/${path.oneGame.root}`
		});
	};

	return (
		<div className="popTxt">
			<img src={oneGameImg} className="banner" alt="One Game" />
			<div className="btn-group">
				<button className="orange" onClick={goToGame}>
					{i18n.lbl_GoToGame.toUpperCase()}
				</button>
				<button className="white" onClick={toDownloadPage}>
					{i18n.lbl_GoToDownloadApp.toUpperCase()}
				</button>
			</div>
		</div>
	);
};

PopBoxOneGame.propTypes = {
	setRedirect: PropTypes.func.isRequired
};

export default PopBoxOneGame;
