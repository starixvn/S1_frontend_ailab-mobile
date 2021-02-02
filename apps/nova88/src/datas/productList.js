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
// import LIVEcasino_MW from "../styles/img/LIVEcasino_MW.jpg";
import LIVEcasino_WM from "../styles/img/LIVEcasino_WM.jpg";
import Coming_soon from "../styles/img/coming_soon.jpg";
import casino_ow from "../styles/img/casino_ow.jpg";
import casino_PP from "../styles/img/casino_PP.jpg";
import casino_SG from "../styles/img/casino_SG.jpg";
import casino_PG from "../styles/img/casino_PG.jpg";
import casino_JOKER from "../styles/img/casino_JOKER.jpg";
import casino_CQ9 from "../styles/img/casino_CQ9.jpg";
import casino_YGG from "../styles/img/casino_YGG.jpg";
import casino_GPI from "../styles/img/casino_GPI.jpg";

// import casino_KISS from "../styles/img/casino_KISS.jpg";
import id4d from "../styles/img/id4d.jpg";
import Keno from "../styles/img/keno.jpg";
import Lottery from "../styles/img/lottery.jpg";
import number_game from "../styles/img/number_game.jpg";
import affiliate from "../styles/img/affiliate.jpg";
import poker from "../styles/img/poker.jpg";

import { siteInfo } from "../config";
import fish_GG from "../styles/img/fish_GG.jpg";
import fish_SG from "../styles/img/fish_SG.jpg";
import fish_SGW from "../styles/img/fish_SGW.jpg";
import Cockfighting from "../styles/img/cockfighting.jpg";
import ranking from "../styles/img/ranking.jpg";
import path from "../path";
import casino_ICG from "../styles/img/casino_ICG.jpg";
import fish_DBF from "../styles/img/fish_DBF.jpg";
import fish_FOS from "../styles/img/fish_FOS.jpg";
import fish_TAP from "../styles/img/fish_TAP.jpg";
import fish_TOS from "../styles/img/fish_TOS.jpg";

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
	new_ICG: { endDate: "2021/02/08 11:00:00" },
	new_poker: { startDate: "2021/01/25 11:00:00" }
};

