import React from "react";
import PropTypes from "prop-types";
import AppDownloadImg from "../../styles/img/appdownload.jpg";
import IOS from "../../styles/img/ios.svg";
import Android from "../../styles/img/android.svg";
import TandC from "../../service/t_and_c";

const APPDownloadLink = {
	Android:
		"https://s3-ap-northeast-1.amazonaws.com/grd.fileshare/sasa/goal123/android/prodRelease-1.0.8-20201230-1804.apk",
	IOS: "https://appdage.com/76B5E24D6EC46B4B"
};

const AppPanel = ({ langId }) => {
	return (
		<div className="downloadNew">
			<a
				target="_blank"
				rel="noreferrer"
				href={TandC(langId).AppDownload}>
				<img src={AppDownloadImg} alt="APP Download" />
			</a>
			<a href={APPDownloadLink.IOS}>
				<div>
					<img src={IOS} alt="IOS" />
					<p>IOS</p>
				</div>
			</a>
			<a href={APPDownloadLink.Android}>
				<div>
					<img src={Android} alt="Android" />
					<p>Android</p>
				</div>
			</a>
		</div>
	);
};

AppPanel.propTypes = {
	langId: PropTypes.string.isRequired
};

export default AppPanel;
