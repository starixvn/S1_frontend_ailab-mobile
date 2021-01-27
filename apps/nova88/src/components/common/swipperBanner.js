import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { userInfoContext, navContext, defNavPanel } from "Context";
import { Link } from "@reach/router";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import api from "../../service/api";

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

	if (actionMode === api.site.defBannerActionMode.OpenWindow) {
		window.open(bannerLink, "_blank");
	} else if (actionMode === api.site.defBannerActionMode.RedirectPage) {
		window.location.href = bannerLink;
	} else if (
		actionMode === api.site.defBannerActionMode.RedirectPageOfThisSite
	) {
		HandleLogin();
	} else if (actionMode === api.site.defBannerActionMode.GoToGame) {
		GET_ENTER_PAGE({
			langId: lang,
			tpId,
			gameId,
			isLogin: isLogin === true,
			loginCallback: HandleLogin
		});
	}
};

const NeedLoginRoute = [path.kiss918.root, path.referral.root];

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
					const res = await api.site.GetBannerV3({
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

		if (b.actionMode === api.site.defBannerActionMode.GoToBonus) {
			redirectLink = `/${path.promotionInfo.root}?BonusCode=${b.bonusCode}`;
		} else if (
			b.actionMode === api.site.defBannerActionMode.RedirectPageOfThisSite
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
