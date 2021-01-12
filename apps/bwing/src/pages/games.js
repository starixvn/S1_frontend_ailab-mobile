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
import sabaClubImg from "../styles/img/sabaclub.png";
import KenoImg from "../styles/img/keno.png";
import LotteryImg from "../styles/img/Lottery.png";
import One789Lottery from "../styles/img/one789.png";
import One789LotteryTra from "../styles/img/lotteryTra.png";

const defGames = [
	{
		...defGameInfo.One789_lottery,
		displayKey: "lbl_TraditionalLottery",
		img: One789LotteryTra,
		isNew: true
	},
	{
		...defGameInfo.One789_lottery_789,
		displayKey: "lbl_789Lottery",
		img: One789Lottery,
		isNew: true
	},
	{
		...defGameInfo.sabaClub,
		displayKey: "lbl_SabaClub",
		img: sabaClubImg
	},
	{
		...defGameInfo.Keno,
		displayKey: "lbl_Keno",
		img: KenoImg
	},
	{
		...defGameInfo.lottery,
		displayKey: "lbl_Lottery",
		img: LotteryImg
	}
];

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);

	const ClickGame = (tpId, gameId, betType) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin,
			betType,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	const arr = defGames.map(game => {
		return (
			<button
				className={`gameInBox${game.isNew ? " newicon" : ""}`}
				key={`gamesPanel-${game.displayKey}`}
				onClick={ClickGame.bind(
					this,
					game.tpId,
					game.gameId,
					game.betType
				)}>
				<img src={game.img} alt={i18n[game.displayKey]} />
				<p>{i18n[game.displayKey].toUpperCase()}</p>
			</button>
		);
	});

	return (
		<>
			<div className="gameArea">
				<p className="gameAear__title lightBTitle">
					{i18n.lbl_Games.toUpperCase()}
				</p>
				<div className="gameBox">{arr}</div>
			</div>
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};
