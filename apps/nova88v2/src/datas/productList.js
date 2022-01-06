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
import LIVEcasino_EVO from "../styles/img/ev.png";

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
import casino_NetEnt from "../styles/img/nt.png";
import casino_RedTiger from "../styles/img/rt.png";
// import casino_KISS from "../styles/img/kiss.png";

import fishing_CQ9_AB3 from "../styles/img/pd.png";
import fish_DBF from "../styles/img/df.png";
import fish_TheTyrant from "../styles/img/tap.png";
import fish_GG from "../styles/img/ffw.png";
import fish_FishingGod from "../styles/img/fg.png";
import fish_SGW from "../styles/img/fw.png";
import fish_Oneshot from "../styles/img/of.png";
import fish_Saviors from "../styles/img/fos.png";

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
import MPoker from "../styles/img/mp.png";

import path from "../path";
import { siteInfo } from "../config";
import { defPopBoxType } from "../components/common/popbox";
import { isEventPeriod, defCurrenyId } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";
import { getLeaderBoardSupportCurrencyId } from "../components/ranking/def";

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
	NetEnt: { tpId: 37, tpGameType: 64 },
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
	RedTiger: { tpId: 38, tpGameType: 65 }
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
					menuId: 1,
					items: [
						{
							...defGameInfo.Soccer,
							img: Soccer,
							spanTextKey: "lbl_Soccer"
						},
						{
							...defGameInfo.Wap,
							img: Wap,
							spanText: "WAP",
							specialUrl: "&device=wap",
							hideBeforeLogin: true
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
					menuId: 2,
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
					menuId: 3,
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
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
						// },
						{
							...defGameInfo.LIVEcasinoPP,
							spanText: "Pragmatic Play",
							img: LIVEcasino_PP,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_pp
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasinoEVO,
							spanText: "Evolution Gaming",
							img: LIVEcasino_EVO,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_EVO
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasino_PT,
							spanText: "Playtech",
							img: LIVEcasino_PT,
							useGotoGame: true
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
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: LIVEcasino_DG
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					menuId: 4,
					items: [
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							providerImgName: "pp",
							img: casino_PP,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: casino_NetEnt,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_NetEnt
									)
								}
							]
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
							]
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
							]
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							providerImgName: "pg",
							img: casino_PG,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							providerImgName: "sg",
							img: casino_SG,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: casino_RedTiger,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_RedTiger
									)
								}
							]
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							providerImgName: "pt",
							img: casino_PT,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW
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
					tpGameType: defGameInfo.oneGame.tpGameType,
					menuId: 5,
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
					menuId: 6,
					items: [
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker"
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					menuId: 7,
					items: [
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					menuId: 8,
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
							]
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame"
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
					path: path.ranking.root,
					allowCurrency: [...getLeaderBoardSupportCurrencyId()]
				}
			];
			break;
		case "MYR":
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					menuId: 1,
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
					menuId: 2,
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
					menuId: 3,
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
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
						// },
						{
							...defGameInfo.LIVEcasinoPP,
							spanText: "Pragmatic Play",
							img: LIVEcasino_PP,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_pp
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasinoEVO,
							spanText: "Evolution Gaming",
							img: LIVEcasino_EVO,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_EVO
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasino_PT,
							spanText: "Playtech",
							img: LIVEcasino_PT,
							useGotoGame: true
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
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: LIVEcasino_AG
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					menuId: 4,
					items: [
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							img: casino_PP,
							path: path.casino.root,
							providerImgName: "pp"
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: casino_NetEnt,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_NetEnt
									)
								}
							]
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
							]
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
							]
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							providerImgName: "sg",
							img: casino_SG,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: casino_RedTiger,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_RedTiger
									)
								}
							]
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							img: casino_PT,
							path: path.casino.root,
							providerImgName: "pt"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg"
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
					tpGameType: defGameInfo.oneGame.tpGameType,
					menuId: 5,
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
					menuId: 6,
					items: [
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker"
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					menuId: 7,
					items: [
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG
						},
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					menuId: 8,
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
							]
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame"
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
					path: path.ranking.root,
					allowCurrency: [...getLeaderBoardSupportCurrencyId()]
				}
			];
			break;
		case "THB":
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					menuId: 1,
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
					menuId: 2,
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
					menuId: 3,
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
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
						// },
						{
							...defGameInfo.LIVEcasinoPP,
							spanText: "Pragmatic Play",
							img: LIVEcasino_PP,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_pp
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasinoEVO,
							spanText: "Evolution Gaming",
							img: LIVEcasino_EVO,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_EVO
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasino_PT,
							spanText: "Playtech",
							img: LIVEcasino_PT,
							useGotoGame: true
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
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: LIVEcasino_AG
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					menuId: 4,
					items: [
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							img: casino_PP,
							path: path.casino.root,
							providerImgName: "pp"
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: casino_NetEnt,
							path: path.casino.root,
							tpGameType: 64,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_NetEnt
									)
								}
							]
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
							]
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg"
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
							]
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: casino_SG,
							path: path.casino.root,
							providerImgName: "sg"
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: casino_RedTiger,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_RedTiger
									)
								}
							]
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							img: casino_PT,
							path: path.casino.root,
							providerImgName: "pt"
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW
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
					tpGameType: defGameInfo.oneGame.tpGameType,
					menuId: 5,
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
					menuId: 6,
					items: [
						{
							...defGameInfo.MPoker,
							img: MPoker,
							spanText: "MPoker",
							tpGameType: 60,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.MPoker)
								}
							]
						},
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker"
						},
						{
							...defGameInfo.amb,
							img: amb,
							spanTextKey: "lbl_Amb"
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					menuId: 7,
					items: [
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					menuId: 8,
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
							]
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame"
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
					path: path.ranking.root,
					allowCurrency: [...getLeaderBoardSupportCurrencyId()]
				}
			];
			break;
		case "INR":
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					menuId: 1,
					items: [
						{
							...defGameInfo.Cricket,
							img: Cricket,
							spanTextKey: "lbl_Cricket"
						},
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
						}
					]
				},
				{
					category: "exchange",
					categoryIcon: "sports",
					translateKey: "lbl_Exchange",
					items: [
						{
							...defGameInfo.nineW,
							img: nineW,
							spanTextKey: "lbl_9w",
							allowCurrency: [defCurrenyId.INR],
							useGotoGame: true
						}
					]
				},
				{
					category: "virtualsports",
					categoryIcon: "e-sports",
					translateKey: "lbl_eSports",
					menuId: 2,
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
					menuId: 3,
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
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
						// },
						{
							...defGameInfo.LIVEcasinoPP,
							spanText: "Pragmatic Play",
							img: LIVEcasino_PP,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_pp
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasinoEVO,
							spanText: "Evolution Gaming",
							img: LIVEcasino_EVO,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_EVO
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasino_PT,
							spanText: "Playtech",
							img: LIVEcasino_PT,
							useGotoGame: true
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
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: LIVEcasino_AG
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					menuId: 4,
					items: [
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							img: casino_PP,
							path: path.casino.root,
							providerImgName: "pp"
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: casino_NetEnt,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_NetEnt
									)
								}
							]
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
							]
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
							]
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: casino_SG,
							path: path.casino.root,
							providerImgName: "sg"
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk"
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
							providerImgName: "gp"
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: casino_RedTiger,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_RedTiger
									)
								}
							]
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg"
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
					tpGameType: defGameInfo.oneGame.tpGameType,
					menuId: 5,
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
					menuId: 6,
					items: [
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker"
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					menuId: 7,
					items: [
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: fish_SGW
						},
						{
							...defGameInfo.FishingSG,
							spanTextKey: "lbl_FishingSG1",
							img: fish_FishingGod
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: fish_GG
						},
						{
							...defGameInfo.Fishing_AT01,
							spanTextKey: "lbl_Oneshot_Fishing",
							img: fish_Oneshot
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: fishing_CQ9_AB3
						},
						{
							...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
							spanTextKey:
								"lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
							img: fish_TheTyrant
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: fish_DBF
						},
						{
							...defGameInfo.ICG_FISHING_OF_SAVIORS,
							spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
							img: fish_Saviors
						}
					]
				},
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					menuId: 8,
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
							]
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame"
						}
					]
				}
			];
			break;
		default:
			list = [
				{
					category: "sports",
					categoryIcon: "soccer",
					translateKey: "lbl_Sports",
					menuId: 1,
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
					menuId: 2,
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
					menuId: 3,
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
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
						// },
						{
							...defGameInfo.LIVEcasinoPP,
							spanText: "Pragmatic Play",
							img: LIVEcasino_PP,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_pp
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasinoEVO,
							spanText: "Evolution Gaming",
							img: LIVEcasino_EVO,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.liveCasino_EVO
									)
								}
							]
						},
						{
							...defGameInfo.LIVEcasino_PT,
							spanText: "Playtech",
							img: LIVEcasino_PT,
							useGotoGame: true
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: LIVEcasino_N2Live
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: LIVEcasino_WM
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: LIVEcasino_AB
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: LIVEcasino_EB
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: LIVEcasino_SA
						},
						{
							...defGameInfo.LIVEcasinoAE,
							spanText: "AE Casino",
							img: LIVEcasino_AE
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: LIVEcasino_DG
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: LIVEcasino_AG
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					menuId: 4,
					items: [
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							providerImgName: "pp",
							img: casino_PP,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: casino_NetEnt,
							path: path.casino.root,
							tpGameType: 64,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_NetEnt
									)
								}
							]
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
							]
						},
						{
							...defGameInfo.Casino_PT,
							parameter: defGameInfo.Casino_PT,
							spanText: "Playtech",
							img: casino_PT,
							path: path.casino.root,
							providerImgName: "pt"
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
							]
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: casino_ICG,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: casino_JOKER,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: casino_CQ9,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: casino_GPI,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: casino_YGG,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: casino_SG,
							path: path.casino.root,
							providerImgName: "sg"
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: casino_RedTiger,
							path: path.casino.root,
							tpGameType: 65,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_RedTiger
									)
								}
							]
						},
						{
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: casino_PG,
							path: path.casino.root,
							providerImgName: "pg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: casino_OW
						}
					]
				},
				{
					category: "play",
					categoryIcon: "play",
					translateKey: "lbl_Games",
					menuId: 6,
					items: [
						{
							...defGameInfo.kingMaker,
							img: kingMaker,
							spanTextKey: "lbl_KingMaker"
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					menuId: 7,
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
				{
					category: "kelo",
					categoryIcon: "kelo",
					translateKey: "lbl_Lottery",
					menuId: 8,
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
							]
						},
						{
							...defGameInfo.Indo4d,
							img: id4d,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
						},
						{
							...defGameInfo.tableGame,
							img: tableGame,
							spanTextKey: "lbl_TableGame"
						}
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: defGameInfo.oneGame.tpGameType,
					menuId: 5,
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
					path: path.ranking.root,
					allowCurrency: [...getLeaderBoardSupportCurrencyId()]
				}
			];
	}
	return list;
};

