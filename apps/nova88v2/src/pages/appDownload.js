import React, { useContext } from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { useNavigate } from "@reach/router";
import { i18nContext } from "../components/common/context";
import path from "../path";
import { Link } from "../route/link";
import { cloudBannerImgURL } from "../config";
import { Footer } from "../components/common/footer";
import GoTopBtn from "../components/common/goTopBtn";
import { useAppDownLoad } from "../components/appDownload/useAppDownLoad";

const IndexPage = () => {
	const navigateTo = useNavigate();

	const { i18n } = useContext(i18nContext);

	const { appLinkDatas } = useAppDownLoad();

	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";

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
						<a onClick={() => navigateTo(-1)}>
							<i className="icon icon-keyboard_arrow_left" />
						</a>
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
							<div className="installWrapper">
								<InstallGuide i18n={i18n} />
							</div>
							{/* <div>
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
							</div> */}
						</div>
					</div>
				</div>
			</main>
			<Footer />
			<GoTopBtn />
		</>
	);
};

const InstallGuide = ({ i18n }) => {
	const params = {
		centeredSlides: true,
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		rebuildOnUpdate: true
	};

	return (
		<div className="downloadModule">
			<Swiper {...params}>
				<div className="swiper-slide">
					<img
						src={`${cloudBannerImgURL}/h5/img/app/new-step1.png`}
						alt="step1"
					/>
					<div>
						<span>
							{i18n.lbl_Step.replace("{{step}}", 1).toUpperCase()}
						</span>
						{i18n.lbl_DownloadAppStep1}
					</div>
				</div>
				<div className="swiper-slide">
					<img
						src={`${cloudBannerImgURL}/h5/img/app/Step2.png`}
						alt="step2"
					/>
					<div>
						<span>
							{i18n.lbl_Step.replace("{{step}}", 2).toUpperCase()}
						</span>
						{i18n.lbl_DownloadAppStep2}
					</div>
				</div>
				<div className="swiper-slide">
					<img
						src={`${cloudBannerImgURL}/h5/img/app/Step3.png`}
						alt="step3"
					/>
					<div>
						<span>
							{i18n.lbl_Step.replace("{{step}}", 3).toUpperCase()}
						</span>
						{i18n.lbl_DownloadAppStep3}
						<br />
						{i18n["lbl_DownloadAppStep3-1"]}
					</div>
				</div>
				<div className="swiper-slide">
					<img
						src={`${cloudBannerImgURL}/h5/img/app/new-step4.png`}
						alt="step4"
					/>
					<div>
						<span>
							{i18n.lbl_Step.replace("{{step}}", 4).toUpperCase()}
						</span>
						{i18n.lbl_DownloadAppStep4}
					</div>
				</div>
			</Swiper>
		</div>
	);
};

InstallGuide.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default IndexPage;
