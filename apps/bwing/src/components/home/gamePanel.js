import React, { useContext } from "react";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { defPopBoxType } from "../common/popbox";
import { popBoxContext, navContext, defNavPanel } from "../common/context";
import productList from "../../datas/productList";
import img1 from "../../styles/img/game1.png";
import img2 from "../../styles/img/game2.png";
import img3 from "../../styles/img/game3.png";

const defLinkType = {
	default: "default",
	casino: "casino",
	sports: "sports"
};

const defGameList = [
	{
		...productList.soccer,
		img: img1,
		displayKey: "lbl_Soccer",
		linkType: defLinkType.sports,
		tpId: 1,
		gameId: 1
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
		img: img2,
		displayKey: "lbl_Saba1Club3",
		tpId: 1,
		gameId: 200,
		betType: 1612
	},
	{
		img: img3,
		displayKey: "lbl_Saba1Club5",
		tpId: 1,
		gameId: 200,
		betType: 1614
	},
	{
		img: img2,
		displayKey: "AE Baccarat",
		tpId: 15,
		gameId: 15
	},
	{
		img: img2,
		displayKey: "Dream Gaming Se die",
		tpId: 4
	},
	{
		img: img3,
		displayKey: "lbl_eSports",
		tpId: 1,
		gameId: 43
	},
	{
		img: img2,
		displayKey: "lbl_FishingGG",
		tpId: 7,
		gameId: 10
	},
	{
		img: img2,
		displayKey: "lbl_VirtualSports",
		tpId: 1,
		gameId: 180
	},
	{
		img: img3,
		displayKey: "lbl_Keno",
		tpId: 1,
		gameId: 202
	},
	{
		img: img2,
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
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);

	const ClickGame = (tpId, gameId, betType, linkType, name) => {
		const LoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (linkType === defLinkType.casino) {
			if (userInfo.isLogin !== true) {
				LoginPopBox();
			}
		} else if (linkType === defLinkType.sports) {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: true,
				loginCallback: () => {
					setNav(defNavPanel.login);
				}
			});
		} else {
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
		}
	};

	let rows = defGameList.map(g => {
		let displayText = i18n[g.displayKey] ?? g.displayKey;
		return (
			<div
				className="gameArea-box"
				key={`promoGameList-${g.displayKey}`}
				onClick={ClickGame.bind(
					this,
					g.tpId,
					g.gameId,
					g.betType,
					g.linkType,
					g.name
				)}>
				<img src={g.img} alt={displayText} />
				<div className="gameArea-box-text">
					<p>{displayText}</p>
				</div>
			</div>
		);
	});

	return <div className="gameArea">{rows}</div>;
};
