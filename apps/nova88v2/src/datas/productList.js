import Soccer from "../styles/img/soccer.png";
import SabaSoccer from "../styles/img/saba_soccer.png";
import Basketball from "../styles/img/basketball.png";
import Tennis from "../styles/img/tennis.png";
import Cricket from "../styles/img/cricket.png";

import ESportsAll from "../styles/img/esportALL.png";
import ESportsCS from "../styles/img/esportCS.png";
import ESportsDota from "../styles/img/esportDOTA2.png";
import ESportsKOG from "../styles/img/esportKOG.png";
import ESportsLOL from "../styles/img/esportLOL.png";

import LIVEcasino_N2Live from "../styles/img/n2.png";
import LIVEcasino_DG from "../styles/img/dg.png";
import LIVEcasino_PP from "../styles/img/pp.png";
import LIVEcasino_AE from "../styles/img/ae.png";
import LIVEcasino_AG from "../styles/img/ag.png";
import LIVEcasino_AB from "../styles/img/ab.png";
import LIVEcasino_SA from "../styles/img/sa.png";
import LIVEcasino_EB from "../styles/img/eb.png";
// import LIVEcasino_MW from "../styles/img/LIVEcasino_MW.jpg";
import LIVEcasino_WM from "../styles/img/wm.png";

import casino_PP from "../styles/img/spp.png";
import casino_ICG from "../styles/img/icg.png";
import casino_JOKER from "../styles/img/joker.png";
import casino_CQ9 from "../styles/img/cq9.png";
import casino_GPI from "../styles/img/gpi.png";
import casino_YGG from "../styles/img/ygg.png";
import casino_SG from "../styles/img/sg.png";
import casino_PG from "../styles/img/pg.png";
import casino_OW from "../styles/img/ow.png";
// import casino_KISS from "../styles/img/kiss.png";

import fishing_CQ9_AB3 from "../styles/img/pd.png";
import fish_DBF from "../styles/img/df.png";
import fish_TAP from "../styles/img/tap.png";
import fish_GG from "../styles/img/ffw.png";
import fish_SG from "../styles/img/fg.png";
import fish_SGW from "../styles/img/fw.png";

// import Cockfighting from "../styles/img/cockfighting.jpg";

import id4d from "../styles/img/tablegame.png";
import Keno from "../styles/img/keno.png";
import Lottery from "../styles/img/lottery.png";
import number_game from "../styles/img/numbergame.png";

import path from "../path";
import { siteInfo } from "../config";
import { defPopBoxType } from "../components/common/popbox";
import { isEventPeriod } from "../components/common/common";

export const productList = {
	kiss918: {
		tpId: 21,
		gameId: 21
	},
	oneGame: {
		tpId: 13
	}
};

const defIconType = {
	new: " icon-new"
};

const eventTime = {
	new_vip: { startDate: "2021/02/05 11:00:00" }
};

