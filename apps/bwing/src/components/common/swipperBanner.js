import React, { useEffect, useState, useContext, useRef } from "react";
import Swiper from "react-id-swiper";
import { Link } from "@reach/router";
import { userInfoContext, navContext, defNavPanel } from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import {
	api_site_GetBannerV3,
	defBannerActionMode
} from "../../service/api/site";

export const ClickLink = ({
	tpId,
	gameId,
	actionMode,
	bannerLink,
	lang,
	isLogin,
	setNav
}) => {
	const HandleLogin = () => {
		setNav(defNavPanel.login);
	};

	if (actionMode === defBannerActionMode.OpenWindow) {
		window.open(bannerLink, "_blank");
	} else if (actionMode === defBannerActionMode.RedirectPage) {
		window.location.href = bannerLink;
	} else if (actionMode === defBannerActionMode.RedirectPageOfThisSite) {
		HandleLogin();
	} else if (actionMode === defBannerActionMode.GoToGame) {
		GET_ENTER_PAGE({
			langId: lang,
			tpId,
			gameId,
			isLogin: isLogin === true,
			loginCallback: HandleLogin
		});
	}
};

const NeedLoginRoute = [];

const Panel = ({ ImgFolder = [] }) => {
	const [banner, setBanner] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	useEffect(() => {
		let mounted = true;

		const getBanner = async () => {
			setBanner([]);
			try {
				ImgFolder.forEach(async BannerType => {
					const res = await api_site_GetBannerV3({
						lang: userInfo.langId,
						BannerType
					});

					if (res.data.errorCode === 0 && mounted) {
						setBanner(prev => [...prev, ...res.data.data]);
					}
				});

				return true;
			} catch (error) {
				return false;
			}
		};

		getBanner();

		return () => {
			mounted = false;
		};
	}, [userInfo, ImgFolder]);

	const rows = banner?.map((b, bIdx) => {
		let redirectLink = null;

		if (b.actionMode === defBannerActionMode.GoToBonus) {
			redirectLink = `/${path.promotionInfo.root}?BonusCode=${b.bonusCode}`;
		} else if (
			b.actionMode === defBannerActionMode.RedirectPageOfThisSite
		) {
			redirectLink =
				!userInfo.isLogin && NeedLoginRoute.includes(b.urlRouter)
					? null
					: `/${b.urlRouter}`;
		}

		if (redirectLink) {
			const parameter =
				b.urlRouter === path.casino.root
					? { tpId: Number(b.tpId) }
					: null;
			return (
				<Link
					state={parameter}
					key={`${userInfo.langId}-${bIdx}`}
					to={redirectLink}>
					<img
						src={b.bannerMobileUrl}
						className="banner"
						alt={b.img ?? ""}
					/>
				</Link>
			);
		}

		return (
			<button
				key={`${userInfo.langId}-${bIdx}`}
				onClick={ClickLink.bind(this, {
					...b,
					isLogin: userInfo.isLogin,
					lang: userInfo.langId,
					setNav
				})}>
				<img
					src={b.bannerMobileUrl}
					className="banner"
					alt={b.bannerName ?? ""}
				/>
			</button>
		);
	});

	return <Autoplay Rows={rows} />;
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
			<div className="swiper-button-prev" onClick={goPrev} />
		),
		renderNextButton: () => (
			<div className="swiper-button-next" onClick={goNext} />
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
		<div className="swiper-container">
			<div className="swiper-wrapper">
				<Swiper {...params}>{Rows}</Swiper>
			</div>
		</div>
	) : null;
};

export default Panel;
