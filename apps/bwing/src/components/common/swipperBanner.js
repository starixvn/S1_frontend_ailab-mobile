import React, { useEffect, useState, useContext, useRef } from "react";
import Swiper from "react-id-swiper";
import config from "../../config";
import { api_GetBanner } from "../../service/api/site";
import {
	userInfoContext,
	navContext,
	defNavPanel
} from "../../components/common/context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import { Link } from "@reach/router";
import productList from "../../datas/productList";

export const defBannerFolder = {
	Sports: "Sports"
};

export const defSpecialActionLink = {
	SportsIndex: "Sports/Index"
};

export const ClickLink = (
	tpId,
	gameId,
	lang,
	href,
	isOuterLink,
	urlWithLang,
	isLogin,
	setNav,
	matchid
) => {
	if (href === "Casino/Lobby") {
		window.location.href = `/${path.casino.root}${tpId ? `/${tpId}` : ""}`;
	} else if (tpId === null) {
		if (href === "Promotion/Index") {
			window.location.href = `/${path.promotion.root}`;
		} else if (href === "Home/Register") {
			return;
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
			matchid,
			isLogin: isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	}
};

const Panel = ({
	ImgFolder,
	withBtn,
	openInBlank,
	filterHideInHome = false
}) => {
	const [banner, setBanner] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	useEffect(() => {
		let mounted = true;
		if (ImgFolder) {
			const fetchData = folder => {
				return api_GetBanner(
					folder,
					"",
					userInfo.langId,
					filterHideInHome
				);
			};

			Promise.all(ImgFolder?.map(m => fetchData(m))).then(res => {
				let result = [];
				res.forEach((r, idx) => {
					if (r.data.errorCode === 0 && mounted) {
						result = [
							...result,
							...r.data.data?.map(d => {
								let imgFolder = d.imgFolder
									? d.imgFolder
									: ImgFolder[idx];
								return { ...d, imgFolder: imgFolder };
							})
						];
					}
				});

				if (mounted) {
					setBanner(result);
				}
			});
		}

		return () => (mounted = false);
	}, [userInfo, ImgFolder, filterHideInHome]);

	let rows = banner?.map((b, b_idx) => {
		let _imgFolder = b.imgFolder ?? ImgFolder;
		let lang =
			b.fromDB || b.lang?.includes(userInfo.langId)
				? userInfo.langId
				: "en";
		let actionLinkByLang = b.fromDB
			? null
			: b.actionLinkByLang?.find(a => a.lang === userInfo.langId);
		let actionLink = actionLinkByLang
			? actionLinkByLang.link
			: b.actionLink;
		let imgSRC = b.fromDB
			? b.imgURL
			: `${config.imgUrl}/CMS/${config.siteName}/${_imgFolder}/${lang}/${b.img}`;

		if (actionLink?.startsWith("promotion/promotionInfo?BonusCode=")) {
			return (
				<Link key={`${lang}-${b.img}-${b_idx}`} to={actionLink}>
					<img src={imgSRC} className="banner" alt={b.img ?? ""} />
				</Link>
			);
		} else {
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
						setNav,
						b.matchid
					)}
					key={`${lang}-${b.img}-${b_idx}`}>
					<img src={imgSRC} className="banner" alt={b.img ?? ""} />
				</button>
			);
		}
	});

	return withBtn ? <AutoplayWithBtn Rows={rows} /> : <Autoplay Rows={rows} />;
};

const defSwipperConfig = {
	spaceBetween: 30,
	centeredSlides: true,
	loop: true,
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

const Autoplay = props => {
	const params = defSwipperConfig;
	return <Swiper {...params}>{props.Rows}</Swiper>;
};

const AutoplayWithBtn = ({ Rows }) => {
	const params = {
		...defSwipperConfig,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		getSwiper: obj => {
			ref.current = obj;
		},
		renderPrevButton: () => (
			<div className="swiper-button-prev" onClick={goPrev}></div>
		),
		renderNextButton: () => (
			<div className="swiper-button-next" onClick={goNext}></div>
		)
	};
	const ref = useRef(null);

	const goNext = () => {
		if (ref.current !== null) {
			ref.current.slideNext();
		}
	};

	const goPrev = () => {
		if (ref.current !== null) {
			ref.current.slidePrev();
		}
	};

	return Rows && Rows.length > 0 ? (
		<>
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<Swiper {...params}>{Rows}</Swiper>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

export default Panel;
