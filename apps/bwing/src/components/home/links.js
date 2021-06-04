import React from "react";
import { Link } from "@reach/router";
import config, { siteInfo } from "../../config";
import TandC from "../../service/t_and_c";
import Bong88 from "../../styles/img/bong88.png";
import path from "../../path";

export default ({ i18n, langId }) => {
	return (
		<>
			<AppDownload />
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
						className="icon icon-GUIDE1"
						href={`${config.t_and_cURL}/SiteSkin/Bwing/Static/Images/How_To_Deposit.mp4`}
						target="_blank"
						rel="noreferrer">
						<span>{i18n.lbl_HowToDepoist}</span>
					</a>
					<Link className="icon icon-GUIDE4" to={path.howToPlay.root}>
						<span>{i18n.lbl_HowToPlay}</span>
					</Link>
				</div>
				<div className="userGuide-box__top userGuide-box__bottom">
					<Link
						className="icon icon-GUIDE2"
						to={path.howToWithdraw.root}>
						<span>{i18n.lbl_HowToWithdrawal}</span>
					</Link>
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
					className="icon icon-contactUS6"
				/>
				<a
					href={siteInfo(langId).telegramId}
					target="_blank"
					className="icon icon-Telegram"
				/>
				<a
					href={siteInfo(langId).zaloId}
					target="_blank"
					className="icon icon-zalo"
				/>
				<a
					href={siteInfo(langId).facebookId}
					target="_blank"
					className="icon icon-contactUS1"
				/>
				<a
					href={siteInfo(langId).twitterId}
					target="_blank"
					className="icon icon-contactUS2"
				/>
				<a
					href={siteInfo(langId).youtubeId}
					target="_blank"
					className="icon icon-youtube"
				/>
				<a
					href={siteInfo(langId).tiktokId}
					target="_blank"
					className="icon icon-tiktok"
				/>
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
	"wm",
	"cq9",
	"one789",
	"icg",
	"v8",
	"n2live",
	"playtech",
	"bti"
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

const AppDownload = () => {
	return (
		<div className="downloadarea">
			{/* <a
				href="https://mars.fadatsai88.com/v1/App?path=bwing_sports_android.apk"
				target="_blank"
				rel="noreferrer"> */}
			<button>Android</button>
			{/* </a>
			<a
				href="https://nova.mqcfirm.com/"
				target="_blank"
				rel="noreferrer"> */}
			<button>iOS</button>
			{/* </a> */}
		</div>
	);
};
