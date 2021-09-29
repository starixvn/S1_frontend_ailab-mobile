import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import AppDownloadImg from "../../styles/img/downloadbg.png";
import IOS from "../../styles/img/iosicon.png";
import Android from "../../styles/img/androidicon.png";
import VIP from "../../styles/img/vipimgb.jpg";
import path from "../../path";
import { useAppDownLoad } from "../appDownload/useAppDownLoad";

const MiddlePanel = ({ langId, i18n }) => {
	const { appLinkDatas } = useAppDownLoad();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

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
					href={`${window.location.origin}/${path.appDownload.root}`}>
					<img src={AppDownloadImg} alt="APP Download" />
				</a>

				{IOSDownloadUrl && (
					<a href={IOSDownloadUrl} target="_blank" rel="noreferrer">
						<button>
							<img src={IOS} alt="IOS" />
							IOS
						</button>
					</a>
				)}

				{andriodDownLoadUrl && (
					<a
						href={andriodDownLoadUrl}
						target="_blank"
						rel="noreferrer">
						<button>
							<img src={Android} alt="Android" />
							Android
						</button>
					</a>
				)}
			</div>
		</>
	);
};

MiddlePanel.propTypes = {
	langId: PropTypes.string.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default MiddlePanel;
