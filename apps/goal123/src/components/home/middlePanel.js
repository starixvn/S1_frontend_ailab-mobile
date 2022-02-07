import React from "react";
import { Link } from "@reach/router";
import path from "../../path";
import { useAppDownLoad } from "../appDownload/useAppDownLoad";
import { bannerImgUrl } from "../../config";

const MiddlePanel = () => {
	const { appLinkDatas } = useAppDownLoad();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<>
			<div className="vipRanking">
				<Link to={`/${path.vip.root}`}>
					<img src={`${bannerImgUrl}/h5/img/vipimgb.jpg`} alt="VIP" />
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
					<img
						src={`${bannerImgUrl}/h5/img/downloadbg.png`}
						alt="APP Download"
					/>
				</a>

				{IOSDownloadUrl && (
					<a href={IOSDownloadUrl} target="_blank" rel="noreferrer">
						<button>
							<img
								src={`${bannerImgUrl}/h5/img/iosicon.png`}
								alt="IOS"
							/>
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
							<img
								src={`${bannerImgUrl}/h5/img/androidicon.png`}
								alt="Android"
							/>
							Android
						</button>
					</a>
				)}
			</div>
		</>
	);
};

export default MiddlePanel;
