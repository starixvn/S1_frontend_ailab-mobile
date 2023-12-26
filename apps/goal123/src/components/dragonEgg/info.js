import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const Info = () => {
	const { t } = useTranslation();

	return (
		<div className="event-info">
			<div className="title">{t("lbl_DragonEgg_Terms&Conditions")}</div>
			{Array.from({ length: 16 }, (_, i) => i + 1).map(i => (
				<div className="text">- {t(`lbl_DragonEgg_Terms${i}`)}</div>
			))}

			<div className="title">{t("lbl_DragonEgg_Sponsor")}</div>
			<div className="sponsor">
				<div>
					<img
						src={`${bannerImgUrl}/h5/img/event/dragonegg/sponsors_ap_logo.png`}
						alt="sponsors_ap_logo"
					/>
				</div>
				<div>
					<img
						src={`${bannerImgUrl}/h5/img/event/dragonegg/sponsors_pp_logo.png`}
						alt="sponsors_pp_logo"
					/>
				</div>
			</div>
		</div>
	);
};

export default Info;
