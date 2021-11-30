import Menu_HotGame from "../styles/img/hotgameicon/hot.png";
import Menu_Sports from "../styles/img/hotgameicon/sport.png";
import Menu_Games from "../styles/img/hotgameicon/games.png";
import Menu_Slots from "../styles/img/hotgameicon/slots.png";
import Menu_LiveCasino from "../styles/img/hotgameicon/live.png";
import Menu_Fishing from "../styles/img/hotgameicon/fishing.png";

import Sports_Soccer from "../styles/img/hotgame-m-new/sports/soccer.png";
import Sports_SabaSoccer from "../styles/img/hotgame-m-new/sports/sabasoccer.png";
import Sports_VirtualSports from "../styles/img/hotgame-m-new/sports/virtualsports.png";
import Sports_ESports from "../styles/img/hotgame-m-new/sports/e-sports.png";
import Sports_Basketball from "../styles/img/hotgame-m-new/sports/baseketball.png";
import Sports_Volleyball from "../styles/img/hotgame-m-new/sports/volleyball.png";
import Sports_BTI from "../styles/img/hotgame-m-new/sports/bti.png";

import Games_VGaming from "../styles/img/hotgame-m-new/games/vg.png";
import Games_V8Poker from "../styles/img/hotgame-m-new/games/v8poker.png";
import Games_Keno from "../styles/img/hotgame-m-new/games/keno.png";
import Games_Lottery from "../styles/img/hotgame-m-new/games/lottery.png";
import Games_TCG from "../styles/img/hotgame-m-new/games/tcg.png";
import kingMaker from "../styles/img/hotgame-m-new/games/kingmaker.png";

import Fishing_Paradise from "../styles/img/hotgame-m-new/fishing/fishing-paradise.png";
import Fishing_Oneshot from "../styles/img/hotgame-m-new/fishing/fishing-oneshot.png";
import Fishing_DragonBall from "../styles/img/hotgame-m-new/fishing/fishing-dragonball.png";
import Fishing_Saviors from "../styles/img/hotgame-m-new/fishing/fishing-saviors.png";
import Fishing_TheTyrant from "../styles/img/hotgame-m-new/fishing/fishing-thetyrant.png";
import Fishing_FishingWorld from "../styles/img/hotgame-m-new/fishing/fishing-world.png";
import Fishing_FishingGod from "../styles/img/hotgame-m-new/fishing/fishing-god.png";
import Fishing_FishingWar from "../styles/img/hotgame-m-new/fishing/fishing-war.png";

import Casino_ICG from "../styles/img/hotgame-m-new/slots/slot-icg.png";
import Casino_CQ9 from "../styles/img/hotgame-m-new/slots/slot-cq9.png";
import Casino_GPI from "../styles/img/hotgame-m-new/slots/slot-gpi.png";
import Casino_YGG from "../styles/img/hotgame-m-new/slots/slot-ygg.png";
import Casino_SG from "../styles/img/hotgame-m-new/slots/slot-sg.png";
import Casino_PP from "../styles/img/hotgame-m-new/slots/slot-pp.png";
import Casino_PG from "../styles/img/hotgame-m-new/slots/slot-pg.png";
import Casino_OW from "../styles/img/hotgame-m-new/slots/slots-ow.png";
import Casino_PT from "../styles/img/hotgame-m-new/slots/slot-pt.png";
import Casino_MGP from "../styles/img/hotgame-m-new/slots/slot-mg.png";
import Casino_Jili from "../styles/img/hotgame-m-new/slots/slot-jili.png";
import Casino_NetEnt from "../styles/img/hotgame-m-new/slots/slot-ne.png";
import Casino_RedTiger from "../styles/img/hotgame-m-new/slots/slot-rt.png";

import LIVEcasino_N2Live from "../styles/img/hotgame-m-new/livecasino/livecasino-n2live.png";
import LIVEcasino_WM from "../styles/img/hotgame-m-new/livecasino/livecasino-wm.png";
import LIVEcasino_DG from "../styles/img/hotgame-m-new/livecasino/livecasino-dg.png";
import LIVEcasino_AB from "../styles/img/hotgame-m-new/livecasino/livecasino-allbet.png";
import LIVEcasino_AG from "../styles/img/hotgame-m-new/livecasino/livecasino-ag.png";
import LIVEcasino_PP from "../styles/img/hotgame-m-new/livecasino/livecasino-pp.png";
import LIVEcasino_SA from "../styles/img/hotgame-m-new/livecasino/livecasino-sa.png";
import LIVEcasino_AE from "../styles/img/hotgame-m-new/livecasino/livecasino-ae.png";
import LIVEcasino_EB from "../styles/img/hotgame-m-new/livecasino/livecasino-ebet.png";
import LIVEcasino_PT from "../styles/img/hotgame-m-new/livecasino/livecasino-playtech.png";
import LIVEcasino_MGP from "../styles/img/hotgame-m-new/livecasino/livecasino-mg.png";
import LIVEcasino_EVO from "../styles/img/hotgame-m-new/livecasino/livecasino-evolution.png";

