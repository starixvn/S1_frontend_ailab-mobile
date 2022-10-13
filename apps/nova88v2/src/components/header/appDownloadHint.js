import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { setCookie, readCookie } from "../common/common";
import { Link } from "../../route/link";
import path from "../../path";
import { cloudBannerImgURL } from "../../config";

const AppDownloadHint = ({ i18n, root, appHint, setAppHint }) => {
	useEffect(() => {
		if (readCookie("AppDownloadHint") !== "1") {
			setAppHint(true);
		}
	}, []);

	const handleDownloadHint = () => {
		setCookie("AppDownloadHint", "1", 1);
		setAppHint(false);
	};

	return root && appHint ? (
		<div className="appdownload active">
			<button className="icon icon-close" onClick={handleDownloadHint} />
			<img
				src={`${cloudBannerImgURL}/h5/img/app/appicon.jpg`}
				alt={i18n.lbl_DownloadApp}
			/>
			<div>
				<div>{i18n.lbl_DownloadAppNow}</div>
				<div>{i18n.lbl_DownloadAppHint}</div>
			</div>
			<Link to={path.appDownload.root}>
				{i18n.lbl_Downloads?.toUpperCase()}
			</Link>
		</div>
	) : null;
};

AppDownloadHint.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	root: PropTypes.bool.isRequired,
	appHint: PropTypes.bool.isRequired,
	setAppHint: PropTypes.func.isRequired
};

export default AppDownloadHint;
