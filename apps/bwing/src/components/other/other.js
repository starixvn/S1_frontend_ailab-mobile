import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { userInfoContext, i18nContext } from "../common/context";
import TandC from "../../service/t_and_c";
import { bannerImgUrl, siteInfo } from "../../config";
import useGetSocialChannel, {
	defDisplayPage
} from "../hook/useGetSocialChannel";
import path from "../../path";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [isShowSelected, setIsShowSelected] = useState([]);

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Footer
	});

	const handleClick = ({ label, active }) => {
		if (isShowSelected.some(item => item.label === label)) {
			setIsShowSelected(prevState =>
				prevState.filter(item => item.label !== label)
			);
		} else {
			setIsShowSelected(prevState => [...prevState, { label, active }]);
		}
	};

	const snsArr = socialChannel.map(el => (
		<a
			key={`channel-${el?.channelName}`}
			className="page-submenu-item"
			href={el.link}
			target="_blank"
			rel="noreferrer">
			<img src={el?.socialChannelLogoLink} alt="" />
			{el?.channelName}
		</a>
	));

	return (
		<div className="wrapper">
			<div className="col-12">
				<div className="page-menu">
					{/* User Guide */}
					<button
						className="page-menu-item"
						onClick={() =>
							handleClick({ label: "UserGuide", active: true })
						}>
						<div>{i18n.lbl_UserGuide?.toUpperCase()}</div>
						<i
							className={`icon-arrow ${
								isShowSelected?.find(
									item => item.label === "UserGuide"
								)?.active
									? "active"
									: ""
							}`}
						/>
					</button>
					<div
						className={`page-submenu ${
							isShowSelected?.find(
								item => item.label === "UserGuide"
							)?.active
								? "active"
								: ""
						}`}>
						<a
							className="page-submenu-item"
							href={`${bannerImgUrl}/Static/images/How_To_Deposit.mp4`}
							target="_blank"
							rel="noreferrer">
							{i18n.lbl_HowToDepoist}
						</a>
						<Link
							className="page-submenu-item"
							to={`/${path.howToPlay.root}`}>
							{i18n.lbl_HowToPlay}
						</Link>
						<Link
							className="page-submenu-item"
							to={`/${path.howToWithdraw.root}`}>
							{i18n.lbl_HowToWithdrawal}
						</Link>
						<a
							href={TandC(userInfo.langId).FAQ}
							target="_blank"
							className="page-submenu-item"
							rel="noreferrer">
							{i18n.lbl_FAQ}
						</a>
					</div>
					{/* Our Policy */}
					<button
						className="page-menu-item"
						onClick={() =>
							handleClick({ label: "OurPolicy", active: true })
						}>
						<div>{i18n.lbl_OurPolicies}</div>
						<i
							className={`icon-arrow ${
								isShowSelected?.find(
									item => item.label === "OurPolicy"
								)?.active
									? "active"
									: ""
							}`}
						/>
					</button>
					<div
						className={`page-submenu ${
							isShowSelected?.find(
								item => item.label === "OurPolicy"
							)?.active
								? "active"
								: ""
						}`}>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).OurPolicies}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_ResposibleGaming}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).terms}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_TermsConditions}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).PrivacyPolicy}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_PrivacyPolicy}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).CookiePolicy}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_CookiePolicy}
						</a>
					</div>
					{/* Help & Support */}
					<button
						className="page-menu-item"
						onClick={() =>
							handleClick({
								label: "HelpAndSupport",
								active: true
							})
						}>
						<div>{i18n.lbl_HelpSupport}</div>
						<i
							className={`icon-arrow ${
								isShowSelected?.find(
									item => item.label === "HelpAndSupport"
								)?.active
									? "active"
									: ""
							}`}
						/>
					</button>
					<div
						className={`page-submenu ${
							isShowSelected?.find(
								item => item.label === "HelpAndSupport"
							)?.active
								? "active"
								: ""
						}`}>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).RuleRegulations}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_RuleRegulations}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).AccountTerms}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_AccountTerms}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).FAQ}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_FAQ}
						</a>
					</div>
					{/* Bwing */}
					<button
						className="page-menu-item"
						onClick={() =>
							handleClick({ label: "bwing", active: true })
						}>
						<div>{i18n.lbl_Title}</div>
						<i
							className={`icon-arrow ${
								isShowSelected?.find(
									item => item.label === "bwing"
								)?.active
									? "active"
									: ""
							}`}
						/>
					</button>
					<div
						className={`page-submenu ${
							isShowSelected?.find(item => item.label === "bwing")
								?.active
								? "active"
								: ""
						}`}>
						<a
							className="page-submenu-item"
							href={siteInfo(userInfo.langId).affiliateLink}
							rel="noopener noreferrer"
							target="_blank">
							{" "}
							{i18n.lbl_Affiliates?.toUpperCase()}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).AboutUs}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_AboutUs}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).ContactUs}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_ContactUs}
						</a>
						<a
							className="page-submenu-item"
							href={TandC(userInfo.langId).CookiePolicy}
							rel="noopener noreferrer"
							target="_blank">
							{i18n.lbl_CookiePolicy}
						</a>
					</div>
					{/* Social Media */}
					{socialChannel.length > 0 && (
						<button
							className="page-menu-item"
							onClick={() =>
								handleClick({
									label: "socialMedia",
									active: true
								})
							}>
							<div>{i18n.lbl_SocialMedia}</div>
							<i
								className={`icon-arrow ${
									isShowSelected?.find(
										item => item.label === "socialMedia"
									)?.active
										? "active"
										: ""
								}`}
							/>
						</button>
					)}
					<div
						className={`page-submenu ${
							isShowSelected?.find(
								item => item.label === "socialMedia"
							)?.active
								? "active"
								: ""
						}`}>
						{snsArr}
					</div>
				</div>
			</div>
		</div>
	);
};