export default gameList;

export const defGameInfo = {
	Soccer: { tpId: 1, gameId: 1, tpGameType: 1 },
	SabaSoccer: { tpId: 1, gameId: 997, tpGameType: 1 },
	Basketball: { tpId: 1, gameId: 2, tpGameType: 1 },
	Tennis: { tpId: 1, gameId: 5, tpGameType: 1 },
	Cricket: { tpId: 1, gameId: 50, tpGameType: 1 },
	Wap: { tpId: 1, gameId: 1, tpGameType: 1 },
	ESportAll: { tpId: 1, gameId: 43, tpGameType: 1 },
	ESportCS: { tpId: 1, gameId: 43, bettype: 1, tpGameType: 1 },
	ESportDota: { tpId: 1, gameId: 43, bettype: 2, tpGameType: 1 },
	ESportKOG: { tpId: 1, gameId: 43, bettype: 3, tpGameType: 1 },
	ESportLOL: { tpId: 1, gameId: 43, bettype: 4, tpGameType: 1 },
	LIVEcasinoN2Live: { tpId: 28, tpGameType: 45 },
	LIVEcasinoWM: { tpId: 20, gameId: 20, tpGameType: 32 },
	LIVEcasinoAB: { tpId: 12, gameId: 12, tpGameType: 6 },
	LIVEcasinoEB: { tpId: 18, gameId: 18, tpGameType: 28 },
	LIVEcasinoSA: { tpId: 2, gameId: 2, tpGameType: 9 },
	LIVEcasinoAE: { tpId: 15, gameId: 15, tpGameType: 18 },
	LIVEcasinoPP: { tpId: 5, gameId: 101, tpGameType: 16 },
	LIVEcasinoDG: { tpId: 4, gameId: 4, tpGameType: 10 },
	LIVEcasinoAG: { tpId: 3, gameId: 3, tpGameType: 8 },
	LIVEcasinoMW: { tpId: 5, gameId: 105, tpGameType: 8 },
	LIVEcasinoMGP: { tpId: 34, tpGameType: 58 },
	LIVEcasino_PT: { tpId: 27, gameId: "0", tpGameType: 48 },
	LIVEcasinoEVO: { tpId: 36, gameId: 0, tpGameType: 63 },
	Casino_All: { tpId: 0 },
	Casino_MGP: { tpId: 34, tpGameType: 57 },
	Casino_PP: { tpId: 5, tpGameType: 7 },
	casino_ICG: { tpId: 24, tpGameType: 39 },
	Casino_JOKER: { tpId: 9, tpGameType: 13 },
	Casino_CQ9: { tpId: 16, tpGameType: 29 },
	Casino_GPI: { tpId: 6, tpGameType: 11 },
	Casino_YGG: { tpId: 8, tpGameType: 14 },
	Casino_SG: { tpId: 10, tpGameType: 15 },
	Casino_PG: { tpId: 14, tpGameType: 17 },
	Casino_PT: { tpId: 27, gameId: "0", tpGameType: 46 },
	// Casino_918Kiss: { tpId: 21, needLogin: true , tpGameType: 33 },
	Casino_OW: { tpId: 1, gameId: 208, tpGameType: 4 },
	Casino_NetEnt: { tpId: 37, tpGameType: 64 },
	Casino_RedTiger: { tpId: 38, tpGameType: 65 },
	Fishing_AB3: { tpId: 16, gameId: "AB3", tpGameType: 44 },
	Fishing_AT05: { tpId: 16, gameId: "AT05", tpGameType: 44 },
	Fishing_AT01: { tpId: 16, gameId: "AT01", tpGameType: 44 },
	Fishing_AT06: { tpId: 16, gameId: "AT06", tpGameType: 44 },
	Fishing_AT04: { tpId: 16, gameId: "AT04", tpGameType: 44 },
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0003",
		tpGameType: 40
	},
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001", tpGameType: 40 },
	ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002", tpGameType: 40 },
	FishingGG: { tpId: 7, gameId: 10, tpGameType: 12 },
	FishingSG: { tpId: 10, gameId: "F-SF01", tpGameType: 31 },
	FishingSGW: { tpId: 10, gameId: "F-SF02", tpGameType: 31 },
	CockFighting: { tpId: 17, tpGameType: 27 },
	// VirtualSports: { tpId: 1, gameId: 180, tpGameType: 3 },
	Indo4d: { tpId: 1, gameId: 223, tpGameType: 20 },
	Keno: { tpId: 1, gameId: 202, tpGameType: 5 },
	lottery: { tpId: 1, gameId: 220, tpGameType: 19 },
	NumberGame: { tpId: 1, gameId: 161, tpGameType: 2 },
	oneGame: { tpId: 13, tpGameType: 41 },
	sabaClub: { tpId: 1, gameId: 171, tpGameType: 59 },
	kingMaker: { tpId: 11, tpGameType: 52 },
	amb: { tpId: 30, tpGameType: 50 },
	nineW: { tpId: 31, tpGameType: 51 },
	Casino_Jili: { tpId: 32, tpGameType: 53 },
	TCG: { tpId: 33, tpGameType: 54 },
	tableGame: { tpId: 1, gameId: 222, tpGameType: 23 },
	MPoker: { tpId: 35, tpGameType: 60 }
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
