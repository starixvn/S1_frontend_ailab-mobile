import React from "react";
import config, { siteInfo } from "../../config";
import TandC from "../../service/t_and_c";
import Bong88 from "../../styles/img/bong88.png";

export default ({ i18n, langId }) => {
	return (
		<>
			<Affiliates i18n={i18n} langId={langId} />
			<UserGuide i18n={i18n} langId={langId} />
			<ContactUs i18n={i18n} langId={langId} />
			<Platforms i18n={i18n} />
		</>
	);
};

const Affiliates = ({ i18n, langId }) => {
	return (
		<div className="affiliates">
			<p className="affiliates__title lightBTitle">
				{i18n.lbl_Affiliates?.toUpperCase()}
			</p>
			<a
				href={siteInfo(langId).affiliateLink}
				target="_blank"
				rel="noreferrer"
				className="icon icon-affiliatesBtnIcon">
				<span>{i18n.lbl_JoinUsNow}</span>
			</a>
		</div>
	);
};

const UserGuide = ({ i18n, langId }) => {
	return (
		<div className="userGuide">
			<p className="userGuide__title lightBTitle">
				{i18n.lbl_UserGuide?.toUpperCase()}
			</p>
			<div className="userGuide-box">
				<div className="userGuide-box__top">
					<a
						href={TandC(langId).HowToDeposit}
						target="_blank"
						className="icon icon-GUIDE1">
						<span>{i18n.lbl_HowToDepoist}</span>
					</a>
					<a
						href={TandC(langId).HowToBet}
						target="_blank"
						className="icon icon-GUIDE4">
						<span>{i18n.lbl_HowToPlay}</span>
					</a>
				</div>
				<div className="userGuide-box__top userGuide-box__bottom">
					<a
						href={TandC(langId).HowToWithdraw}
						target="_blank"
						className="icon icon-GUIDE2">
						<span>{i18n.lbl_HowToWithdraw}</span>
					</a>
					<a
						href={TandC(langId).FAQ}
						target="_blank"
						className="icon icon-GUIDE3">
						<span>{i18n.lbl_FAQ}</span>
					</a>
				</div>
			</div>
		</div>
	);
};

const ContactUs = ({ i18n, langId }) => {
	return (
		<div className="contact">
			<p className="contact__title lightBTitle">
				{i18n.lbl_ContactUs?.toUpperCase()}
			</p>
			<div className="contact-box">
				<a
					href={siteInfo(langId).skypeId}
					target="_blank"
					className="icon icon-contactUS6"></a>
				<a
					href={siteInfo(langId).telegramId}
					target="_blank"
					className="icon icon-contactUS3"></a>
				<a
					href={siteInfo(langId).zaloId}
					target="_blank"
					className="icon icon-zalo"></a>
				<a
					href={siteInfo(langId).facebookId}
					target="_blank"
					className="icon icon-contactUS1"></a>
				<a
					href={siteInfo(langId).twitterId}
					target="_blank"
					className="icon icon-contactUS2"></a>
				<a
					href={siteInfo(langId).youtubeId}
					target="_blank"
					className="icon icon-youtube"></a>
				<a
					href={siteInfo(langId).tiktokId}
					target="_blank"
					className="icon icon-tiktok"></a>
			</div>
		</div>
	);
};

const defPlatform = [
	"saba",
	"ab",
	"yl",
	"ag",
	"gp",
	"dg",
	"sa",
	"yg",
	"pp",
	"sg",
	"pg",
	"ae",
	"wm"
];

const Platforms = ({ i18n }) => {
	const platformRows = defPlatform.map(item => {
		return (
			<img
				key={`platform-${item}`}
				alt="logo"
				src={`${config.imgUrl}/common/images/logo/${item}.png`}
			/>
		);
	});

	return (
		<>
			<div className="partner">
				<div className="partner-bar">{platformRows}</div>
				<span>{i18n.lbl_PoweredBy?.toUpperCase()}</span>
				<img src={Bong88} alt="" />
			</div>
			<div className="copyright">
				<span>© COPYRIGHT 2020. BWING. ALL RIGHTS RESERVED.</span>
			</div>
		</>
	);
};
