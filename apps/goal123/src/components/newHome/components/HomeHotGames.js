import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import path from "../../../router";
import { bannerImgUrl } from "../../../config";
import useClickItem from "../hooks/useClickItem";
import productList from "../../../datas/productList";

const HomeHotGames = () => {
	const { userInfo } = useContext(userInfoContext);
	const { clickHomeItem } = useClickItem();
	const { t } = useTranslation();

	return (
		<>
			<div className="home-title">{t("lbl_HotGame")}</div>
			<div className="home-hotgame">
				<div className="hotgame-wrapper">
					<div className="inner">
						{/* Click to trigger to SABA-SPORTS sports */}
						<a
							className="item brand big"
							onClick={() =>
								clickHomeItem(productList.sabaSoccer)
							}>
							<span>{t("lbl_Sports")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/sports-saba.png`}
								alt="sports-saba"
							/>
						</a>
						{/* Click to trigger to Vgaming */}
						<a
							className="item brand big"
							onClick={() => clickHomeItem(productList.sabaClub)}>
							<span>{t("lbl_Games")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/games-vgaming.png`}
								alt="games-vgaming"
							/>
						</a>
					</div>
					<div className="inner">
						{/* Click to trigger to BTI sports */}
						<a
							className="item brand"
							onClick={() => clickHomeItem(productList.sportBti)}>
							<span>{t("lbl_Sports")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/sports-bti.png`}
								alt="sports-bti"
							/>
						</a>
						{/* Click to trigger to V8poker */}
						<a
							className="item brand"
							onClick={() => clickHomeItem(productList.V8_Poker)}>
							<span>{t("lbl_Games")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/games-v8power.png`}
								alt="games-v8power"
							/>
						</a>
						{/* Click to link to platform's Lobby-casino page */}
						<a
							className="item"
							href={`/${userInfo.langId}/${path.liveCasino.root}`}>
							<span>{t("lbl_Casino")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/casino.png`}
								alt="casino"
							/>
						</a>
						{/* Click to link to platform's slot page */}
						<a
							className="item"
							href={`/${userInfo.langId}/${path.casino.root}`}>
							<span>{t("lbl_Slots")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/slots.png`}
								alt="slots"
							/>
						</a>
					</div>
					<div className="inner">
						{/* Click to link to platform's Lobby-Lottery page */}
						<a
							className="item"
							href={`/${userInfo.langId}/${path.lottery.root}`}>
							<span>{t("lbl_Lottery")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/lottery.png`}
								alt="lottery"
							/>
						</a>
						{/* Click to link to platform's Lobby-fishing page */}
						<a
							className="item"
							href={`/${userInfo.langId}/${path.fishing.root}`}>
							<span>{t("lbl_Fishing")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/fishing.png`}
								alt="fishing"
							/>
						</a>
						{/* Click to link to platform's Lobby-esports page */}
						<a
							className="item"
							href={`/${userInfo.langId}/${path.eSport.root}`}>
							<span>{t("lbl_eSports")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/esports.png`}
								alt="esports"
							/>
						</a>
						{/* Click to link to platform's Lobby-cockfighting page */}
						<a
							className="item"
							href={`/${userInfo.langId}/${path.cockFighting.root}`}>
							<span>{t("lbl_CockFighting")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/cockfighting.png`}
								alt="cockfighting"
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeHotGames;
