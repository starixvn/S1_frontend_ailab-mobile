import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { i18nContext } from "../components/common/context";
import { useAppDownLoad } from "../components/appDownload/useAppDownLoad";
import Footer from "../components/common/footer";
import path from "../path";
import { Link } from "../route/link";
import { cloudBannerImgURL } from "../config";
import GoTopBtn from "../components/common/goTopBtn";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { appLinkDatas } = useAppDownLoad();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<>
			<main className="main apppage">
				<div className="app">
					<div className="appHeader">
						<Link to={path.home.root}>
							<img
								src={`${cloudBannerImgURL}/h5/img/app/applogo.png`}
								alt="Back To Nova88"
							/>
						</Link>
					</div>
					<div className="appPage">
						<div className="appTitle">{i18n.lbl_AppDownload}</div>
						<div className="scan">
							<div>
								{IOSDownloadUrl && (
									<div>
										<QRCode
											value={IOSDownloadUrl}
											renderAs="svg"
											size={70}
											includeMargin={true}
										/>
										<div>
											<div>
												<img
													src={`${cloudBannerImgURL}/h5/img/app/ios.png`}
													alt="IOS"
												/>
												{i18n.lbl_iOS}
											</div>
											<a
												href={IOSDownloadUrl}
												target="_blank"
												rel="noreferrer noopener">
												<button>
													{i18n.lbl_Downloads?.toUpperCase()}
												</button>
											</a>
										</div>
									</div>
								)}

								{andriodDownLoadUrl && (
									<div>
										<QRCode
											value={andriodDownLoadUrl}
											renderAs="svg"
											size={70}
											includeMargin={true}
										/>
										<div>
											<div>
												<img
													src={`${cloudBannerImgURL}/h5/img/app/and.png`}
													alt="Android"
												/>
												{i18n.lbl_Android}
											</div>
											<a
												href={andriodDownLoadUrl}
												download>
												<button>
													{i18n.lbl_Downloads?.toUpperCase()}
												</button>
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="install">
							<div>
								{i18n.lbl_InstallationTutorial?.toUpperCase()}
							</div>
							<div>
								<img
									src={`${cloudBannerImgURL}/h5/img/app/iosicon.png`}
									alt="IOS Icon"
								/>
								{i18n.lbl_iOSAuth}
							</div>
							<div>{i18n.lbl_appHint1}</div>
							<div>{i18n.lbl_appHint2}</div>
							<div>
								<img
									src={`${cloudBannerImgURL}/h5/img/app/in01.png`}
									alt="Tutorial 1"
								/>
								<img
									src={`${cloudBannerImgURL}/h5/img/app/in02.png`}
									alt="Tutorial 2"
								/>
								<img
									src={`${cloudBannerImgURL}/h5/img/app/in03.png`}
									alt="Tutorial 3"
								/>
								<img
									src={`${cloudBannerImgURL}/h5/img/app/in04.png`}
									alt="Tutorial 4"
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
			<GoTopBtn />
		</>
	);
};

export default IndexPage;
