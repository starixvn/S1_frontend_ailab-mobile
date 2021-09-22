import Soccer from "../styles/img/soccer.png";
import SabaSoccer from "../styles/img/saba_soccer.png";
import Basketball from "../styles/img/basketball.png";
import Tennis from "../styles/img/tennis.png";
import Cricket from "../styles/img/cricket.png";
import Wap from "../styles/img/wap.png";

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
import LIVEcasino_PT from "../styles/img/ptc.png";
import LIVEcasino_MGP from "../styles/img/mgp.png";

import casino_PP from "../styles/img/spp.png";
import casino_ICG from "../styles/img/icg.png";
import casino_JOKER from "../styles/img/joker.png";
import casino_CQ9 from "../styles/img/cq9.png";
import casino_GPI from "../styles/img/gpi.png";
import casino_YGG from "../styles/img/ygg.png";
import casino_SG from "../styles/img/sg.png";
import casino_PG from "../styles/img/pg.png";
import casino_OW from "../styles/img/ow.png";
import casino_PT from "../styles/img/pt.png";
import casino_MGP from "../styles/img/mg.png";
import casino_Jili from "../styles/img/ji.png";
// import casino_KISS from "../styles/img/kiss.png";

import fishing_CQ9_AB3 from "../styles/img/pd.png";
import fish_DBF from "../styles/img/df.png";
import fish_TAP from "../styles/img/tap.png";
import fish_GG from "../styles/img/ffw.png";
import fish_SG from "../styles/img/fg.png";
import fish_SGW from "../styles/img/fw.png";

import livesports from "../styles/img/livesports.png";

import movietv from "../styles/img/movietv.png";

// import Cockfighting from "../styles/img/cockfighting.jpg";

import tableGame from "../styles/img/tablegame.png";
import id4d from "../styles/img/indo4d.png";
import Keno from "../styles/img/keno.png";
import Lottery from "../styles/img/lottery.png";
import number_game from "../styles/img/numbergame.png";
import TCG from "../styles/img/tcg.png";

import kingMaker from "../styles/img/km.png";
import amb from "../styles/img/amb.png";
import nineW from "../styles/img/9w.png";

import path from "../path";
import { siteInfo } from "../config";
import { defPopBoxType } from "../components/common/popbox";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";

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

