import React, { useContext } from "react";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { navContext, defNavPanel } from "../common/context";
import { defGameInfo } from "../../datas/productList";
import img1 from "../../styles/img/GameList1.png";
import img2 from "../../styles/img/GameList2.png";
import img3 from "../../styles/img/GameList3.png";
import img4 from "../../styles/img/GameList4.png";
import img5 from "../../styles/img/GameList5.png";
import img6 from "../../styles/img/GameList6.png";
import img7 from "../../styles/img/GameList7.png";
import img8 from "../../styles/img/GameList8.png";
import img9 from "../../styles/img/GameList9.png";
import img10 from "../../styles/img/GameList10.png";
import img11 from "../../styles/img/GameList11.png";
import img12 from "../../styles/img/GameList12.png";

const defGameList = [
	{
		...defGameInfo.Sports,
		img: img1,
		displayKey: "lbl_Soccer"
	},
	{
		img: img2,
		displayKey: "lbl_Saba1Club1",
		tpId: 1,
		gameId: 200,
		betType: 1613
	},
	{
		img: img3,
		displayKey: "lbl_Saba1Club2",
		tpId: 1,
		gameId: 200,
		betType: 1620
	},
	{
		img: img4,
		displayKey: "lbl_Saba1Club3",
		tpId: 1,
		gameId: 200,
		betType: 1612
	},
	{
		img: img5,
		displayKey: "lbl_Saba1Club5",
		tpId: 1,
		gameId: 200,
		betType: 1614
	},
	{
		img: img6,
		displayKey: "AE Baccarat",
		tpId: 15,
		gameId: 15
	},
	{
		img: img7,
		displayKey: "Dream Gaming Se die",
		tpId: 4
	},
	{
		img: img8,
		displayKey: "lbl_eSports",
		tpId: 1,
		gameId: 43
	},
	{
		img: img9,
		displayKey: "lbl_FishingGG",
		tpId: 7,
		gameId: 10
	},
	{
		img: img10,
		displayKey: "lbl_VirtualSports",
		tpId: 1,
		gameId: 180
	},
	{
		img: img11,
		displayKey: "lbl_Keno",
		tpId: 1,
		gameId: 202
	},
	{
		img: img12,
		displayKey: "lbl_Lottery",
		tpId: 1,
		gameId: 220
	}
	// {
	// 	img: require("../../styles/img/GameList8.jpg"),
	// 	displayKey: "lbl_Casino_PP_FireStrike",
	// 	tpId: 5,
	// 	gameId: "vs10firestrike",
	// 	linkType: defLinkType.casino
	// }
];

export default ({ i18n, userInfo }) => {
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

	let rows = defGameList.map(g => {
		let displayText = i18n[g.displayKey] ?? g.displayKey;
		return (
			<div
				className="gameArea-box"
				key={`promoGameList-${g.displayKey}`}
				onClick={ClickGame.bind(this, g.tpId, g.gameId, g.betType)}>
				<img src={g.img} alt={displayText} />
				<div className="gameArea-box-text">
					<p>{displayText}</p>
				</div>
			</div>
		);
	});

	return <div className="gameArea">{rows}</div>;
};
