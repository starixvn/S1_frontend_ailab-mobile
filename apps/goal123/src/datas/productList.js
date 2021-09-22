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

import { isEventPeriod } from "../components/common/common";
import path from "../path";
import { eventTime } from "../components/common/eventTime";

export const defGameInfo = {
	Sports: { tpId: 1, gameId: 1 },
	BTISport: { tpId: 29 },
	SabaSoccer: { tpId: 1, gameId: 997 },
	VirtualSports: { tpId: 1, gameId: 180 },
	eSports: { tpId: 1, gameId: 43 },
	Basketball: { tpId: 1, gameId: 2 },
	Volleyball: { tpId: 1, gameId: 6 },
	// CockFighting: { tpId: 17 },
	sabaClub: { tpId: 1, gameId: 171 },
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
	Casino_PT: { tpId: 27, gameId: "0" },
	Casino_ow: { gameId: 208, tpId: 1 },
	Casino_MGP: { tpId: 34 },
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
	NumberGame: { gameId: 161, tpId: 1 },
	kingMaker: { tpId: 11 },
	Casino_Jili: { tpId: 32 },
	tcg: { tpId: 33 }
};

const defIconType = {
	live: " icon-live",
	new: " icon-new"
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
	MG: { tpId: 34, tpGameType: 57 }
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
				spanTextKey: "lbl_Sports",
				tpGameType: 1
			},
			{
				...defGameInfo.SabaSoccer,
				img: "https://banner.goal123.org/hotgame/h5/sabasports.jpg",
				spanTextKey: "lbl_SabaSoccer",
				tpGameType: 1
			},
			{
				img: "https://banner.goal123.org/hotgame/h5/slot.jpg",
				spanTextKey: "lbl_Slots",
				path: path.casino.root
			},
			{
				...defGameInfo.sabaClub,
				img: "https://banner.goal123.org/hotgame/h5/sabaclub.jpg",
				spanTextKey: "lbl_Vgaming",
				tpGameType: 59
			},
			{
				...defGameInfo.Fishing,
				img: "https://banner.goal123.org/hotgame/h5/fishing.jpg",
				spanTextKey: "lbl_Fishing",
				tpGameType: 12
			},
			{
				...defGameInfo.VirtualSports,
				img: "https://banner.goal123.org/hotgame/h5/virtual.jpg",
				spanTextKey: "lbl_VirtualSports",
				tpGameType: 3
			},
			{
				...defGameInfo.Keno,
				img: "https://banner.goal123.org/hotgame/h5/keno.jpg",
				spanTextKey: "lbl_Keno",
				tpGameType: 5
			},
			{
				...defGameInfo.V8Poker,
				img: "https://banner.goal123.org/hotgame/h5/v8.jpg",
				spanTextKey: "lbl_V8Poker",
				tpGameType: 42
			},
			{
				...defGameInfo.eSports,
				img: "https://banner.goal123.org/hotgame/h5/esports.jpg",
				spanTextKey: "lbl_eSports",
				tpGameType: 1
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
				spanTextKey: "lbl_Soccer",
				tpGameType: 1
			},
			{
				...defGameInfo.BTISport,
				img: Sports_BTI,
				spanTextKey: "lbl_BTISport",
				tpGameType: 49,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_BTI)
					}
				]
			},
			{
				...defGameInfo.SabaSoccer,
				img: Sports_SabaSoccer,
				spanTextKey: "lbl_SabaSoccer",
				tpGameType: 1
			},
			{
				...defGameInfo.VirtualSports,
				img: Sports_VirtualSports,
				spanTextKey: "lbl_VirtualSports",
				tpGameType: 3
			},
			{
				...defGameInfo.eSports,
				img: Sports_ESports,
				spanTextKey: "lbl_eSports",
				tpGameType: 1
			},
			{
				...defGameInfo.Basketball,
				img: Sports_Basketball,
				spanTextKey: "lbl_Basketball",
				tpGameType: 1
			},
			{
				...defGameInfo.Volleyball,
				img: Sports_Volleyball,
				spanTextKey: "lbl_Volleyball",
				tpGameType: 1
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
				tpGameType: 55,
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
				spanTextKey: "lbl_Vgaming",
				tpGameType: 59
			},
			{
				...defGameInfo.kingMaker,
				img: kingMaker,
				spanTextKey: "lbl_KingMaker",
				tpGameType: 52,
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
				spanTextKey: "lbl_V8Poker",
				tpGameType: 42
			},
			{
				...defGameInfo.Keno,
				img: Games_Keno,
				spanTextKey: "lbl_Keno",
				tpGameType: 5
			},
			{
				...defGameInfo.lottery,
				img: Games_Lottery,
				spanTextKey: "lbl_Lottery",
				tpGameType: 19
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
				spanTextKey: "lbl_Paradise",
				tpGameType: 44
			},
			{
				...defGameInfo.fish_AT01,
				img: Fishing_Oneshot,
				spanTextKey: "lbl_Oneshot_Fishing",
				tpGameType: 44
			},
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				img: Fishing_DragonBall,
				spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				tpGameType: 40
			},
			{
				...defGameInfo.ICG_FISHING_OF_SAVIORS,
				img: Fishing_Saviors,
				spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				tpGameType: 40
			},
			{
				...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
				img: Fishing_TheTyrant,
				spanTextKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				tpGameType: 40
			},
			{
				...defGameInfo.Fishing,
				img: Fishing_FishingWorld,
				spanTextKey: "lbl_FishingGG",
				tpGameType: 12
			},
			{
				...defGameInfo.FishingSG,
				img: Fishing_FishingGod,
				spanTextKey: "lbl_FishingSG1",
				tpGameType: 31
			},
			{
				...defGameInfo.FishingSGW,
				img: Fishing_FishingWar,
				spanTextKey: "lbl_FishingSG2",
				tpGameType: 31
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
				tpGameType: 7,
				providerImgName: "pp"
			},
			{
				...defGameInfo.Casino_PT,
				parameter: defGameInfo.Casino_PT,
				spanText: "Playtech",
				img: Casino_PT,
				path: path.casino.root,
				providerImgName: "playtech",
				tpGameType: 46,
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
				tpGameType: 53,
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
				tpGameType: 57,
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
				spanText: "Iconic Gaming",
				img: Casino_ICG,
				path: path.casino.root,
				providerImgName: "icg",
				tpGameType: 39
			},
			{
				...defGameInfo.Casino_CQ9,
				parameter: defGameInfo.Casino_CQ9,
				spanText: "CQ9",
				img: Casino_CQ9,
				path: path.casino.root,
				providerImgName: "cq9",
				tpGameType: 29
			},
			{
				...defGameInfo.Casino_GPI,
				parameter: defGameInfo.Casino_GPI,
				spanText: "Game Play",
				img: Casino_GPI,
				path: path.casino.root,
				providerImgName: "gp",
				tpGameType: 11
			},
			{
				...defGameInfo.Casino_YGG,
				parameter: defGameInfo.Casino_YGG,
				spanText: "YGGDrassil",
				img: Casino_YGG,
				path: path.casino.root,
				providerImgName: "yg",
				tpGameType: 14
			},
			{
				...defGameInfo.Casino_SG,
				parameter: defGameInfo.Casino_SG,
				spanText: "Spadegaming",
				img: Casino_SG,
				path: path.casino.root,
				providerImgName: "sg",
				tpGameType: 15
			},
			{
				...defGameInfo.Casino_PG,
				parameter: defGameInfo.Casino_PG,
				spanText: "PG Soft",
				img: Casino_PG,
				path: path.casino.root,
				providerImgName: "pg",
				tpGameType: 17
			},
			{
				...defGameInfo.Casino_ow,
				parameter: defGameInfo.Casino_ow,
				spanText: "Saba Casino",
				img: Casino_OW,
				tpGameType: 4
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
				tpGameType: 16
			},
			{
				...defGameInfo.Casino_PT,
				spanText: "Playtech",
				img: LIVEcasino_PT,
				tpGameType: 48,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.liveCasino_pt)
					}
				],
				useGotoGame: true
			},
			// {
			// 	...defGameInfo.Casino_MGP,
			// 	spanText: "Microgaming",
			// 	img: LIVEcasino_MGP,
			// 	tpGameType: 58,
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
				img: LIVEcasino_N2Live,
				tpGameType: 45
			},
			{
				...defGameInfo.LIVEcasinoWM,
				spanText: "WM Casino",
				img: LIVEcasino_WM,
				tpGameType: 32
			},
			{
				...defGameInfo.LIVEcasinoDG,
				spanText: "Dream Gaming",
				img: LIVEcasino_DG,
				tpGameType: 10
			},
			{
				...defGameInfo.LIVEcasinoAE,
				spanText: "AE Casino",
				img: LIVEcasino_AE,
				tpGameType: 18
			},
			{
				...defGameInfo.LIVEcasinoAG,
				spanText: "Asia Gaming",
				img: LIVEcasino_AG,
				tpGameType: 8
			},
			{
				...defGameInfo.LIVEcasinoAB,
				spanText: "Allbet",
				img: LIVEcasino_AB,
				tpGameType: 6
			},
			{
				...defGameInfo.LIVEcasinoSA,
				spanText: "SA Gaming",
				img: LIVEcasino_SA,
				tpGameType: 9
			},
			{
				...defGameInfo.LIVEcasinoEB,
				spanText: "eBET",
				img: LIVEcasino_EB,
				tpGameType: 28
			}
		]
	}
];

export default gameList;
