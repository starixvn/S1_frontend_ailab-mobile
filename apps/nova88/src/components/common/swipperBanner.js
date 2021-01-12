import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { userInfoContext, navContext, defNavPanel } from "Context";
import { Link } from "@reach/router";
import config from "../../config";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import api from "../../service/api";

export const ClickLink = (
	tpId,
	gameId,
	lang,
	href,
	isOuterLink,
	urlWithLang,
	isLogin,
	setNav
) => {
	const HandleLogin = () => {
		setNav(defNavPanel.login);
	};
	if (href === "Casino/Lobby") {
		window.location.href = `/${path.casino.root}${tpId ? `/${tpId}` : ""}`;
	} else if (tpId === null) {
		if (href === "Promotion/Index") {
			window.location.href = `/${path.promotion.root}`;
		} else if (href === "Home/Register") {
			//
		} else if (href === "918kiss") {
			if (isLogin) {
				window.location.href = `/${path.kiss918.root}`;
			} else {
				HandleLogin();
			}
		} else if (href === "referral") {
			if (isLogin) {
				window.location.href = `/${path.referral.root}`;
			} else {
				HandleLogin();
			}
		} else if (href === "leaderBoard") {
			window.location.href = `/${path.ranking.root}`;
		} else {
			window.open(
				isOuterLink
					? href
					: `${config.t_and_cURL}${
							urlWithLang ? `/${lang}` : ""
					  }/${href}`,
				"_blank"
			);
		}
	} else {
		GET_ENTER_PAGE({
			langId: lang,
			tpId,
			gameId,
			isLogin: isLogin === true,
			loginCallback: HandleLogin
		});
	}
};

const Panel = ({ ImgFolder = "", filterHideInHome = false }) => {
	const [banner, setBanner] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	useEffect(() => {
		let mounted = true;
		api.site
			.GetBanner(ImgFolder, "", userInfo.langId, filterHideInHome)
			.then(res => {
				if (res.data.errorCode === 0 && mounted) {
					setBanner(res.data.data);
				}
			});

		return () => {
			mounted = false;
		};
	}, [userInfo, ImgFolder, filterHideInHome]);

	const rows = banner?.map((b, b_idx) => {
		const _imgFolder = b.imgFolder ?? ImgFolder;
		const lang =
			b.fromDB || b.lang?.includes(userInfo.langId)
				? userInfo.langId
				: "en";
		const actionLinkByLang = b.fromDB
			? null
			: b.actionLinkByLang?.find(a => a.lang === userInfo.langId);
		const actionLink = actionLinkByLang
			? actionLinkByLang.link
			: b.actionLink;
		const imgSRC = b.fromDB
			? b.imgURL
			: `${config.imgUrl}/CMS/${config.siteName}/${_imgFolder}/${lang}/${b.img}`;

		let promotionUrl = "";

		if (actionLink?.startsWith("Promotion/Bonus?")) {
			const promoUrlParam = actionLink.split("?")?.[1];
			promotionUrl = `/${path.promotionInfo.root}?${promoUrlParam}`;
		} else if (
			actionLink?.startsWith("promotion/promotionInfo?BonusCode=")
		) {
			promotionUrl = actionLink;
		}

		if (promotionUrl) {
			return (
				<Link key={`${lang}-${b.img}-${b_idx}`} to={promotionUrl}>
					<img src={imgSRC} className="banner" alt={b.img ?? ""} />
				</Link>
			);
		}
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
				key={`${lang}-${b.img}-${b_idx}`}>
				<img src={imgSRC} className="banner" alt={b.img ?? ""} />
			</button>
		);
	});

	return <Autoplay Rows={rows} />;
};

const Autoplay = props => {
	const params = {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		rebuildOnUpdate: true
	};

	return <Swiper {...params}>{props.Rows}</Swiper>;
};

Autoplay.defaultProps = {
	Rows: []
};

Autoplay.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.object)
};

export default Panel;
