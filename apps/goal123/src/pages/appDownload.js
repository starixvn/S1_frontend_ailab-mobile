import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext } from "../components/common/context";
import { useAppDownLoad } from "../components/appDownload/useAppDownLoad";
import path from "../path";
import Layout from "../components/common/layout";
import { bannerImgUrl } from "../config";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { appLinkDatas } = useAppDownLoad();
	const navigate = useNavigate();

	const androidDownLoadUrl = appLinkDatas?.Android?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<Layout title={i18n.lbl_APPDownload} mainClass="main app_page">
			<div>
				<div
					className="logo"
					onClick={() => navigate(`${path.home.root}`)}>
					<img
						src={`${bannerImgUrl}/h5/img/appdownload/logo.png`}
						alt="logo"
					/>
				</div>
				<div className="title">{i18n.lbl_APPDownload}</div>
				<img
					className="visual"
					src={`${bannerImgUrl}/h5/img/appdownload/bg-item.png`}
					alt="bg-img"
				/>
				<div className="qrcode">
					<div className="container">
						{androidDownLoadUrl && (
							<div className="qrcode-item">
								<img
									src={`${bannerImgUrl}/h5/img/appdownload/android.svg`}
									alt="android-img"
								/>
								Android
								<a
									className="download"
									href={androidDownLoadUrl}
									target="_blank"
									rel="noreferrer">
									{i18n.lbl_Downloads} (Android)
								</a>
							</div>
						)}

						{IOSDownloadUrl && (
							<div className="qrcode-item">
								<img
									src={`${bannerImgUrl}/h5/img/appdownload/ios.svg`}
									alt="ios-img"
								/>
								iOS
								<a
									className="download"
									href={IOSDownloadUrl}
									target="_blank"
									rel="noreferrer">
									{i18n.lbl_Downloads} (iOS)
								</a>
							</div>
						)}
					</div>
				</div>
				<div className="title">{i18n.lbl_Installation_tutorial}</div>

				<div className="tutorial">
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/appdownload/1.png`}
							alt="tutorial-1"
						/>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/appdownload/2.png`}
							alt="tutorial-2"
						/>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/appdownload/3.png`}
							alt="tutorial-3"
						/>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/h5/img/appdownload/4.png`}
							alt="tutorial-4"
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
