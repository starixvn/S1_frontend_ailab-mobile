import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";
import { popBoxContext, navContext, defNavPanel } from "../common/context";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import { bannerImgUrl } from "../../config";

const defGameType = {
	default: "default",
	casino: "casino"
};

export const defGameList = [
	{
		name: "Mahjong Ways Two",
		provider: "PG",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/pg.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame1.jpg`,
		tpId: 14,
		gameId: "mahjong-ways2",
		gameType: defGameType.casino,
		tpGameType: 17
	},
	{
		name: "Treasures of Aztec",
		provider: "PG",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/pg.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame2.jpg`,
		tpId: 14,
		gameId: "treasures-aztec",
		gameType: defGameType.casino,
		tpGameType: 17
	},
	{
		name: "5 God beasts",
		provider: "CQ9",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/cq9.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame3.jpg`,
		tpId: 16,
		gameId: 117,
		gameType: defGameType.casino,
		tpGameType: 29
	},
	{
		name: "Hercules",
		provider: "CQ9",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/cq9.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame4.jpg`,
		tpId: 16,
		gameId: 161,
		gameType: defGameType.casino,
		tpGameType: 29
	},
	{
		name: "Three Star Fortune",
		provider: "PP",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/pp.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame5.jpg`,
		tpId: 5,
		gameId: "vs10threestar",
		gameType: defGameType.casino,
		tpGameType: 7
	},
	{
		name: "5 Lions Gold",
		provider: "PP",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/pp.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame6.jpg`,
		tpId: 5,
		gameId: "vs243lionsgold",
		gameType: defGameType.casino,
		tpGameType: 7
	},
	{
		name: "Dancing Fever",
		provider: "Spade",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/sg.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame7.jpg`,
		tpId: 10,
		gameId: "S-DF02",
		gameType: defGameType.casino,
		tpGameType: 15
	},
	{
		name: "5 Fortune Dragons",
		provider: "Spade",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/sg.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame8.jpg`,
		tpId: 10,
		gameId: "S-FD01",
		gameType: defGameType.casino,
		tpGameType: 15
	},
	{
		name: "Thor Infinity Reels",
		provider: "YGG",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/ygg.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame9.jpg`,
		tpId: 8,
		gameId: "1035",
		gameType: defGameType.casino,
		tpGameType: 14
	},
	{
		name: "Lucky Neko",
		provider: "YGG",
		providerImg: `${bannerImgUrl}/h5/img/hotgame/ygg.png`,
		img: `${bannerImgUrl}/h5/img/hotgame/hotgame10.jpg`,
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
