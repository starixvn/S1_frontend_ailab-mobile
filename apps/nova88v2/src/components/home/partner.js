import React from "react";
import { useTranslation } from "react-i18next";
import { cloudBannerImgURL } from "../../config";

const Partner = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className="home-partner-title">
				{t("Label_Home_OurOfficialPartnerOf")}
			</div>
			<div className="home-partner">
				<div className="home-partner-content">
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/sp-sevilla.png`}
						alt="Sevilla FC"
					/>
					<div>
						<div>Sevilla FC</div>
						<div>{t("Label_Home_OfficialAsianBettingPartner")}</div>
						<div>2023-2024</div>
					</div>
				</div>
				<div className="home-partner-content">
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/sp-inter-milan.png`}
						alt="Inter Milan"
					/>
					<div>
						<div>Inter Milan</div>
						<div>{t("Label_Home_OfficialAsiaRegionalPartner")}</div>
						<div>2023-2024</div>
					</div>
				</div>
			</div>
		</>
	);
};

export { Partner };
