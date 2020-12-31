import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../components/common/context";
import { defGameInfo } from "../datas/productList";
import { GET_ENTER_PAGE } from "../service/enterPage";
import LinksPanel from "../components/home/links";
import fishingGGImg from "../styles/img/fishingGG.png";
import fishingSGImg from "../styles/img/fishingSG.png";
import fishingSGwarImg from "../styles/img/fishingSGwar.png";
import fishingICG_DB from "../styles/img/fishingICG-DB.png";
import fishingICG_FOS from "../styles/img/fishingICG-FOS.png";
import fishingICG_TTATP from "../styles/img/fishingICG-TTATP.png";
import fishingICG_TOS from "../styles/img/fishingICG-TOS.png";

const defGames = [
	{
		...defGameInfo.ICG_DRAGONBALL_FISHING,
		displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
		img: fishingICG_DB
	},
	{
		...defGameInfo.ICG_FISHING_OF_SAVIORS,
		displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
		img: fishingICG_FOS
	},
	{
		...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
		displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
		img: fishingICG_TTATP
	},
	{
		...defGameInfo.ICG_TOWER_OF_SAVIORS,
		displayKey: "lbl_Game_ICG_TOWER_OF_SAVIORS",
		img: fishingICG_TOS
	},
	{
		...defGameInfo.Fishing,
		displayKey: "lbl_FishingGG",
		img: fishingGGImg
	},
	{
		...defGameInfo.Fishing_SG,
		displayKey: "lbl_FishingSG1",
		img: fishingSGImg
	},
	{
		...defGameInfo.Fishing_SGW,
		displayKey: "lbl_FishingSG2",
		img: fishingSGwarImg
	}
];

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	const ClickGame = (tpId, gameId, betType) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId: tpId,
			gameId: gameId,
			isLogin: userInfo.isLogin,
			betType: betType,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	let arr = defGames.map(game => {
		return (
			<button
				className="gameInBox"
				key={`fishingPanel-${game.displayKey}`}
				onClick={ClickGame.bind(
					this,
					game.tpId,
					game.gameId,
					game.betType
				)}>
				<img src={game.img} alt={i18n[game.displayKey]} />
				<p>
					<span className="icon icon-SG"></span>
					{i18n[game.displayKey]}
				</p>
			</button>
		);
	});

	return (
		<>
			<div className="gameArea">
				<p className="gameAear__title lightBTitle">
					{i18n.lbl_PromoCategory_3.toUpperCase()}
				</p>
				<div className="gameBox">{arr}</div>
			</div>{" "}
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};
