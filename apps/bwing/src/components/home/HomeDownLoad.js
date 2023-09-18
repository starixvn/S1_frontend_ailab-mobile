import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { bannerImgUrl } from "../../config";
import path from "../../path";

const HomeDownLoad = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<div className="home-download mb-2">
			<img
				className="home-download-logo"
				src={`${bannerImgUrl}/h5/img/4.0/logo.png`}
				alt=""
			/>
			<div className="home-download-content">
				<div>{t("lbl_Home_Download_Description1")}</div>
				<div>
					<span>{t("lbl_Home_Download_Description2")}</span>
					<span>{t("lbl_Home_Download_Description3")}</span>
				</div>
				<a onClick={() => navigate(`/${path.appDownload.root}`)}>
					{t("lbl_App_Download_Guide")}
				</a>
			</div>
			<div className="home-download-app">
				<img src={`${bannerImgUrl}/h5/img/4.0/app.png`} alt="" />
				<div>{t("lbl_PoweredBy")}</div>
				<img src={`${bannerImgUrl}/h5/img/4.0/bong88.png`} alt="" />
			</div>
		</div>
	);
};

export default HomeDownLoad;
