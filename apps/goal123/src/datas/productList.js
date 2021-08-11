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

import Games_SabaClub from "../styles/img/hotgame-m-new/games/sabaclub.png";
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

export const defTpCategoryId = {
	All: 0,
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	Cockfighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8
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
				tpCategoryId: defTpCategoryId.Sports
			},
			{
				...defGameInfo.SabaSoccer,
				img: "https://banner.goal123.org/hotgame/h5/sabasports.jpg",
				spanTextKey: "lbl_SabaSoccer",
				tpCategoryId: defTpCategoryId.Sports
			},
			{
				img: "https://banner.goal123.org/hotgame/h5/slot.jpg",
				spanTextKey: "lbl_Slots",
				path: path.casino.root,
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.sabaClub,
				img: "https://banner.goal123.org/hotgame/h5/sabaclub.jpg",
				spanTextKey: "lbl_SabaClub",
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.Fishing,
				img: "https://banner.goal123.org/hotgame/h5/fishing.jpg",
				spanTextKey: "lbl_Fishing",
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.VirtualSports,
				img: "https://banner.goal123.org/hotgame/h5/virtual.jpg",
				spanTextKey: "lbl_VirtualSports",
				tpCategoryId: defTpCategoryId.VirtualSports
			},
			{
				...defGameInfo.Keno,
				img: "https://banner.goal123.org/hotgame/h5/keno.jpg",
				spanTextKey: "lbl_Keno",
				tpCategoryId: defTpCategoryId.Lottery
			},
			{
				...defGameInfo.V8Poker,
				img: "https://banner.goal123.org/hotgame/h5/v8.jpg",
				spanTextKey: "lbl_V8Poker",
				tpCategoryId: defTpCategoryId.Poker
			},
			{
				...defGameInfo.eSports,
				img: "https://banner.goal123.org/hotgame/h5/esports.jpg",
				spanTextKey: "lbl_eSports",
				tpCategoryId: defTpCategoryId.Sports
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
				tpCategoryId: defTpCategoryId.Sports
			},
			{
				...defGameInfo.BTISport,
				img: Sports_BTI,
				spanTextKey: "lbl_BTISport",
				tpCategoryId: defTpCategoryId.Sports,
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
				tpCategoryId: defTpCategoryId.Sports
			},
			{
				...defGameInfo.VirtualSports,
				img: Sports_VirtualSports,
				spanTextKey: "lbl_VirtualSports",
				tpCategoryId: defTpCategoryId.VirtualSports
			},
			{
				...defGameInfo.eSports,
				img: Sports_ESports,
				spanTextKey: "lbl_eSports",
				tpCategoryId: defTpCategoryId.Sports
			},
			{
				...defGameInfo.Basketball,
				img: Sports_Basketball,
				spanTextKey: "lbl_Basketball",
				tpCategoryId: defTpCategoryId.Sports
			},
			{
				...defGameInfo.Volleyball,
				img: Sports_Volleyball,
				spanTextKey: "lbl_Volleyball",
				tpCategoryId: defTpCategoryId.Sports
			}
		]
	},
	// {
	// 	category: "cockFighting",
	// 	categoryIcon: "e-sports",
	// 	translateKey: "lbl_CockFighting",
	// tpCategoryId: defTpCategoryId.Cockfighting,
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
				spanTextKey: "lbl_SabaClub",
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.kingMaker,
				img: kingMaker,
				spanTextKey: "lbl_KingMaker",
				tpCategoryId: defTpCategoryId.Poker,
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
				tpCategoryId: defTpCategoryId.Poker
			},
			{
				...defGameInfo.Keno,
				img: Games_Keno,
				spanTextKey: "lbl_Keno",
				tpCategoryId: defTpCategoryId.Lottery
			},
			{
				...defGameInfo.lottery,
				img: Games_Lottery,
				spanTextKey: "lbl_Lottery",
				tpCategoryId: defTpCategoryId.Lottery
			},
			{
				...defGameInfo.tcg,
				img: Games_TCG,
				spanTextKey: "lbl_tcg",
				tpCategoryId: defTpCategoryId.Lottery,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.tcg)
					}
				]
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
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.fish_AT01,
				img: Fishing_Oneshot,
				spanTextKey: "lbl_Oneshot_Fishing",
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				img: Fishing_DragonBall,
				spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.ICG_FISHING_OF_SAVIORS,
				img: Fishing_Saviors,
				spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
				img: Fishing_TheTyrant,
				spanTextKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.Fishing,
				img: Fishing_FishingWorld,
				spanTextKey: "lbl_FishingGG",
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.FishingSG,
				img: Fishing_FishingGod,
				spanTextKey: "lbl_FishingSG1",
				tpCategoryId: defTpCategoryId.Fishing
			},
			{
				...defGameInfo.FishingSGW,
				img: Fishing_FishingWar,
				spanTextKey: "lbl_FishingSG2",
				tpCategoryId: defTpCategoryId.Fishing
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
				tpCategoryId: defTpCategoryId.Slots,
				providerImgName: "pp"
			},
			{
				...defGameInfo.Casino_PT,
				parameter: defGameInfo.Casino_PT,
				spanText: "Playtech",
				img: Casino_PT,
				path: path.casino.root,
				providerImgName: "playtech",
				tpCategoryId: defTpCategoryId.Slots,
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
				tpCategoryId: defTpCategoryId.Slots,
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
				tpCategoryId: defTpCategoryId.Slots,
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
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.Casino_CQ9,
				parameter: defGameInfo.Casino_CQ9,
				spanText: "CQ9",
				img: Casino_CQ9,
				path: path.casino.root,
				providerImgName: "cq9",
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.Casino_GPI,
				parameter: defGameInfo.Casino_GPI,
				spanText: "Game Play",
				img: Casino_GPI,
				path: path.casino.root,
				providerImgName: "gp",
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.Casino_YGG,
				parameter: defGameInfo.Casino_YGG,
				spanText: "YGGDrassil",
				img: Casino_YGG,
				path: path.casino.root,
				providerImgName: "yg",
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.Casino_SG,
				parameter: defGameInfo.Casino_SG,
				spanText: "Spadegaming",
				img: Casino_SG,
				path: path.casino.root,
				providerImgName: "sg",
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.Casino_PG,
				parameter: defGameInfo.Casino_PG,
				spanText: "PG Soft",
				img: Casino_PG,
				path: path.casino.root,
				providerImgName: "pg",
				tpCategoryId: defTpCategoryId.Slots
			},
			{
				...defGameInfo.Casino_ow,
				parameter: defGameInfo.Casino_ow,
				spanText: "Saba Casino",
				img: Casino_OW
				// tpCategoryId: defTpCategoryId.Slots
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
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.Casino_PT,
				spanText: "Playtech",
				img: LIVEcasino_PT,
				tpCategoryId: defTpCategoryId.LiveCasino,
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
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.LIVEcasinoWM,
				spanText: "WM Casino",
				img: LIVEcasino_WM,
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.LIVEcasinoDG,
				spanText: "Dream Gaming",
				img: LIVEcasino_DG,
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.LIVEcasinoAE,
				spanText: "AE Casino",
				img: LIVEcasino_AE,
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.LIVEcasinoAG,
				spanText: "Asia Gaming",
				img: LIVEcasino_AG,
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.LIVEcasinoAB,
				spanText: "Allbet",
				img: LIVEcasino_AB,
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.LIVEcasinoSA,
				spanText: "SA Gaming",
				img: LIVEcasino_SA,
				tpCategoryId: defTpCategoryId.LiveCasino
			},
			{
				...defGameInfo.LIVEcasinoEB,
				spanText: "eBET",
				img: LIVEcasino_EB,
				tpCategoryId: defTpCategoryId.LiveCasino
			}
		]
	}
];

export default gameList;
