import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { setCookie, readCookie } from "../common/common";
import { Link } from "../../route/link";
import path from "../../path";
import appIng from "../../styles/img/app/appicon.jpg";

const AppDownloadHint = ({ i18n, root }) => {
	const [appHint, setAppHint] = useState(false);

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
			<img src={appIng} alt={i18n.lbl_DownloadApp} />
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
	root: PropTypes.bool.isRequired
};

export default AppDownloadHint;
