import React from "react";
import { useTranslation } from "react-i18next";

/** 規則表示 */
const LeaderboardTerm = () => {
	const { t } = useTranslation();
	return (
		<div className="info-term">
			<div className="title">{t("lbl_TermTitle")}</div>
			<div className="term-content">
				<ul>
					<li>{t("lbl_Term_1")}</li>
					<li>{t("lbl_Term_2")}</li>
					<li>{t("lbl_Term_3")}</li>
				</ul>
			</div>
		</div>
	);
};

/** 規則表示 */
export default LeaderboardTerm;
