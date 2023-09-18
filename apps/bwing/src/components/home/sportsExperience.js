import React from "react";
import { useTranslation } from "react-i18next";

const SportsExperience = () => {
	const { t } = useTranslation();
	return (
		<>
			<div className="home-title">
				<i className="icon-soccer" />
				{t("lbl_Fabulous_Sports_Experience")}
			</div>
			<div className="home-match mb-2"></div>
		</>
	);
};

export default SportsExperience;
