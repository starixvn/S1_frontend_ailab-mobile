import React from "react";
import appIng from "../../styles/img/Appicon.png";
import { setCookie } from "../common/common";
import TandC from "../../service/t_and_c";

export default ({ i18n, cookieName, langId, setAppHint }) => {
	const handleDownloadHint = () => {
		setCookie(cookieName, "1", 1);
		setAppHint(false);
	};
	return (
		<div className="appDownload">
			<div className="left">
				<button
					className="icon icon-close"
					onClick={handleDownloadHint}
				/>
				<img src={appIng} alt="APP Download icon" />
				<div>
					{i18n.lbl_DownloadApp}
					<span>{i18n.lbl_DownloadAppHint}</span>
				</div>
			</div>
			<a
				className="download-btn"
				target="_blank"
				rel="noreferrer"
				onClick={handleDownloadHint}
				href={TandC(langId).AppDownload}>
				{i18n.lbl_Downloads}
			</a>
		</div>
	);
};

export const isIOS =
	/iPad|iPhone/.test(navigator.userAgent) && !window.MSStream;
