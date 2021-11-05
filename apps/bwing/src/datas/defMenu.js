/* eslint-disable camelcase */
import { siteInfo } from "../config";
import path from "../path";
import { defGameInfo } from "./productList";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";

import game_SabaClub from "../styles/img/lottery/lottery-saba.png";
import game_Keno from "../styles/img/lottery/lottery-keno.png";
import game_Lottery from "../styles/img/lottery/lottery-lottery.png";
import game_One789Lottery from "../styles/img/lottery/lottery-789.png";
import traditionalLottery from "../styles/img/lottery/lottery-tl.png";
import game_V8Poker from "../styles/img/lottery/lottery-v8poker.png";
import game_tcg from "../styles/img/lottery/lottery-TCG.png";

import fishing_GG from "../styles/img/fish/fish-fworld.png";
import fishing_SG from "../styles/img/fish/fish-fg.png";
import fishing_SGwar from "../styles/img/fish/fish-fwar.png";
import fishing_ICG_DB from "../styles/img/fish/fish-db.png";
import fishing_ICG_FOS from "../styles/img/fish/fish-fos.png";
import fishing_ICG_TTATP from "../styles/img/fish/fish-ttatp.png";
import fishing_ICG_TOS from "../styles/img/fishingICG-TOS.png";
import fishing_CQ9_AB3 from "../styles/img/fish/fish-Paradise.png";
import fishing_CQ9_AT05 from "../styles/img/luckyfishing.png";
import fishing_CQ9_AT01 from "../styles/img/fish/fish-tos.png";
import fishing_CQ9_AT06 from "../styles/img/watermarginfishing.png";
import fishing_CQ9_AT04 from "../styles/img/thunderfighter.png";

import liveCasino_One789 from "../styles/img/liveGameNew/live-one789.png";
import liveCasino_WM from "../styles/img/liveGameNew/live-wm.png";
import liveCasino_AG from "../styles/img/liveGameNew/live-ag.png";
import liveCasino_PP from "../styles/img/liveGameNew/live-pp.png";
import liveCasino_AE from "../styles/img/liveGameNew/live-ae.png";
import liveCasino_DG from "../styles/img/liveGameNew/live-dg.png";
import liveCasino_AB from "../styles/img/liveGameNew/live-ab.png";
import liveCasino_EB from "../styles/img/liveGameNew/live-ebet.png";
import liveCasino_SA from "../styles/img/liveGameNew/live-sa.png";
import liveCasino_N2 from "../styles/img/liveGameNew/live-n2live.png";
import liveCasino_PT from "../styles/img/liveGameNew/live-pt.png";
import liveCasino_EVO from "../styles/img/liveGameNew/live-evo.png";

import sabaSports from "../styles/img/sport/sabaSport.png";

import kingMaker from "../styles/img/lottery/lottery-kingmaker.png";

import sports from "../styles/img/gameicon/sport.png";
import games from "../styles/img/gameicon/games.png";
import esport from "../styles/img/gameicon/esport.png";
import slot from "../styles/img/gameicon/slot.png";
import live from "../styles/img/gameicon/live.png";
import fish from "../styles/img/gameicon/fish.png";
import promo from "../styles/img/gameicon/promo.png";
import vip from "../styles/img/gameicon/vip.png";
import affiliates from "../styles/img/gameicon/affiliates.png";
// import BTI from "../styles/img/sport/BtiSport.png";
import cq9 from "../styles/img/slot/cq9.png";
import gpi from "../styles/img/slot/gpi.png";
import icg from "../styles/img/slot/icg.png";
import jili from "../styles/img/slot/jili.png";
import mg from "../styles/img/slot/mg.png";
import ow from "../styles/img/slot/ow.png";
import ne from "../styles/img/slot/ne.png";
import pg from "../styles/img/slot/pg.png";
import pp from "../styles/img/slot/pp.png";
import pt from "../styles/img/slot/pt.png";
import red from "../styles/img/slot/red.png";
import sg from "../styles/img/slot/sg.png";
import ygg from "../styles/img/slot/ygg.png";

