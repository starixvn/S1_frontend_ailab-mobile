import React from "react";
import { setCookie } from "../common/common";
import path from "../../path";
import { bannerImgUrl } from "../../config";

export default ({ i18n, cookieName, setAppHint }) => {
	const handleDownloadHint = () => {
		setCookie(cookieName, "1", 1);
		setAppHint(false);
	};
	return (
		<div className="appDownload open">
			<div className="left">
				<button
					className="icon icon-close"
					onClick={handleDownloadHint}
				/>
				<img
					src={`${bannerImgUrl}/h5/img/Appicon.png`}
					alt="APP Download icon"
				/>
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
				href={`${window.location.origin}/${path.appDownload.root}`}>
				{i18n.lbl_Downloads}
			</a>
		</div>
	);
};
