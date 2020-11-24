import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../components/common/context";
import { defGameInfo } from "../datas/productList";
import { GET_ENTER_PAGE } from "../service/enterPage";
import LinksPanel from "../components/home/links";
import fishingGGImg from "../styles/img/fishingGG.png";
import fishingSGImg from "../styles/img/fishingSG.png";
import fishingSGwarImg from "../styles/img/fishingSGwar.png";

const defGames = [
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
