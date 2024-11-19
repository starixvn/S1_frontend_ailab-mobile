import React from "react";
import { useTranslation } from "react-i18next";
import NotificationSetting from "./NotificationSetting";
import ChangePasswordForm from "./ChangePasswordForm";

const Setting = () => {
	const { t } = useTranslation();
	return (
		<section className="inside">
			<div className="setting-container">
				<div className="setting-content">
					<div className="setting-title">
						{t("lbl_General_DepositWithdrawlNotification")}
					</div>
				</div>
				<NotificationSetting />
				<div className="bottom-line" />
			</div>
			<div className="setting-container">
				<div className="setting-title">{t("lbl_ChangePassword")}</div>
				<div className="setting-tip">
					{t("lbl_ProfileModifyWarning")}
				</div>
				<ChangePasswordForm />
			</div>
		</section>
	);
};

export default Setting;
