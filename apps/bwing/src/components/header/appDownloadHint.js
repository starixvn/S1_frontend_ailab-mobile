import React, { useEffect } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import { setCookie, readCookie } from "../common/common";
import path from "../../path";
import { bannerImgUrl } from "../../config";

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
		<div className="downloanFrame open">
			<div className="left">
				<button
					className="icon icon-close"
					onClick={handleDownloadHint}
				/>
				<img
					src={`${bannerImgUrl}/h5/img/downloadIcon.png`}
					alt={i18n.lbl_DownloadApp}
				/>
				<div className="text">
					<p>{i18n.lbl_DownloadApp}</p>
					<p>{i18n.lbl_DownloadAppHint}</p>
				</div>
			</div>
			<Link to={path.appDownload.root} className="downBtn">
				{i18n.lbl_Downloads}
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
