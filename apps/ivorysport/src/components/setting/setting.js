import React, { useContext, useState } from "react";
import { Link } from "@Router";
import { useNavigate } from "@reach/router";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	navContext,
	msgCountContext
} from "../common/context";
import LangPanel from "./setting.langPanel";
import { LOGOUT } from "../../service/auth";
// import ThemeMode from "./setting.themeMode";
import path from "../../path";
import SiteURL, { siteInfo, cloudBannerImgURL } from "../../config";
import { getLeaderBoardSupportCurrencyId } from "../ranking/def";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import { getCombineLangId, defCurrenyId } from "../common/common";
import { getCurrencyLink } from "../../datas/productList";

const BtnBar = ({ isLogin, i18n, msgCount, langId }) => {
	return isLogin ? (
		<div className="tag">
			<Link to={path.profile.root} className="icon icon-member">
				{i18n.lbl_Profile}
			</Link>
			<i />
			<Link to={path.message.root} className="icon icon-email">
				{i18n.lbl_Message}
				{msgCount ? (
					<i className="quantity">
						{msgCount <= 99 ? msgCount : "99+"}
					</i>
				) : null}
			</Link>
		</div>
	) : (
		<div className="tag">
			<Link
				state={{ previousPage: `/${langId}/setting` }}
				to={path.join.root}>
				{i18n.lbl_JoinNow}
			</Link>
			<i />
			<Link
				state={{ previousPage: `/${langId}/setting` }}
				to={path.login.root}>
				{i18n.lbl_Login}
			</Link>
		</div>
	);
};

BtnBar.defaultProps = {
	isLogin: false,
	msgCount: 0,
	langId: null
};

BtnBar.propTypes = {
	isLogin: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	msgCount: PropTypes.number,
	langId: PropTypes.string
};

const Card = ({ children, btnTitle, btnClass, defaultOpen }) => {
	const _defaultOpen = defaultOpen ? "active" : "";
	const [open, setOpen] = useState(_defaultOpen);
	const openToggler = () => {
		setOpen(prev => (prev === "" ? "active" : ""));
	};

	return (
		<div>
			<button
				onClick={openToggler}
				className={`title icon ${btnClass} ${open}`}>
				{btnTitle}
				<i className="icon icon-keyboard_arrow_down" />
			</button>
			{children}
		</div>
	);
};

Card.defaultProps = {
	children: null,
	btnTitle: null,
	btnClass: null,
	defaultOpen: null
};

Card.propTypes = {
	children: PropTypes.node,
	btnTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	btnClass: PropTypes.string,
	defaultOpen: PropTypes.bool
};

export default () => {
	const navigate = useNavigate();
	const { msgCount } = useContext(msgCountContext);
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const _currencyId = userInfo.currencyId;

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
			navigate(`/en`);
			localStorage.removeItem("favorite");
		});
	};

	return (
		<>
			<BtnBar
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				i18n={i18n}
				msgCount={msgCount}
			/>
			<div className="accordion">
				{userInfo.isLogin === true ? (
					<div>
						<Link
							className="title icon icon-person"
							to={path.myAccount.root}>
							{i18n.lbl_MyAccount}
						</Link>
					</div>
				) : null}

				<Card
					btnTitle={i18n.lbl_Languages}
					btnClass="icon-sphere"
					defaultOpen={true}>
					{/* <ThemeMode /> */}
					<LangPanel
						userInfo={userInfo}
						setUserInfo={setUserInfo}
						i18n={i18n}
					/>
				</Card>
				<Card btnTitle={i18n.lbl_OurPolicies} btnClass="icon-policies">
					<a
						href={`${cloudBannerImgURL}/Static/en/ResposibleGaming.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_ResposibleGaming}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/en/TermsConditions.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_TermsConditions}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/en/PrivacyPolicy.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_PrivacyPolicy}
					</a>
				</Card>
				<Card btnTitle={i18n.lbl_HelpSupport} btnClass="icon-question">
					<a
						href={`${cloudBannerImgURL}/Static/en/RulesandRegulations.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_RuleRegulations}
					</a>
					<a
						href={`${cloudBannerImgURL}/Static/en/AccountTerms.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_AccountTerms}
					</a>

					<a
						href={`${cloudBannerImgURL}/Static/en/FAQ.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_FAQ}
					</a>
				</Card>
				<Card
					btnTitle={siteInfo(userInfo.langId).siteName}
					btnClass="icon-nova88">
					<a
						href={`${cloudBannerImgURL}/Static/en/AboutUs.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_AboutUs}
					</a>

					<a
						href={`${cloudBannerImgURL}/Static/en/Terms.html`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_Terms}
					</a>
				</Card>
				{userInfo.isLogin ? (
					<div>
						<button
							className="title icon icon-exit"
							onClick={handleLogout}>
							{i18n.lbl_Logout}
						</button>
					</div>
				) : null}
			</div>
		</>
	);
};
