/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { Link } from "@reach/router";
import {
	userInfoContext,
	navContext,
	defNavPanel,
	popBoxContext,
	i18nContext
} from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import {
	api_site_GetBannerV3,
	defBannerActionMode
} from "../../service/api/site";
import { useGotoGame } from "../hook/useGotoGame";
import { defGameInfo } from "../../datas/productList";

export const ClickLink = ({
	tpId,
	gameId,
	matchId,
	actionMode,
	bannerLink,
	lang,
	isLogin,
	setNav,
	tpGameType
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
			matchid: matchId,
			isLogin: isLogin === true,
			loginCallback: HandleLogin,
			tpGameType
		});
	}
};

const NeedLoginRoute = [];

export const useGetBanner = ({ langId, ImgFolder, setPopBox, i18n }) => {
	const [banner, setBanner] = useState([]);

	useEffect(() => {
		let mounted = true;

		const getBanner = async () => {
			setBanner([]);
			try {
				ImgFolder.forEach(async BannerType => {
					const res = await api_site_GetBannerV3({
						lang: langId,
						BannerType
					});

					if (mounted) {
						if (res.data.errorCode === 0) {
							setBanner(prev => [...prev, ...res.data.data]);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				});

				return true;
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
				return false;
			}
		};

		getBanner();

		return () => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [langId]);

	return { banner };
};

const Panel = ({ ImgFolder = [], params, swiperClass }) => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder,
		setPopBox,
		i18n
	});

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const handleClick = ({
		tpId,
		gameId,
		matchId,
		actionMode,
		bannerLink,
		tpGameType
	}) => {
		if (Number(tpId) === defGameInfo.Casino_PT.tpId)
			return handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId: Number(tpId),
				gameId,
				tpGameType
			});

		return ClickLink({
			tpId,
			gameId,
			matchId,
			actionMode,
			bannerLink,
			tpGameType,
			isLogin: userInfo.isLogin,
			lang: userInfo.langId,
			setNav
		});
	};
	const rows = banner?.map((b, bIdx) => {
		let redirectLink = null;
		if (b.actionMode === defBannerActionMode.GoToBonus) {
			redirectLink = `/${path.promotionInfo.root}?BonusCode=${b.bonusCode}`;
		} else if (
			b.actionMode === defBannerActionMode.RedirectPageOfThisSite
		) {
			if (b.urlRouter === "sports") {
				b.actionMode = defBannerActionMode.GoToGame;
			}
			if (b.urlRouter === "casino") {
				redirectLink = `/${b.urlRouter}/${b.tpId}`;
			} else {
				redirectLink =
					!userInfo.isLogin && NeedLoginRoute.includes(b.urlRouter)
						? null
						: `/${b.urlRouter}`;
			}
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
						alt={b.bannerName ?? ""}
					/>
				</Link>
			);
		}

		return (
			<button
				key={`${userInfo.langId}-${bIdx}`}
				onClick={() => handleClick(b)}>
				<img
					src={b.bannerMobileUrl}
					className="banner"
					alt={b.bannerName ?? ""}
				/>
			</button>
		);
	});

	return <AutoPlay Rows={rows} params={params} swiperClass={swiperClass} />;
};

Panel.defaultProps = {
	ImgFolder: [],
	params: null,
	swiperClass: ""
};

Panel.propTypes = {
	ImgFolder: PropTypes.arrayOf(PropTypes.any),
	params: PropTypes.objectOf(PropTypes.any),
	swiperClass: PropTypes.string
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
	rebuildOnUpdate: true,
	observer: true,
	containerClass: "hotevent swiper-container"
};

export const AutoPlay = props => {
	defSwipperConfig.containerClass = `${props.swiperClass} swiper-container`;
	const params = props.params ?? defSwipperConfig;
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Swiper {...params}>{props.Rows}</Swiper>;
};

AutoPlay.defaultProps = {
	params: null,
	swiperClass: ""
};

AutoPlay.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.node).isRequired,
	params: PropTypes.objectOf(PropTypes.any),
	swiperClass: PropTypes.string
};

export const AutoPlayWithBtn = ({ Rows }) => {
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
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Swiper {...params}>{Rows}</Swiper>
			</div>
		</div>
	) : null;
};

AutoPlayWithBtn.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default Panel;
