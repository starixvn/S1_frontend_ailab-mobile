import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";
import Header from "../header/header";
import path from "../../path";
import { Link } from "../../route/link";
import lineQRCode from "../../styles/img/line.jpg";
import Footer from "../common/footer";
import { cloudBannerImgURL } from "../../config";

const ContactUs = ({ i18n }) => {
	return (
		<>
			<a
				href="https://direct.lc.chat/11638088/"
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-chat" />
				<div>{i18n.lbl_LiveChat}</div>
			</a>
			<a
				href="https://www.facebook.com/nova88official/"
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-facebook" />
				<div>
					{i18n.lbl_Facebook}
					<div className="text-org">NOVA88official</div>
				</div>
			</a>
			<a
				href="https://www.instagram.com/nova88_official/"
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-instagram" />
				<div>
					{i18n.lbl_Instagram}
					<div className="text-org">NOVA88official</div>
				</div>
			</a>
			<a
				href="https://twitter.com/Nova88official/"
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-twitter" />
				<div>
					{i18n.lbl_Twitter}
					<div className="text-org">NOVA88official</div>
				</div>
			</a>
			<a
				href="https://t.me/Nova88Support1"
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-telegram" />
				<div>
					{i18n.lbl_Telegram}

					<div className="text-org">NOVA88official</div>
				</div>
			</a>
			<a
				href="mailto:support@nova88.com"
				target="_blank"
				rel="noreferrer noopener">
				<i className="icon icon-envelope" />
				<div>
					{i18n.lbl_Email}

					<div className="text-org">NOVA88official</div>
				</div>
			</a>
			<div>
				<img src={lineQRCode} alt="Line QR Code" />
				<div>Line</div>
			</div>
			{/* <div>
				<img
					src={`${cloudBannerImgURL}/img/whatsapp.jpg`}
					alt="Whatsapp QR Code"
				/>
				<div>Whatsapp</div>
			</div> */}
		</>
	);
};

ContactUs.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);

	const link = (
		<Link to={path.setting.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);

	return (
		<>
			<Header title={i18n.lbl_ContactUs} hideLogo={true} link={link} />
			<main className="main contact">
				<ContactUs i18n={i18n} />
			</main>
			<Footer />
		</>
	);
};

export default IndexPage;
