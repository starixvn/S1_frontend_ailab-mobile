import React from "react";
import { Link } from "@Router";
import { Trans, useTranslation } from "react-i18next";
import path from "../../path";
import { cloudBannerImgURL } from "../../config";
import { useAppDownLoad } from "../appDownload/useAppDownLoad";

const AppDownload = () => {
	const { t } = useTranslation();

	const { appLinkDatas } = useAppDownLoad();

	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";

	return (
		<div className="home-appdownload">
			<div className="home-appdownload-content">
				<div className="text">
					<div>{t("lbl_AppDownload")}</div>
					<div>
						<Trans
							i18nKey="Label_AppDownload_Title"
							components={{
								span: <span />
							}}
						/>
					</div>
					<div>{t("Label_AppDownload_SubTitle")}</div>
				</div>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/app.png`}
					alt="app download"
				/>
			</div>
			<div className="btn-download">
				<div>
					{IOSDownloadUrl && (
						<a href={IOSDownloadUrl} download>
							<button className="ios">
								<img
									src={`${cloudBannerImgURL}/h5/img/4.0/apple.png`}
									alt="iOS"
								/>
								{t("lbl_iOS")}
							</button>
						</a>
					)}
					<Link to={path.appDownload.root}>
						{t("Label_AppDownload_Instructions")}
					</Link>
				</div>
				<div>
					{andriodDownLoadUrl && (
						<a href={andriodDownLoadUrl} download>
							<button className="android">
								<img
									src={`${cloudBannerImgURL}/h5/img/4.0/android.png`}
									alt="android"
								/>
								{t("lbl_Android")}
							</button>
						</a>
					)}
					<Link to={path.appDownload.root}>
						{t("Label_AppDownload_Instructions")}
					</Link>
				</div>
			</div>
		</div>
	);
};

export { AppDownload };
