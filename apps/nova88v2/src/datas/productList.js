import { isDateRange } from "@ailab-mobile/common";
import path from "../path";
import SiteURL, { cloudBannerImgURL } from "../config";
import { defPopBoxType } from "../components/common/popbox";
import { isEventPeriod, defCurrenyId } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";
import { getLeaderBoardSupportCurrencyId } from "../components/ranking/def";
import allowedCurrencyList from "./allowedCurrencyList";
import { angPaoEventPeriod } from "../pages/angpao";

export const productList = {
	kiss918: {
		tpId: 21,
		gameId: 21
	},
	oneGame: {
		tpId: 13
	},
	mega888: {
		tpId: 22,
		tpGameType: 34
	}
};

// PP 移除時間
const ppDestroyDate = "2023-02-28 23:00:00";

export const getPPAllowCurrencies = () => {
	return isDateRange({ endDate: ppDestroyDate })
		? Object.values(defCurrenyId).filter(
				currency => currency !== defCurrenyId.INR
		  )
		: Object.values(defCurrenyId);
};

export const getCurrencyLink = (targetCurrencyId, langId) => {
	if (targetCurrencyId === defCurrenyId.MYR) {
		return ` https://aff.nova88mas102.com/?lang=${langId}`;
	}
	if (targetCurrencyId === defCurrenyId.INR) {
		return `https://aff.nova88india.com/?lang=${langId}`;
	}
	return `https://aff.nova88bkk.com/?lang=${langId}`;
};

export const defIconType = {
	new: " icon-new",
	hot: " icon-mediafire"
};

export const defSlotTpGameType = {
	Saba: { tpId: 1, tpGameType: 4 },
	PP: { tpId: 5, tpGameType: 7 },
	NetEnt: { tpId: 37, tpGameType: 64 },
	GPI: { tpId: 6, tpGameType: 11 },
	Joker: { tpId: 9, tpGameType: 13 },
	YGG: { tpId: 8, tpGameType: 14 },
	AMBSLot: { tpId: 30, tpGameType: 76 },
	SG: { tpId: 10, tpGameType: 15 },
	PG: { tpId: 14, tpGameType: 17 },
	CQ9: { tpId: 16, tpGameType: 29 },
	Iconic: { tpId: 24, tpGameType: 39 },
	PT: { tpId: 27, tpGameType: 46 },
	JILI: { tpId: 32, tpGameType: 53 },
	MG: { tpId: 34, tpGameType: 57 },
	RedTiger: { tpId: 38, tpGameType: 65 },
	AdvantPlay: { tpId: 39, tpGameType: 67 },
	Mega888: { tpId: 22, tpGameType: 34 },
	Habanero: { tpId: 40, tpGameType: 68 },
	Skywind: { tpId: 43, tpGameType: 82 },
	SimplePlay: { tpId: 44, tpGameType: 86 },
	Kiss918: { tpId: 21, tpGameType: 33 }
};

const defSortSports = {
	[defCurrenyId.INR]: [
		"worldCup",
		"cricket",
		"soccer",
		"cryptoSports",
		"sabaSoccer",
		"basketball",
		"tennis",
		"virtualSports"
	]
};

const defSortCasino = {
	[defCurrenyId.THB]: [
		"casino_PP",
		"casino_YEEBET",
		"casino_Skywind",
		"casino_MG",
		"casino_EVO",
		"casino_PT",
		"casino_DG",
		"casino_AE",
		"casino_SA",
		"casino_ALBET",
		"casino_AG",
		"casino_WM",
		"casino_EBET",
		"casino_N2LIVE"
	],
	[defCurrenyId.MYR]: [
		"casino_PP",
		"casino_YEEBET",
		"casino_Skywind",
		"casino_MG",
		"casino_EVO",
		"casino_PT",
		"casino_DG",
		"casino_AE",
		"casino_SA",
		"casino_ALBET",
		"casino_AG",
		"casino_WM",
		"casino_EBET",
		"casino_N2LIVE"
	],
	[defCurrenyId.IDR]: [
		"casino_PP",
		"casino_YEEBET",
		"casino_Skywind",
		"casino_MG",
		"casino_EVO",
		"casino_PT",
		"casino_DG",
		"casino_AE",
		"casino_SA",
		"casino_ALBET",
		"casino_AG",
		"casino_WM",
		"casino_EBET",
		"casino_N2LIVE"
	],
	[defCurrenyId.INR]: [
		"casino_PP",
		"casino_YEEBET",
		"casino_Skywind",
		"casino_MG",
		"casino_EVO",
		"casino_PT",
		"casino_DG",
		"casino_AE",
		"casino_SA",
		"casino_ALBET",
		"casino_AG",
		"casino_WM",
		"casino_EBET",
		"casino_N2LIVE"
	]
};

