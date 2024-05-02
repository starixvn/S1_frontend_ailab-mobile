import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const TopContent = () => {
	const { t } = useTranslation();
	return (
		<div className="top-wrapper">
			<div className="top-content">
				<img
					className="euro-logo"
					src={`${bannerImgUrl}/h5/img/event/eurocup/euro-logo.png`}
					alt="euro-logo"
				/>
				<div className="top-title">
					{t("lbl_CupEvent_MissionToTheGoldenCup")}
				</div>
				<div className="top-subtitle">
					<span>HOW TO PARTICIPATE</span>
				</div>
				<div className="top-step">
					<div>
						<div>{t("lbl_CupEvent_Step")} 1</div>
						<div>{t("lbl_CupEvent_Step_Desc1")}</div>
					</div>
					<div>
						<div>{t("lbl_CupEvent_Step")} 2</div>
						<div>{t("lbl_CupEvent_Step_Desc2")}</div>
					</div>
					<div>
						<div>{t("lbl_CupEvent_Step")} 3</div>
						<div>{t("lbl_CupEvent_Step_Desc3")}</div>
					</div>
					<div>
						<div>{t("lbl_CupEvent_Step")} 4</div>
						<div>{t("lbl_CupEvent_Step_Desc4")}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopContent;
