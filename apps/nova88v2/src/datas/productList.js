import path from "../path";
import { siteInfo, cloudBannerImgURL } from "../config";
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
	RedTiger: { tpId: 38, tpGameType: 65 },
	AdvantPlay: { tpId: 39, tpGameType: 67 }
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
							img: `${cloudBannerImgURL}/h5/img/soccer.png`,
							spanTextKey: "lbl_Soccer"
						},
						{
							...defGameInfo.Wap,
							img: `${cloudBannerImgURL}/h5/img/wap.png`,
							spanText: "WAP",
							specialUrl: "&device=wap",
							hideBeforeLogin: true
						},
						{
							...defGameInfo.SabaSoccer,
							img: `${cloudBannerImgURL}/h5/img/saba_soccer.png`,
							spanTextKey: "lbl_SabaSoccer"
						},
						{
							...defGameInfo.Basketball,
							img: `${cloudBannerImgURL}/h5/img/basketball.png`,
							spanTextKey: "lbl_Basketball"
						},
						{
							...defGameInfo.Tennis,
							img: `${cloudBannerImgURL}/h5/img/tennis.png`,
							spanTextKey: "lbl_Tennis"
						},
						{
							...defGameInfo.Cricket,
							img: `${cloudBannerImgURL}/h5/img/cricket.png`,
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
							img: `${cloudBannerImgURL}/h5/img/esportALL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: `${cloudBannerImgURL}/h5/img/esportDOTA2.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: `${cloudBannerImgURL}/h5/img/esportLOL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: `${cloudBannerImgURL}/h5/img/esportCS.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: `${cloudBannerImgURL}/h5/img/esportKOG.png`
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
						// 	spanText: "Microgaming",
						// 	img: `${cloudBannerImgURL}/h5/img/mgp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ev.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ptc.png`,
							useGotoGame: true
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: `${cloudBannerImgURL}/h5/img/dg.png`
						},
						{
							...defGameInfo.LIVEcasinoAE,
							spanText: "AE Casino",
							img: `${cloudBannerImgURL}/h5/img/ae.png`
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: `${cloudBannerImgURL}/h5/img/sa.png`
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: `${cloudBannerImgURL}/h5/img/ab.png`
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: `${cloudBannerImgURL}/h5/img/ag.png`
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: `${cloudBannerImgURL}/h5/img/wm.png`
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: `${cloudBannerImgURL}/h5/img/eb.png`
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: `${cloudBannerImgURL}/h5/img/n2.png`
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					items: [
						{
							...defGameInfo.Casino_AdvantPlay,
							parameter: defGameInfo.Casino_AdvantPlay,
							spanText: "AdvantPlay",
							providerImgName: "ap",
							img: `${cloudBannerImgURL}/h5/img/ap.png`,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_AdvantPlay
									)
								}
							]
						},
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							providerImgName: "pp",
							img: `${cloudBannerImgURL}/h5/img/spp.png`,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: `${cloudBannerImgURL}/h5/img/nt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/mg.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ji.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pg.png`,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: `${cloudBannerImgURL}/h5/img/joker.png`,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							providerImgName: "sg",
							img: `${cloudBannerImgURL}/h5/img/sg.png`,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: `${cloudBannerImgURL}/h5/img/rt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pt.png`,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: `${cloudBannerImgURL}/h5/img/ygg.png`,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: `${cloudBannerImgURL}/h5/img/cq9.png`,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: `${cloudBannerImgURL}/h5/img/gpi.png`,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: `${cloudBannerImgURL}/h5/img/icg.png`,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: `${cloudBannerImgURL}/h5/img/ow.png`,
							allowCurrency: [
								defCurrenyId.IDR,
								defCurrenyId.MYR,
								defCurrenyId.THB
							]
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						// img: `${cloudBannerImgURL}/h5/img/kiss.png`,
						// path: path.kiss918.root,
						// needLogin: true
						// },
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: defGameInfo.oneGame.tpGameType,
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
							...defGameInfo.MPoker,
							img: `${cloudBannerImgURL}/h5/img/mp.png`,
							spanText: "MPoker",
							tpGameType: 60,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.MPoker)
								}
							],
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.amb,
							img: `${cloudBannerImgURL}/h5/img/amb.png`,
							spanTextKey: "lbl_Amb",
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.kingMaker,
							img: `${cloudBannerImgURL}/h5/img/km.png`,
							spanTextKey: "lbl_KingMaker"
						},
						{
							...defGameInfo.sabaClub,
							img: `${cloudBannerImgURL}/h5/img/vg.png`,
							spanTextKey: "lbl_Vgaming",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.game_Vgaming
									)
								}
							]
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
							img: `${cloudBannerImgURL}/h5/img/fw.png`
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: `${cloudBannerImgURL}/h5/img/pd.png`
						},

						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: `${cloudBannerImgURL}/h5/img/ffw.png`
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: `${cloudBannerImgURL}/h5/img/df.png`
						},
						{
							...defGameInfo.FishingHaiba,
							spanTextKey: "lbl_Fishing_Haiba",
							img: `${cloudBannerImgURL}/h5/img/hb.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingHappyFish5,
							spanTextKey: "lbl_Fishing_Hunting_Happy_Fish_5",
							img: `${cloudBannerImgURL}/h5/img/hf5.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingMonsterAwaken,
							spanTextKey: "lbl_Fishing_Hunting_Monster_Awaken",
							img: `${cloudBannerImgURL}/h5/img/ma.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingSG,
							spanTextKey: "lbl_FishingSG1",
							img: `${cloudBannerImgURL}/h5/img/fg.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.Fishing_AT01,
							spanTextKey: "lbl_Oneshot_Fishing",
							img: `${cloudBannerImgURL}/h5/img/of.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
							spanTextKey:
								"lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
							img: `${cloudBannerImgURL}/h5/img/tap.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_FISHING_OF_SAVIORS,
							spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
							img: `${cloudBannerImgURL}/h5/img/fos.png`,
							allowCurrency: [defCurrenyId.INR]
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
							img: `${cloudBannerImgURL}/h5/img/tcg.png`,
							spanTextKey: "lbl_TCG",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							]
						},
						{
							...defGameInfo.Keno,
							img: `${cloudBannerImgURL}/h5/img/keno.png`,
							spanTextKey: "lbl_Keno"
						},
						{
							...defGameInfo.lottery,
							img: `${cloudBannerImgURL}/h5/img/lottery.png`,
							spanTextKey: "lbl_Lottery"
						},
						{
							...defGameInfo.NumberGame,
							img: `${cloudBannerImgURL}/h5/img/numbergame.png`,
							spanTextKey: "lbl_NumberGame"
						},
						{
							...defGameInfo.tableGame,
							img: `${cloudBannerImgURL}/h5/img/tablegame.png`,
							spanTextKey: "lbl_TableGame"
						},
						{
							...defGameInfo.Indo4d,
							img: `${cloudBannerImgURL}/h5/img/indo4d.png`,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
					items: [
						{
							...defGameInfo.Soccer,
							img: `${cloudBannerImgURL}/h5/img/soccer.png`,
							spanTextKey: "lbl_Soccer"
						},
						{
							...defGameInfo.SabaSoccer,
							img: `${cloudBannerImgURL}/h5/img/saba_soccer.png`,
							spanTextKey: "lbl_SabaSoccer"
						},
						{
							...defGameInfo.Basketball,
							img: `${cloudBannerImgURL}/h5/img/basketball.png`,
							spanTextKey: "lbl_Basketball"
						},
						{
							...defGameInfo.Tennis,
							img: `${cloudBannerImgURL}/h5/img/tennis.png`,
							spanTextKey: "lbl_Tennis"
						},
						{
							...defGameInfo.Cricket,
							img: `${cloudBannerImgURL}/h5/img/cricket.png`,
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
							img: `${cloudBannerImgURL}/h5/img/esportALL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: `${cloudBannerImgURL}/h5/img/esportDOTA2.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: `${cloudBannerImgURL}/h5/img/esportLOL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: `${cloudBannerImgURL}/h5/img/esportCS.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: `${cloudBannerImgURL}/h5/img/esportKOG.png`
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
						// 	spanText: "Microgaming",
						// 	img: `${cloudBannerImgURL}/h5/img/mgp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ev.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ptc.png`,
							useGotoGame: true
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: `${cloudBannerImgURL}/h5/img/dg.png`
						},
						{
							...defGameInfo.LIVEcasinoAE,
							spanText: "AE Casino",
							img: `${cloudBannerImgURL}/h5/img/ae.png`
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: `${cloudBannerImgURL}/h5/img/sa.png`
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: `${cloudBannerImgURL}/h5/img/ab.png`
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: `${cloudBannerImgURL}/h5/img/ag.png`
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: `${cloudBannerImgURL}/h5/img/wm.png`
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: `${cloudBannerImgURL}/h5/img/eb.png`
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: `${cloudBannerImgURL}/h5/img/n2.png`
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					items: [
						{
							...defGameInfo.Casino_AdvantPlay,
							parameter: defGameInfo.Casino_AdvantPlay,
							spanText: "AdvantPlay",
							providerImgName: "ap",
							img: `${cloudBannerImgURL}/h5/img/ap.png`,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_AdvantPlay
									)
								}
							]
						},
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							img: `${cloudBannerImgURL}/h5/img/spp.png`,
							path: path.casino.root,
							providerImgName: "pp"
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: `${cloudBannerImgURL}/h5/img/nt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/mg.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ji.png`,
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
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: `${cloudBannerImgURL}/h5/img/pg.png`,
							path: path.casino.root,
							providerImgName: "pg"
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: `${cloudBannerImgURL}/h5/img/joker.png`,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							providerImgName: "sg",
							img: `${cloudBannerImgURL}/h5/img/sg.png`,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: `${cloudBannerImgURL}/h5/img/rt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pt.png`,
							path: path.casino.root,
							providerImgName: "pt"
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: `${cloudBannerImgURL}/h5/img/ygg.png`,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: `${cloudBannerImgURL}/h5/img/cq9.png`,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: `${cloudBannerImgURL}/h5/img/gpi.png`,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: `${cloudBannerImgURL}/h5/img/icg.png`,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: `${cloudBannerImgURL}/h5/img/ow.png`,
							allowCurrency: [
								defCurrenyId.IDR,
								defCurrenyId.MYR,
								defCurrenyId.THB
							]
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						//     							img: `${cloudBannerImgURL}/h5/img/kiss.png`,
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
							...defGameInfo.MPoker,
							img: `${cloudBannerImgURL}/h5/img/mp.png`,
							spanText: "MPoker",
							tpGameType: 60,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.MPoker)
								}
							],
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.amb,
							img: `${cloudBannerImgURL}/h5/img/amb.png`,
							spanTextKey: "lbl_Amb",
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.kingMaker,
							img: `${cloudBannerImgURL}/h5/img/km.png`,
							spanTextKey: "lbl_KingMaker"
						},
						{
							...defGameInfo.sabaClub,
							img: `${cloudBannerImgURL}/h5/img/vg.png`,
							spanTextKey: "lbl_Vgaming",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.game_Vgaming
									)
								}
							]
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
							img: `${cloudBannerImgURL}/h5/img/fw.png`
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: `${cloudBannerImgURL}/h5/img/pd.png`
						},

						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: `${cloudBannerImgURL}/h5/img/ffw.png`
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: `${cloudBannerImgURL}/h5/img/df.png`
						},
						{
							...defGameInfo.FishingHaiba,
							spanTextKey: "lbl_Fishing_Haiba",
							img: `${cloudBannerImgURL}/h5/img/hb.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingHappyFish5,
							spanTextKey: "lbl_Fishing_Hunting_Happy_Fish_5",
							img: `${cloudBannerImgURL}/h5/img/hf5.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingMonsterAwaken,
							spanTextKey: "lbl_Fishing_Hunting_Monster_Awaken",
							img: `${cloudBannerImgURL}/h5/img/ma.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingSG,
							spanTextKey: "lbl_FishingSG1",
							img: `${cloudBannerImgURL}/h5/img/fg.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.Fishing_AT01,
							spanTextKey: "lbl_Oneshot_Fishing",
							img: `${cloudBannerImgURL}/h5/img/of.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
							spanTextKey:
								"lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
							img: `${cloudBannerImgURL}/h5/img/tap.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_FISHING_OF_SAVIORS,
							spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
							img: `${cloudBannerImgURL}/h5/img/fos.png`,
							allowCurrency: [defCurrenyId.INR]
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
							img: `${cloudBannerImgURL}/h5/img/tcg.png`,
							spanTextKey: "lbl_TCG",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							]
						},
						{
							...defGameInfo.Keno,
							img: `${cloudBannerImgURL}/h5/img/keno.png`,
							spanTextKey: "lbl_Keno"
						},
						{
							...defGameInfo.lottery,
							img: `${cloudBannerImgURL}/h5/img/lottery.png`,
							spanTextKey: "lbl_Lottery"
						},
						{
							...defGameInfo.NumberGame,
							img: `${cloudBannerImgURL}/h5/img/numbergame.png`,
							spanTextKey: "lbl_NumberGame"
						},
						{
							...defGameInfo.tableGame,
							img: `${cloudBannerImgURL}/h5/img/tablegame.png`,
							spanTextKey: "lbl_TableGame"
						},
						{
							...defGameInfo.Indo4d,
							img: `${cloudBannerImgURL}/h5/img/indo4d.png`,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
					items: [
						{
							...defGameInfo.Soccer,
							img: `${cloudBannerImgURL}/h5/img/soccer.png`,
							spanTextKey: "lbl_Soccer"
						},
						{
							...defGameInfo.SabaSoccer,
							img: `${cloudBannerImgURL}/h5/img/saba_soccer.png`,
							spanTextKey: "lbl_SabaSoccer"
						},
						{
							...defGameInfo.Basketball,
							img: `${cloudBannerImgURL}/h5/img/basketball.png`,
							spanTextKey: "lbl_Basketball"
						},
						{
							...defGameInfo.Tennis,
							img: `${cloudBannerImgURL}/h5/img/tennis.png`,
							spanTextKey: "lbl_Tennis"
						},
						{
							...defGameInfo.Cricket,
							img: `${cloudBannerImgURL}/h5/img/cricket.png`,
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
							img: `${cloudBannerImgURL}/h5/img/esportALL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: `${cloudBannerImgURL}/h5/img/esportDOTA2.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: `${cloudBannerImgURL}/h5/img/esportLOL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: `${cloudBannerImgURL}/h5/img/esportCS.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: `${cloudBannerImgURL}/h5/img/esportKOG.png`
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
						// 	spanText: "Microgaming",
						// 	img: `${cloudBannerImgURL}/h5/img/mgp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ev.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ptc.png`,
							useGotoGame: true
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: `${cloudBannerImgURL}/h5/img/dg.png`
						},
						{
							...defGameInfo.LIVEcasinoAE,
							spanText: "AE Casino",
							img: `${cloudBannerImgURL}/h5/img/ae.png`
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: `${cloudBannerImgURL}/h5/img/sa.png`
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: `${cloudBannerImgURL}/h5/img/ab.png`
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: `${cloudBannerImgURL}/h5/img/ag.png`
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: `${cloudBannerImgURL}/h5/img/wm.png`
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: `${cloudBannerImgURL}/h5/img/eb.png`
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: `${cloudBannerImgURL}/h5/img/n2.png`
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					items: [
						{
							...defGameInfo.Casino_AdvantPlay,
							parameter: defGameInfo.Casino_AdvantPlay,
							spanText: "AdvantPlay",
							providerImgName: "ap",
							img: `${cloudBannerImgURL}/h5/img/ap.png`,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_AdvantPlay
									)
								}
							]
						},
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							img: `${cloudBannerImgURL}/h5/img/spp.png`,
							path: path.casino.root,
							providerImgName: "pp"
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: `${cloudBannerImgURL}/h5/img/nt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/mg.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ji.png`,
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
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: `${cloudBannerImgURL}/h5/img/pg.png`,
							path: path.casino.root,
							providerImgName: "pg"
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: `${cloudBannerImgURL}/h5/img/joker.png`,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: `${cloudBannerImgURL}/h5/img/sg.png`,
							path: path.casino.root,
							providerImgName: "sg"
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: `${cloudBannerImgURL}/h5/img/rt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pt.png`,
							path: path.casino.root,
							providerImgName: "pt"
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: `${cloudBannerImgURL}/h5/img/ygg.png`,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: `${cloudBannerImgURL}/h5/img/cq9.png`,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: `${cloudBannerImgURL}/h5/img/gpi.png`,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: `${cloudBannerImgURL}/h5/img/icg.png`,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: `${cloudBannerImgURL}/h5/img/ow.png`,
							allowCurrency: [
								defCurrenyId.IDR,
								defCurrenyId.MYR,
								defCurrenyId.THB
							]
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						//     							img: `${cloudBannerImgURL}/h5/img/kiss.png`,
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
							...defGameInfo.MPoker,
							img: `${cloudBannerImgURL}/h5/img/mp.png`,
							spanText: "MPoker",
							tpGameType: 60,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.MPoker)
								}
							],
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.amb,
							img: `${cloudBannerImgURL}/h5/img/amb.png`,
							spanTextKey: "lbl_Amb",
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.kingMaker,
							img: `${cloudBannerImgURL}/h5/img/km.png`,
							spanTextKey: "lbl_KingMaker"
						},
						{
							...defGameInfo.sabaClub,
							img: `${cloudBannerImgURL}/h5/img/vg.png`,
							spanTextKey: "lbl_Vgaming",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.game_Vgaming
									)
								}
							]
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
							img: `${cloudBannerImgURL}/h5/img/fw.png`
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: `${cloudBannerImgURL}/h5/img/pd.png`
						},

						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: `${cloudBannerImgURL}/h5/img/ffw.png`
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: `${cloudBannerImgURL}/h5/img/df.png`
						},
						{
							...defGameInfo.FishingHaiba,
							spanTextKey: "lbl_Fishing_Haiba",
							img: `${cloudBannerImgURL}/h5/img/hb.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingHappyFish5,
							spanTextKey: "lbl_Fishing_Hunting_Happy_Fish_5",
							img: `${cloudBannerImgURL}/h5/img/hf5.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingMonsterAwaken,
							spanTextKey: "lbl_Fishing_Hunting_Monster_Awaken",
							img: `${cloudBannerImgURL}/h5/img/ma.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingSG,
							spanTextKey: "lbl_FishingSG1",
							img: `${cloudBannerImgURL}/h5/img/fg.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.Fishing_AT01,
							spanTextKey: "lbl_Oneshot_Fishing",
							img: `${cloudBannerImgURL}/h5/img/of.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
							spanTextKey:
								"lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
							img: `${cloudBannerImgURL}/h5/img/tap.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_FISHING_OF_SAVIORS,
							spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
							img: `${cloudBannerImgURL}/h5/img/fos.png`,
							allowCurrency: [defCurrenyId.INR]
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
							img: `${cloudBannerImgURL}/h5/img/tcg.png`,
							spanTextKey: "lbl_TCG",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							]
						},
						{
							...defGameInfo.Keno,
							img: `${cloudBannerImgURL}/h5/img/keno.png`,
							spanTextKey: "lbl_Keno"
						},
						{
							...defGameInfo.lottery,
							img: `${cloudBannerImgURL}/h5/img/lottery.png`,
							spanTextKey: "lbl_Lottery"
						},
						{
							...defGameInfo.NumberGame,
							img: `${cloudBannerImgURL}/h5/img/numbergame.png`,
							spanTextKey: "lbl_NumberGame"
						},
						{
							...defGameInfo.tableGame,
							img: `${cloudBannerImgURL}/h5/img/tablegame.png`,
							spanTextKey: "lbl_TableGame"
						},
						{
							...defGameInfo.Indo4d,
							img: `${cloudBannerImgURL}/h5/img/indo4d.png`,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
					items: [
						{
							...defGameInfo.Cricket,
							img: `${cloudBannerImgURL}/h5/img/cricket.png`,
							spanTextKey: "lbl_Cricket"
						},
						{
							...defGameInfo.Soccer,
							img: `${cloudBannerImgURL}/h5/img/soccer.png`,
							spanTextKey: "lbl_Soccer"
						},
						{
							...defGameInfo.SabaSoccer,
							img: `${cloudBannerImgURL}/h5/img/saba_soccer.png`,
							spanTextKey: "lbl_SabaSoccer"
						},
						{
							...defGameInfo.Basketball,
							img: `${cloudBannerImgURL}/h5/img/basketball.png`,
							spanTextKey: "lbl_Basketball"
						},
						{
							...defGameInfo.Tennis,
							img: `${cloudBannerImgURL}/h5/img/tennis.png`,
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
							img: `${cloudBannerImgURL}/h5/img/9w.png`,
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
					items: [
						{
							...defGameInfo.ESportAll,
							spanTextKey: "lbl_All",
							img: `${cloudBannerImgURL}/h5/img/esportALL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: `${cloudBannerImgURL}/h5/img/esportDOTA2.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: `${cloudBannerImgURL}/h5/img/esportLOL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: `${cloudBannerImgURL}/h5/img/esportCS.png`
						},

						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: `${cloudBannerImgURL}/h5/img/esportKOG.png`
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
						// 	spanText: "Microgaming",
						// 								img: `${cloudBannerImgURL}/h5/img/mgp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ev.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ptc.png`,
							useGotoGame: true
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: `${cloudBannerImgURL}/h5/img/dg.png`
						},
						{
							...defGameInfo.LIVEcasinoAE,
							spanText: "AE Casino",
							img: `${cloudBannerImgURL}/h5/img/ae.png`
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: `${cloudBannerImgURL}/h5/img/sa.png`
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: `${cloudBannerImgURL}/h5/img/ab.png`
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: `${cloudBannerImgURL}/h5/img/ag.png`
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: `${cloudBannerImgURL}/h5/img/wm.png`
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: `${cloudBannerImgURL}/h5/img/eb.png`
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: `${cloudBannerImgURL}/h5/img/n2.png`
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					items: [
						{
							...defGameInfo.Casino_AdvantPlay,
							parameter: defGameInfo.Casino_AdvantPlay,
							spanText: "AdvantPlay",
							providerImgName: "ap",
							img: `${cloudBannerImgURL}/h5/img/ap.png`,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_AdvantPlay
									)
								}
							]
						},
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							img: `${cloudBannerImgURL}/h5/img/spp.png`,
							path: path.casino.root,
							providerImgName: "pp"
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: `${cloudBannerImgURL}/h5/img/nt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/mg.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ji.png`,
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
							...defGameInfo.Casino_PG,
							parameter: defGameInfo.Casino_PG,
							spanText: "PG Soft",
							img: `${cloudBannerImgURL}/h5/img/pg.png`,
							path: path.casino.root,
							providerImgName: "pg"
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: `${cloudBannerImgURL}/h5/img/joker.png`,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: `${cloudBannerImgURL}/h5/img/sg.png`,
							path: path.casino.root,
							providerImgName: "sg"
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: `${cloudBannerImgURL}/h5/img/rt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pt.png`,
							path: path.casino.root,
							providerImgName: "pt",
							tpGameType: 46
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: `${cloudBannerImgURL}/h5/img/ygg.png`,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: `${cloudBannerImgURL}/h5/img/cq9.png`,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: `${cloudBannerImgURL}/h5/img/gpi.png`,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.casino_ICG,
							parameter: defGameInfo.casino_ICG,
							spanText: "Astro Tech",
							img: `${cloudBannerImgURL}/h5/img/icg.png`,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: `${cloudBannerImgURL}/h5/img/ow.png`,
							allowCurrency: [
								defCurrenyId.IDR,
								defCurrenyId.MYR,
								defCurrenyId.THB
							]
						}
						// {
						// ...defGameInfo.Casino_918Kiss,
						// parameter:defGameInfo.Casino_918Kiss,
						// spanText: "918Kiss",
						//     							img: `${cloudBannerImgURL}/h5/img/kiss.png`,
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
							...defGameInfo.MPoker,
							img: `${cloudBannerImgURL}/h5/img/mp.png`,
							spanText: "MPoker",
							tpGameType: 60,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.MPoker)
								}
							],
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.amb,
							img: `${cloudBannerImgURL}/h5/img/amb.png`,
							spanTextKey: "lbl_Amb",
							allowCurrency: [defCurrenyId.THB]
						},
						{
							...defGameInfo.kingMaker,
							img: `${cloudBannerImgURL}/h5/img/km.png`,
							spanTextKey: "lbl_KingMaker"
						},
						{
							...defGameInfo.sabaClub,
							img: `${cloudBannerImgURL}/h5/img/vg.png`,
							spanTextKey: "lbl_Vgaming",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.game_Vgaming
									)
								}
							]
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
							img: `${cloudBannerImgURL}/h5/img/fw.png`
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: `${cloudBannerImgURL}/h5/img/pd.png`
						},

						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: `${cloudBannerImgURL}/h5/img/ffw.png`
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: `${cloudBannerImgURL}/h5/img/df.png`
						},
						{
							...defGameInfo.FishingHaiba,
							spanTextKey: "lbl_Fishing_Haiba",
							img: `${cloudBannerImgURL}/h5/img/hb.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingHappyFish5,
							spanTextKey: "lbl_Fishing_Hunting_Happy_Fish_5",
							img: `${cloudBannerImgURL}/h5/img/hf5.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingMonsterAwaken,
							spanTextKey: "lbl_Fishing_Hunting_Monster_Awaken",
							img: `${cloudBannerImgURL}/h5/img/ma.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingSG,
							spanTextKey: "lbl_FishingSG1",
							img: `${cloudBannerImgURL}/h5/img/fg.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.Fishing_AT01,
							spanTextKey: "lbl_Oneshot_Fishing",
							img: `${cloudBannerImgURL}/h5/img/of.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
							spanTextKey:
								"lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
							img: `${cloudBannerImgURL}/h5/img/tap.png`,
							allowCurrency: [defCurrenyId.INR]
						},
						{
							...defGameInfo.ICG_FISHING_OF_SAVIORS,
							spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
							img: `${cloudBannerImgURL}/h5/img/fos.png`,
							allowCurrency: [defCurrenyId.INR]
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
							img: `${cloudBannerImgURL}/h5/img/tcg.png`,
							spanTextKey: "lbl_TCG",
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(eventTime.tcg)
								}
							]
						},
						{
							...defGameInfo.Keno,
							img: `${cloudBannerImgURL}/h5/img/keno.png`,
							spanTextKey: "lbl_Keno"
						},
						{
							...defGameInfo.lottery,
							img: `${cloudBannerImgURL}/h5/img/lottery.png`,
							spanTextKey: "lbl_Lottery"
						},
						{
							...defGameInfo.NumberGame,
							img: `${cloudBannerImgURL}/h5/img/numbergame.png`,
							spanTextKey: "lbl_NumberGame"
						},
						{
							...defGameInfo.tableGame,
							img: `${cloudBannerImgURL}/h5/img/tablegame.png`,
							spanTextKey: "lbl_TableGame"
						},
						{
							...defGameInfo.Indo4d,
							img: `${cloudBannerImgURL}/h5/img/indo4d.png`,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
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
					items: [
						{
							...defGameInfo.Soccer,
							img: `${cloudBannerImgURL}/h5/img/soccer.png`,
							spanTextKey: "lbl_Soccer"
						},
						{
							...defGameInfo.SabaSoccer,
							img: `${cloudBannerImgURL}/h5/img/saba_soccer.png`,
							spanTextKey: "lbl_SabaSoccer"
						},
						{
							...defGameInfo.Basketball,
							img: `${cloudBannerImgURL}/h5/img/basketball.png`,
							spanTextKey: "lbl_Basketball"
						},
						{
							...defGameInfo.Tennis,
							img: `${cloudBannerImgURL}/h5/img/tennis.png`,
							spanTextKey: "lbl_Tennis"
						},
						{
							...defGameInfo.Cricket,
							img: `${cloudBannerImgURL}/h5/img/cricket.png`,
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
							img: `${cloudBannerImgURL}/h5/img/esportALL.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "CS:GO",
							img: `${cloudBannerImgURL}/h5/img/esportCS.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "DOTA2",
							img: `${cloudBannerImgURL}/h5/img/esportDOTA2.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "KOG",
							img: `${cloudBannerImgURL}/h5/img/esportKOG.png`
						},
						{
							...defGameInfo.ESportAll,
							spanText: "LOL",
							img: `${cloudBannerImgURL}/h5/img/esportLOL.png`
						}
					]
				},
				{
					category: "livecasino",
					categoryIcon: "livecasino",
					translateKey: "lbl_LiveCasino",
					items: [
						// {
						// 	...defGameInfo.LIVEcasinoMGP,
						// 	spanText: "Microgaming",
						// 	img: `${cloudBannerImgURL}/h5/img/mgp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pp.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ev.png`,
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
							img: `${cloudBannerImgURL}/h5/img/ptc.png`,
							useGotoGame: true
						},
						{
							...defGameInfo.LIVEcasinoN2Live,
							spanText: "n2-LIVE",
							img: `${cloudBannerImgURL}/h5/img/n2.png`
						},
						{
							...defGameInfo.LIVEcasinoWM,
							spanText: "WM Casino",
							img: `${cloudBannerImgURL}/h5/img/wm.png`
						},
						{
							...defGameInfo.LIVEcasinoAB,
							spanText: "Allbet",
							img: `${cloudBannerImgURL}/h5/img/ab.png`
						},
						{
							...defGameInfo.LIVEcasinoEB,
							spanText: "eBET",
							img: `${cloudBannerImgURL}/h5/img/eb.png`
						},
						{
							...defGameInfo.LIVEcasinoSA,
							spanText: "SA Gaming",
							img: `${cloudBannerImgURL}/h5/img/sa.png`
						},
						{
							...defGameInfo.LIVEcasinoAE,
							spanText: "AE Casino",
							img: `${cloudBannerImgURL}/h5/img/ae.png`
						},
						{
							...defGameInfo.LIVEcasinoDG,
							spanText: "Dream Gaming",
							img: `${cloudBannerImgURL}/h5/img/dg.png`
						},
						{
							...defGameInfo.LIVEcasinoAG,
							spanText: "Asia Gaming",
							img: `${cloudBannerImgURL}/h5/img/ag.png`
						}
					]
				},
				{
					category: "slot",
					categoryIcon: "icon_777",
					translateKey: "lbl_Casino",
					items: [
						{
							...defGameInfo.Casino_AdvantPlay,
							parameter: defGameInfo.Casino_AdvantPlay,
							spanText: "AdvantPlay",
							providerImgName: "ap",
							img: `${cloudBannerImgURL}/h5/img/ap.png`,
							path: path.casino.root,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.casino_AdvantPlay
									)
								}
							]
						},
						{
							...defGameInfo.Casino_PP,
							parameter: defGameInfo.Casino_PP,
							spanText: "Pragmatic Play",
							providerImgName: "pp",
							img: `${cloudBannerImgURL}/h5/img/spp.png`,
							path: path.casino.root
						},
						{
							...defGameInfo.Casino_NetEnt,
							parameter: defGameInfo.Casino_NetEnt,
							spanText: "NetEnt",
							providerImgName: "nt",
							img: `${cloudBannerImgURL}/h5/img/nt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/mg.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pt.png`,
							path: path.casino.root,
							providerImgName: "pt"
						},
						{
							...defGameInfo.Casino_Jili,
							parameter: defGameInfo.Casino_Jili,
							spanText: "Jili",
							img: `${cloudBannerImgURL}/h5/img/ji.png`,
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
							img: `${cloudBannerImgURL}/h5/img/icg.png`,
							path: path.casino.root,
							providerImgName: "icg"
						},
						{
							...defGameInfo.Casino_JOKER,
							parameter: defGameInfo.Casino_JOKER,
							spanText: "JOKER",
							img: `${cloudBannerImgURL}/h5/img/joker.png`,
							path: path.casino.root,
							providerImgName: "jk"
						},
						{
							...defGameInfo.Casino_CQ9,
							parameter: defGameInfo.Casino_CQ9,
							spanText: "CQ9",
							img: `${cloudBannerImgURL}/h5/img/cq9.png`,
							path: path.casino.root,
							providerImgName: "cq9"
						},
						{
							...defGameInfo.Casino_GPI,
							parameter: defGameInfo.Casino_GPI,
							spanText: "Game Play",
							img: `${cloudBannerImgURL}/h5/img/gpi.png`,
							path: path.casino.root,
							providerImgName: "gp"
						},
						{
							...defGameInfo.Casino_YGG,
							parameter: defGameInfo.Casino_YGG,
							spanText: "YGGDrassil",
							img: `${cloudBannerImgURL}/h5/img/ygg.png`,
							path: path.casino.root,
							providerImgName: "yg"
						},
						{
							...defGameInfo.Casino_SG,
							parameter: defGameInfo.Casino_SG,
							spanText: "Spadegaming",
							img: `${cloudBannerImgURL}/h5/img/sg.png`,
							path: path.casino.root,
							providerImgName: "sg"
						},
						{
							...defGameInfo.Casino_RedTiger,
							parameter: defGameInfo.Casino_RedTiger,
							spanText: "Red Tiger",
							providerImgName: "rt",
							img: `${cloudBannerImgURL}/h5/img/rt.png`,
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
							img: `${cloudBannerImgURL}/h5/img/pg.png`,
							path: path.casino.root,
							providerImgName: "pg"
						},
						{
							...defGameInfo.Casino_OW,
							parameter: defGameInfo.Casino_OW,
							spanText: "Saba Casino",
							img: `${cloudBannerImgURL}/h5/img/ow.png`,
							allowCurrency: [
								defCurrenyId.IDR,
								defCurrenyId.MYR,
								defCurrenyId.THB
							]
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
							img: `${cloudBannerImgURL}/h5/img/km.png`,
							spanTextKey: "lbl_KingMaker"
						}
					]
				},
				{
					category: "game",
					categoryIcon: "game",
					translateKey: "lbl_Fishing",
					items: [
						{
							...defGameInfo.FishingHaiba,
							spanTextKey: "lbl_Fishing_Haiba",
							img: `${cloudBannerImgURL}/h5/img/hb.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingHappyFish5,
							spanTextKey: "lbl_Fishing_Hunting_Happy_Fish_5",
							img: `${cloudBannerImgURL}/h5/img/hf5.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.FishingMonsterAwaken,
							spanTextKey: "lbl_Fishing_Hunting_Monster_Awaken",
							img: `${cloudBannerImgURL}/h5/img/ma.png`,
							eventIcon: [
								{
									icon: defIconType.new,
									inPeriod: isEventPeriod(
										eventTime.fishing_Joker
									)
								}
							]
						},
						{
							...defGameInfo.Fishing_AB3,
							spanTextKey: "lbl_Paradise",
							img: `${cloudBannerImgURL}/h5/img/pd.png`
						},
						{
							...defGameInfo.ICG_DRAGONBALL_FISHING,
							spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
							img: `${cloudBannerImgURL}/h5/img/df.png`
						},
						{
							...defGameInfo.FishingGG,
							spanTextKey: "lbl_FishingGG",
							img: `${cloudBannerImgURL}/h5/img/ffw.png`
						},
						{
							...defGameInfo.FishingSGW,
							spanTextKey: "lbl_FishingSG2",
							img: `${cloudBannerImgURL}/h5/img/fw.png`
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
							img: `${cloudBannerImgURL}/h5/img/tcg.png`,
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
							img: `${cloudBannerImgURL}/h5/img/indo4d.png`,
							spanTextKey: "lbl_Indo4d",
							allowCurrency: [defCurrenyId.IDR]
						},
						{
							...defGameInfo.Keno,
							img: `${cloudBannerImgURL}/h5/img/keno.png`,
							spanTextKey: "lbl_Keno"
						},
						{
							...defGameInfo.lottery,
							img: `${cloudBannerImgURL}/h5/img/lottery.png`,
							spanTextKey: "lbl_Lottery"
						},
						{
							...defGameInfo.NumberGame,
							img: `${cloudBannerImgURL}/h5/img/numbergame.png`,
							spanTextKey: "lbl_NumberGame"
						},
						{
							...defGameInfo.tableGame,
							img: `${cloudBannerImgURL}/h5/img/tablegame.png`,
							spanTextKey: "lbl_TableGame"
						}
					]
				},
				{
					category: "poker",
					categoryIcon: "casino",
					translateKey: "lbl_Poker",
					tpGameType: defGameInfo.oneGame.tpGameType,
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
	Casino_AdvantPlay: { tpId: 39, tpGameType: 67 },
	Casino_RedTiger: { tpId: 38, tpGameType: 65 },
	Fishing_AB3: { tpId: 16, gameId: "AB3", tpGameType: 44 },
	Fishing_AT05: { tpId: 16, gameId: "AT05", tpGameType: 44 },
	Fishing_AT01: { tpId: 16, gameId: "AT01", tpGameType: 44 },
	Fishing_AT06: { tpId: 16, gameId: "AT06", tpGameType: 44 },
	Fishing_AT04: { tpId: 16, gameId: "AT04", tpGameType: 44 },
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0006",
		tpGameType: 40
	},
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001", tpGameType: 40 },
	ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002", tpGameType: 40 },
	FishingHaiba: { tpId: 9, gameId: "kk8nqm3cfwtng", tpGameType: 66 },
	FishingHappyFish5: { tpId: 9, gameId: "st5cmuqnaxycn", tpGameType: 66 },
	FishingMonsterAwaken: { tpId: 9, gameId: "1jeqx59c7ztqg", tpGameType: 66 },
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
