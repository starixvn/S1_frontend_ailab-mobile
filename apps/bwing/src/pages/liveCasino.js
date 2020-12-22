import React, { useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "../components/common/context";
import { defGameInfo } from "../datas/productList";
import { GET_ENTER_PAGE } from "../service/enterPage";
import LinksPanel from "../components/home/links";
import liveCasino_One789 from "../styles/img/liveGame/liveGame9.png";
import img1 from "../styles/img/liveGame/liveGame1.png";
import img2 from "../styles/img/liveGame/liveGame2.png";
import img3 from "../styles/img/liveGame/liveGame3.png";
import img4 from "../styles/img/liveGame/liveGame4.png";
import img5 from "../styles/img/liveGame/liveGame5.png";
import img6 from "../styles/img/liveGame/liveGame6.png";
import img7 from "../styles/img/liveGame/liveGame7.png";
import img8 from "../styles/img/liveGame/liveGame8.png";

const defGames = [
	{
		...defGameInfo.LIVEcasinoOne789,
		displayKey: "lbl_liveCasino_789SeDie",
		icon: "icon icon-one789",
		img: liveCasino_One789
	},
	{
		...defGameInfo.LIVEcasinoWM,
		icon: "icon icon-WM",
		displayKey: "WM",
		img: img1
	},
	{
		...defGameInfo.LIVEcasinoAG,
		icon: "icon icon-AG",
		displayKey: "AG",
		img: img2
	},
	{
		...defGameInfo.LIVEcasinoPP,
		icon: "icon icon-PP",
		displayKey: "PP",
		img: img3
	},
	{
		...defGameInfo.LIVEcasinoAE,
		icon: "icon icon-AE",
		displayKey: "AE",
		img: img4
	},
	{
		...defGameInfo.LIVEcasinoDG,
		icon: "icon icon-DG",
		displayKey: "DG",
		img: img5
	},
	{
		...defGameInfo.LIVEcasinoAB,
		icon: "icon icon-AB",
		displayKey: "AB",
		img: img6
	},
	{
		...defGameInfo.LIVEcasinoEB,
		icon: "icon icon-EB",
		displayKey: "eBET",
		img: img7
	},
	{
		...defGameInfo.LIVEcasinoSA,
		icon: "icon icon-SA",
		displayKey: "SA",
		img: img8
	}
];

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);

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
				key={`liveCasinoPanel-${game.displayKey}`}
				onClick={ClickGame.bind(
					this,
					game.tpId,
					game.gameId,
					game.betType
				)}>
				<img src={game.img} alt={game.displayKey} />
				<p>
					<span className={`icon icon-${game.icon}`}></span>
					{i18n[game.displayKey] ?? game.displayKey}
				</p>
			</button>
		);
	});

	return (
		<>
			<div className="gameArea">
				<p className="gameAear__title lightBTitle">
					{i18n.lbl_LiveCasino.toUpperCase()}
				</p>
				<div className="gameBox">{arr}</div>
			</div>
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};
