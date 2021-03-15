import Sport from "../styles/img/sport.jpg";
import Virtual_sports from "../styles/img/virtual_sports.jpg";
import Esports from "../styles/img/e-sports.jpg";
import LIVEcasino_DG from "../styles/img/LIVEcasino_DG.jpg";
import LIVEcasino_PP from "../styles/img/LIVEcasino_PP.jpg";
import LIVEcasino_AE from "../styles/img/LIVEcasino_AE.jpg";
import LIVEcasino_AG from "../styles/img/LIVEcasino_AG.jpg";
import LIVEcasino_AB from "../styles/img/LIVEcasino_AB.jpg";
import LIVEcasino_SA from "../styles/img/LIVEcasino_SA.jpg";
import LIVEcasino_EB from "../styles/img/LIVEcasino_EB.jpg";
import LIVEcasino_N2Live from "../styles/img/LIVEcasino_n2live.jpg";
// import LIVEcasino_MW from "../styles/img/LIVEcasino_MW.jpg";
import LIVEcasino_WM from "../styles/img/LIVEcasino_WM.jpg";
import Coming_soon from "../styles/img/coming_soon.jpg";
import Keno from "../styles/img/keno.jpg";
import Lottery from "../styles/img/lottery.jpg";
import SabaClub from "../styles/img/saba.jpg";
import Casino from "../styles/img/casino.jpg";
import Affiliate from "../styles/img/affiliate.jpg";
import { siteInfo } from "../config";
import fish_GG from "../styles/img/fish_GG.jpg";
import fish_SG from "../styles/img/fish_SG.jpg";
import fish_SGW from "../styles/img/fish_SGW.jpg";
import path from "../path";
import ranking from "../styles/img/ranking.jpg";
import fish_DBF from "../styles/img/fish_ICG_DB.jpg";
import fish_FOS from "../styles/img/fish_ICG_FOS.jpg";
import fish_TAP from "../styles/img/fish_ICG_TTAT.jpg";
// import fish_TOS from "../styles/img/fish_ICG_TOS.jpg";
import V8Poker from "../styles/img/V8.jpg";

import fish_AB3 from "../styles/img/paradise.jpg";
// import fish_AT05 from "../styles/img/luckyfishing.jpg";
import fish_AT01 from "../styles/img/oneshotfishing.jpg";
// import fish_AT06 from "../styles/img/watermarginfishing.jpg";
// import fish_AT04 from "../styles/img/thunderfighter.jpg";
import vip from "../styles/img/vip.jpg";

import { isEventPeriod } from "../components/common/common";

export const defGameInfo = {
	Sports: { tpId: 1, gameId: 1 },
	// CockFighting: { tpId: 17 },
	VirtualSports: { tpId: 1, gameId: 180 },
	eSports: { tpId: 1, gameId: 43 },
	LIVEcasinoDG: { tpId: 4, gameId: 4 },
	LIVEcasinoPP: { gameId: 101, tpId: 5 },
	LIVEcasinoAE: { gameId: 15, tpId: 15 },
	LIVEcasinoAG: { gameId: 3, tpId: 3 },
	LIVEcasinoAB: { gameId: 12, tpId: 12 },
	LIVEcasinoSA: { gameId: 2, tpId: 2 },
	LIVEcasinoEB: { gameId: 18, tpId: 18 },
	LIVEcasinoMW: { gameId: 105, tpId: 5 },
	LIVEcasinoWM: { gameId: 20, tpId: 20 },
	LIVEcasinoN2: { tpId: 28 },
	Casino_ow: { gameId: 208, tpId: 1 },
	Casino_All: { tpId: 0 },
	Casino_PP: { tpId: 5 },
	Casino_SG: { tpId: 10 },
	Casino_PG: { tpId: 14 },
	Casino_JOKER: { tpId: 9 },
	Casino_YGG: { tpId: 8 },
	Casino_GPI: { tpId: 6 },
	Casino_CQ9: { tpId: 16 },
	Fishing: { gameId: 10, tpId: 7 },
	FishingSG: { gameId: "F-SF01", tpId: 10 },
	FishingSGW: { gameId: "F-SF02", tpId: 10 },
	Indo4d: { gameId: 223, tpId: 1 },
	Keno: { gameId: 202, tpId: 1 },
	lottery: { gameId: 220, tpId: 1 },
	NumberGame: { gameId: 161, tpId: 1 },
	sabaClub: {
		tpId: 1,
		gameId: 200
	},
	casino_ICG: {
		tpId: 24
	},
	ICG_DRAGONBALL_FISHING: {
		tpId: 24,
		gameId: "cmf0001"
	},
	ICG_FISHING_OF_SAVIORS: {
		tpId: 24,
		gameId: "cmf0002"
	},
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0003"
	},
	V8Poker: { gameId: 0, tpId: 25 },
	fish_AB3: {
		tpId: 16,
		gameId: "AB3"
	},
	fish_AT05: {
		tpId: 16,
		gameId: "AT05"
	},
	fish_AT01: {
		tpId: 16,
		gameId: "AT01"
	},
	fish_AT06: {
		tpId: 16,
		gameId: "AT06"
	},
	fish_AT04: {
		tpId: 16,
		gameId: "AT04"
	}
};

const defIconType = {
	live: " icon-live",
	new: " icon-new"
};

const eventTime = {
	ranking: { startDate: "2021/01/01 12:00:00" },
	new_V8Poker: { endDate: "2021/03/05 23:59:59" },
	new_CQ9: { endDate: "2021/03/05 11:00:00" },
	new_ICG: { endDate: "2021/02/05 11:00:00" },
	new_vip: { startDate: "2021/03/11 11:00:00" },
	new_LiveCasino_N2Live: { startDate: "2021/03/12 11:00:00" }
};

