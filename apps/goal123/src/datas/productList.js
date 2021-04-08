import Menu_HotGame from "../styles/img/sidbar/hotgmae.png";
import Menu_Sports from "../styles/img/sidbar/sports.png";
import Menu_Games from "../styles/img/sidbar/games.png";
import Menu_Slots from "../styles/img/sidbar/slots.png";
import Menu_LiveCasino from "../styles/img/sidbar/livecasino.png";
import Menu_Fishing from "../styles/img/sidbar/fishing.jpg";

import HotGame_Sports from "../styles/img/hotgame-m/sports.png";
import HotGame_SabaSoccer from "../styles/img/hotgame-m/sabasoccer.png";
import HotGame_Slots from "../styles/img/hotgame-m/slots.png";
import HotGame_SabaClub from "../styles/img/hotgame-m/sabaclub.png";
import HotGame_Fishing from "../styles/img/hotgame-m/fishing.png";
import HotGame_VirtualSports from "../styles/img/hotgame-m/virtualsports.png";
import HotGame_Keno from "../styles/img/hotgame-m/keno.png";
import HotGame_V8Poker from "../styles/img/hotgame-m/v8poker.png";
import HotGame_ESports from "../styles/img/hotgame-m/e-sports.png";

import Sports_Soccer from "../styles/img/hotgame-m/sports/soccer.png";
import Sports_SabaSoccer from "../styles/img/hotgame-m/sports/sabasoccer.png";
import Sports_VirtualSports from "../styles/img/hotgame-m/sports/virtualsports.png";
import Sports_ESports from "../styles/img/hotgame-m/sports/e-sports.png";
import Sports_Basketball from "../styles/img/hotgame-m/sports/baseketball.png";
import Sports_Volleyball from "../styles/img/hotgame-m/sports/volleyball.png";

import Games_SabaClub from "../styles/img/hotgame-m/games/sabaclub.png";
import Games_V8Poker from "../styles/img/hotgame-m/games/v8poker.png";
import Games_Keno from "../styles/img/hotgame-m/games/keno.png";
import Games_Lottery from "../styles/img/hotgame-m/games/lottery.png";

import Fishing_Paradise from "../styles/img/hotgame-m/fishing/fishing-paradise.png";
import Fishing_Oneshot from "../styles/img/hotgame-m/fishing/fishing-oneshot.png";
import Fishing_DragonBall from "../styles/img/hotgame-m/fishing/fishing-dragonball.png";
import Fishing_Saviors from "../styles/img/hotgame-m/fishing/fishing-saviors.png";
import Fishing_TheTyrant from "../styles/img/hotgame-m/fishing/fishing-thetyrant.png";
import Fishing_FishingWorld from "../styles/img/hotgame-m/fishing/fishing-world.png";
import Fishing_FishingGod from "../styles/img/hotgame-m/fishing/fishing-god.png";
import Fishing_FishingWar from "../styles/img/hotgame-m/fishing/fishing-war.png";

import Casino_ICG from "../styles/img/hotgame-m/slots/slot-icg.png";
import Casino_CQ9 from "../styles/img/hotgame-m/slots/slot-cq9.png";
import Casino_GPI from "../styles/img/hotgame-m/slots/slot-gpi.png";
import Casino_YGG from "../styles/img/hotgame-m/slots/slot-ygg.png";
import Casino_SG from "../styles/img/hotgame-m/slots/slot-sg.png";
import Casino_PP from "../styles/img/hotgame-m/slots/slot-pp.png";
import Casino_PG from "../styles/img/hotgame-m/slots/slot-pg.png";
import Casino_OW from "../styles/img/hotgame-m/slots/slots-ow.png";

import LIVEcasino_N2Live from "../styles/img/hotgame-m/livecasino/livecasino-n2live.png";
import LIVEcasino_WM from "../styles/img/hotgame-m/livecasino/livecasino-wm.png";
import LIVEcasino_DG from "../styles/img/hotgame-m/livecasino/livecasino-dg.png";
import LIVEcasino_AB from "../styles/img/hotgame-m/livecasino/livecasino-allbet.png";
import LIVEcasino_AG from "../styles/img/hotgame-m/livecasino/livecasino-ag.png";
import LIVEcasino_PP from "../styles/img/hotgame-m/livecasino/livecasino-pp.png";
import LIVEcasino_SA from "../styles/img/hotgame-m/livecasino/livecasino-sa.png";
import LIVEcasino_AE from "../styles/img/hotgame-m/livecasino/livecasino-ae.png";
import LIVEcasino_EB from "../styles/img/hotgame-m/livecasino/livecasino-ebet.png";

import { isEventPeriod } from "../components/common/common";
import path from "../path";

