import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "apps/goal123/src/config";
import t_and_c from "apps/goal123/src/service/t_and_c";
import { userInfoContext } from "../../common/context";

const MenuPolicyInfo = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
	const [isHelpOpen, setIsHelpOpen] = useState(false);
	const [isGoal123Open, setIsGoal123Open] = useState(false);

	const togglePolicies = () => {
		setIsPoliciesOpen(!isPoliciesOpen);
	};

	const toggleHelp = () => {
		setIsHelpOpen(!isHelpOpen);
	};

	const toggleGoal123 = () => {
		setIsGoal123Open(!isGoal123Open);
	};

	return (
		<div className="menu-info">
			{/* Our policies */}
			<div
				className={`info-item ${isPoliciesOpen ? "active" : ""}`}
				onClick={togglePolicies}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-policies.svg`}
					alt="menu-policies"
				/>
				<span>{t("Label_Menu_Our_Policies")}</span>
			</div>
			{/* Our policies下展內容 */}
			{isPoliciesOpen && (
				<div className="inner">
					<a
						href={t_and_c(userInfo.langId).OurPolicies}
						target="_blank"
						rel="noreferrer">
						{t("lbl_ResposibleGaming")}
					</a>
					<a
						href={t_and_c(userInfo.langId).terms}
						target="_blank"
						rel="noreferrer">
						{t("lbl_TermsAndConditions")}
					</a>
					<a
						href={t_and_c(userInfo.langId).PrivacyPolicy}
						target="_blank"
						rel="noreferrer">
						{t("lbl_PrivacyPolicy")}
					</a>
					<a
						href={t_and_c(userInfo.langId).CookiePolicy}
						target="_blank"
						rel="noreferrer">
						{t("lbl_CookiePolicy")}
					</a>
				</div>
			)}
			{/* Help & Support */}
			<div
				className={`info-item ${isHelpOpen ? "active" : ""}`}
				onClick={toggleHelp}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-help.svg`}
					alt="menu-help"
				/>
				<span>{t("Label_Menu_Help_&_Support")}</span>
			</div>
			{/* Help & Support下展內容 */}
			{isHelpOpen && (
				<div className="inner">
					<a
						href={t_and_c(userInfo.langId).rule}
						target="_blank"
						rel="noreferrer">
						{t("lbl_RuleRegulations")}
					</a>
					<a
						href={t_and_c(userInfo.langId).Terms}
						target="_blank"
						rel="noreferrer">
						{t("lbl_AccountTerms")}
					</a>
					<a
						href={t_and_c(userInfo.langId).FAQ}
						target="_blank"
						rel="noreferrer">
						{t("lbl_FAQ")}
					</a>
					<a
						href={t_and_c(userInfo.langId).HowToDeposit}
						target="_blank"
						rel="noreferrer">
						{t("Label_Menu_HowToDeposit")}
					</a>
					<a
						href={t_and_c(userInfo.langId).HowToWithdraw}
						target="_blank"
						rel="noreferrer">
						{t("Label_Menu_HowToWithDraw")}
					</a>
				</div>
			)}

			{/* Goal123 info */}
			<div
				className={`info-item ${isGoal123Open ? "active" : ""}`}
				onClick={toggleGoal123}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-gola123.svg`}
					alt="menu-goal123"
				/>
				<span>{t("Label_Menu_Goal123")}</span>
			</div>
			{/* Goal123 info下展內容 */}
			{isGoal123Open && (
				<div className="inner">
					<a
						href={t_and_c(userInfo.langId).AboutUs}
						target="_blank"
						rel="noreferrer">
						{t("Label_Menu_About_Us")}
					</a>
					<a
						href={t_and_c(userInfo.langId).terms}
						target="_blank"
						rel="noreferrer">
						{t("Label_Menu_Terms_Of_Use")}
					</a>
					<a
						href={t_and_c(userInfo.langId).ContactUs}
						target="_blank"
						rel="noreferrer">
						{t("Label_Menu_Contact_Us")}
					</a>
				</div>
			)}
		</div>
	);
};

export default MenuPolicyInfo;
