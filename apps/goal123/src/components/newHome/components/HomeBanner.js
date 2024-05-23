import React, { useEffect, useState, useContext } from "react";
import {
	defBannerType,
	api_site_GetBannerV3,
	defBannerActionMode
} from "apps/goal123/src/service/api/site";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Pagination } from "swiper";
import path from "apps/goal123/src/path";
import { GET_ENTER_PAGE } from "apps/goal123/src/service/enterPage";
import { useNavigate } from "@reach/router";
import {
	userInfoContext,
	navContext,
	defNavPanel,
	popBoxContext,
	i18nContext
} from "../../common/context";

const swiperParams = {
	spaceBetween: 20,
	centeredSlides: true,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	modules: [Pagination, Autoplay]
};

const handleClickLink = ({
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

const useGetBanner = ({ langId, ImgFolder, setPopBox, i18n }) => {
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

					if (res.data.errorCode === 0 && mounted) {
						setBanner(prev => [...prev, ...res.data.data]);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
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

const HomeBanner = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder: [defBannerType.Promotions],
		setPopBox,
		i18n
	});

	const navigate = useNavigate();

	const handleClickBanner = bannerData => {
		let redirectLink = null;

		if (bannerData.actionMode === defBannerActionMode.GoToBonus) {
			redirectLink = `/${path.promotionInfo.root}?BonusCode=${bannerData.bonusCode}`;
		} else if (
			bannerData.actionMode === defBannerActionMode.RedirectPageOfThisSite
		) {
			if (bannerData.urlRouter === "sports") {
				bannerData.actionMode = defBannerActionMode.GoToGame;
			}
			if (bannerData.urlRouter === "casino") {
				redirectLink = `/${bannerData.urlRouter}/${bannerData.tpId}`;
			} else {
				redirectLink =
					!userInfo.isLogin &&
					NeedLoginRoute.includes(bannerData.urlRouter)
						? null
						: `/${bannerData.urlRouter}`;
			}
		}

		if (redirectLink) {
			const parameter =
				bannerData.urlRouter === path.casino.root
					? { tpId: Number(bannerData.tpId) }
					: null;
			navigate(redirectLink, { state: parameter });
			return; // 跳轉頁面後不再執行下面的點擊行為
		}
		handleClickLink({
			tpId: bannerData.tpId,
			gameId: bannerData.gameId,
			matchId: bannerData.matchId,
			actionMode: bannerData.actionMode,
			bannerLink: bannerData.bannerLink,
			tpGameType: bannerData.tpGameType,
			isLogin: userInfo.isLogin,
			lang: userInfo.langId,
			setNav
		});
	};

	return (
		<div className="home-banner">
			<Swiper
				{...swiperParams}
				className="swiper-container home-banner-container">
				{banner.map(bannerData => (
					<SwiperSlide
						key={bannerData.bannerName}
						className="swiper-slide"
						onClick={() => handleClickBanner(bannerData)}>
						<img
							src={bannerData.bannerMobileUrl}
							alt={bannerData.bannerName || "Banner"}
						/>
					</SwiperSlide>
				))}
				<div className="swiper-pagination" />
			</Swiper>
		</div>
	);
};

export default HomeBanner;
