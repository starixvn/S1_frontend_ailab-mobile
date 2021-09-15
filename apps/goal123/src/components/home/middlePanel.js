import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import AppDownloadImg from "../../styles/img/downloadbg.png";
import IOS from "../../styles/img/iosicon.png";
import Android from "../../styles/img/androidicon.png";
import VIP from "../../styles/img/vipimgb.jpg";
import TandC from "../../service/t_and_c";
import path from "../../path";

const APPDownloadLink = {
	Android:
		"https://mars.fadatsai88.com/v1/App?path=goal123entry_sports_android.apk",
	IOS: "https://helloios.net/emRS39"
};

const MiddlePanel = ({ langId, i18n }) => {
	return (
		<>
			<div className="vipRanking">
				<Link to={`/${path.vip.root}`}>
					<img src={VIP} alt="VIP" />
				</Link>
				{/* <Link to={`/${path.leaderBoard.root}`}>
					<img src={Ranking} alt="Ranking" />
				</Link> */}
			</div>
			<div className="downloadNew">
				<a
					target="_blank"
					rel="noreferrer"
					href={TandC(langId).AppDownload}>
					<img src={AppDownloadImg} alt="APP Download" />
				</a>
				<a href={APPDownloadLink.IOS ?? ""}>
					<button>
						<img src={IOS} alt="IOS" />
						IOS
					</button>
				</a>
				<a href={APPDownloadLink.Android}>
					<button>
						<img src={Android} alt="Android" />
						Android
					</button>
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
