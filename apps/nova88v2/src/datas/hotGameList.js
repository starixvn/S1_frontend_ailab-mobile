import Baccarat from "../styles/img/hotgame01.jpg";
import DragonTiger from "../styles/img/hotgame02.jpg";
import Belangkai from "../styles/img/hotgame03.jpg";
import Hulu from "../styles/img/hotgame04.jpg";
import MultihandBlackjack from "../styles/img/hotgame05.jpg";
import Vs1dragon8 from "../styles/img/hotgame06.jpg";
import ThreeStarFortune from "../styles/img/hotgame07.jpg";
import FortuneDragons from "../styles/img/hotgame08.jpg";
import GodOfFortune from "../styles/img/hotgame09.jpg";
import LuckyNeko from "../styles/img/hotgame10.jpg";
import Poker from "../styles/img/hotgame11.jpg";

const gameType = {
	table: "lbl_TableGame",
	slots: "lbl_SlotsGame",
	poker: "lbl_Poker"
};

export const defProductType = {
	slots: "slots"
};

export default [
	{
		name: "Baccarat",
		provider: "OneRNG",
		gameTypeKey: gameType.table,
		img: Baccarat,
		tpId: 1,
		gameId: 208
	},
	{
		name: "Dragon Tiger",
		provider: "OneRNG",
		gameTypeKey: gameType.table,
		img: DragonTiger,
		tpId: 1,
		gameId: 208
	},
	{
		name: "Belangkai",
		provider: "Joker",
		gameTypeKey: gameType.table,
		img: Belangkai,
		tpId: 9,
		gameId: "3uim5ppkiqwk1",
		productType: defProductType.slots
	},
	{
		name: "Hulu",
		provider: "Joker",
		gameTypeKey: gameType.table,
		img: Hulu,
		tpId: 9,
		gameId: "yr1zy9u9xt6zr",
		productType: defProductType.slots
	},
	{
		name: "Multihand Blackjack",
		provider: "PP",
		gameTypeKey: gameType.table,
		img: MultihandBlackjack,
		tpId: 5,
		gameId: "bjma",
		productType: defProductType.slots
	},
	{
		name: "888 Dragon",
		provider: "PP",
		gameTypeKey: gameType.slots,
		img: Vs1dragon8,
		tpId: 5,
		gameId: "vs1dragon8",
		productType: defProductType.slots
	},
	{
		name: "Three Star Fortune",
		provider: "PP",
		gameTypeKey: gameType.slots,
		img: ThreeStarFortune,
		tpId: 5,
		gameId: "vs10threestar",
		productType: defProductType.slots
	},
	{
		name: "5 Fortune Dragons",
		provider: "Spade",
		gameTypeKey: gameType.slots,
		img: FortuneDragons,
		tpId: 10,
		gameId: "S-FD01",
		productType: defProductType.slots
	},
	{
		name: "God Of Fortune",
		provider: "GPI",
		gameTypeKey: gameType.slots,
		img: GodOfFortune,
		tpId: 6,
		gameId: "godoffortune",
		productType: defProductType.slots
	},
	{
		name: "Lucky Neko",
		provider: "YGG",
		gameTypeKey: gameType.slots,
		img: LuckyNeko,
		tpId: 8,
		gameId: 7382,
		productType: defProductType.slots
	},
	{
		name: "Poker",
		provider: "OneGame",
		gameTypeKey: gameType.poker,
		img: Poker,
		tpId: 13
	}
];