const defSortSlot = {
	[defCurrenyId.THB]: [
		"slot_AdvantPlay",
		"slot_PP",
		"slot_Skywind",
		"slot_Mega888",
		"slot_SimplePlay",
		"slot_Habanero",
		"slot_NetEnt",
		"slot_MGPSW",
		"slot_JI",
		"slot_PG",
		"slot_JOKER",
		"slot_SG",
		"slot_RedTiger",
		"slot_PT",
		"slot_YGG",
		"slot_AMB",
		"slot_CQ9",
		"slot_GPI",
		"slot_ICG",
		"slot_OW"
	],
	[defCurrenyId.MYR]: [
		"slot_AdvantPlay",
		"slot_PP",
		"slot_Skywind",
		"slot_kiss918",
		"slot_Mega888",
		"slot_SimplePlay",
		"slot_Habanero",
		"slot_NetEnt",
		"slot_MGPSW",
		"slot_JI",
		"slot_PG",
		"slot_JOKER",
		"slot_SG",
		"slot_RedTiger",
		"slot_PT",
		"slot_YGG",
		"slot_CQ9",
		"slot_GPI",
		"slot_ICG",
		"slot_OW"
	],
	[defCurrenyId.IDR]: [
		"slot_AdvantPlay",
		"slot_PP",
		"slot_Skywind",
		"slot_Mega888",
		"slot_SimplePlay",
		"slot_Habanero",
		"slot_NetEnt",
		"slot_MGPSW",
		"slot_JI",
		"slot_PG",
		"slot_JOKER",
		"slot_SG",
		"slot_RedTiger",
		"slot_PT",
		"slot_YGG",
		"slot_CQ9",
		"slot_GPI",
		"slot_ICG",
		"slot_OW"
	],
	[defCurrenyId.INR]: [
		"slot_NetEnt",
		"slot_RedTiger",
		"slot_AdvantPlay",
		"slot_PP",
		"slot_Skywind",
		"slot_SimplePlay",
		"slot_Habanero",
		"slot_MGPSW",
		"slot_JI",
		"slot_PG",
		"slot_JOKER",
		"slot_SG",
		"slot_PT",
		"slot_YGG",
		"slot_CQ9",
		"slot_GPI",
		"slot_ICG",
		"slot_OW"
	]
};

const defSortFishing = {
	[defCurrenyId.THB]: [
		"fishing_SGW_WAR",
		"fishing_CQ9_PARADISE",
		"fishing_GGYL_WORLD",
		"fishing_Skywind_Ocean_Ruler",
		"fishing_Skywind_Cai_Shen_Da_Hai",
		"fishing_ICG_DRAGONBALL",
		"fishing_Haiba",
		"fishing_Hunting_Happy_Fish_5",
		"fishing_Hunting_Monster_Awaken",
		"fishing_SG",
		"fishing_CQ9_ONESHOT",
		"fishing_ICG_THE_TYRANT_AND_THE_PRINCESS",
		"ICG_FISHING_OF_SAVIORS"
	],
	[defCurrenyId.MYR]: [
		"fishing_SGW_WAR",
		"fishing_CQ9_PARADISE",
		"fishing_GGYL_WORLD",
		"fishing_Skywind_Ocean_Ruler",
		"fishing_Skywind_Cai_Shen_Da_Hai",
		"fishing_ICG_DRAGONBALL",
		"fishing_Haiba",
		"fishing_Hunting_Happy_Fish_5",
		"fishing_Hunting_Monster_Awaken",
		"fishing_SG",
		"fishing_CQ9_ONESHOT",
		"fishing_ICG_THE_TYRANT_AND_THE_PRINCESS",
		"ICG_FISHING_OF_SAVIORS"
	],
	[defCurrenyId.IDR]: [
		"fishing_SGW_WAR",
		"fishing_CQ9_PARADISE",
		"fishing_GGYL_WORLD",
		"fishing_Skywind_Ocean_Ruler",
		"fishing_Skywind_Cai_Shen_Da_Hai",
		"fishing_ICG_DRAGONBALL",
		"fishing_Haiba",
		"fishing_Hunting_Happy_Fish_5",
		"fishing_Hunting_Monster_Awaken",
		"fishing_SG",
		"fishing_CQ9_ONESHOT",
		"fishing_ICG_THE_TYRANT_AND_THE_PRINCESS",
		"ICG_FISHING_OF_SAVIORS"
	],
	[defCurrenyId.INR]: [
		"fishing_SGW_WAR",
		"fishing_CQ9_PARADISE",
		"fishing_GGYL_WORLD",
		"fishing_Skywind_Ocean_Ruler",
		"fishing_Skywind_Cai_Shen_Da_Hai",
		"fishing_ICG_DRAGONBALL",
		"fishing_Haiba",
		"fishing_Hunting_Happy_Fish_5",
		"fishing_Hunting_Monster_Awaken",
		"fishing_SG",
		"fishing_CQ9_ONESHOT",
		"fishing_ICG_THE_TYRANT_AND_THE_PRINCESS",
		"ICG_FISHING_OF_SAVIORS"
	]
};

