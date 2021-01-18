import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { Link } from "@reach/router";
import { userInfoContext, navContext, defNavPanel } from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import {
	api_site_GetBannerV2,
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

const Panel = ({ ImgFolder = [], filterHideInHome = false }) => {
	const [banner, setBanner] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	useEffect(() => {
		let mounted = true;

		const getBanner = async () => {
			setBanner([]);
			try {
				ImgFolder.forEach(async BannerType => {
					const res = await api_site_GetBannerV2({
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
	}, [userInfo, ImgFolder, filterHideInHome]);

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

Panel.defaultProps = {
	ImgFolder: [],
	filterHideInHome: false
};

Panel.propTypes = {
	ImgFolder: PropTypes.arrayOf(PropTypes.string),
	filterHideInHome: PropTypes.bool
};

const Autoplay = props => {
	return (
		<Swiper
			spaceBetween={30}
			centeredSlides={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false
			}}
			pagination={{
				el: ".swiper-pagination",
				clickable: true
			}}
			rebuildOnUpdate={true}>
			{props.Rows}
		</Swiper>
	);
};

Autoplay.defaultProps = {
	Rows: []
};

Autoplay.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.object)
};

export default Panel;
