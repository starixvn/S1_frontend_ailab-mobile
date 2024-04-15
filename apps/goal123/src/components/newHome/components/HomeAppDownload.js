import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import path from "../../../path";
import { userInfoContext } from "../../common/context";
import { bannerImgUrl } from "../../../config";

const HomeAppDownload = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<div>
			<div className="home-app">
				<div className="app-content">
					<div className="app-title">
						<img
							className="app-title-icon"
							src={`${bannerImgUrl}/h5/img/home-page/goal123-appicon.png`}
							alt="home-app-icon"
						/>
						<div className="app-title-text">
							<div className="text">
								<img
									className="brand"
									src={`${bannerImgUrl}/h5/img/home-page/goal123-brand.png`}
									alt="home-app-brand"
								/>
								<span>
									{t("lbl_Home_New") + t("lbl_Home_App")}
								</span>
							</div>

							<div className="text">
								<span>{t("lbl_Home_GreatGames")}</span>
								<span>{t("lbl_Home_OnAllDevices")}</span>
							</div>
						</div>
					</div>
					<span>{t("lbl_Home_SignupPromotion")}</span>
					<div>
						<img
							className="app-vision"
							src={`${bannerImgUrl}/h5/img/home-page/app-download-banner.png`}
							alt="home-app-download"
						/>
						<div className="app-btn-content">
							<div className="app-android">
								<button className="btn-app">
									<i className="icon-android" />
									{t("lbl_Home_Android")}
								</button>
								<a
									className="instructions"
									href={`/${userInfo.langId}/${path.appDownload.root}`}>
									{t("lbl_Home_Instructions")}
								</a>
							</div>
							<div className="app-ios">
								<button className="btn-app">
									<i className="icon-apple" />
									{t("lbl_Home_Apple")}
								</button>
								<a
									className="instructions"
									href={`/${userInfo.langId}/${path.appDownload.root}`}>
									{t("lbl_Home_Instructions")}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeAppDownload;