export const defGameInfo = {
	Sports: { tpId: 1, gameId: 1 },
	SabaSoccer: { tpId: 1, gameId: 997 },
	VirtualSports: { tpId: 1, gameId: 180 },
	eSports: { tpId: 1, gameId: 43 },
	Basketball: { tpId: 1, gameId: 2 },
	Volleyball: { tpId: 1, gameId: 6 },
	// CockFighting: { tpId: 17 },
	sabaClub: { tpId: 1, gameId: 200 },
	V8Poker: { gameId: 0, tpId: 25 },
	Keno: { gameId: 202, tpId: 1 },
	lottery: { gameId: 220, tpId: 1 },
	fish_AB3: { tpId: 16, gameId: "AB3" },
	fish_AT05: { tpId: 16, gameId: "AT05" },
	fish_AT01: { tpId: 16, gameId: "AT01" },
	fish_AT06: { tpId: 16, gameId: "AT06" },
	fish_AT04: { tpId: 16, gameId: "AT04" },
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001" },
	ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002" },
	ICG_THE_TYRANT_AND_THE_PRINCESS: { tpId: 24, gameId: "cmf0003" },
	Fishing: { gameId: 10, tpId: 7 },
	FishingSG: { gameId: "F-SF01", tpId: 10 },
	FishingSGW: { gameId: "F-SF02", tpId: 10 },
	Casino_All: { tpId: 0 },
	casino_ICG: { tpId: 24 },
	Casino_CQ9: { tpId: 16 },
	Casino_GPI: { tpId: 6 },
	Casino_YGG: { tpId: 8 },
	Casino_SG: { tpId: 10 },
	Casino_PP: { tpId: 5 },
	Casino_PG: { tpId: 14 },
	Casino_ow: { gameId: 208, tpId: 1 },
	LIVEcasinoN2: { tpId: 28 },
	LIVEcasinoWM: { gameId: 20, tpId: 20 },
	LIVEcasinoDG: { tpId: 4, gameId: 4 },
	LIVEcasinoPP: { gameId: 101, tpId: 5 },
	LIVEcasinoAE: { gameId: 15, tpId: 15 },
	LIVEcasinoAG: { gameId: 3, tpId: 3 },
	LIVEcasinoAB: { gameId: 12, tpId: 12 },
	LIVEcasinoSA: { gameId: 2, tpId: 2 },
	LIVEcasinoEB: { gameId: 18, tpId: 18 },
	LIVEcasinoMW: { gameId: 105, tpId: 5 },
	Casino_JOKER: { tpId: 9 },
	Indo4d: { gameId: 223, tpId: 1 },
	NumberGame: { gameId: 161, tpId: 1 }
};

const defIconType = {
	live: " icon-live",
	new: " icon-new"
};

const eventTime = {
	ranking: { startDate: "2021/01/01 12:00:00" },
	new_vip: { startDate: "2021/03/11 11:00:00" },
	new_LiveCasino_N2Live: { startDate: "2021/03/12 11:00:00" }
};

export const defCol = {
	hotGame: "hotGame",
	sports: "sports",
	games: "games",
	fishing: "fishing",
	slots: "slots",
	livecasino: "livecasino"
};

