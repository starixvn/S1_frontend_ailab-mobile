import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import AppDownloadImg from "../../styles/img/appdownload.jpg";
import AppDownloadVNImg from "../../styles/img/appdownload_vn.jpg";
import IOS from "../../styles/img/ios.svg";
import Android from "../../styles/img/android.svg";
import VIP from "../../styles/img/home-vip.png";
import Ranking from "../../styles/img/home-ranking.png";
import TandC from "../../service/t_and_c";
import path from "../../path";

const APPDownloadLink = {
	Android:
		"https://s3-ap-northeast-1.amazonaws.com/grd.fileshare/sasa/goal123/android/prodRelease-1.0.8-20201230-1804.apk",
	IOS: "https://appdage.com/76B5E24D6EC46B4B"
};

const MiddlePanel = ({ langId, i18n }) => {
	return (
		<>
			<div className="vipRanking">
				<Link to={`/${path.vip.root}`}>
					<img src={VIP} alt="VIP" />
					<div>VIP</div>
				</Link>
				<Link to={`/${path.leaderBoard.root}`}>
					<img src={Ranking} alt="Ranking" />
					<div>{i18n.lbl_Ranking.toUpperCase()}</div>
				</Link>
			</div>
			<div className="downloadNew">
				<a
					target="_blank"
					rel="noreferrer"
					href={TandC(langId).AppDownload}>
					<img
						src={
							langId === "en" ? AppDownloadImg : AppDownloadVNImg
						}
						alt="APP Download"
					/>
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
		</>
	);
};

MiddlePanel.propTypes = {
	langId: PropTypes.string.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default MiddlePanel;