import { isEventPeriod } from "../components/common/common";
import path from "../path";
import { eventTime } from "../components/common/eventTime";

export const defGameInfo = {
	Sports: { tpId: 1, gameId: 1, tpGameType: 1 },
	BTISport: { tpId: 29, tpGameType: 49 },
	SabaSoccer: { tpId: 1, gameId: 997, tpGameType: 1 },
	VirtualSports: { tpId: 1, gameId: 180, tpGameType: 3 },
	eSports: { tpId: 1, gameId: 43, tpGameType: 1 },
	Basketball: { tpId: 1, gameId: 2, tpGameType: 1 },
	Volleyball: { tpId: 1, gameId: 6, tpGameType: 1 },
	// CockFighting: { tpId: 17, tpGameType: 27 },
	sabaClub: { tpId: 1, gameId: 171, tpGameType: 59 },
	V8Poker: { gameId: 0, tpId: 25, tpGameType: 42 },
	Keno: { gameId: 202, tpId: 1, tpGameType: 5 },
	lottery: { gameId: 220, tpId: 1, tpGameType: 19 },
	fish_AB3: { tpId: 16, gameId: "AB3", tpGameType: 44 },
	fish_AT05: { tpId: 16, gameId: "AT05", tpGameType: 44 },
	fish_AT01: { tpId: 16, gameId: "AT01", tpGameType: 44 },
	fish_AT06: { tpId: 16, gameId: "AT06", tpGameType: 44 },
	fish_AT04: { tpId: 16, gameId: "AT04", tpGameType: 44 },
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001", tpGameType: 40 },
	ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002", tpGameType: 40 },
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0003",
		tpGameType: 40
	},
	Fishing: { gameId: 10, tpId: 7, tpGameType: 12 },
	FishingSG: { gameId: "F-SF01", tpId: 10, tpGameType: 31 },
	FishingSGW: { gameId: "F-SF02", tpId: 10, tpGameType: 31 },
	Casino_All: { tpId: 0 },
	casino_ICG: { tpId: 24, tpGameType: 39 },
	Casino_CQ9: { tpId: 16, tpGameType: 29 },
	Casino_GPI: { tpId: 6, tpGameType: 11 },
	Casino_YGG: { tpId: 8, tpGameType: 14 },
	Casino_SG: { tpId: 10, tpGameType: 15 },
	Casino_PP: { tpId: 5, tpGameType: 7 },
	Casino_PG: { tpId: 14, tpGameType: 17 },
	Casino_PT: { tpId: 27, gameId: "0", tpGameType: 46 },
	Casino_ow: { gameId: 208, tpId: 1, tpGameType: 4 },
	Casino_MGP: { tpId: 34, tpGameType: 57 },
	Casino_NetEnt: { tpId: 37, tpGameType: 64 },
	Casino_JOKER: { tpId: 9, tpGameType: 13 },
	Casino_Jili: { tpId: 32, tpGameType: 53 },
	Casino_RedTiger: { tpId: 38, tpGameType: 65 },
	LIVEcasinoN2: { tpId: 28, tpGameType: 45 },
	LIVEcasinoWM: { gameId: 20, tpId: 20, tpGameType: 32 },
	LIVEcasinoDG: { tpId: 4, gameId: 4, tpGameType: 10 },
	LIVEcasinoPP: { gameId: 101, tpId: 5, tpGameType: 16 },
	LIVEcasinoAE: { gameId: 15, tpId: 15, tpGameType: 18 },
	LIVEcasinoAG: { gameId: 3, tpId: 3, tpGameType: 8 },
	LIVEcasinoAB: { gameId: 12, tpId: 12, tpGameType: 6 },
	LIVEcasinoSA: { gameId: 2, tpId: 2, tpGameType: 9 },
	LIVEcasinoEB: { gameId: 18, tpId: 18, tpGameType: 28 },
	LIVEcasinoMW: { gameId: 105, tpId: 5 },
	LIVEcasinoEVO: { gameId: 0, tpId: 36, tpGameType: 63 },
	LIVEcasinoPT: { tpId: 27, gameId: "0", tpGameType: 48 },
	LIVEcasinoMGP: { tpId: 34, tpGameType: 58 },
	Indo4d: { gameId: 223, tpId: 1, tpGameType: 20 },
	NumberGame: { gameId: 161, tpId: 1, tpGameType: 2 },
	kingMaker: { tpId: 11, tpGameType: 52 },
	tcg: { tpId: 33, tpGameType: 55 }
};

