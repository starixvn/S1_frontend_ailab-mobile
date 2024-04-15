import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import config from "../../../config";

const HomeInfo = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="home-info">
			<div className="home-title">{t("lbl_InfoCenter")}</div>
			<a
				className="list"
				href={`${config.t_and_cURL}/Static/${userInfo.langId}/FAQ.html`}
				rel="noreferrer"
				target="_blank">
				<i className="icon-faq" />
				{t("lbl_FAQ")}
			</a>
			<a
				className="list"
				href={`${config.t_and_cURL}/Static/${userInfo.langId}/HowToDeposit.html`}
				rel="noreferrer"
				target="_blank">
				<i className="icon-deposit" />
				{t("lbl_HowToDepoist")}
			</a>
			<a
				className="list"
				href={`${config.t_and_cURL}/Static/${userInfo.langId}/HowToWithdrawal.html`}
				rel="noreferrer"
				target="_blank">
				<i className="icon-withdraw" />
				{t("lbl_HowToWithdraw")}
			</a>
		</div>
	);
};

export default HomeInfo;
