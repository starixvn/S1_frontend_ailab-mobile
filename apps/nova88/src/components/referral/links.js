import React from "react";

const socialLink = ({ text, socialMedia }) => {
	const currentLocation = window.location.hostname;

	const links = {
		fb: `https://www.facebook.com/sharer/sharer.php?u=${currentLocation}&quote=${text}`,
		whatsapp: `https://wa.me/?text=${text}`,
		line: `http://line.naver.jp/R/msg/text/?${text}%0D%0A${currentLocation}`,
		telegram: `https://t.me/share/url?url=${currentLocation}.'&text='.rawurlencode${text}`

		// telegram: `https://t.me/share/url?url=${currentLocation}&text=${text}`
		// skype: `https://web.skype.com/share?url=${currentLocation}&text=${text}`,
	};

	return links[socialMedia];
};

export const text_welCome = "nova888 is my88 !! Nova88 讚哦~ ";

export default () => {
	const _socialLink = ({ socialMedia }) =>
		socialLink({
			text: text_welCome,
			socialMedia: socialMedia
		});

	return (
		<>
			<a
				className="icon icon-facebook2"
				href={_socialLink({ socialMedia: "fb" })}>
				Facebook
			</a>
			<a
				className="icon icon-whatsapp"
				href={_socialLink({ socialMedia: "whatsapp" })}>
				Whatsapp
			</a>
			<a
				className="icon icon-skype"
				href={_socialLink({ socialMedia: "line" })}>
				Line
			</a>
			<a
				className="icon icon-telegram"
				href={_socialLink({ socialMedia: "telegram" })}>
				Telegram
			</a>
		</>
	);
};