const defIconType = {
	live: " liveicon",
	new: " newicon"
};

export const defCol = {
	hotGame: "hotGame",
	sports: "sports",
	games: "games",
	fishing: "fishing",
	slots: "slots",
	livecasino: "livecasino"
};

export const defSlotTpGameType = {
	Saba: { tpId: 1, tpGameType: 4 },
	PP: { tpId: 5, tpGameType: 7 },
	GPI: { tpId: 6, tpGameType: 11 },
	Joker: { tpId: 9, tpGameType: 13 },
	YGG: { tpId: 8, tpGameType: 14 },
	SG: { tpId: 10, tpGameType: 15 },
	PG: { tpId: 14, tpGameType: 17 },
	CQ9: { tpId: 16, tpGameType: 29 },
	Iconic: { tpId: 24, tpGameType: 39 },
	PT: { tpId: 27, tpGameType: 46 },
	JILI: { tpId: 32, tpGameType: 53 },
	MG: { tpId: 34, tpGameType: 57 },
	NetEnt: { tpId: 37, tpGameType: 64 },
	RedTiger: { tpId: 38, tpGameType: 65 }
};

const gameList = [
	{
		category: "hotGame",
		translateKey: "lbl_Hot",
		img: Menu_HotGame,
		items: [
			{
				...defGameInfo.Sports,
				img: "https://banner.goal123.org/hotgame/h5/sport.jpg",
				spanTextKey: "lbl_Sports"
			},
			{
				...defGameInfo.SabaSoccer,
				img: "https://banner.goal123.org/hotgame/h5/sabasports.jpg",
				spanTextKey: "lbl_SabaSoccer"
			},
			{
				img: "https://banner.goal123.org/hotgame/h5/slot.jpg",
				spanTextKey: "lbl_Slots",
				path: path.casino.root
			},
			{
				...defGameInfo.sabaClub,
				img: "https://banner.goal123.org/hotgame/h5/sabaclub.jpg",
				spanTextKey: "lbl_Vgaming"
			},
			{
				...defGameInfo.Fishing,
				img: "https://banner.goal123.org/hotgame/h5/fishing.jpg",
				spanTextKey: "lbl_Fishing"
			},
			{
				...defGameInfo.VirtualSports,
				img: "https://banner.goal123.org/hotgame/h5/virtual.jpg",
				spanTextKey: "lbl_VirtualSports"
			},
			{
				...defGameInfo.Keno,
				img: "https://banner.goal123.org/hotgame/h5/keno.jpg",
				spanTextKey: "lbl_Keno"
			},
			{
				...defGameInfo.V8Poker,
				img: "https://banner.goal123.org/hotgame/h5/v8.jpg",
				spanTextKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.eSports,
				img: "https://banner.goal123.org/hotgame/h5/esports.jpg",
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
			// {
			// 	...defGameInfo.BTISport,
			// 	img: Sports_BTI,
			// 	spanTextKey: "lbl_BTISport",
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.new_BTI)
			// 		}
			// 	]
			// },
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
				...defGameInfo.tcg,
				img: Games_TCG,
				spanTextKey: "lbl_tcg",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.tcg)
					}
				]
			},
			{
				...defGameInfo.sabaClub,
				img: Games_VGaming,
				spanTextKey: "lbl_Vgaming"
			},
			{
				...defGameInfo.kingMaker,
				img: kingMaker,
				spanTextKey: "lbl_KingMaker",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_Km)
					}
				]
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
				...defGameInfo.Casino_PP,
				parameter: defGameInfo.Casino_PP,
				spanText: "Pragmatic Play",
				img: Casino_PP,
				path: path.casino.root,
				providerImgName: "pp"
			},
			{
				...defGameInfo.Casino_NetEnt,
				parameter: defGameInfo.Casino_NetEnt,
				spanText: "NetEnt",
				img: Casino_NetEnt,
				path: path.casino.root,
				providerImgName: "ne",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_NetEnt)
					}
				]
			},
			{
				...defGameInfo.Casino_RedTiger,
				parameter: defGameInfo.Casino_RedTiger,
				spanText: "Red Tiger",
				img: Casino_RedTiger,
				path: path.casino.root,
				providerImgName: "rt",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_RedTiger)
					}
				]
			},
			{
				...defGameInfo.Casino_PT,
				parameter: defGameInfo.Casino_PT,
				spanText: "Playtech",
				img: Casino_PT,
				path: path.casino.root,
				providerImgName: "playtech",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_pt)
					}
				]
			},
			{
				...defGameInfo.Casino_Jili,
				parameter: defGameInfo.Casino_Jili,
				spanText: "Jili",
				img: Casino_Jili,
				path: path.casino.root,
				providerImgName: "jili",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.jili)
					}
				]
			},
			{
				...defGameInfo.Casino_MGP,
				parameter: defGameInfo.Casino_MGP,
				spanText: "Microgaming",
				img: Casino_MGP,
				path: path.casino.root,
				providerImgName: "mg",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_MGP)
					}
				]
			},
			{
				...defGameInfo.casino_ICG,
				parameter: defGameInfo.casino_ICG,
				spanText: "Astro Tech",
				img: Casino_ICG,
				path: path.casino.root,
				providerImgName: "icg"
			},
			{
				...defGameInfo.Casino_CQ9,
				parameter: defGameInfo.Casino_CQ9,
				spanText: "CQ9",
				img: Casino_CQ9,
				path: path.casino.root,
				providerImgName: "cq9"
			},
			{
				...defGameInfo.Casino_GPI,
				parameter: defGameInfo.Casino_GPI,
				spanText: "Game Play",
				img: Casino_GPI,
				path: path.casino.root,
				providerImgName: "gp"
			},
			{
				...defGameInfo.Casino_YGG,
				parameter: defGameInfo.Casino_YGG,
				spanText: "YGGDrassil",
				img: Casino_YGG,
				path: path.casino.root,
				providerImgName: "yg"
			},
			{
				...defGameInfo.Casino_SG,
				parameter: defGameInfo.Casino_SG,
				spanText: "Spadegaming",
				img: Casino_SG,
				path: path.casino.root,
				providerImgName: "sg"
			},
			{
				...defGameInfo.Casino_PG,
				parameter: defGameInfo.Casino_PG,
				spanText: "PG Soft",
				img: Casino_PG,
				path: path.casino.root,
				providerImgName: "pg"
			},
			{
				...defGameInfo.Casino_ow,
				parameter: defGameInfo.Casino_ow,
				spanText: "Saba Casino",
				img: Casino_OW
			}
		]
	},
	{
		category: "livecasino",
		translateKey: "lbl_Live",
		img: Menu_LiveCasino,
		items: [
			{
				...defGameInfo.LIVEcasinoPP,
				spanText: "Pragmatic Play",
				img: LIVEcasino_PP,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.liveCasino_pp)
					}
				]
			},
			{
				...defGameInfo.LIVEcasinoEVO,
				spanText: "Evolution Gaming",
				img: LIVEcasino_EVO,
				tpGameType: 63,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.liveCasino_evo)
					}
				]
			},
			{
				...defGameInfo.LIVEcasinoPT,
				spanText: "Playtech",
				img: LIVEcasino_PT,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.liveCasino_pt)
					}
				],
				useGotoGame: true
			},
			// {
			// 	...defGameInfo.LIVEcasinoMGP,
			// 	spanText: "Microgaming",
			// 	img: LIVEcasino_MGP,
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.liveCasino_MGP)
			// 		}
			// 	]
			// },
			{
				...defGameInfo.LIVEcasinoN2,
				spanText: "n2-LIVE",
				img: LIVEcasino_N2Live
			},
			{
				...defGameInfo.LIVEcasinoWM,
				spanText: "WM Casino",
				img: LIVEcasino_WM
			},
			{
				...defGameInfo.LIVEcasinoDG,
				spanText: "Dream Gaming",
				img: LIVEcasino_DG
			},
			{
				...defGameInfo.LIVEcasinoAE,
				spanText: "AE Casino",
				img: LIVEcasino_AE
			},
			{
				...defGameInfo.LIVEcasinoAG,
				spanText: "Asia Gaming",
				img: LIVEcasino_AG
			},
			{
				...defGameInfo.LIVEcasinoAB,
				spanText: "Allbet",
				img: LIVEcasino_AB
			},
			{
				...defGameInfo.LIVEcasinoSA,
				spanText: "SA Gaming",
				img: LIVEcasino_SA
			},
			{
				...defGameInfo.LIVEcasinoEB,
				spanText: "eBET",
				img: LIVEcasino_EB
			}
		]
	}
];

export default gameList;