const gameList = langId => [
	{
		category: "sports",
		categoryIcon: "sports",
		translateKey: "lbl_Sports",
		items: [
			{
				...defGameInfo.Sports,
				icon: "soccer",
				img: Sport,
				spanTextKey: "lbl_Sports"
			},
			{
				...defGameInfo.VirtualSports,
				icon: "virtual-sports",
				img: Virtual_sports,
				spanTextKey: "lbl_VirtualSports"
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
		category: "game",
		categoryIcon: "game",
		translateKey: "lbl_Games",
		items: [
			{
				...defGameInfo.sabaClub,
				icon: "game",
				img: SabaClub,
				spanTextKey: "lbl_SabaClub"
			},
			{
				...defGameInfo.Keno,
				icon: "keno",
				img: Keno,
				spanTextKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				icon: "lottery",
				img: Lottery,
				spanTextKey: "lbl_Lottery"
			}
		]
	},
	{
		category: "poker",
		translateKey: "lbl_V8Poker",
		items: [
			{
				...defGameInfo.V8Poker,
				icon: "casino",
				img: V8Poker,
				spanTextKey: "lbl_V8Poker",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_V8Poker)
					}
				]
			}
		]
	},
	{
		category: "fishing",
		categoryIcon: "game",
		className: "casinoList",
		translateKey: "lbl_Fishing",
		comingSoonImg: Coming_soon,
		items: [
			{
				...defGameInfo.fish_AB3,
				img: fish_AB3,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_CQ9)
					}
				]
			},
			// {
			// 	...defGameInfo.fish_AT05,
			// 	img: fish_AT05,
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.new_CQ9)
			// 		}
			// 	]
			// },
			{
				...defGameInfo.fish_AT01,
				img: fish_AT01,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_CQ9)
					}
				]
			},
			// {
			// 	...defGameInfo.fish_AT06,
			// 	img: fish_AT06,
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.new_CQ9)
			// 		}
			// 	]
			// },
			// {
			// 	...defGameInfo.fish_AT04,
			// 	img: fish_AT04,
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.new_CQ9)
			// 		}
			// 	]
			// },
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				img: fish_DBF,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_ICG)
					}
				]
			},
			{
				...defGameInfo.ICG_FISHING_OF_SAVIORS,
				img: fish_FOS,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_ICG)
					}
				]
			},
			{
				...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
				img: fish_TAP,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_ICG)
					}
				]
			},
			{
				...defGameInfo.Fishing,
				img: fish_GG
			},
			{
				...defGameInfo.FishingSG,
				img: fish_SG
			},
			{
				...defGameInfo.FishingSGW,
				img: fish_SGW
			}
		]
	},
	{
		category: "eSports",
		categoryIcon: "e-sports",
		translateKey: "lbl_eSports",
		items: [
			{
				...defGameInfo.eSports,
				icon: "e-sports",
				img: Esports,
				spanTextKey: "lbl_eSports"
			}
		]
	},
	{
		category: "slots",
		categoryIcon: "casino",
		translateKey: "lbl_Slots",
		items: [
			{
				...defGameInfo.Casino_All,
				parameter: { tpId: defGameInfo.Casino_All.tpId },
				img: Casino,
				icon: "casino",
				spanTextKey: "lbl_Slots",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_ICG)
					}
				]
			}
		]
	},
	{
		category: "livecasino",
		categoryIcon: "livecasino",
		className: "casinoList",
		translateKey: "lbl_LiveCasino",
		comingSoonImg: Coming_soon,
		items: [
			{
				...defGameInfo.LIVEcasinoN2,
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
				img: LIVEcasino_WM
			},
			{
				...defGameInfo.LIVEcasinoDG,
				img: LIVEcasino_DG
			},
			{
				...defGameInfo.LIVEcasinoPP,
				img: LIVEcasino_PP
			},
			{
				...defGameInfo.LIVEcasinoAE,
				img: LIVEcasino_AE
			},
			{
				...defGameInfo.LIVEcasinoAG,
				img: LIVEcasino_AG
			},
			{
				...defGameInfo.LIVEcasinoAB,
				img: LIVEcasino_AB
			},
			{
				...defGameInfo.LIVEcasinoSA,
				img: LIVEcasino_SA
			},
			{
				...defGameInfo.LIVEcasinoEB,
				img: LIVEcasino_EB
			}
		]
	},
	{
		category: "affiliate",
		categoryIcon: "affiliate",
		translateKey: "lbl_Affiliates",
		href: siteInfo(langId).affiliateLink,
		items: [
			{
				icon: "affiliate",
				img: Affiliate,
				spanTextKey: "lbl_Affiliates"
			}
		]
	},
	{
		category: "vip",
		translateKey: "lbl_VIP",
		items: [
			{
				icon: "vip",
				path: path.vip.root,
				img: vip,
				spanTextKey: "lbl_VIP",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_vip)
					}
				]
			}
		]
	},
	{
		category: "ranking",
		categoryIcon: "icon32px_top",
		translateKey: "lbl_Ranking",
		eventIcon: [
			{
				icon: defIconType.live,
				inPeriod: isEventPeriod(eventTime.ranking)
			}
		],
		items: [
			{
				icon: "icon32px_top",
				path: path.leaderBoard.root,
				img: ranking,
				spanTextKey: "lbl_Ranking"
			}
		]
	}
];

export default gameList;