export const defIconType = {
	live: " liveIcon",
	new: " newicon",
	new_nav: " newicon"
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

export const productList = langId => {
	return {
		sports: {
			category: "sports",
			displayKey: "lbl_Sports",
			icon_img: sports,
			items: [
				{
					displayKey: "lbl_SabaSport",
					img: sabaSports,
					...defGameInfo.Sports
				}
				// {
				// 	displayKey: "lbl_BTISport",
				// 	img: BTI,
				// 	...defGameInfo.BTISport,
				// 	eventIcon: [
				// 		{
				// 			inPeriod: isEventPeriod(eventTime.new_BTI)
				// 		}
				//
				// }
			]
		},
		game: {
			category: "play",
			displayKey: "lbl_Games",
			icon_img: games,
			items: [
				{
					displayKey: "lbl_tcg",
					img: game_tcg,
					...defGameInfo.tcg,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.tcg)
						}
					]
				},
				{
					displayKey: "lbl_V8Poker",
					img: game_V8Poker,
					...defGameInfo.V8Poker
				},
				{
					...defGameInfo.kingMaker,
					img: kingMaker,
					displayKey: "lbl_KingMaker",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_Km)
						}
					]
				},
				{
					displayKey: "lbl_TraditionalLottery",
					img: traditionalLottery,
					...defGameInfo.One789_lottery
				},
				{
					displayKey: "lbl_789Lottery",
					img: game_One789Lottery,
					...defGameInfo.One789_lottery_789
				},
				{
					displayKey: "lbl_Vgaming",
					img: game_SabaClub,
					...defGameInfo.sabaClub
				},
				{
					displayKey: "lbl_Keno",
					img: game_Keno,
					...defGameInfo.Keno
				},
				{
					displayKey: "lbl_Lottery",
					img: game_Lottery,
					...defGameInfo.lottery
				}
			]
		},
		eSports: {
			category: "virtualsports",
			displayKey: "lbl_eSports",
			...defGameInfo.eSports,
			icon_img: esport
		},
		casino: {
			category: "slot",
			displayKey: "lbl_Slots",
			icon_img: slot,
			items: [
				// {
				// 	...defGameInfo.Casino_NetEnt,
				// 	parameter: defGameInfo.Casino_NetEnt,
				// 	path: path.casino.root,
				// 	displayKey: "NetEnt",
				// 	img: ne,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.casino_NetEnt)
				// 		}
				// 	]
				// },
				// {
				// 	...defGameInfo.Casino_RedTiger,
				// 	parameter: defGameInfo.Casino_RedTiger,
				// 	path: path.casino.root,
				// 	displayKey: "Red Tiger",
				// 	img: red,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.casino_RedTiger)
				// 		}
				// 	]
				// },
				{
					...defGameInfo.Casino_PP,
					parameter: defGameInfo.Casino_PP,
					path: path.casino.root,
					icon: "icon icon-PP",
					displayKey: "Pragmatic Play",
					img: pp
				},
				{
					...defGameInfo.Casino_MGP,
					parameter: defGameInfo.Casino_MGP,
					path: path.casino.root,
					img: mg,
					icon: "icon icon-mg",
					displayKey: "Microgaming"
				},
				{
					...defGameInfo.Casino_Jili,
					parameter: defGameInfo.Casino_Jili,
					path: path.casino.root,
					img: jili,
					icon: "icon icon-jili",
					displayKey: "JILI"
				},
				{
					...defGameInfo.Casino_PT,
					parameter: defGameInfo.Casino_PT,
					path: path.casino.root,
					img: pt,
					icon: "icon icon-pt",
					displayKey: "PlayTech"
				},
				{
					...defGameInfo.casino_ICG,
					parameter: defGameInfo.casino_ICG,
					path: path.casino.root,
					img: icg,
					icon: "icon icon-ICG",
					displayKey: "Iconic Gaming"
				},
				{
					...defGameInfo.Casino_CQ9,
					parameter: defGameInfo.Casino_CQ9,
					path: path.casino.root,
					img: cq9,
					// isNew: true,
					icon: "icon icon-cq9",
					displayKey: "CQ9"
				},
				{
					...defGameInfo.Casino_GPI,
					parameter: defGameInfo.Casino_GPI,
					path: path.casino.root,
					img: gpi,
					icon: "icon icon-GPI",
					displayKey: "Game Play"
				},
				{
					...defGameInfo.Casino_YGG,
					parameter: defGameInfo.Casino_YGG,
					path: path.casino.root,
					img: ygg,
					icon: "icon icon-YGG",
					displayKey: "YGGDrassil"
				},
				{
					...defGameInfo.Casino_SG,
					parameter: defGameInfo.Casino_SG,
					path: path.casino.root,
					img: sg,
					icon: "icon icon-SG",
					displayKey: "Spadegaming"
				},
				{
					...defGameInfo.Casino_PG,
					parameter: defGameInfo.Casino_PG,
					img: pg,
					path: path.casino.root,
					icon: "icon icon-PG",
					displayKey: "PG Soft"
				},
				{
					...defGameInfo.Casino_ow,
					parameter: defGameInfo.Casino_ow,
					img: ow,
					icon: "icon icon-OW",
					displayKey: "Saba Casino"
				}
			],
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.casino_MGP)
				}
			]
		},
		liveCasino: {
			category: "livecasino",
			displayKey: "lbl_LiveCasino",
			icon_img: live,
			items: [
				// {
				// 	displayKey: "Microgaming",
				// 	icon: "icon icon-mg",
				// 	img: liveCasino_MGP,
				// 	...defGameInfo.LIVEcasinoMGP,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.liveCasino_MGP)
				// 		}
				// 	]
				// },
				// {
				// 	displayKey: "Evolution Gaming",
				// 	img: liveCasino_EVO,
				// 	...defGameInfo.LIVEcasinoEVO,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.liveCasino_evo)
				// 		}
				// 	]
				// },
				{
					displayKey: "Pragmatic Play",
					icon: "icon icon-PP",
					img: liveCasino_PP,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_pp)
						}
					],
					...defGameInfo.LIVEcasinoPP
				},
				{
					displayKey: "Playtech",
					icon: "icon icon-pt",
					img: liveCasino_PT,
					...defGameInfo.LIVEcasinoPT,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_pt)
						}
					],
					useGotoGame: true
				},
				{
					displayKey: "n2-LIVE",
					img: liveCasino_N2,
					...defGameInfo.LIVEcasinoN2
				},
				{
					displayKey: "lbl_liveCasino_789SeDie",
					img: liveCasino_One789,
					...defGameInfo.LIVEcasinoOne789
				},
				{
					displayKey: "WM Casino",
					img: liveCasino_WM,
					...defGameInfo.LIVEcasinoWM
				},
				{
					displayKey: "Asia Gaming",
					img: liveCasino_AG,
					...defGameInfo.LIVEcasinoAG
				},
				{
					displayKey: "AE Casino",
					icon: "icon icon-AE",
					img: liveCasino_AE,
					...defGameInfo.LIVEcasinoAE
				},
				{
					displayKey: "Dream Gaming",
					img: liveCasino_DG,
					...defGameInfo.LIVEcasinoDG
				},
				{
					displayKey: "Allbet",
					img: liveCasino_AB,
					...defGameInfo.LIVEcasinoAB
				},
				{
					displayKey: "eBET",
					img: liveCasino_EB,
					...defGameInfo.LIVEcasinoEB
				},
				{
					displayKey: "SA Gaming",
					img: liveCasino_SA,
					...defGameInfo.LIVEcasinoSA
				}
			]
		},
		fishing: {
			category: "game",
			displayKey: "lbl_Fishing",
			icon_img: fish,
			items: [
				{
					displayKey: "lbl_Paradise",
					img: fishing_CQ9_AB3,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AB3
				},
				{
					displayKey: "lbl_Oneshot_Fishing",
					img: fishing_CQ9_AT01,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AT01
				},
				{
					displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
					img: fishing_ICG_DB,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_DRAGONBALL_FISHING
				},
				{
					displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
					img: fishing_ICG_FOS,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_FISHING_OF_SAVIORS
				},
				{
					displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
					img: fishing_ICG_TTATP,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS
				},
				{
					displayKey: "lbl_FishingGG",
					icon: "icon icon-gg",
					img: fishing_GG,
					...defGameInfo.Fishing
				},
				{
					displayKey: "lbl_FishingSG1",
					icon: "icon icon-SG",
					img: fishing_SG,
					...defGameInfo.Fishing_SG
				},
				{
					displayKey: "lbl_FishingSG2",
					icon: "icon icon-SG",
					img: fishing_SGwar,
					...defGameInfo.Fishing_SGW
				}
			]
		},
		promotion: {
			category: "promotion",
			displayKey: "lbl_Promotions",
			path: path.promotion.root,
			icon_img: promo
		},
		affiliate: {
			category: "affiliate",
			displayKey: "lbl_Affiliates",
			icon_img: affiliates,
			href: siteInfo(langId).affiliateLink
		},
		vip: {
			category: "vip",
			displayKey: "lbl_VIP",
			icon_img: vip,
			path: path.vip.root
		}
		// ranking: {
		// 	displayKey: "lbl_Ranking",
		// 	path: path.leaderBoard.root
		// }
	};
};

