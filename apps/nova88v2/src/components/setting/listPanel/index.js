import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { Link } from "@Router";
import { useNavigate } from "@reach/router";
import { navContext, userInfoContext } from "Context";
import path from "../../../path";
import { LOGOUT } from "../../../service/auth";
import { cloudBannerImgURL } from "../../../config";
import { defCurrenyId, getCombineLangId } from "../../common/common";
import Item from "./listPanelItem";
import LanguageList from "./languages";

const ListPanel = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { setNav } = useContext(navContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { isLogin, langId, currencyId } = userInfo;

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
			navigate(`/${langId}`);
			localStorage.removeItem("favorite");
		});
	};

	return (
		<div className="menu-bottom">
			<Item defaultOpen title={t("lbl_Languages")} imgText="languages">
				<div className="option">
					<div className="option-item">
						<LanguageList />
					</div>
				</div>
			</Item>

			<Item title={t("lbl_OurPolicies")} imgText="policies">
				<div className="option">
					<div className="option-item">
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/ResposibleGaming.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_ResposibleGaming")}
						</a>
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/TermsConditions.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_TermsConditions")}
						</a>
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/PrivacyPolicy.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_PrivacyPolicy")}
						</a>
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/CookiePolicy.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_CookiePolicy")}
						</a>
					</div>
				</div>
			</Item>

			<Item title={t("lbl_HelpSupport")} imgText="help">
				<div className="option">
					<div className="option-item">
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/RulesandRegulations.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_RuleRegulations")}
						</a>
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/AccountTerms.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_AccountTerms")}
						</a>
						{currencyId !== defCurrenyId.KHM && (
							<a
								href={`${cloudBannerImgURL}/Static/${getCombineLangId(
									langId,
									currencyId
								)}/FAQ.html`}
								rel="noopener noreferrer"
								target="_blank">
								{t("lbl_FAQ")}
							</a>
						)}
					</div>
				</div>
			</Item>

			<Item title="Nova88" imgText="nova88">
				<div className="option">
					<div className="option-item">
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/AboutUs.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_AboutUs")}
						</a>
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/Terms.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_Terms")}
						</a>
						<a
							href={`${cloudBannerImgURL}/Static/${getCombineLangId(
								langId,
								currencyId
							)}/ContactUs.html`}
							rel="noopener noreferrer"
							target="_blank">
							{t("lbl_ContactUs")}
						</a>
						<Link to={path.gameProvider.root}>
							{t("ibi_GameProvider")}
						</Link>
					</div>
				</div>
			</Item>
			{isLogin && (
				<button className="btn-logout" onClick={handleLogout}>
					{t("lbl_Logout")}
				</button>
			)}
		</div>
	);
};

export default ListPanel;
