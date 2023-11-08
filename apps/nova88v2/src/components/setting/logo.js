import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@Router";
import path from "../../path";
import { cloudBannerImgURL } from "../../config";

const Logo = () => {
	const { t } = useTranslation();

	return (
		<>
			<Link className="close-btn" to={path.home.root}>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/close-icon.png`}
					alt="close"
				/>
			</Link>
			<Link to={path.home.root}>
				<div className="menu-logo">
					<div>{t("lbl_setting_WelcomeTo")}</div>
					<div>
						NOVA<span>88</span>
					</div>
				</div>
			</Link>
		</>
	);
};

export default Logo;