const gameList = ({ langId }) => [
	{
		category: "sports",
		categoryIcon: "soccer",
		translateKey: "lbl_Sports",
		items: [
			{
				...defGameInfo.Soccer,
				img: Soccer,
				spanTextKey: "lbl_Soccer"
			},
			{
				...defGameInfo.SabaSoccer,
				img: SabaSoccer,
				spanTextKey: "lbl_SabaSoccer"
			},
			{
				...defGameInfo.Basketball,
				img: Basketball,
				spanTextKey: "lbl_Basketball"
			},
			{
				...defGameInfo.Tennis,
				img: Tennis,
				spanTextKey: "lbl_Tennis"
			},
			{
				...defGameInfo.Cricket,
				img: Cricket,
				spanTextKey: "lbl_Cricket"
			}
		]
	},
	{
		category: "virtualsports",
		categoryIcon: "e-sports",
		translateKey: "lbl_eSports",
		items: [
			{
				...defGameInfo.ESportAll,
				spanTextKey: "lbl_All",
				img: ESportsAll
			},
			{
				...defGameInfo.ESportAll,
				spanText: "CS:GO",
				img: ESportsCS
			},
			{
				...defGameInfo.ESportAll,
				spanText: "DOTA2",
				img: ESportsDota
			},
			{
				...defGameInfo.ESportAll,
				spanText: "KOG",
				img: ESportsKOG
			},
			{
				...defGameInfo.ESportAll,
				spanText: "LOL",
				img: ESportsLOL
			}
		]
	},
	{
		category: "livecasino",
		categoryIcon: "livecasino",
		translateKey: "lbl_LiveCasino",
		items: [
			{
				...defGameInfo.LIVEcasinoN2Live,
				spanText: "N2Live",
				img: LIVEcasino_N2Live
			},
			{
				...defGameInfo.LIVEcasinoWM,
				spanText: "WM",
				img: LIVEcasino_WM
			},
			{
				...defGameInfo.LIVEcasinoAB,
				spanText: "AB",
				img: LIVEcasino_AB
			},
			{
				...defGameInfo.LIVEcasinoEB,
				spanText: "EB",
				img: LIVEcasino_EB
			},
			{
				...defGameInfo.LIVEcasinoSA,
				spanText: "SA",
				img: LIVEcasino_SA
			},
			{
				...defGameInfo.LIVEcasinoAE,
				spanText: "AE",
				img: LIVEcasino_AE
			},
			{
				...defGameInfo.LIVEcasinoPP,
				spanText: "PP",
				img: LIVEcasino_PP
			},
			{
				...defGameInfo.LIVEcasinoDG,
				spanText: "DG",
				img: LIVEcasino_DG
			},
			{
				...defGameInfo.LIVEcasinoAG,
				spanText: "AG",
				img: LIVEcasino_AG
			}
		]
	},
	{
		category: "slot",
		categoryIcon: "icon_777",
		translateKey: "lbl_Casino",
		items: [
			{
				...defGameInfo.Casino_PP,
				parameter: defGameInfo.Casino_PP,
				spanText: "PP",
				img: casino_PP,
				path: path.casino.root
			},
			{
				...defGameInfo.casino_ICG,
				parameter: defGameInfo.casino_ICG,
				spanText: "ICG",
				img: casino_ICG,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_JOKER,
				parameter: defGameInfo.Casino_JOKER,
				spanText: "JOKER",
				img: casino_JOKER,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_CQ9,
				parameter: defGameInfo.Casino_CQ9,
				spanText: "CQ9",
				img: casino_CQ9,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_GPI,
				parameter: defGameInfo.Casino_GPI,
				spanText: "GPI",
				img: casino_GPI,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_YGG,
				parameter: defGameInfo.Casino_YGG,
				spanText: "YGG",
				img: casino_YGG,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_SG,
				parameter: defGameInfo.Casino_SG,
				spanText: "SG",
				img: casino_SG,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_PG,
				parameter: defGameInfo.Casino_PG,
				spanText: "PG",
				img: casino_PG,
				path: path.casino.root
			},
			// {
			// ...defGameInfo.Casino_918Kiss,
			// parameter:defGameInfo.Casino_918Kiss,
			// spanText: "918Kiss",
			// 	img: casino_KISS,
			// 	path: path.kiss918.root,
			// 	needLogin: true
			// },
			{
				...defGameInfo.Casino_OW,
				parameter: defGameInfo.Casino_OW,
				spanText: "OW",
				img: casino_OW
			}
		]
	},
	{
		category: "game",
		categoryIcon: "game",
		translateKey: "lbl_Fishing",
		items: [
			{
				...defGameInfo.Fishing_AB3,
				spanTextKey: "lbl_Paradise",
				img: fishing_CQ9_AB3
			},
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				img: fish_DBF
			},
			{
				...defGameInfo.FishingGG,
				spanTextKey: "lbl_FishingGG",
				img: fish_GG
			},
			{
				...defGameInfo.FishingSGW,
				spanTextKey: "lbl_FishingSG2",
				img: fish_SGW
			}
		]
	},
	// {
	// 	category: "cockFighting",
	// 	categoryIcon: "cock",
	// 	translateKey: "lbl_CockFighting",
	// 	items: [
	// 		{
	// 			tpId: 19,
	// 			gameId: 19,
	// 			icon: "cock",
	// 			img: Cockfighting,
	// 			spanTextKey: "lbl_CockFighting"
	// 		}
	// 	]
	// },
	{
		category: "kelo",
		categoryIcon: "kelo",
		translateKey: "lbl_Lottery",
		items: [
			{
				...defGameInfo.Indo4d,
				img: id4d,
				spanTextKey: "lbl_Indo4d",
				allowCurrency: [4, 15]
			},
			{
				...defGameInfo.Keno,
				img: Keno,
				spanTextKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				img: Lottery,
				spanTextKey: "lbl_Lottery"
			},
			{
				...defGameInfo.NumberGame,
				img: number_game,
				spanTextKey: "lbl_NumberGame"
			}
		]
	},
	{
		category: "poker",
		categoryIcon: "casino",
		translateKey: "lbl_Poker",
		popBox: {
			needLogin: true,
			title: "lbl_Poker",
			type: defPopBoxType.OneGame
		}
	},
	{
		category: "affiliate",
		categoryIcon: "affiliate",
		translateKey: "lbl_Affiliate",
		href: `${siteInfo(langId).affiliateLink}`
	},
	{
		category: "vip",
		categoryIcon: "vip",
		translateKey: "lbl_VIP",
		path: path.vip.root,
		eventIcon: [
			{
				icon: defIconType.new,
				inPeriod: isEventPeriod(eventTime.new_vip)
			}
		]
	},
	{
		category: "ranking",
		categoryIcon: "ranking",
		translateKey: "lbl_Ranking",
		path: path.ranking.root
	}
];