export const defSubMenus = () => [
	{
		displayKey: "lbl_Sports",
		icon: "icon icon-sports",
		subItems: [
			{
				displayKey: "lbl_SabaSport",
				...defGameInfo.Sports
			}
			// {
			// 	displayKey: "lbl_BTISport",
			// 	...defGameInfo.BTISport
			// }
		]
	},
	{
		displayKey: "lbl_Games",
		icon: "icon icon-kelo",
		subItems: [
			{
				...defGameInfo.tcg,
				displayKey: "lbl_tcg"
			},
			{
				...defGameInfo.sabaClub,
				displayKey: "lbl_Vgaming"
			},
			{
				displayKey: "lbl_TraditionalLottery",
				...defGameInfo.One789_lottery
			},
			{
				displayKey: "lbl_789Lottery",
				...defGameInfo.One789_lottery_789
			},
			{
				...defGameInfo.kingMaker,
				displayKey: "lbl_KingMaker"
			},
			{
				...defGameInfo.V8Poker,
				displayKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.Keno,
				displayKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				displayKey: "lbl_Lottery"
			}
		]
	},
	{
		displayKey: "lbl_Fishing",
		icon: "icon icon-game",
		subItems: [
			{
				...defGameInfo.Fishing_AB3,
				displayKey: "lbl_Paradise"
			},
			{
				...defGameInfo.Fishing_AT01,
				displayKey: "lbl_Oneshot_Fishing"
			},
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING"
			},
			{
				...defGameInfo.ICG_FISHING_OF_SAVIORS,
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS"
			},
			{
				...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS"
			},
			{
				...defGameInfo.Fishing,
				displayKey: "lbl_FishingGG"
			},
			{
				...defGameInfo.Fishing_SG,
				displayKey: "lbl_FishingSG1"
			},
			{
				...defGameInfo.Fishing_SGW,
				displayKey: "lbl_FishingSG2"
			}
		]
	},
	{
		...defGameInfo.eSports,
		displayKey: "lbl_eSports",
		icon: "icon icon-e-sports"
	},
	{
		displayKey: "lbl_Slots",
		path: `/${path.casino.root}`,
		icon: "icon icon-casino"
	},
	{
		displayKey: "lbl_LiveCasino",
		icon: "icon icon-livecasino",
		subItems: [
			{
				...defGameInfo.LIVEcasinoPP,
				displayKey: "Pragmatic Play"
			},
			{
				...defGameInfo.LIVEcasino_PT,
				displayKey: "Playtech"
			},
			{
				...defGameInfo.LIVEcasinoN2,
				displayKey: "n2-LIVE"
			},
			{
				displayKey: "lbl_liveCasino_789SeDie",
				...defGameInfo.LIVEcasinoOne789
			},
			{
				...defGameInfo.LIVEcasinoWM,
				displayKey: "WM Casino"
			},
			{
				...defGameInfo.LIVEcasinoDG,
				displayKey: "Dream Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAE,
				displayKey: "AE Casino"
			},
			{
				...defGameInfo.LIVEcasinoAG,
				displayKey: "Asia Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAB,
				displayKey: "Allbet"
			},
			{
				...defGameInfo.LIVEcasinoSA,
				displayKey: "SA Gaming"
			},
			{
				...defGameInfo.LIVEcasinoEB,
				displayKey: "eBET"
			},
			{
				...defGameInfo.LIVEcasinoEVO,
				displayKey: "Evolution Gaming"
			}
		]
	},
	{
		displayKey: "lbl_Promotions",
		path: `/${path.promotion.root}`,
		icon: "icon icon-gift"
	},
	{
		displayKey: "lbl_APP_DOWNLOAD",
		path: `/${path.appDownload.root}`,
		icon: "icon icon-mobile"
	},
	{
		displayKey: "lbl_VIP",
		path: `/${path.vip.root}`,
		icon: "icon icon-vip"
	}
];