const gameList = ({ langId, currencyName }) => {
	let list = [];
	switch (currencyName) {
		case "IDR":
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					items: [
						{
							...defGameInfo.Soccer,
							img: Soccer,
							spanTextKey: "lbl_Soccer",
							tpGameType: 1
						},
						{
							...defGameInfo.Wap,
							img: Wap,
							spanText: "WAP",
							specialUrl: "&device=wap",
							hideBeforeLogin: true,
							tpGameType: 1
						},
						{
							...defGameInfo.nineW,
							img: nineW,
							spanTextKey: "lbl_9w",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.nineW)
								}
							],
							allowCurrency: [61],
							hideBeforeLogin: true,
							useGotoGame: true,
							tpGameType: 51
						},
						{
							...defGameInfo.SabaSoccer,
							img: SabaSoccer,
							spanTextKey: "lbl_SabaSoccer",
							tpGameType: 1
						},
						{
							...defGameInfo.Basketball,
							img: Basketball,
							spanTextKey: "lbl_Basketball",
							tpGameType: 1
						},
						{
							...defGameInfo.Tennis,
							img: Tennis,
							spanTextKey: "lbl_Tennis",
							tpGameType: 1
						},
						{
							...defGameInfo.Cricket,
							img: Cricket,
							spanTextKey: "lbl_Cricket",
							tpGameType: 1
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
							img: ESportsAll,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: ESportsCS,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: ESportsDota,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: ESportsKOG,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: ESportsLOL,
							tpGameType: 1
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.Casino_MGP,
						// 	spanText: "Microgaming",
						// 	img: LIVEcasino_MGP,
						// 	eventIcon: [
						// 		{
						// 			icon: defIconType.new,
						// 			inPeriod: isEventPeriod(
						// 				eventTime.casino_MGP
						// 			)
						// 		}
						// 	],
						// tpGameType: 58,
						// },
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
							useGotoGame: true,
							tpGameType: 48
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
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB,
							tpGameType: 28
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: LIVEcasino_DG,
							tpGameType: 10
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM,
							tpGameType: 32
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA,
							tpGameType: 9
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB,
							tpGameType: 6
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live,
							tpGameType: 45
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
							spanText: "Pragmatic Play",
							providerImgName: "pp",
							img: casino_PP,
							path: path.casino.root,
							tpGameType: 7
						},
						{
							...defGameInfo.Casino_MGP,
							parameter: defGameInfo.Casino_MGP,
							spanText: "Microgaming",
							providerImgName: "mg",
							img: casino_MGP,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_MGP
									)
								}
							],
							tpGameType: 57
						},
						{
							...defGameInfo.Casino_Jili,
							parameter: defGameInfo.Casino_Jili,
							spanText: "Jili",
							path: path.casino.root,
							providerImgName: "ji",
							img: casino_Jili,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.jili)
								}
							],
							tpGameType: 53
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							providerImgName: "pg",
							img: casino_PG,
							path: path.casino.root,
							tpGameType: 17
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							providerImgName: "sg",
							img: casino_SG,
							path: path.casino.root,
							tpGameType: 15
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							providerImgName: "pt",
							img: casino_PT,
							path: path.casino.root,
							tpGameType: 46
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk",
							tpGameType: 13
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9",
							tpGameType: 29
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Iconic Gaming",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg",
							tpGameType: 39
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp",
							tpGameType: 11
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg",
							tpGameType: 14
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW,
							tpGameType: 4
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						//     img: casino_KISS,
						//     path: path.kiss918.root,
						//     needLogin: true
						// },
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: 41,
					popBox: {
						needLogin: true,
						title: "lbl_Poker",
						type: defPopBoxType.OneGame,
						...defGameInfo.oneGame
					}
				},
				{
					category: "play",
					categoryIcon: "play",
					translateKey: "lbl_Games",
					items: [
						{
							...defGameInfo.amb,
							img: amb,
							spanTextKey: "lbl_Amb",
							tpGameType: 50
						},
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker",
							tpGameType: 52
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					items: [
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW,
							tpGameType: 31
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF,
							tpGameType: 40
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3,
							tpGameType: 44
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG,
							tpGameType: 12
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					items: [
						{
							...defGameInfo.TCG,
							img: TCG,
							spanTextKey: "lbl_TCG",
							tpGameType: 54,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							]
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [15],
							tpGameType: 20
						},
						{
							...defGameInfo.Keno,
							img: Keno,
							spanTextKey: "lbl_Keno",
							tpGameType: 5
						},
						{
							...defGameInfo.lottery,
							img: Lottery,
							spanTextKey: "lbl_Lottery",
							tpGameType: 19
						},
						{
							...defGameInfo.NumberGame,
							img: number_game,
							spanTextKey: "lbl_NumberGame",
							tpGameType: 2
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame",
							tpGameType: 23
						}
					]
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
					path: path.vip.root
				},
				{
					category: "ranking",
					categoryIcon: "ranking",
					translateKey: "lbl_Ranking",
					path: path.ranking.root
				}
			];
			break;
		case "MYR":
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					items: [
						{
							...defGameInfo.Soccer,
							img: Soccer,
							spanTextKey: "lbl_Soccer",
							tpGameType: 1
						},
						{
							...defGameInfo.nineW,
							img: nineW,
							spanTextKey: "lbl_9w",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.nineW)
								}
							],
							allowCurrency: [61],
							hideBeforeLogin: true,
							useGotoGame: true,
							tpGameType: 51
						},
						{
							...defGameInfo.SabaSoccer,
							img: SabaSoccer,
							spanTextKey: "lbl_SabaSoccer",
							tpGameType: 1
						},
						{
							...defGameInfo.Basketball,
							img: Basketball,
							spanTextKey: "lbl_Basketball",
							tpGameType: 1
						},
						{
							...defGameInfo.Tennis,
							img: Tennis,
							spanTextKey: "lbl_Tennis",
							tpGameType: 1
						},
						{
							...defGameInfo.Cricket,
							img: Cricket,
							spanTextKey: "lbl_Cricket",
							tpGameType: 1
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
							img: ESportsAll,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: ESportsCS,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: ESportsDota,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: ESportsKOG,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: ESportsLOL,
							tpGameType: 1
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.Casino_MGP,
						// 	spanText: "Microgaming",
						// 	img: LIVEcasino_MGP,
						// tpGameType: 58,
						// 	eventIcon: [
						// 		{
						// 			icon: defIconType.new,
						// 			inPeriod: isEventPeriod(
						// 				eventTime.casino_MGP
						// 			)
						// 		}
						// 	]
						// },
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
							useGotoGame: true,
							tpGameType: 48
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
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA,
							tpGameType: 9
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB,
							tpGameType: 6
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: LIVEcasino_AG,
							tpGameType: 8
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM,
							tpGameType: 32
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB,
							tpGameType: 28
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live,
							tpGameType: 45
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
							spanText: "Pragmatic Play",
							img: casino_PP,
							path: path.casino.root,
							providerImgName: "pp",
							tpGameType: 7
						},
						{
							...defGameInfo.Casino_MGP,
							parameter: defGameInfo.Casino_MGP,
							spanText: "Microgaming",
							img: casino_MGP,
							path: path.casino.root,
							providerImgName: "mg",
							tpGameType: 57,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_MGP
									)
								}
							]
						},
						{
							...defGameInfo.Casino_Jili,
							parameter: defGameInfo.Casino_Jili,
							spanText: "Jili",
							img: casino_Jili,
							path: path.casino.root,
							providerImgName: "ji",
							tpGameType: 53,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.jili)
								}
							]
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							providerImgName: "sg",
							img: casino_SG,
							path: path.casino.root,
							tpGameType: 15
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg",
							tpGameType: 14
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk",
							tpGameType: 13
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							img: casino_PT,
							path: path.casino.root,
							providerImgName: "pt",
							tpGameType: 46
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp",
							tpGameType: 11
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9",
							tpGameType: 29
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Iconic Gaming",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg",
							tpGameType: 39
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW,
							tpGameType: 4
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg",
							tpGameType: 17
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						//     img: casino_KISS,
						//     path: path.kiss918.root,
						//     needLogin: true
						// },
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: 41,
					popBox: {
						needLogin: true,
						title: "lbl_Poker",
						type: defPopBoxType.OneGame,
						...defGameInfo.oneGame
					}
				},
				{
					category: "play",
					categoryIcon: "play",
					translateKey: "lbl_Games",
					items: [
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker",
							tpGameType: 52
						},
						{
							...defGameInfo.amb,
							img: amb,
							spanTextKey: "lbl_Amb",
							tpGameType: 50
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					items: [
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG,
							tpGameType: 12
						},
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW,
							tpGameType: 31
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3,
							tpGameType: 44
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF,
							tpGameType: 40
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					items: [
						{
							...defGameInfo.TCG,
							img: TCG,
							spanTextKey: "lbl_TCG",
							tpGameType: 54,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							]
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [15],
							tpGameType: 20
						},
						{
							...defGameInfo.Keno,
							img: Keno,
							spanTextKey: "lbl_Keno",
							tpGameType: 5
						},
						{
							...defGameInfo.lottery,
							img: Lottery,
							spanTextKey: "lbl_Lottery",
							tpGameType: 19
						},
						{
							...defGameInfo.NumberGame,
							img: number_game,
							spanTextKey: "lbl_NumberGame",
							tpGameType: 2
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame",
							tpGameType: 23
						}
					]
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
					path: path.vip.root
				},
				{
					category: "ranking",
					categoryIcon: "ranking",
					translateKey: "lbl_Ranking",
					path: path.ranking.root
				}
			];
			break;
		case "THB":
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					items: [
						{
							...defGameInfo.Soccer,
							img: Soccer,
							spanTextKey: "lbl_Soccer",
							tpGameType: 1
						},
						{
							...defGameInfo.SabaSoccer,
							img: SabaSoccer,
							spanTextKey: "lbl_SabaSoccer",
							tpGameType: 1
						},
						{
							...defGameInfo.nineW,
							img: nineW,
							spanTextKey: "lbl_9w",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.nineW)
								}
							],
							allowCurrency: [61],
							hideBeforeLogin: true,
							useGotoGame: true,
							tpGameType: 51
						},
						{
							...defGameInfo.Basketball,
							img: Basketball,
							spanTextKey: "lbl_Basketball",
							tpGameType: 1
						},
						{
							...defGameInfo.Tennis,
							img: Tennis,
							spanTextKey: "lbl_Tennis",
							tpGameType: 1
						},
						{
							...defGameInfo.Cricket,
							img: Cricket,
							spanTextKey: "lbl_Cricket",
							tpGameType: 1
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
							img: ESportsAll,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: ESportsCS,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: ESportsDota,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: ESportsKOG,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: ESportsLOL,
							tpGameType: 1
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.Casino_MGP,
						// 	spanText: "Microgaming",
						// 	img: LIVEcasino_MGP,
						// 	eventIcon: [
						// 		{
						// 			icon: defIconType.new,
						// 			inPeriod: isEventPeriod(
						// 				eventTime.casino_MGP
						// 			)
						// 		}
						// 	]
						// tpGameType: 58,
						// },
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
							useGotoGame: true,
							tpGameType: 48
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
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA,
							tpGameType: 9
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB,
							tpGameType: 6
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: LIVEcasino_AG,
							tpGameType: 8
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM,
							tpGameType: 32
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB,
							tpGameType: 28
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live,
							tpGameType: 45
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
							spanText: "Pragmatic Play",
							img: casino_PP,
							path: path.casino.root,
							providerImgName: "pp",
							tpGameType: 7
						},
						{
							...defGameInfo.Casino_MGP,
							parameter: defGameInfo.Casino_MGP,
							spanText: "Microgaming",
							img: casino_MGP,
							path: path.casino.root,
							providerImgName: "mg",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_MGP
									)
								}
							],
							tpGameType: 57
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg",
							tpGameType: 17
						},
						{
							...defGameInfo.Casino_Jili,
							parameter: defGameInfo.Casino_Jili,
							spanText: "Jili",
							img: casino_Jili,
							path: path.casino.root,
							providerImgName: "ji",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.jili)
								}
							],
							tpGameType: 53
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk",
							tpGameType: 13
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: casino_SG,
							path: path.casino.root,
							providerImgName: "sg",
							tpGameType: 15
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Iconic Gaming",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg",
							tpGameType: 39
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							img: casino_PT,
							path: path.casino.root,
							providerImgName: "pt",
							tpGameType: 46
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg",
							tpGameType: 14
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9",
							tpGameType: 29
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp",
							tpGameType: 11
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW,
							tpGameType: 4
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						//     img: casino_KISS,
						//     path: path.kiss918.root,
						//     needLogin: true
						// },
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: 41,
					popBox: {
						needLogin: true,
						title: "lbl_Poker",
						type: defPopBoxType.OneGame,
						...defGameInfo.oneGame
					}
				},
				{
					category: "play",
					categoryIcon: "play",
					translateKey: "lbl_Games",
					items: [
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker",
							tpGameType: 52
						},
						{
							...defGameInfo.amb,
							img: amb,
							spanTextKey: "lbl_Amb",
							tpGameType: 50
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					items: [
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW,
							tpGameType: 31
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3,
							tpGameType: 44
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG,
							tpGameType: 12
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF,
							tpGameType: 40
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					items: [
						{
							...defGameInfo.TCG,
							img: TCG,
							spanTextKey: "lbl_TCG",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							],
							tpGameType: 54
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [15],
							tpGameType: 20
						},
						{
							...defGameInfo.Keno,
							img: Keno,
							spanTextKey: "lbl_Keno",
							tpGameType: 5
						},
						{
							...defGameInfo.lottery,
							img: Lottery,
							spanTextKey: "lbl_Lottery",
							tpGameType: 19
						},
						{
							...defGameInfo.NumberGame,
							img: number_game,
							spanTextKey: "lbl_NumberGame",
							tpGameType: 2
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame",
							tpGameType: 23
						}
					]
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
					path: path.vip.root
				},
				{
					category: "ranking",
					categoryIcon: "ranking",
					translateKey: "lbl_Ranking",
					path: path.ranking.root
				}
			];
			break;
		case "INR":
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					items: [
						{
							...defGameInfo.Soccer,
							img: Soccer,
							spanTextKey: "lbl_Soccer",
							tpGameType: 1
						},
						{
							...defGameInfo.SabaSoccer,
							img: SabaSoccer,
							spanTextKey: "lbl_SabaSoccer",
							tpGameType: 1
						},
						{
							...defGameInfo.nineW,
							img: nineW,
							spanTextKey: "lbl_9w",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.nineW)
								}
							],
							allowCurrency: [61],
							hideBeforeLogin: true,
							useGotoGame: true,
							tpGameType: 51
						},
						{
							...defGameInfo.Basketball,
							img: Basketball,
							spanTextKey: "lbl_Basketball",
							tpGameType: 1
						},
						{
							...defGameInfo.Tennis,
							img: Tennis,
							spanTextKey: "lbl_Tennis",
							tpGameType: 1
						},
						{
							...defGameInfo.Cricket,
							img: Cricket,
							spanTextKey: "lbl_Cricket",
							tpGameType: 1
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
							img: ESportsAll,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: ESportsCS,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: ESportsDota,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: ESportsKOG,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: ESportsLOL,
							tpGameType: 1
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.Casino_MGP,
						// 	spanText: "Microgaming",
						// 	img: LIVEcasino_MGP,
						// 	eventIcon: [
						// 		{
						// 			icon: defIconType.new,
						// 			inPeriod: isEventPeriod(
						// 				eventTime.casino_MGP
						// 			)
						// 		}
						// 	],
						// tpGameType: 58,
						// },
						{
							...defGameInfo.LIVEcasinoPP,
							spanText: "Pragmatic Play",
							img: LIVEcasino_PP,
							tpGameType: 16
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
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB,
							tpGameType: 28
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: LIVEcasino_DG,
							tpGameType: 10
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM,
							tpGameType: 32
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA,
							tpGameType: 9
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB,
							tpGameType: 6
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live,
							tpGameType: 45
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
							spanText: "Pragmatic Play",
							img: casino_PP,
							path: path.casino.root,
							providerImgName: "pp",
							tpGameType: 7
						},
						{
							...defGameInfo.Casino_MGP,
							parameter: defGameInfo.Casino_MGP,
							spanText: "Microgaming",
							img: casino_MGP,
							path: path.casino.root,
							providerImgName: "mg",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_MGP
									)
								}
							],
							tpGameType: 57
						},
						{
							...defGameInfo.Casino_Jili,
							parameter: defGameInfo.Casino_Jili,
							spanText: "Jili",
							img: casino_Jili,
							path: path.casino.root,
							providerImgName: "ji",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.jili)
								}
							],
							tpGameType: 53
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg",
							tpGameType: 17
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: casino_SG,
							path: path.casino.root,
							providerImgName: "sg",
							tpGameType: 15
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							img: casino_PT,
							path: path.casino.root,
							providerImgName: "pt",
							tpGameType: 46
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk",
							tpGameType: 13
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9",
							tpGameType: 29
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Iconic Gaming",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg",
							tpGameType: 39
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp",
							tpGameType: 11
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg",
							tpGameType: 14
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW,
							tpGameType: 4
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						//     img: casino_KISS,
						//     path: path.kiss918.root,
						//     needLogin: true
						// },
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: 41,
					popBox: {
						needLogin: true,
						title: "lbl_Poker",
						type: defPopBoxType.OneGame,
						...defGameInfo.oneGame
					}
				},
				{
					category: "play",
					categoryIcon: "play",
					translateKey: "lbl_Games",
					items: [
						{
							...defGameInfo.amb,
							img: amb,
							spanTextKey: "lbl_Amb",
							tpGameType: 50
						},
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker",
							tpGameType: 52
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					items: [
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW,
							tpGameType: 31
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF,
							tpGameType: 40
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3,
							tpGameType: 44
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG,
							tpGameType: 12
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					items: [
						{
							...defGameInfo.TCG,
							img: TCG,
							spanTextKey: "lbl_TCG",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							],
							tpGameType: 54
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [15],
							tpGameType: 20
						},
						{
							...defGameInfo.Keno,
							img: Keno,
							spanTextKey: "lbl_Keno",
							tpGameType: 5
						},
						{
							...defGameInfo.lottery,
							img: Lottery,
							spanTextKey: "lbl_Lottery",
							tpGameType: 19
						},
						{
							...defGameInfo.NumberGame,
							img: number_game,
							spanTextKey: "lbl_NumberGame",
							tpGameType: 2
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame",
							tpGameType: 23
						}
					]
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
					path: path.vip.root
				},
				{
					category: "ranking",
					categoryIcon: "ranking",
					translateKey: "lbl_Ranking",
					path: path.ranking.root
				}
			];
			break;
		default:
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					items: [
						{
							...defGameInfo.Soccer,
							img: Soccer,
							spanTextKey: "lbl_Soccer",
							tpGameType: 1
						},
						{
							...defGameInfo.nineW,
							img: nineW,
							spanTextKey: "lbl_9w",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.nineW)
								}
							],
							allowCurrency: [61],
							hideBeforeLogin: true,
							useGotoGame: true,
							tpGameType: 51
						},
						{
							...defGameInfo.SabaSoccer,
							img: SabaSoccer,
							spanTextKey: "lbl_SabaSoccer",
							tpGameType: 1
						},
						{
							...defGameInfo.Basketball,
							img: Basketball,
							spanTextKey: "lbl_Basketball",
							tpGameType: 1
						},
						{
							...defGameInfo.Tennis,
							img: Tennis,
							spanTextKey: "lbl_Tennis",
							tpGameType: 1
						},
						{
							...defGameInfo.Cricket,
							img: Cricket,
							spanTextKey: "lbl_Cricket",
							tpGameType: 1
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
							img: ESportsAll,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: ESportsCS,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: ESportsDota,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: ESportsKOG,
							tpGameType: 1
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: ESportsLOL,
							tpGameType: 1
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.Casino_MGP,
						// 	spanText: "Microgaming",
						// 	img: LIVEcasino_MGP,
						// 	eventIcon: [
						// 		{
						// 			icon: defIconType.new,
						// 			inPeriod: isEventPeriod(
						// 				eventTime.casino_MGP
						// 			)
						// 		}
						// 	]
						// tpGameType: 58,
						// },
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
							useGotoGame: true,
							tpGameType: 48
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
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
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB,
							tpGameType: 6
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB,
							tpGameType: 28
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA,
							tpGameType: 9
						},
						{
							...defGameInfo.LIVEcasinoAE,
							spanText: "AE Casino",
							img: LIVEcasino_AE,
							tpGameType: 18
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: LIVEcasino_DG,
							tpGameType: 10
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: LIVEcasino_AG,
							tpGameType: 8
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
							spanText: "Pragmatic Play",
							providerImgName: "pp",
							img: casino_PP,
							path: path.casino.root,
							tpGameType: 7
						},
						{
							...defGameInfo.Casino_MGP,
							parameter: defGameInfo.Casino_MGP,
							spanText: "Microgaming",
							img: casino_MGP,
							path: path.casino.root,
							providerImgName: "mg",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_MGP
									)
								}
							],
							tpGameType: 57
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							img: casino_PT,
							path: path.casino.root,
							providerImgName: "pt",
							tpGameType: 46
						},
						{
							...defGameInfo.Casino_Jili,
							parameter: defGameInfo.Casino_Jili,
							spanText: "Jili",
							img: casino_Jili,
							path: path.casino.root,
							providerImgName: "ji",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.jili)
								}
							],
							tpGameType: 53
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Iconic Gaming",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg",
							tpGameType: 39
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk",
							tpGameType: 13
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9",
							tpGameType: 29
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp",
							tpGameType: 11
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg",
							tpGameType: 14
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: casino_SG,
							path: path.casino.root,
							providerImgName: "sg",
							tpGameType: 15
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg",
							tpGameType: 17
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW,
							tpGameType: 4
						}
					]
				},
				{
					category: "play",
					categoryIcon: "play",
					translateKey: "lbl_Games",
					items: [
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker",
							tpGameType: 52
						},
						{
							...defGameInfo.amb,
							img: amb,
							spanTextKey: "lbl_Amb",
							tpGameType: 50
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
							img: fishing_CQ9_AB3,
							tpGameType: 44
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF,
							tpGameType: 40
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG,
							tpGameType: 12
						},
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW,
							tpGameType: 31
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					items: [
						{
							...defGameInfo.TCG,
							img: TCG,
							spanTextKey: "lbl_TCG",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							],
							tpGameType: 54
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [15],
							tpGameType: 20
						},
						{
							...defGameInfo.Keno,
							img: Keno,
							spanTextKey: "lbl_Keno",
							tpGameType: 5
						},
						{
							...defGameInfo.lottery,
							img: Lottery,
							spanTextKey: "lbl_Lottery",
							tpGameType: 19
						},
						{
							...defGameInfo.NumberGame,
							img: number_game,
							spanTextKey: "lbl_NumberGame",
							tpGameType: 2
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame",
							tpGameType: 23
						}
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: 41,
					popBox: {
						needLogin: true,
						title: "lbl_Poker",
						type: defPopBoxType.OneGame,
						...defGameInfo.oneGame
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
					path: path.vip.root
				},
				{
					category: "ranking",
					categoryIcon: "ranking",
					translateKey: "lbl_Ranking",
					path: path.ranking.root
				}
			];
	}
	return list;
};

export default gameList;

export const defGameInfo = {
	Soccer: { tpId: 1, gameId: 1 },
	SabaSoccer: { tpId: 1, gameId: 997 },
	Basketball: { tpId: 1, gameId: 2 },
	Tennis: { tpId: 1, gameId: 5 },
	Cricket: { tpId: 1, gameId: 50 },
	Wap: { tpId: 1, gameId: 1 },
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
	Casino_MGP: { tpId: 34 },
	Casino_PP: { tpId: 5 },
	casino_ICG: { tpId: 24 },
	Casino_JOKER: { tpId: 9 },
	Casino_CQ9: { tpId: 16 },
	Casino_GPI: { tpId: 6 },
	Casino_YGG: { tpId: 8 },
	Casino_SG: { tpId: 10 },
	Casino_PG: { tpId: 14 },
	Casino_PT: { tpId: 27, gameId: "0" },
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
		gameId: 171
	},
	kingMaker: { tpId: 11 },
	amb: { tpId: 30 },
	nineW: { tpId: 31 },
	Casino_Jili: { tpId: 32 },
	TCG: { tpId: 33 },
	tableGame: {
		tpId: 1,
		gameId: 222
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
	ranking: "ranking",
	liveTV: "liveTV",
	play: "play"
};
