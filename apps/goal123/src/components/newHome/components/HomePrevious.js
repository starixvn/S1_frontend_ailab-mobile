import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../../config";

const HomePrevious = () => {
	const { t } = useTranslation();
	return (
		<div className="home-previous">
			<div className="home-title">{t("label_ExBrandAmbassadors")}</div>
			<div className="previous">
				<div className="item">
					<div className="previous-img">
						<img
							src={`${bannerImgUrl}/h5/img/home-page/previous-partner/ambassador-1.png`}
							alt="ambassador"
						/>
					</div>
					<ul className="previous-text">
						<li className="previous-name">Michael Ballack</li>
						<li className="previous-designation">
							goal123 brand ambassador
						</li>
						<li className="previous-period">2023-2024</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomePrevious;
