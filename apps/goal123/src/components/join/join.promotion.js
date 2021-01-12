import React, { useContext } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { userInfoContext, i18nContext, navContext } from "../common/context";
import { ClickLink } from "../common/swipperBanner";
import config, { siteName } from "../../config";

const Promotion = ({ banner, ImgFolder, ClickClose, title, isOpen }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);

	const rows = banner.map(b => {
		const _imgFolder = b.imgFolder ?? ImgFolder;
		const lang = b.lang.includes(userInfo.langId) ? userInfo.langId : "en";
		const actionLinkByLang = b.actionLinkByLang?.find(
			a => a.lang === userInfo.langId
		);
		const actionLink = actionLinkByLang
			? actionLinkByLang.link
			: b.actionLink;
		return (
			<button
				onClick={ClickLink.bind(
					this,
					b.tpId,
					b.gameId,
					lang,
					actionLink,
					b.outerLink === true,
					b.urlWithLang,
					userInfo.isLogin,
					setNav
				)}
				key={`${lang}-${b.img}`}>
				<img
					src={`${config.imgUrl}/CMS/${siteName}/${_imgFolder}/${lang}/${b.img}`}
					className="banner"
					alt={b.img}
				/>
			</button>
		);
	});

	const signUpHint = i18n.msg_CreditSignUpHint_2?.replace("{0}", siteName);
	return isOpen ? (
		<div id="welcome" style={{ display: "block" }}>
			<div
				className="wecTit icon icon-cancel-circle"
				onClick={ClickClose}>
				{title}
			</div>
			<div className="wecBanner">
				<Autoplay Rows={rows} />
			</div>
			<div className="wecTxt">
				{i18n.msg_CreditSignUpHint_1}
				<br />
				{signUpHint}
				<div className="btn-group">
					<button className="orange openPopup" onClick={ClickClose}>
						{i18n.lbl_Close}
					</button>
				</div>
			</div>
		</div>
	) : null;
};

Promotion.defaultProps = {
	title: "",
	ImgFolder: "",
	isOpen: null
};

Promotion.propTypes = {
	banner: PropTypes.arrayOf(PropTypes.object).isRequired,
	ImgFolder: PropTypes.string,
	ClickClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	isOpen: PropTypes.bool
};

const Autoplay = ({ Rows }) => {
	return (
		<Swiper
			spaceBetween={30}
			centeredSlides={true}
			autoplay={{ delay: 2500, disableOnInteraction: false }}
			pagination={{
				el: ".swiper-pagination",
				clickable: true
			}}
			rebuildOnUpdate={true}>
			{Rows}
		</Swiper>
	);
};

Autoplay.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Promotion;
