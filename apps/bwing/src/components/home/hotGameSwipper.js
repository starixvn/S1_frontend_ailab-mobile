import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";
import { popBoxContext, navContext, defNavPanel } from "../common/context";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";

import imgIconPG from "../../styles/img/hotgame/pg.png";
import imgIconCQ9 from "../../styles/img/hotgame/cq9.png";
import imgIconPP from "../../styles/img/hotgame/pp.png";
import imgIconYGG from "../../styles/img/hotgame/ygg.png";
import imgIconSG from "../../styles/img/hotgame/sg.png";

import imgMahjongWaysTwo from "../../styles/img/hotgame/hotgame1.jpg";
import imgAztec from "../../styles/img/hotgame/hotgame2.jpg";
import imgFiveGodbeasts from "../../styles/img/hotgame/hotgame3.jpg";
import imgHercules from "../../styles/img/hotgame/hotgame4.jpg";
import imgThreeStarFortune from "../../styles/img/hotgame/hotgame5.jpg";
import imgFiveLionsGold from "../../styles/img/hotgame/hotgame6.jpg";
import imgDancingFever from "../../styles/img/hotgame/hotgame7.jpg";
import imgFiveFortuneDragons from "../../styles/img/hotgame/hotgame8.jpg";
import imgThorInfinityReels from "../../styles/img/hotgame/hotgame9.jpg";
import imgLuckyNeko from "../../styles/img/hotgame/hotgame10.jpg";

const defGameType = {
	default: "default",
	casino: "casino"
};

export const defGameList = [
	{
		name: "Mahjong Ways Two",
		provider: "PG",
		providerImg: imgIconPG,
		img: imgMahjongWaysTwo,
		tpId: 14,
		gameId: "mahjong-ways2",
		gameType: defGameType.casino,
		tpGameType: 17
	},
	{
		name: "Treasures of Aztec",
		provider: "PG",
		providerImg: imgIconPG,
		img: imgAztec,
		tpId: 14,
		gameId: "treasures-aztec",
		gameType: defGameType.casino,
		tpGameType: 17
	},
	{
		name: "5 God beasts",
		provider: "CQ9",
		providerImg: imgIconCQ9,
		img: imgFiveGodbeasts,
		tpId: 16,
		gameId: 117,
		gameType: defGameType.casino,
		tpGameType: 29
	},
	{
		name: "Hercules",
		provider: "CQ9",
		providerImg: imgIconCQ9,
		img: imgHercules,
		tpId: 16,
		gameId: 161,
		gameType: defGameType.casino,
		tpGameType: 29
	},
	{
		name: "Three Star Fortune",
		provider: "PP",
		providerImg: imgIconPP,
		img: imgThreeStarFortune,
		tpId: 5,
		gameId: "vs10threestar",
		gameType: defGameType.casino,
		tpGameType: 7
	},
	{
		name: "5 Lions Gold",
		provider: "PP",
		providerImg: imgIconPP,
		img: imgFiveLionsGold,
		tpId: 5,
		gameId: "vs243lionsgold",
		gameType: defGameType.casino,
		tpGameType: 7
	},
	{
		name: "Dancing Fever",
		provider: "Spade",
		providerImg: imgIconSG,
		img: imgDancingFever,
		tpId: 10,
		gameId: "S-DF02",
		gameType: defGameType.casino,
		tpGameType: 15
	},
	{
		name: "5 Fortune Dragons",
		provider: "Spade",
		providerImg: imgIconSG,
		img: imgFiveFortuneDragons,
		tpId: 10,
		gameId: "S-FD01",
		gameType: defGameType.casino,
		tpGameType: 15
	},
	{
		name: "Thor Infinity Reels",
		provider: "YGG",
		providerImg: imgIconYGG,
		img: imgThorInfinityReels,
		tpId: 8,
		gameId: "1035",
		gameType: defGameType.casino,
		tpGameType: 14
	},
	{
		name: "Lucky Neko",
		provider: "YGG",
		providerImg: imgIconYGG,
		img: imgLuckyNeko,
		tpId: 8,
		gameId: "7382",
		gameType: defGameType.casino,
		tpGameType: 14
	}
];

export const defProductType = {
	slots: "slots"
};

const HotGameSwipper = ({ i18n, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);
	const handleLogin = () => {
		setNav(defNavPanel.login);
	};
	const { maintainList } = useGetTpMaintainList();

	const clickGame = ({ tpId, gameId, productType, tpGameType }) => {
		if (
			maintainList?.some(
				m =>
					m.tpId === tpId &&
					(m.tpGameType === tpGameType ||
						m.tpGameType === defTpGameType.All)
			)
		) {
			setPopBox({
				isOpen: true,
				content: i18n.lbl_underMaintenance,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="white"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}>
							OK
						</button>
					</div>
				)
			});
		} else if (userInfo.isLogin === false) {
			handleLogin();
		} else if (productType === defProductType.slots) {
			GET_CASINO_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isFree: false,
				tpGameType
			});
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: handleLogin,
				tpGameType
			});
		}
	};

	const rows = defGameList.map(g => {
		return (
			<a
				className="hotGamModule"
				key={`hotgamelist-${g.tpId}-${g.gameId}-${g.gameType}`}
				onClick={clickGame.bind(this, {
					tpId: g?.tpId,
					gameId: g?.gameId,
					productType: g?.productType,
					tpGameType: g.tpGameType
				})}>
				<img className="gameimg" src={g.img} alt="" />
				<div className="title">
					<p>{g.name}</p>
					<img src={g.providerImg} alt="" />
				</div>
			</a>
		);
	});

	return (
		<div className="hotgame">
			<div className="titleBox">
				<div className="title">HOT GAME</div>
				{/* <!-- <a>MORE</a> --> */}
			</div>
			<Marquee speed={60} className="gameBox" gradient={false}>
				{rows}
			</Marquee>
		</div>
	);
};

HotGameSwipper.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default HotGameSwipper;
