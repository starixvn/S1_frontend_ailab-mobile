import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext } from "../components/common/context";
import { useAppDownLoad } from "../components/appDownload/useAppDownLoad";
import path from "../path";

import Footer from "../components/common/footer";

import logo from "../styles/img/appdownload/logo.png";
import bgImg from "../styles/img/appdownload/bg-item.png";
import androidImg from "../styles/img/appdownload/android.svg";
import iosImg from "../styles/img/appdownload/ios.svg";
import tutorial1 from "../styles/img/appdownload/1.png";
import tutorial2 from "../styles/img/appdownload/2.png";
import tutorial3 from "../styles/img/appdownload/3.png";
import tutorial4 from "../styles/img/appdownload/4.png";
import Layout from "../components/common/layout";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { appLinkDatas } = useAppDownLoad();
	const navigate = useNavigate();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<Layout title={i18n.lbl_APPDownload} mainClass="main app_page">
			<div>
				<div
					className="logo"
					onClick={() => navigate(`${path.home.root}`)}>
					<img src={logo} alt="logo" />
				</div>
				<div className="title">{i18n.lbl_APPDownload}</div>
				<img className="visual" src={bgImg} alt="bg-img" />
				<div className="qrcode">
					<div className="container">
						{andriodDownLoadUrl && (
							<div className="qrcode-item">
								<img src={androidImg} alt="android-img" />
								Android
								<a
									className="download"
									href={andriodDownLoadUrl}
									target="_blank"
									rel="noreferrer">
									{i18n.lbl_Downloads} (Android)
								</a>
							</div>
						)}

						{IOSDownloadUrl && (
							<div className="qrcode-item">
								<img src={iosImg} alt="ios-img" />
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
				<div className="subtitle">
					<div>{i18n.lbl_iOS_App_Trust_Authentication}</div>

					{String(i18n.lbl_Appdownload_Subtitle).replace(
						"{{site}}",
						"Goal123"
					)}
				</div>
				<div className="tutorial">
					<div className="item">
						<img src={tutorial1} alt="tutorial-1" />
					</div>
					<div className="item">
						<img src={tutorial2} alt="tutorial-2" />
					</div>
					<div className="item">
						<img src={tutorial3} alt="tutorial-3" />
					</div>
					<div className="item">
						<img src={tutorial4} alt="tutorial-4" />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