const gameList = [
	{
		category: "hotGame",
		translateKey: "lbl_HotGame",
		img: Menu_HotGame,
		items: [
			{
				...defGameInfo.Sports,
				img: HotGame_Sports,
				spanTextKey: "lbl_Sports"
			},
			{
				...defGameInfo.SabaSoccer,
				img: HotGame_SabaSoccer,
				spanTextKey: "lbl_SabaSoccer"
			},
			{
				img: HotGame_Slots,
				spanTextKey: "lbl_Slots",
				path: path.casino.root
			},
			{
				...defGameInfo.sabaClub,
				img: HotGame_SabaClub,
				spanTextKey: "lbl_SabaClub"
			},
			{
				...defGameInfo.Fishing,
				img: HotGame_Fishing,
				spanTextKey: "lbl_Fishing"
			},
			{
				...defGameInfo.VirtualSports,
				img: HotGame_VirtualSports,
				spanTextKey: "lbl_VirtualSports"
			},
			{
				...defGameInfo.Keno,
				img: HotGame_Keno,
				spanTextKey: "lbl_Keno"
			},
			{
				...defGameInfo.V8Poker,
				img: HotGame_V8Poker,
				spanTextKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.eSports,
				img: HotGame_ESports,
				spanTextKey: "lbl_eSports"
			},
			{
				...defGameInfo.eSports,
				img: HotGame_ESports,
				spanTextKey: "lbl_eSports"
			}
		]
	},
	{
		category: "sports",
		translateKey: "lbl_Sports",
		img: Menu_Sports,
		items: [
			{
				...defGameInfo.Sports,
				img: Sports_Soccer,
				spanTextKey: "lbl_Soccer"
			},
			{
				...defGameInfo.SabaSoccer,
				img: Sports_SabaSoccer,
				spanTextKey: "lbl_SabaSoccer"
			},
			{
				...defGameInfo.VirtualSports,
				img: Sports_VirtualSports,
				spanTextKey: "lbl_VirtualSports"
			},
			{
				...defGameInfo.eSports,
				img: Sports_ESports,
				spanTextKey: "lbl_eSports"
			},
			{
				...defGameInfo.Basketball,
				img: Sports_Basketball,
				spanTextKey: "lbl_Basketball"
			},
			{
				...defGameInfo.Volleyball,
				img: Sports_Volleyball,
				spanTextKey: "lbl_Volleyball"
			}
		]
	},
	// {
	// 	category: "cockFighting",
	// 	categoryIcon: "e-sports",
	// 	translateKey: "lbl_CockFighting",
	// 	items: [
	// 		{
	// 			...defGameInfo.CockFighting,
	// 			icon: "e-sports",
	// 			img: Cockfighting,
	// 			spanTextKey: "lbl_CockFighting"
	// 		}
	// 	]
	// },
	{
		category: "games",
		translateKey: "lbl_Games",
		img: Menu_Games,
		items: [
			{
				...defGameInfo.sabaClub,
				img: Games_SabaClub,
				spanTextKey: "lbl_SabaClub"
			},
			{
				...defGameInfo.V8Poker,
				img: Games_V8Poker,
				spanTextKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.Keno,
				img: Games_Keno,
				spanTextKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				img: Games_Lottery,
				spanTextKey: "lbl_Lottery"
			}
		]
	},
	{
		category: "fishing",
		translateKey: "lbl_Fishing",
		img: Menu_Fishing,
		items: [
			{
				...defGameInfo.fish_AB3,
				img: Fishing_Paradise,
				spanTextKey: "lbl_Paradise"
			},
			{
				...defGameInfo.fish_AT01,
				img: Fishing_Oneshot,
				spanTextKey: "lbl_Oneshot_Fishing"
			},
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				img: Fishing_DragonBall,
				spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING"
			},
			{
				...defGameInfo.ICG_FISHING_OF_SAVIORS,
				img: Fishing_Saviors,
				spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS"
			},
			{
				...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
				img: Fishing_TheTyrant,
				spanTextKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS"
			},
			{
				...defGameInfo.Fishing,
				img: Fishing_FishingWorld,
				spanTextKey: "lbl_FishingGG"
			},
			{
				...defGameInfo.FishingSG,
				img: Fishing_FishingGod,
				spanTextKey: "lbl_FishingSG1"
			},
			{
				...defGameInfo.FishingSGW,
				img: Fishing_FishingWar,
				spanTextKey: "lbl_FishingSG2"
			}
		]
	},
	{
		category: "slots",
		translateKey: "lbl_Slots",
		img: Menu_Slots,
		items: [
			{
				...defGameInfo.casino_ICG,
				parameter: defGameInfo.casino_ICG,
				spanText: "ICG",
				img: Casino_ICG,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_CQ9,
				parameter: defGameInfo.Casino_CQ9,
				spanText: "CQ9",
				img: Casino_CQ9,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_GPI,
				parameter: defGameInfo.Casino_GPI,
				spanText: "GPI",
				img: Casino_GPI,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_YGG,
				parameter: defGameInfo.Casino_YGG,
				spanText: "YGG",
				img: Casino_YGG,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_SG,
				parameter: defGameInfo.Casino_SG,
				spanText: "SG",
				img: Casino_SG,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_PP,
				parameter: defGameInfo.Casino_PP,
				spanText: "PP",
				img: Casino_PP,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_PG,
				parameter: defGameInfo.Casino_PG,
				spanText: "PG",
				img: Casino_PG,
				path: path.casino.root
			},
			{
				...defGameInfo.Casino_ow,
				parameter: defGameInfo.Casino_ow,
				spanText: "OW",
				img: Casino_OW,
				path: path.casino.root
			}
		]
	},
	{
		category: "livecasino",
		translateKey: "lbl_LiveCasino",
		img: Menu_LiveCasino,
		items: [
			{
				...defGameInfo.LIVEcasinoN2,
				spanText: "N2Live",
				img: LIVEcasino_N2Live,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_LiveCasino_N2Live)
					}
				]
			},
			{
				...defGameInfo.LIVEcasinoWM,
				spanText: "WM",
				img: LIVEcasino_WM
			},
			{
				...defGameInfo.LIVEcasinoDG,
				spanText: "DG",
				img: LIVEcasino_DG
			},
			{
				...defGameInfo.LIVEcasinoPP,
				spanText: "PP",
				img: LIVEcasino_PP
			},
			{
				...defGameInfo.LIVEcasinoAE,
				spanText: "AE",
				img: LIVEcasino_AE
			},
			{
				...defGameInfo.LIVEcasinoAG,
				spanText: "AG",
				img: LIVEcasino_AG
			},
			{
				...defGameInfo.LIVEcasinoAB,
				spanText: "AB",
				img: LIVEcasino_AB
			},
			{
				...defGameInfo.LIVEcasinoSA,
				spanText: "SA",
				img: LIVEcasino_SA
			},
			{
				...defGameInfo.LIVEcasinoEB,
				spanText: "EB",
				img: LIVEcasino_EB
			}
		]
	}
];

export default gameList;
