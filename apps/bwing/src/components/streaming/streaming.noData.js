import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

export const StreamingNoData = () => {
	const { t } = useTranslation();
	return (
		<div className="notv active">
			<img
				src={`${bannerImgUrl}/h5/img/notvicon.png`}
				alt="nostreaming"
			/>
			<p>{t("lbl_Streaming_NoData")}</p>
		</div>
	);
};
