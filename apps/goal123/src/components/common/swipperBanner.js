import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { Link } from "@reach/router";
import { siteName } from "../../config";
import { api_GetBanner } from "../../service/api/site";
import { userInfoContext, navContext, defNavPanel } from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";

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
			matchid,
			isLogin: isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	}
};

const Panel = ({ ImgFolder, filterHideInHome = false }) => {
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
								const imgFolder = d.imgFolder
									? d.imgFolder
									: ImgFolder[idx];
								return { ...d, imgFolder };
							})
						];
					}
				});

				setBanner(result);
			});
		}

		return () => {
			mounted = false;
		};
	}, [userInfo, ImgFolder, filterHideInHome]);

	const rows = banner?.map((b, Idx) => {
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
			: `${config.imgUrl}/CMS/${siteName}/${_imgFolder}/${lang}/${b.img}`;

		if (actionLink?.startsWith("promotion/promotionInfo?BonusCode=")) {
			return (
				<Link key={`${lang}-${b.img}`} to={actionLink}>
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
					setNav,
					b.matchid
				)}
				key={`${lang}-${b.img}`}>
				<img src={imgSRC} className="banner" alt={b.img ?? ""} />
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
	ImgFolder: PropTypes.arrayOf(PropTypes.object),
	filterHideInHome: PropTypes.bool
};

const Autoplay = props => {
	return (
		<Swiper
			spaceBetween={spaceBetween}
			centeredSlides={centeredSlides}
			autoplay={autoplay}
			pagination={pagination}
			rebuildOnUpdate={rebuildOnUpdate}>
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
