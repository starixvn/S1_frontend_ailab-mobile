import React from "react";
import { useTranslation } from "react-i18next";

export const StreamingNoData = () => {
	const { t } = useTranslation();
	return (
		<div className="nodata icon icon-nodata">
			<div className="txt-white">{t("msg_NoData")}</div>
		</div>
	);
};
