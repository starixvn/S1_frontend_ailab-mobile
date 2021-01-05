import React from "react";

const socialLink = ({ text, socialMedia, refLink }) => {
	const links = {
		fb: `https://www.facebook.com/sharer/sharer.php?u=${refLink}&quote=${text}`,
		whatsapp: `https://wa.me/?text=${text} ${refLink}`,
		line: `http://line.naver.jp/R/msg/text/?${text}%0D%0A${refLink}`,
		telegram: `https://t.me/share/url?url=${refLink}&text=${text}`
	};

	return links[socialMedia];
};

export default ({ refLink, i18n }) => {
	const _socialLink = ({ socialMedia }) => {
		return socialLink({
			text: i18n.lbl_Referral_Welcome,
			socialMedia: socialMedia,
			refLink: refLink
		});
	};

	return (
		<>
			<a
				className="icon icon-facebook2"
				target="_blank"
				rel="noreferrer"
				href={_socialLink({ socialMedia: "fb" })}>
				Facebook
			</a>
			<a
				className="icon icon-whatsapp"
				target="_blank"
				rel="noreferrer"
				href={_socialLink({ socialMedia: "whatsapp" })}>
				Whatsapp
			</a>
			<a
				className="icon icon-line"
				target="_blank"
				rel="noreferrer"
				href={_socialLink({ socialMedia: "line" })}>
				Line
			</a>
			<a
				className="icon icon-telegram"
				target="_blank"
				rel="noreferrer"
				href={_socialLink({ socialMedia: "telegram" })}>
				Telegram
			</a>
		</>
	);
};
