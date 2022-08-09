import React, { useContext } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import { i18nContext, userInfoContext } from "../common/context";
import Header from "../header/header";
import path from "../../path";
import { Link } from "../../route/link";
import Footer from "../common/footer";
import useGetSocialChannel, {
	defDisplayPage,
	channelIcon,
	defLinkType
} from "../hook/useGetSocialChannel";
import { langToCurrency } from "../common/common";

const ContactUs = ({ langId, currencyId }) => {
	const { socialChannel } = useGetSocialChannel({
		langId,
		currencyId: currencyId ?? langToCurrency[langId],
		displayPage: defDisplayPage.ContactUs
	});

	const snsList = socialChannel?.map(el => (
		<a href={el.link} target="_blank" rel="noreferrer noopener">
			<i className={channelIcon[el.channelName]} />
			<div>{el.channelName}</div>
			{el.linkType === defLinkType.qrCode && (
				<QRCode
					className="qrCode"
					id={`qrCode-${el.channelName}`}
					value={el.link}
				/>
			)}
		</a>
	));

	return snsList;
};

ContactUs.propTypes = {
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
