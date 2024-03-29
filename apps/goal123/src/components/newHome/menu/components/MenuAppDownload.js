import React from "react";
import { bannerImgUrl } from "apps/goal123/src/config";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";

const MenuAppDownload = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	return (
		<div className="menu-app">
			<div className="app-content">
				<div className="app-title">
					<div className="app-title-icon">
						<img
							src={`${bannerImgUrl}/h5/img/home-page/goal123-appicon.png`}
							alt="menu-appicon"
						/>
					</div>
					<div className="app-title-text">
						<span>{t("Label_Menu_Goal123_App")}</span>
						<span>{t("Label_Menu_On_iOS_And_Android")}</span>
					</div>
				</div>
				{/* 請連至app download頁 */}
				<button
					className="btn-download"
					onClick={() => navigate(`/${path.appDownload.root}`)}>
					<i className="icon-download" />
					{t("Label_Menu_Download")}
				</button>
			</div>
		</div>
	);
};

export default MenuAppDownload;
