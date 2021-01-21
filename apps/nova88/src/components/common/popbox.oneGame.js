import React, { useContext } from "react";
import { Link } from "@reach/router";
import { i18nContext } from "Context";
import path from "../../path";
import oneGameImg from "../../styles/img/onegame/bg.jpg";

const PopBoxOneGame = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="popTxt">
			<img src={oneGameImg} className="banner" alt="One Game" />
			<div className="btn-group">
				<button className="orange">
					{i18n.lbl_GoToGame.toUpperCase()}
				</button>
				<Link to={path.oneGame.root} className="white">
					{i18n.lbl_DownloadApp.toUpperCase()}
				</Link>
			</div>
		</div>
	);
};

export default PopBoxOneGame;
