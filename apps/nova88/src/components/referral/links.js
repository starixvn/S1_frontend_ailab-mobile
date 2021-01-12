import React from "react";
import PropTypes from "prop-types";

const Link = ({ refLink, i18n }) => {
	const socialLink = ({ socialMedia }) => {
		const links = {
			fb: `https://www.facebook.com/sharer/sharer.php?u=${refLink}&quote=${i18n.lbl_Referral_Welcome}`,
			whatsapp: `https://wa.me/?text=${i18n.lbl_Referral_Welcome} ${refLink}`,
			line: `http://line.naver.jp/R/msg/text/?${i18n.lbl_Referral_Welcome}%0D%0A${refLink}`,
			telegram: `https://t.me/share/url?url=${refLink}&text=${i18n.lbl_Referral_Welcome}`
		};

		return links[socialMedia];
	};

	return (
		<>
			<a
				className="icon icon-facebook2"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "fb" })}>
				Facebook
			</a>
			<a
				className="icon icon-whatsapp"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "whatsapp" })}>
				Whatsapp
			</a>
			<a
				className="icon icon-line"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "line" })}>
				Line
			</a>
			<a
				className="icon icon-telegram"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "telegram" })}>
				Telegram
			</a>
		</>
	);
};

Link.defaultProps = {
	refLink: ""
};

Link.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	refLink: PropTypes.string
};

export default Link;