const gameList = ({ langId }) => [
	{
		category: "sports",
		categoryIcon: "sports",
		translateKey: "lbl_Sports",
		items: [
			{
				icon: "soccer",
				gameId: 1,
				tpId: 1,
				img: Sport,
				spanTextKey: "lbl_Sports"
			},
			{
				icon: "virtual-sports",
				gameId: 180,
				tpId: 1,
				img: Virtual_sports,
				spanTextKey: "lbl_VirtualSports"
			}
		]
	},
	{
		category: "virtualsports",
		categoryIcon: "e-sports",
		translateKey: "lbl_eSports",
		items: [
			{
				icon: "e-sports",
				gameId: 43,
				img: Esports,
				tpId: 1,
				spanTextKey: "lbl_eSports"
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
			// {
			// 	tpId: 5,
			// 	gameId: 105,
			// 	img: LIVEcasino_MW
			// },
			{
				tpId: 20,
				gameId: 20,
				img: LIVEcasino_WM
			},
			{
				gameId: 12,
				tpId: 12,
				img: LIVEcasino_AB
			},
			{
				gameId: 18,
				tpId: 18,
				img: LIVEcasino_EB
			},
			{
				gameId: 2,
				tpId: 2,
				img: LIVEcasino_SA
			},
			{
				gameId: 15,
				tpId: 15,
				img: LIVEcasino_AE
			},
			{
				gameId: 101,
				tpId: 5,
				img: LIVEcasino_PP
			},
			{
				gameId: 4,
				tpId: 4,
				img: LIVEcasino_DG
			},
			{
				gameId: 3,
				tpId: 3,
				img: LIVEcasino_AG
			}
		]
	},
	{
		category: "casino",
		categoryIcon: "casino",
		className: "casinoList",
		translateKey: "lbl_Casino",
		comingSoonImg: Coming_soon,
		items: [
			{
				tpId: 5,
				parameter: { tpId: 5 },
				img: casino_PP
			},
			{
				...defGameInfo.casino_ICG,
				parameter: { tpId: defGameInfo.casino_ICG.tpId },
				img: casino_ICG,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_ICG)
					}
				]
			},
			{
				tpId: 9,
				parameter: { tpId: 9 },
				img: casino_JOKER
			},
			{
				...defGameInfo.Casino_CQ9,
				parameter: { tpId: defGameInfo.Casino_CQ9.tpId },
				img: casino_CQ9
			},
			{
				tpId: 6,
				parameter: { tpId: 6 },
				img: casino_GPI
			},
			{
				tpId: 8,
				parameter: { tpId: 8 },
				img: casino_YGG
			},
			{
				tpId: 10,
				parameter: { tpId: 10 },
				img: casino_SG
			},
			{
				tpId: 14,
				parameter: { tpId: 14 },
				img: casino_PG
			},
			// {
			// 	tpId: 21,
			// 	img: casino_KISS,
			// 	path: path.kiss918.root,
			// 	needLogin: true
			// },
			{
				gameId: 208,
				tpId: 1,
				img: casino_ow
			}
		]
	},
	{
		category: "game",
		categoryIcon: "game",
		className: "casinoList",
		translateKey: "lbl_Fishing",
		comingSoonImg: Coming_soon,
		items: [
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
				...defGameInfo.ICG_TOWER_OF_SAVIORS,
				img: fish_TOS,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_ICG)
					}
				]
			},
			{
				gameId: 10,
				tpId: 7,
				img: fish_GG
			},
			{
				gameId: "F-SF01",
				tpId: 10,
				img: fish_SG
			},
			{
				gameId: "F-SF02",
				tpId: 10,
				img: fish_SGW
			}
		]
	},
	{
		category: "cockFighting",
		categoryIcon: "cock",
		translateKey: "lbl_CockFighting",
		items: [
			{
				tpId: 19,
				gameId: 19,
				icon: "cock",
				img: Cockfighting,
				spanTextKey: "lbl_CockFighting"
			}
		]
	},
	{
		category: "kelo",
		categoryIcon: "kelo",
		translateKey: "lbl_Lottery",
		items: [
			{
				icon: "lottery",
				gameId: 223,
				tpId: 1,
				img: id4d,
				spanTextKey: "lbl_Indo4d",
				allowCurrency: [4, 15]
			},
			{
				icon: "keno",
				gameId: 202,
				tpId: 1,
				img: Keno,
				spanTextKey: "lbl_Keno"
			},
			{
				icon: "lottery",
				gameId: 220,
				tpId: 1,
				img: Lottery,
				spanTextKey: "lbl_Lottery"
			},
			{
				icon: "lottery",
				gameId: 161,
				tpId: 1,
				img: number_game,
				spanTextKey: "lbl_NumberGame"
			}
		]
	},
	{
		category: "poker",
		categoryIcon: "play",
		translateKey: "lbl_Poker",
		items: [
			{
				tpId: 13,
				icon: "play",
				img: poker,
				spanTextKey: "lbl_Poker",
				needLogin: true,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.new_poker)
					}
				],
				popBox: {
					title: "lbl_Poker",
					type: defPopBoxType.OneGame
				}
			}
		]
	},
	{
		category: "affiliate",
		categoryIcon: "affiliate",
		translateKey: "lbl_Affiliate",
		items: [
			{
				icon: "affiliate",
				href: `${siteInfo(langId).affiliateLink}`,
				img: affiliate,
				spanTextKey: "lbl_SiteAffiliate",
				descTextKey: "lbl_AffiliateDesc",
				descClassName: "affiliate"
			}
		]
	},
	{
		category: "ranking",
		categoryIcon: "ranking",
		translateKey: "lbl_Ranking",
		items: [
			{
				icon: "ranking",
				path: path.ranking.root,
				img: ranking,
				spanTextKey: "lbl_Ranking",
				addSpaceInBelow: true
			}
		]
	}
];

export default gameList;

export const defGameInfo = {
	Sports: { tpId: 1, gameId: 1 },
	CockFighting: { tpId: 17 },
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
	Casino_ow: { gameId: 208, tpId: 1 },
	Casino_All: { tpId: 0 },
	Casino_PP: { tpId: 5 },
	Casino_SG: { tpId: 10 },
	Casino_PG: { tpId: 14 },
	Casino_JOKER: { tpId: 9 },
	Casino_YGG: { tpId: 8 },
	Casino_GPI: { tpId: 6 },
	Casino_CQ9: { tpId: 16 },
	// Casino_918Kiss: { tpId: 21, needLogin: true },
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
	ICG_TOWER_OF_SAVIORS: {
		tpId: 24,
		gameId: "cmt0001"
	},
	oneGame: { tpId: 13 }
};
