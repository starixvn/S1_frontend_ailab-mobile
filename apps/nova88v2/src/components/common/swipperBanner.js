/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { Link } from "../../route/link";
import config, { cloudBannerImgURL } from "../../config";
import useHandleLogin from "../hook/useHandleLogin";
import { userInfoContext, popBoxContext } from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import api from "../../service/api";

export const ClickLink = ({
	tpId,
	gameId,
	matchId,
	actionMode,
	bannerLink,
	lang,
	isLogin,
	handleLogin,
	tpGameType
}) => {
	if (actionMode === api.site.defBannerActionMode.OpenWindow) {
		window.open(bannerLink, "_blank");
	} else if (actionMode === api.site.defBannerActionMode.RedirectPage) {
		window.location.href = bannerLink;
	} else if (
		actionMode === api.site.defBannerActionMode.RedirectPageOfThisSite
	) {
		handleLogin();
	} else if (actionMode === api.site.defBannerActionMode.GoToGame) {
		GET_ENTER_PAGE({
			langId: lang,
			tpId,
			gameId,
			matchid: matchId,
			isLogin: isLogin === true,
			loginCallback: handleLogin,
			tpGameType
		});
	}
};

const NeedLoginRoute = [path.kiss918.root, path.referral.root];

export const useGetBanner = ({ langId, ImgFolder, currencyId }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [banner, setBanner] = useState([]);

	useEffect(() => {
		let mounted = true;

		const getBanner = async () => {
			setBanner([]);
			try {
				ImgFolder.forEach(async BannerType => {
					const res = await api.site.GetBannerV3({
						lang: langId,
						BannerType,
						currencyId
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

const Panel = ({ ImgFolder = [], params }) => {
	const { userInfo } = useContext(userInfoContext);
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder,
		currencyId: userInfo.currencyId
	});
	const { handleLogin } = useHandleLogin();

	const handleClick = ({
		tpId,
		gameId,
		matchId,
		actionMode,
		bannerLink,
		tpGameType
	}) => {
		return ClickLink({
			tpId,
			gameId,
			matchId,
			actionMode,
			bannerLink,
			tpGameType,
			isLogin: userInfo.isLogin,
			lang: userInfo.langId,
			handleLogin
		});
	};

	const rows = banner?.map((b, bIdx) => {
		let redirectLink = null;
		if (b.actionMode === api.site.defBannerActionMode.GoToBonus) {
			redirectLink = `${path.promotionInfo.root}?BonusCode=${b.bonusCode}`;
		} else if (
			b.actionMode === api.site.defBannerActionMode.RedirectPageOfThisSite
		) {
			if (b.urlRouter === "sports") {
				b.actionMode = api.site.defBannerActionMode.GoToGame;
			}

			if (b.urlRouter === "slots") {
				// 路徑字首不補'/', 原因是nova88會自己補語系 => ex:/cs/slots/39
				redirectLink = `${b.urlRouter}/${b.tpId}`;
			} else {
				redirectLink =
					!userInfo.isLogin && NeedLoginRoute.includes(b.urlRouter)
						? null
						: `${b.urlRouter}`;
			}
		}

		if (redirectLink) {
			const parameter =
				b.urlRouter === path.casino.root
					? { tpId: Number(b.tpId) }
					: null;

			if (redirectLink === "rewards") {
				return (
					<div
						onClick={() => {
							window.location.replace(
								`${
									process.env.NODE_ENV === "production"
										? window.location.origin
										: config.openURL
								}/${redirectLink}`
							);
						}}>
						<img
							src={b.bannerMobileUrl}
							className="mainbanner"
							alt={b.bannerName ?? ""}
						/>
					</div>
				);
			}

			return (
				<Link
					state={parameter}
					key={`${userInfo.langId}-${bIdx}`}
					to={redirectLink}>
					<img
						src={b.bannerMobileUrl}
						className="mainbanner"
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
					className="mainbanner"
					alt={b.bannerName ?? ""}
				/>
			</button>
		);
	});

	return <Autoplay Rows={rows} params={params} />;
};

Panel.defaultProps = {
	ImgFolder: [],
	params: null
};

Panel.propTypes = {
	ImgFolder: PropTypes.arrayOf(PropTypes.any),
	params: PropTypes.objectOf(PropTypes.any)
};

export const BannerWithStaticImages = ({
	length,
	langId,
	redirectLink = ""
}) => {
	const rows = [];
	const params = {
		spaceBetween: 200,
		centeredSlides: true,
		autoplay: false,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		loop: true,
		rebuildOnUpdate: true
	};
	for (let i = 0; i < length; i++) {
		rows.push(
			<a
				key={`${langId}-${i}`}
				href={redirectLink}
				target="_blank"
				rel="noreferrer">
				<img
					src={`${cloudBannerImgURL}/h5/img/line/ling-${i + 1}_${
						langId === "th" ? "th" : "en"
					}.png`}
					className="item"
					alt="static banner"
				/>
			</a>
		);
	}
	return (
		<div className="depositModule active">
			<div className="downloadModule">
				<div className="guideMark" />
				<Autoplay Rows={rows} params={params} />
			</div>
		</div>
	);
};

BannerWithStaticImages.defaultProps = {
	length: null,
	langId: null,
	redirectLink: null
};

BannerWithStaticImages.propTypes = {
	length: PropTypes.number,
	langId: PropTypes.string,
	redirectLink: PropTypes.string
};

export const Autoplay = props => {
	const params = props.params ?? {
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

	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Swiper {...params}>{props.Rows}</Swiper>;
};

Autoplay.defaultProps = {
	Rows: [],
	params: null
};

Autoplay.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.object),
	params: PropTypes.objectOf(PropTypes.any)
};

export default Panel;
