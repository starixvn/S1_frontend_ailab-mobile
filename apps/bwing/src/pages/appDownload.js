import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { i18nContext } from "../components/common/context";
import { useAppDownLoad } from "../components/appDownload/useAppDownLoad";

import Footer from "../components/common/footer";
import logo from "../styles/img/logo.png";
import Android from "../styles/img/download/Android.png";

import ios from "../styles/img/download/ios.png";
import tutorial1 from "../styles/img/download/dlimg1.png";
import tutorial2 from "../styles/img/download/dlimg2.png";
import tutorial3 from "../styles/img/download/dlimg3.png";
import tutorial4 from "../styles/img/download/dlimg4.png";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { appLinkDatas } = useAppDownLoad();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<>
			<main className="downloadArea">
				<div className="downloadT">
					<img src={logo} alt="Bwing" className="logo" />
					<h1>{i18n.lbl_APP_DOWNLOAD}</h1>

					<div className="downloadFrame">
						<p>{i18n.lbl_Scan_to_Download}</p>
						{andriodDownLoadUrl && (
							<div>
								<div>
									<img src={Android} alt="Android" />
									<a
										href={andriodDownLoadUrl}
										target="_blank"
										rel="noreferrer">
										<button>Android</button>
									</a>
								</div>

								<QRCode
									value={andriodDownLoadUrl}
									renderAs="svg"
									size={180}
									includeMargin={true}
								/>
							</div>
						)}

						{IOSDownloadUrl && (
							<div>
								<div>
									<img src={ios} alt="ios" />
									<a
										href={IOSDownloadUrl}
										target="_blank"
										rel="noreferrer">
										<button>IOS</button>
									</a>
								</div>

								<QRCode
									value={IOSDownloadUrl}
									renderAs="svg"
									size={180}
									includeMargin={true}
								/>
							</div>
						)}
					</div>
				</div>
				<div className="downloadB">
					<h1>{i18n.lbl_Installation_tutorial}</h1>
					<h2>{i18n.lbl_iOS_App_Trust_Authentication}</h2>
					<p>{i18n.lbl_Once_Bwing_App_is_installed}</p>
					<div>
						<img src={tutorial1} alt="iOS tutorial" />
						<img src={tutorial2} alt="iOS tutorial" />
						<img src={tutorial3} alt="iOS tutorial" />
						<img src={tutorial4} alt="iOS tutorial" />
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default IndexPage;
