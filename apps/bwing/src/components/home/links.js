import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "@reach/router";
import { siteInfo, bannerImgUrl } from "../../config";
import TandC from "../../service/t_and_c";
import path from "../../path";
import { useAppDownLoad } from "../appDownload/useAppDownLoad";
import useGetSocialChannel, {
	defDisplayPage,
	channelIcon
} from "../hook/useGetSocialChannel";
import { defPlatform } from "./def";

const Panel = ({ i18n, langId }) => {
	return (
		<>
			<AppDownload i18n={i18n} langId={langId} />
			<Affiliates i18n={i18n} langId={langId} />
			<UserGuide i18n={i18n} langId={langId} />
			<ContactUs i18n={i18n} langId={langId} />
			<Platforms i18n={i18n} />
		</>
	);
};

Panel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
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

Affiliates.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
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
						href={`${bannerImgUrl}/Static/images/How_To_Deposit.mp4`}
						target="_blank"
						rel="noreferrer">
						<span>{i18n.lbl_HowToDepoist}</span>
					</a>
					<Link
						className="icon icon-GUIDE4"
						to={`/${path.howToPlay.root}`}>
						<span>{i18n.lbl_HowToPlay}</span>
					</Link>
				</div>
				<div className="userGuide-box__top userGuide-box__bottom">
					<Link
						className="icon icon-GUIDE2"
						to={`/${path.howToWithdraw.root}`}>
						<span>{i18n.lbl_HowToWithdrawal}</span>
					</Link>
					<a
						href={TandC(langId).FAQ}
						target="_blank"
						className="icon icon-GUIDE3"
						rel="noreferrer">
						<span>{i18n.lbl_FAQ}</span>
					</a>
				</div>
			</div>
		</div>
	);
};

UserGuide.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

const ContactUs = ({ i18n, langId }) => {
	const { socialChannel } = useGetSocialChannel({
		langId,
		displayPage: defDisplayPage.Footer
	});

	const snsArr = socialChannel.map(el => (
		<a
			key={`channel-${el.channelName}`}
			className={channelIcon[el.channelName]}
			href={el.link}
			target="_blank"
			rel="noreferrer noopener"
		/>
	));

	return (
		socialChannel.length > 0 && (
			<div className="contact">
				<p className="contact__title lightBTitle">
					{i18n.lbl_ContactUs?.toUpperCase()}
				</p>
				<div className="contact-box">
					{snsArr}
					{/* <a
						href={siteInfo(langId).tiktokId}
						target="_blank"
						className="icon icon-tiktok"
						rel="noreferrer"
					/> */}
				</div>
			</div>
		)
	);
};

ContactUs.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

const Platforms = ({ i18n }) => {
	const platformRows = defPlatform.map(item => {
		return (
			<img key={`platform-${item.name}`} alt={item.name} src={item.img} />
		);
	});

	return (
		<>
			<div className="partner">
				<div className="partner-bar">{platformRows}</div>
				<span>{i18n.lbl_PoweredBy?.toUpperCase()}</span>
				<img src={`${bannerImgUrl}/h5/img/bong88.png`} alt="" />
			</div>
			<div className="copyright">
				<span>{`© COPYRIGHT ${new Date().getFullYear()}. BWING. ALL RIGHTS RESERVED.`}</span>
			</div>
		</>
	);
};

Platforms.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

const AppDownload = () => {
	const navigate = useNavigate();
	const { appLinkDatas } = useAppDownLoad();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<div
			className="downloadarea"
			onClick={() => navigate(`/${path.appDownload.root}`)}>
			{andriodDownLoadUrl && (
				<a
					onClick={e => e.stopPropagation()}
					href={andriodDownLoadUrl}
					target="_blank"
					rel="noreferrer">
					<img
						src={`${bannerImgUrl}/h5/img/androidIcon.png`}
						alt="android icon"
					/>
					Android
				</a>
			)}

			{IOSDownloadUrl && (
				<a
					onClick={e => e.stopPropagation()}
					href={IOSDownloadUrl}
					target="_blank"
					rel="noreferrer">
					<img
						src={`${bannerImgUrl}/h5/img/iosIcon.png`}
						alt="ios icon"
					/>
					iOS
				</a>
			)}
		</div>
	);
};

export default Panel;
