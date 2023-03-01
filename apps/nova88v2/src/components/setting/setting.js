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
import TandC from "../../service/t_and_c";
import { getLeaderBoardSupportCurrencyId } from "../ranking/def";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

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
			navigate(`/${userInfo.langId}`);
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
				{allowedCurrencyList.VIP.includes(_currencyId) && (
					<div>
						<Link
							className="title icon icon-medal"
							to={path.vip.root}>
							{i18n.lbl_VIP}
						</Link>
					</div>
				)}
				{allowedCurrencyList.rewards.includes(_currencyId) && (
					<div>
						<a
							className="title icon icon-star-full"
							href={`${SiteURL.openURL}/rewards/`}
							target="_blank"
							rel="noreferrer">
							{i18n.lbl_Rewards}
							<img
								src={`${cloudBannerImgURL}/h5/img/88rewards.png`}
								alt="Rewards"
							/>
						</a>
					</div>
				)}
				{/* <div>
					<Link
						className="title icon icon-film"
						to={path.streaming.root}>
						{i18n.lbl_LiveStreaming}
					</Link>
				</div> */}
				{getLeaderBoardSupportCurrencyId().includes(_currencyId) && (
					<div>
						<Link
							className="title icon icon-trophy"
							to={path.ranking.root}>
							{i18n.lbl_Ranking}
						</Link>
					</div>
				)}
				{allowedCurrencyList.affiliate.includes(_currencyId) && (
					<div>
						<a
							className="title icon icon-affiliate"
							href={siteInfo(userInfo.langId).affiliateLink}>
							{i18n.lbl_Affiliate}
						</a>
					</div>
				)}
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
						href={TandC(userInfo.langId).OurPolicies}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_ResposibleGaming}
					</a>
					<a
						href={TandC(userInfo.langId).terms}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_TermsConditions}
					</a>
					<a
						href={TandC(userInfo.langId).PrivacyPolicy}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_PrivacyPolicy}
					</a>
					<a
						href={TandC(userInfo.langId).CookiePolicy}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_CookiePolicy}
					</a>
				</Card>
				<Card btnTitle={i18n.lbl_HelpSupport} btnClass="icon-question">
					<a
						href={TandC(userInfo.langId).RuleRegulations}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_RuleRegulations}
					</a>
					<a
						href={TandC(userInfo.langId).AccountTerms}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_AccountTerms}
					</a>
					<a
						href={TandC(userInfo.langId).FAQ}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_FAQ}
					</a>
				</Card>
				<Card
					btnTitle={siteInfo(userInfo.langId).siteName}
					btnClass="icon-nova88">
					<a
						href={TandC(userInfo.langId).AboutUs}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_AboutUs}
					</a>
					<a
						href={`${siteInfo(userInfo.langId).affiliateLink}`}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_Affiliate}
					</a>
					<Link to={path.contactUs.root}>{i18n.lbl_ContactUs}</Link>
					<a
						href={TandC(userInfo.langId).Terms}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_Terms}
					</a>
					<Link to={path.gameProvider.root}>
						{i18n.ibi_GameProvider}
					</Link>
				</Card>
				{/* <Card btnTitle={i18n.lbl_SocialMedia} btnClass="icon-facebook2">
					<a
						href={`${
							siteInfo(userInfo.langId).socialMedia.fb.link
						}`}
						target="_blank"
						rel="noreferrer noopener">
						Facebook
					</a>
					<a
						href={`${
							siteInfo(userInfo.langId).socialMedia.twitter.link
						}`}
						target="_blank"
						rel="noreferrer noopener">
						Twitter
					</a>
					<a
						href={`${
							siteInfo(userInfo.langId).socialMedia.ig.link
						}`}
						target="_blank"
						rel="noreferrer noopener">
						Instagram
					</a>
				</Card> */}
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
