import React, { useContext } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import { i18nContext, userInfoContext } from "../common/context";
import Header from "../header/header";
import path from "../../path";
import { Link } from "../../route/link";
import Footer from "../common/footer";
import { cloudBannerImgURL } from "../../config";
import useGetSocialChannel, {
	defDisplayPage,
	defChannelName
} from "../hook/useGetSocialChannel";
import { langToCurrency } from "../common/common";

const ContactUs = ({ i18n, langId, currencyId }) => {
	const { socialChannel } = useGetSocialChannel({
		langId,
		currencyId: currencyId ?? langToCurrency[langId],
		displayPage: defDisplayPage.ContactUs
	});

	const getChannelByName = channelName =>
		socialChannel?.find(el => el.channelName === channelName);

	return (
		<>
			<a
				href={
					getChannelByName(defChannelName.LivaChat)?.link ??
					"https://direct.lc.chat/11638088/"
				}
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-chat" />
				<div>{i18n.lbl_LiveChat}</div>
			</a>
			<a
				href={
					getChannelByName(defChannelName.Facebook)?.link ??
					"https://www.facebook.com/nova88official/"
				}
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-facebook" />
				<div>
					{i18n.lbl_Facebook}
					<div className="text-org">
						{getChannelByName(defChannelName.Facebook)?.title ??
							"NOVA88official"}
					</div>
				</div>
			</a>
			<a
				href={
					getChannelByName(defChannelName.Instagram)?.link ??
					"https://www.instagram.com/nova88_official/"
				}
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-instagram" />
				<div>
					{i18n.lbl_Instagram}
					<div className="text-org">
						{getChannelByName(defChannelName.Instagram)?.title ??
							"NOVA88official"}
					</div>
				</div>
			</a>
			<a
				href={
					getChannelByName(defChannelName.Twitter)?.link ??
					"https://twitter.com/Nova88official/"
				}
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-twitter" />
				<div>
					{i18n.lbl_Twitter}
					<div className="text-org">
						{getChannelByName(defChannelName.Twitter)?.title ??
							"NOVA88official"}
					</div>
				</div>
			</a>
			<a
				href={
					getChannelByName(defChannelName.Telegram)?.link ??
					"https://t.me/Nova88Support1"
				}
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-telegram" />
				<div>
					{i18n.lbl_Telegram}

					<div className="text-org">
						{getChannelByName(defChannelName.Telegram)?.title ??
							"NOVA88official"}
					</div>
				</div>
			</a>
			<a
				href={
					getChannelByName(defChannelName.Email)?.link ??
					"mailto:support@nova88.com"
				}
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-envelope" />
				<div>
					{i18n.lbl_Email}
					<div className="text-org">
						{getChannelByName(defChannelName.Email)?.title ??
							"NOVA88official"}
					</div>
				</div>
			</a>
			<div>
				{getChannelByName(defChannelName.LINE)?.link ? (
					<QRCode
						className="qrCode"
						id="refQRcode"
						value={getChannelByName(defChannelName.LINE)?.link}
					/>
				) : (
					<img
						src={`${cloudBannerImgURL}/img/line.jpg`}
						alt="Line QR Code"
					/>
				)}
				<div>Line</div>
			</div>
			<div>
				{getChannelByName(defChannelName.WhatsApp)?.link ? (
					<QRCode
						className="qrCode"
						id="refQRcode"
						value={getChannelByName(defChannelName.WhatsApp)?.link}
					/>
				) : (
					<img
						src={`${cloudBannerImgURL}/img/whatsapp.jpg`}
						alt="Whatsapp QR Code"
					/>
				)}
				<div>Whatsapp</div>
			</div>
		</>
	);
};

ContactUs.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number.isRequired
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const link = (
		<Link to={path.setting.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);

	return (
		<>
			<Header title={i18n.lbl_ContactUs} hideLogo={true} link={link} />
			<main className="main contact">
				<ContactUs
					i18n={i18n}
					langId={userInfo.langId}
					currencyId={userInfo.currencyId}
				/>
			</main>
			<Footer />
		</>
	);
};

export default IndexPage;
