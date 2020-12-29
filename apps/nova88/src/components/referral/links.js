import React from "react";

const socialLink = ({ text, socialMedia, refLink }) => {
	const links = {
		fb: `https://www.facebook.com/sharer/sharer.php?u=${refLink}&quote=${text}`,
		whatsapp: `https://wa.me/?text=${text}`,
		line: `http://line.naver.jp/R/msg/text/?${text}%0D%0A${refLink}`,
		telegram: `https://t.me/share/url?url=${refLink}.'&text=${text}`
	};

	return links[socialMedia];
};

export const text_welCome = {
	en:
		"Welcome to Nova88, you are invited to join us. There are a lot of rewarding program offer for NEW MEMBER. Simply click and sign up with us to get yourself and help your friend to be rewarded! Terms and Conditions apply.",
	th:
		"ยินดีต้อนรับสู่ Nova88 คุณได้รับเชิญให้เข้าร่วมกับเรา เรามีข้อเสนอโปรแกรมที่คุ้มค่ามากมายสำหรับสมาชิกใหม่ เพียงคลิกและลงทะเบียนกับเราเพื่อรับรางวัลสำหรับตัวคุณเองเพื่อนของคุณ! เป็นไปตามเงื่อนไขและข้อกำหนด",
	cs:
		"欢迎来到Nova88，您已被邀请加入我们。我们将提供各种奖励与优惠予新会员。只需点击并注册便能加入我们，帮助您和您的朋友获得奖励！*标准规则和条款适用",
	id:
		"Selamat datang di Nova88, Anda diundang untuk bergabung dengan kami. Ada banyak sekali penawaran program bermanfaat bagi MEMBER BARU. Cukup klik dan daftar dengan kami untuk membantu Anda dan teman Anda mendapatkan hadiah! *Syarat dan ketentuan berlaku.s"
};

export default ({ refLink, langId }) => {
	const _socialLink = ({ socialMedia }) => {
		return socialLink({
			text: text_welCome[langId],
			socialMedia: socialMedia,
			refLink: refLink
		});
	};

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
				className="icon icon-line"
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