export default gameList;

export const defGameInfo = {
	Soccer: { tpId: 1, gameId: 1 },
	SabaSoccer: { tpId: 1, gameId: 997 },
	Basketball: { tpId: 1, gameId: 2 },
	Tennis: { tpId: 1, gameId: 5 },
	Cricket: { tpId: 1, gameId: 50 },
	ESportAll: { tpId: 1, gameId: 43 },
	ESportCS: { tpId: 1, gameId: 43, bettype: 1 },
	ESportDota: { tpId: 1, gameId: 43, bettype: 2 },
	ESportKOG: { tpId: 1, gameId: 43, bettype: 3 },
	ESportLOL: { tpId: 1, gameId: 43, bettype: 4 },
	LIVEcasinoN2Live: { tpId: 28 },
	LIVEcasinoWM: { tpId: 20, gameId: 20 },
	LIVEcasinoAB: { tpId: 12, gameId: 12 },
	LIVEcasinoEB: { tpId: 18, gameId: 18 },
	LIVEcasinoSA: { tpId: 2, gameId: 2 },
	LIVEcasinoAE: { tpId: 15, gameId: 15 },
	LIVEcasinoPP: { tpId: 5, gameId: 101 },
	LIVEcasinoDG: { tpId: 4, gameId: 4 },
	LIVEcasinoAG: { tpId: 3, gameId: 3 },
	LIVEcasinoMW: { tpId: 5, gameId: 105 },
	Casino_All: { tpId: 0 },
	Casino_PP: { tpId: 5 },
	casino_ICG: { tpId: 24 },
	Casino_JOKER: { tpId: 9 },
	Casino_CQ9: { tpId: 16 },
	Casino_GPI: { tpId: 6 },
	Casino_YGG: { tpId: 8 },
	Casino_SG: { tpId: 10 },
	Casino_PG: { tpId: 14 },
	// Casino_918Kiss: { tpId: 21, needLogin: true },
	Casino_OW: { tpId: 1, gameId: 208 },
	Fishing_AB3: { tpId: 16, gameId: "AB3" },
	Fishing_AT05: { tpId: 16, gameId: "AT05" },
	// Fishing_AT01: { tpId: 16, gameId: "AT01" },
	Fishing_AT06: { tpId: 16, gameId: "AT06" },
	Fishing_AT04: { tpId: 16, gameId: "AT04" },
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001" },
	// ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002" },
	FishingGG: { tpId: 7, gameId: 10 },
	// FishingSG: { tpId: 10, gameId: "F-SF01" },
	FishingSGW: { tpId: 10, gameId: "F-SF02" },
	CockFighting: { tpId: 17 },
	// VirtualSports: { tpId: 1, gameId: 180 },
	Indo4d: { tpId: 1, gameId: 223 },
	Keno: { tpId: 1, gameId: 202 },
	lottery: { tpId: 1, gameId: 220 },
	NumberGame: { tpId: 1, gameId: 161 },
	oneGame: { tpId: 13 },
	sabaClub: {
		tpId: 1,
		gameId: 200
	}
};

export const defCol = {
	sports: "sports",
	virtualsports: "virtualsports",
	livecasino: "livecasino",
	slot: "slot",
	game: "game",
	cockFighting: "cockFighting",
	kelo: "kelo",
	poker: "poker",
	affiliate: "affiliate",
	ranking: "ranking"
};