const gameList = ({ langId, currencyId }) => {
	return [
		{
			category: "reward",
			imgUrl: `${cloudBannerImgURL}/h5/img/88rewards.png`,
			allowCurrency: allowedCurrencyList.rewards,
			className: "reward",
			href: `${SiteURL.openURL}/rewards/`
		},
		{
			event: true,
			category: "event",
			imgUrl: `${cloudBannerImgURL}/h5/img/event/wheel/eventlink-top.png`,
			allowCurrency: allowedCurrencyList.wheel,
			className: "event",
			path: `lucky-wheel`,
			isEventPeriod: !isDateRange(angPaoEventPeriod)
		},
		{
			category: "cryptoSports",
			event: true,
			imgUrl: `${cloudBannerImgURL}/h5/img/cryptosports.png`,
			className: "crypto",
			...defGameInfo.CryptoSports,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.sports_cryptoSports)
				}
			]
		},
		{
			category: "sports",
			categoryIcon: "soccer",
			translateKey: "lbl_Sports",
			customSort: defSortSports,
			items: [
				{
					...defGameInfo.Soccer,
					img: `${cloudBannerImgURL}/h5/img/soccer.png`,
					spanTextKey: "lbl_Soccer",
					sortKey: "soccer"
				},
				{
					...defGameInfo.CryptoSports,
					img: `${cloudBannerImgURL}/h5/img/cryptosportsNPC.png`,
					spanTextKey: "lbl_cryptoSports",
					sortKey: "cryptoSports",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(
								eventTime.sports_cryptoSports
							)
						}
					]
				},
				{
					...defGameInfo.SabaSoccer,
					img: `${cloudBannerImgURL}/h5/img/saba_soccer.png`,
					spanTextKey: "lbl_SabaSoccer",
					sortKey: "sabaSoccer"
				},
				{
					...defGameInfo.Basketball,
					img: `${cloudBannerImgURL}/h5/img/basketball.png`,
					spanTextKey: "lbl_Basketball",
					sortKey: "basketball"
				},
				{
					...defGameInfo.Tennis,
					img: `${cloudBannerImgURL}/h5/img/tennis.png`,
					spanTextKey: "lbl_Tennis",
					sortKey: "tennis"
				},
				{
					...defGameInfo.Cricket,
					img: `${cloudBannerImgURL}/h5/img/cricket.png`,
					spanTextKey: "lbl_Cricket",
					sortKey: "cricket"
				},
				{
					...defGameInfo.VirtualSports,
					img: `${cloudBannerImgURL}/h5/img/betradarsoccer.png`,
					spanTextKey: "lbl_VirtualSports",
					sortKey: "virtualSports"
				},
				{
					...defGameInfo.Wap,
					img: `${cloudBannerImgURL}/h5/img/wap.png`,
					spanText: "WAP",
					specialUrl: "&device=wap",
					hideBeforeLogin: true,
					allowCurrency: allowedCurrencyList.wap,
					sortKey: "wap"
				}
			]
		},
		{
			category: "exchange",
			categoryIcon: "sports",
			translateKey: "lbl_Exchange",
			allowCurrency: allowedCurrencyList.exchange,
			items: [
				{
					...defGameInfo.nineW,
					img: `${cloudBannerImgURL}/h5/img/9w.png`,
					spanTextKey: "lbl_9w",
					allowCurrency: allowedCurrencyList.exchange,
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
					...defGameInfo.ESportCS,
					spanText: "CS:GO",
					img: `${cloudBannerImgURL}/h5/img/esportCS.png`
				},
				{
					...defGameInfo.ESportDota,
					spanText: "DOTA2",
					img: `${cloudBannerImgURL}/h5/img/esportDOTA2.png`
				},
				{
					...defGameInfo.ESportKOG,
					spanText: "KOG",
					img: `${cloudBannerImgURL}/h5/img/esportKOG.png`
				},
				{
					...defGameInfo.ESportLOL,
					spanText: "LOL",
					img: `${cloudBannerImgURL}/h5/img/esportLOL.png`
				}
			]
		},
		{
			category: "livecasino",
			categoryIcon: "livecasino",
			translateKey: "lbl_LiveCasino",
			customSort: defSortCasino,
			items: [
				{
					...defGameInfo.LIVEcasinoPP,
					spanText: "Pragmatic Play",
					img: `${cloudBannerImgURL}/h5/img/pp.png`,
					sortKey: "casino_PP",
					allowCurrency: getPPAllowCurrencies()
				},
				{
					...defGameInfo.LIVEcasinoYEEBET,
					spanText: "YEEBET",
					img: `${cloudBannerImgURL}/h5/img/yb.png`,
					sortKey: "casino_YEEBET",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.yee_bet)
						}
					]
				},
				{
					...defGameInfo.LIVEcasinoSkywind,
					spanText: "Skywind",
					img: `${cloudBannerImgURL}/h5/img/sk.png`,
					sortKey: "casino_Skywind",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.skywind)
						}
					]
				},
				{
					...defGameInfo.LIVEcasinoMG,
					spanText: "Microgaming",
					img: `${cloudBannerImgURL}/h5/img/mgp.png`,
					sortKey: "casino_MG"
				},
				{
					...defGameInfo.LIVEcasinoEVO,
					spanText: "Evolution Gaming",
					img: `${cloudBannerImgURL}/h5/img/ev.png`,
					sortKey: "casino_EVO"
				},
				{
					...defGameInfo.LIVEcasino_PT,
					spanText: "Playtech",
					img: `${cloudBannerImgURL}/h5/img/ptc.png`,
					useGotoGame: true,
					sortKey: "casino_PT"
				},
				{
					...defGameInfo.LIVEcasinoN2Live,
					spanText: "n2-LIVE",
					img: `${cloudBannerImgURL}/h5/img/n2.png`,
					sortKey: "casino_N2LIVE"
				},
				{
					...defGameInfo.LIVEcasinoWM,
					spanText: "WM Casino",
					img: `${cloudBannerImgURL}/h5/img/wm.png`,
					allowCurrency: allowedCurrencyList.liveCasinoWM,
					sortKey: "casino_WM"
				},
				{
					...defGameInfo.LIVEcasinoAB,
					spanText: "Allbet",
					img: `${cloudBannerImgURL}/h5/img/ab.png`,
					sortKey: "casino_ALBET"
				},
				{
					...defGameInfo.LIVEcasinoEB,
					spanText: "eBET",
					img: `${cloudBannerImgURL}/h5/img/eb.png`,
					sortKey: "casino_EBET"
				},
				{
					...defGameInfo.LIVEcasinoSA,
					spanText: "SA Gaming",
					img: `${cloudBannerImgURL}/h5/img/sa.png`,
					sortKey: "casino_SA"
				},
				{
					...defGameInfo.LIVEcasinoAE,
					spanText: "AE Sexy",
					img: `${cloudBannerImgURL}/h5/img/ae.png`,
					sortKey: "casino_AE"
				},
				{
					...defGameInfo.LIVEcasinoDG,
					spanText: "Dream Gaming",
					img: `${cloudBannerImgURL}/h5/img/dg.png`,
					sortKey: "casino_DG"
				},
				{
					...defGameInfo.LIVEcasinoAG,
					spanText: "Asia Gaming",
					img: `${cloudBannerImgURL}/h5/img/ag.png`,
					sortKey: "casino_AG"
				}
			]
		},
		{
			category: "slot",
			categoryIcon: "icon_777",
			translateKey: "lbl_Casino",
			customSort: defSortSlot,
			items: [
				{
					...defGameInfo.Casino_AdvantPlay,
					parameter: defGameInfo.Casino_AdvantPlay,
					spanText: "AdvantPlay",
					providerImgName: "ap",
					img: `${cloudBannerImgURL}/h5/img/apnew.png`,
					path: path.casino.root,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.ap_mini_game)
						}
					],
					sortKey: "slot_AdvantPlay"
				},
				{
					...defGameInfo.Casino_PP,
					parameter: defGameInfo.Casino_PP,
					spanText: "Pragmatic Play",
					providerImgName: "pp",
					img: `${cloudBannerImgURL}/h5/img/spp.png`,
					path: path.casino.root,
					sortKey: "slot_PP",
					allowCurrency: getPPAllowCurrencies()
				},
				{
					...defGameInfo.Casino_Skywind,
					parameter: defGameInfo.Casino_Skywind,
					spanText: "Skywind",
					providerImgName: "sk",
					img: `${cloudBannerImgURL}/h5/img/slotsk.png`,
					path: path.casino.root,
					sortKey: "slot_Skywind",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.skywind)
						}
					]
				},
				{
					...defGameInfo.Casino_918Kiss,
					parameter: defGameInfo.Casino_918Kiss,
					spanText: "918Kiss",
					img: `${cloudBannerImgURL}/h5/img/918kiss.png`,
					path: path.casino.root,
					providerImgName: "casino_kiss918",
					sortKey: "slot_kiss918",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.slot_918Kiss)
						}
					]
				},
				{
					...productList.mega888,
					parameter: productList.mega888,
					spanText: "Mega888",
					providerImgName: "mega",
					img: `${cloudBannerImgURL}/h5/img/mega888.png`,
					path: path.mega888.root,
					alwaysShowOnSlotLobby: true,
					sortKey: "slot_Mega888"
				},
				{
					...defGameInfo.Casino_SimplePlay,
					parameter: defGameInfo.Casino_SimplePlay,
					spanText: "SimplePlay",
					providerImgName: "casino_simpleplay",
					img: `${cloudBannerImgURL}/h5/img/simpleplay.png`,
					path: path.casino.root,
					sortKey: "slot_SimplePlay",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.casino_SimplePlay)
						}
					]
				},
				{
					...defGameInfo.Casino_Habanero,
					parameter: defGameInfo.Casino_Habanero,
					spanText: "Habanero",
					providerImgName: "ho",
					img: `${cloudBannerImgURL}/h5/img/ho.png`,
					path: path.casino.root,
					sortKey: "slot_Habanero"
				},
				{
					...defGameInfo.Casino_NetEnt,
					parameter: defGameInfo.Casino_NetEnt,
					spanText: "NetEnt",
					providerImgName: "nt",
					img: `${cloudBannerImgURL}/h5/img/nt.png`,
					path: path.casino.root,
					sortKey: "slot_NetEnt"
				},
				{
					...defGameInfo.Casino_MGP,
					parameter: defGameInfo.Casino_MGP,
					spanText: "Microgaming",
					img: `${cloudBannerImgURL}/h5/img/mg.png`,
					path: path.casino.root,
					providerImgName: "mg",
					sortKey: "slot_MGPSW"
				},
				{
					...defGameInfo.Casino_PT,
					parameter: defGameInfo.Casino_PT,
					spanText: "Playtech",
					img: `${cloudBannerImgURL}/h5/img/pt.png`,
					path: path.casino.root,
					providerImgName: "pt",
					sortKey: "slot_PT"
				},
				{
					...defGameInfo.Casino_Jili,
					parameter: defGameInfo.Casino_Jili,
					spanText: "Jili",
					img: `${cloudBannerImgURL}/h5/img/ji.png`,
					path: path.casino.root,
					providerImgName: "ji",
					sortKey: "slot_JI"
				},
				{
					...defGameInfo.casino_ICG,
					parameter: defGameInfo.casino_ICG,
					spanText: "Astro Tech",
					img: `${cloudBannerImgURL}/h5/img/icg.png`,
					path: path.casino.root,
					providerImgName: "icg",
					sortKey: "slot_ICG"
				},
				{
					...defGameInfo.Casino_JOKER,
					parameter: defGameInfo.Casino_JOKER,
					spanText: "JOKER",
					img: `${cloudBannerImgURL}/h5/img/joker.png`,
					path: path.casino.root,
					providerImgName: "jk",
					sortKey: "slot_JOKER"
				},
				{
					...defGameInfo.Casino_CQ9,
					parameter: defGameInfo.Casino_CQ9,
					spanText: "CQ9",
					img: `${cloudBannerImgURL}/h5/img/cq9.png`,
					path: path.casino.root,
					providerImgName: "cq9",
					sortKey: "slot_CQ9"
				},
				{
					...defGameInfo.Casino_GPI,
					parameter: defGameInfo.Casino_GPI,
					spanText: "Game Play",
					img: `${cloudBannerImgURL}/h5/img/gpi.png`,
					path: path.casino.root,
					providerImgName: "gp",
					sortKey: "slot_GPI"
				},
				{
					...defGameInfo.Casino_YGG,
					parameter: defGameInfo.Casino_YGG,
					spanText: "YGGDrassil",
					img: `${cloudBannerImgURL}/h5/img/ygg.png`,
					path: path.casino.root,
					providerImgName: "yg",
					sortKey: "slot_YGG"
				},
				{
					...defGameInfo.Casino_AMB,
					parameter: defGameInfo.Casino_AMB,
					spanText: "AMBSlot",
					img: `${cloudBannerImgURL}/h5/img/am.png`,
					providerImgName: "am",
					allowCurrency: allowedCurrencyList.slotAMB,
					path: path.casino.root,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.ambSlot)
						}
					],
					sortKey: "slot_AMB"
				},
				{
					...defGameInfo.Casino_SG,
					parameter: defGameInfo.Casino_SG,
					spanText: "Spadegaming",
					img: `${cloudBannerImgURL}/h5/img/sg.png`,
					path: path.casino.root,
					providerImgName: "sg",
					sortKey: "slot_SG"
				},
				{
					...defGameInfo.Casino_RedTiger,
					parameter: defGameInfo.Casino_RedTiger,
					spanText: "Red Tiger",
					providerImgName: "rt",
					img: `${cloudBannerImgURL}/h5/img/rt.png`,
					path: path.casino.root,
					sortKey: "slot_RedTiger"
				},
				{
					...defGameInfo.Casino_PG,
					parameter: defGameInfo.Casino_PG,
					spanText: "PG Soft",
					img: `${cloudBannerImgURL}/h5/img/pg.png`,
					path: path.casino.root,
					providerImgName: "pg",
					sortKey: "slot_PG"
				},
				{
					...defGameInfo.Casino_OW,
					parameter: defGameInfo.Casino_OW,
					spanText: "Saba Casino",
					img: `${cloudBannerImgURL}/h5/img/ow.png`,
					sortKey: "slot_OW"
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
			},
			allowCurrency: allowedCurrencyList.oneGame
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
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.MPoker)
						}
					],
					allowCurrency: allowedCurrencyList.mPoker,
					sortKey: "games_MPoker"
				},
				{
					...defGameInfo.amb,
					img: `${cloudBannerImgURL}/h5/img/amb.png`,
					spanTextKey: "lbl_Amb",
					allowCurrency: allowedCurrencyList.amb,
					sortKey: "games_poker"
				},
				{
					...defGameInfo.sabaClub,
					img: `${cloudBannerImgURL}/h5/img/vg.png`,
					spanTextKey: "lbl_Vgaming",
					sortKey: "games_VGaming"
				},
				{
					...defGameInfo.MaxGame,
					img: `${cloudBannerImgURL}/h5/img/max.png`,
					spanText: "Max Game",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.game_MaxGame)
						}
					]
				},
				{
					...defGameInfo.kingMaker,
					img: `${cloudBannerImgURL}/h5/img/km.png`,
					spanTextKey: "lbl_KingMaker",
					sortKey: "games_kingMaker"
				},
				{
					...defGameInfo.VirtualGame,
					img: `${cloudBannerImgURL}/h5/img/virtualgames.png`,
					spanTextKey: "lbl_VirtualGames",
					sortKey: "games_VirtualGame"
				}
			]
		},
		{
			category: "game",
			categoryIcon: "game",
			translateKey: "lbl_Fishing",
			customSort: defSortFishing,
			items: [
				{
					...defGameInfo.FishingHaiba,
					spanTextKey: "lbl_Fishing_Haiba",
					img: `${cloudBannerImgURL}/h5/img/hb.png`,
					sortKey: "fishing_Haiba"
				},
				{
					...defGameInfo.FishingHappyFish5,
					spanTextKey: "lbl_Fishing_Hunting_Happy_Fish_5",
					img: `${cloudBannerImgURL}/h5/img/hf5.png`,
					sortKey: "fishing_Hunting_Happy_Fish_5"
				},
				{
					...defGameInfo.FishingMonsterAwaken,
					spanTextKey: "lbl_Fishing_Hunting_Monster_Awaken",
					img: `${cloudBannerImgURL}/h5/img/ma.png`,
					sortKey: "fishing_Hunting_Monster_Awaken"
				},
				{
					...defGameInfo.Fishing_AB3,
					spanTextKey: "lbl_Paradise",
					img: `${cloudBannerImgURL}/h5/img/pd.png`,
					sortKey: "fishing_CQ9_PARADISE"
				},
				{
					...defGameInfo.ICG_DRAGONBALL_FISHING,
					spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
					img: `${cloudBannerImgURL}/h5/img/df.png`,
					sortKey: "fishing_ICG_DRAGONBALL"
				},
				{
					...defGameInfo.FishingGG,
					spanTextKey: "lbl_FishingGG",
					img: `${cloudBannerImgURL}/h5/img/ffw.png`,
					sortKey: "fishing_GGYL_WORLD"
				},
				// {
				// 	...defGameInfo.Skywind_Ocean_Ruler,
				// 	spanTextKey: "Skywind_Ocean_Ruler",
				// 	img: `${cloudBannerImgURL}/h5/img/or.png`,
				// 	sortKey: "fishing_Skywind_Ocean_Ruler",
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.skywind)
				// 		}
				// 	]
				// },
				// {
				// 	...defGameInfo.Skywind_Cai_Shen_Da_Hai,
				// 	spanTextKey: "Skywind_Cai_Shen_Da_Hai",
				// 	img: `${cloudBannerImgURL}/h5/img/casdaha.png`,
				// 	sortKey: "fishing_Skywind_Cai_Shen_Da_Hai",
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.skywind)
				// 		}
				// 	]
				// },
				{
					...defGameInfo.FishingSGW,
					spanTextKey: "lbl_FishingSG2",
					img: `${cloudBannerImgURL}/h5/img/fw.png`,
					sortKey: "fishing_SGW_WAR"
				},
				{
					...defGameInfo.FishingSG,
					spanTextKey: "lbl_FishingSG1",
					img: `${cloudBannerImgURL}/h5/img/fg.png`,
					allowCurrency: allowedCurrencyList.fishingGod,
					sortKey: "fishing_SG"
				},
				{
					...defGameInfo.Fishing_AT01,
					spanTextKey: "lbl_Oneshot_Fishing",
					img: `${cloudBannerImgURL}/h5/img/of.png`,
					allowCurrency: allowedCurrencyList.oneShot,
					sortKey: "fishing_CQ9_ONESHOT"
				},
				{
					...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
					spanTextKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
					img: `${cloudBannerImgURL}/h5/img/tap.png`,
					allowCurrency: allowedCurrencyList.tyrantAndProncess,
					sortKey: "fishing_ICG_THE_TYRANT_AND_THE_PRINCESS"
				},
				{
					...defGameInfo.ICG_FISHING_OF_SAVIORS,
					spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
					img: `${cloudBannerImgURL}/h5/img/fos.png`,
					allowCurrency: allowedCurrencyList.fishingOfSaviors,
					sortKey: "ICG_FISHING_OF_SAVIORS"
				}
			]
		},
		{
			category: "kelo",
			categoryIcon: "kelo",
			translateKey: "lbl_Lottery",
			items: [
				{
					...defGameInfo.GPI_Keno,
					img: `${cloudBannerImgURL}/h5/img/gpikeno.png`,
					spanTextKey: "GPI_Keno",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.GPI_Lottery)
						}
					]
				},
				{
					...defGameInfo.GPI_ThaiLottery,
					img: `${cloudBannerImgURL}/h5/img/gpithai.png`,
					spanTextKey: "GPI_ThaiLottery",
					allowCurrency: allowedCurrencyList.thaiLottery,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.GPI_Lottery)
						}
					]
				},
				{
					...defGameInfo.GPI_Fast3,
					img: `${cloudBannerImgURL}/h5/img/gpifast3.png`,
					spanTextKey: "GPI_Fast3",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.GPI_Lottery)
						}
					]
				},
				{
					...defGameInfo.TCG,
					img: `${cloudBannerImgURL}/h5/img/tcg.png`,
					spanTextKey: "lbl_TCG"
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
					allowCurrency: allowedCurrencyList.indo4d
				}
			]
		},
		{
			category: "affiliate",
			categoryIcon: "affiliate",
			translateKey: "lbl_Affiliate",
			href: getCurrencyLink(currencyId, langId),
			allowCurrency: allowedCurrencyList.affiliate
		},
		{
			category: "vip",
			categoryIcon: "vip",
			translateKey: "lbl_VIP",
			path: path.vip.root,
			allowCurrency: allowedCurrencyList.VIP
		},
		{
			category: "ranking",
			categoryIcon: "ranking",
			translateKey: "lbl_Ranking",
			path: path.ranking.root,
			allowCurrency: [...getLeaderBoardSupportCurrencyId()]
		}
	];
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
	ESportCS: { tpId: 1, gameId: 43, bettype: 3, tpGameType: 1 },
	ESportDota: { tpId: 1, gameId: 43, bettype: 1, tpGameType: 1 },
	ESportKOG: { tpId: 1, gameId: 43, bettype: 4, tpGameType: 1 },
	ESportLOL: { tpId: 1, gameId: 43, bettype: 2, tpGameType: 1 },
	LIVEcasinoN2Live: { tpId: 28, tpGameType: 45 },
	LIVEcasinoWM: { tpId: 20, gameId: 20, tpGameType: 32 },
	LIVEcasinoAB: { tpId: 12, gameId: 12, tpGameType: 6 },
	LIVEcasinoEB: { tpId: 18, gameId: 18, tpGameType: 28 },
	LIVEcasinoSA: { tpId: 2, gameId: 2, tpGameType: 9 },
	LIVEcasinoAE: { tpId: 15, gameId: 15, tpGameType: 18 },
	LIVEcasinoPP: { tpId: 5, gameId: 101, tpGameType: 16 },
	LIVEcasinoYEEBET: { tpId: 46, gameId: 0, tpGameType: 93 },
	LIVEcasinoDG: { tpId: 4, gameId: 4, tpGameType: 10 },
	LIVEcasinoAG: { tpId: 3, gameId: 3, tpGameType: 8 },
	LIVEcasinoMW: { tpId: 5, gameId: 105, tpGameType: 8 },
	LIVEcasinoMGP: { tpId: 34, tpGameType: 58 },
	LIVEcasino_PT: { tpId: 27, gameId: "0", tpGameType: 48 },
	LIVEcasinoEVO: { tpId: 36, gameId: 0, tpGameType: 63 },
	LIVEcasinoMG: { tpId: 34, gameId: "0", tpGameType: 58 },
	LIVEcasinoSkywind: { gameId: "0", tpId: 43, tpGameType: 84 },
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
	Casino_OW: { tpId: 1, gameId: 208, tpGameType: 4 },
	Casino_NetEnt: { tpId: 37, tpGameType: 64 },
	Casino_AdvantPlay: { tpId: 39, tpGameType: 67 },
	Casino_RedTiger: { tpId: 38, tpGameType: 65 },
	Casino_Habanero: { tpId: 40, tpGameType: 68 },
	Casino_AMB: { tpId: 30, tpGameType: 76 },
	Casino_Skywind: { tpId: 43, tpGameType: 82 },
	Casino_SimplePlay: { tpId: 44, tpGameType: 86 },
	Casino_918Kiss: { tpId: 21, tpGameType: 33 },
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
	Skywind_Ocean_Ruler: {
		gameId: "sw_or",
		tpId: 43,
		name: "Skywind_Ocean_Ruler",
		tpGameType: 85
	},
	Skywind_Cai_Shen_Da_Hai: {
		gameId: "sw_cashdaha",
		tpId: 43,
		name: "Skywind_Cai_Shen_Da_Hai",
		tpGameType: 85
	},
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
	MPoker: { tpId: 35, tpGameType: 60 },
	MaxGame: { tpId: 1, gameId: 237, tpGameType: 83 },
	Mega888: { tpId: 22, tpGameType: 34 },
	VirtualGame: { tpId: 1, gameId: 245, tpGameType: 22 }, // 單一錢包 (目前不支援)
	VirtualSports: { tpId: 1, gameId: 192, tpGameType: 24 }, // 單一錢包 {tpId:41, tpGameType:72, gameId:192}
	WorldCup: { tpId: 1, gameId: 2002, tpGameType: 1 },
	CryptoSports: { tpId: 45, tpGameType: 87 },
	GPI_Keno: { tpId: 6, gameId: "keno", tpGameType: 88 },
	GPI_ThaiLottery: { tpId: 6, gameId: "thailottery", tpGameType: 90 },
	GPI_Fast3: { tpId: 6, gameId: "fast3", tpGameType: 91 }
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

export const defDeepLinkId = {
	mega888: 1
};
