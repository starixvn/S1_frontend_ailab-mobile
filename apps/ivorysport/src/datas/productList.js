import { isDateRange } from "@ailab-mobile/common";
import { cloudBannerImgURL } from "../config";
import { defCurrenyId } from "../components/common/common";

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

export const defIconType = {
	new: " icon-new",
	hot: " icon-mediafire"
};

export const defSlotTpGameType = {
	Saba: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		tpGameType: 4
	},
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
		"casino_BG",
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
		"casino_BG",
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
		"casino_BG",
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
		"casino_BG",
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
		"slot_PP",
		"slot_AdvantPlay",
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
		"slot_PP",
		"slot_AdvantPlay",
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
		"slot_PP",
		"slot_AdvantPlay",
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
			category: "sports",
			categoryIcon: "soccer",
			translateKey: "lbl_Sports",
			customSort: defSortSports,
			items: [
				{
					...defGameInfo.Soccer,
					img: `${cloudBannerImgURL}/h5/img/soccer.png`,
					spanTextKey: "lbl_Soccer",
					sortKey: "soccer",
					hasDesktopLink: true
				},
				{
					...defGameInfo.SabaSoccer,
					img: `${cloudBannerImgURL}/h5/img/saba_soccer.png`,
					spanTextKey: "lbl_SabaSoccer",
					sortKey: "sabaSoccer",
					hasDesktopLink: true
				},
				{
					...defGameInfo.Basketball,
					img: `${cloudBannerImgURL}/h5/img/basketball.png`,
					spanTextKey: "lbl_Basketball",
					sortKey: "basketball",
					hasDesktopLink: true
				},
				{
					...defGameInfo.Tennis,
					img: `${cloudBannerImgURL}/h5/img/tennis.png`,
					spanTextKey: "lbl_Tennis",
					sortKey: "tennis",
					hasDesktopLink: true
				},
				{
					...defGameInfo.Cricket,
					img: `${cloudBannerImgURL}/h5/img/cricket.png`,
					spanTextKey: "lbl_Cricket",
					sortKey: "cricket",
					hasDesktopLink: true
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
		}
	];
};

export default gameList;

export const defGameInfo = {
	Soccer: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 1,
		// tpGameType: 1
		tpGameType: 69 // seamless wallet
	},
	SabaSoccer: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 997,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	hockey: {
		gameId: 4,
		// tpId: 1,
		tpId: 41, // seamless wallet
		// tpGameType: 1
		tpGameType: 69 // seamless wallet
	},
	basketball: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 2,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	baseball: {
		gameId: 8,
		// tpId: 1,
		tpId: 41, // seamless wallet
		// tpGameType: 1
		tpGameType: 69 // seamless wallet
	},
	Tennis: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 5,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	Cricket: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 50,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	Wap: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 1,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	ESportAll: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 43,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	ESportCS: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 43,
		bettype: 3,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	ESportDota: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 43,
		bettype: 1,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	ESportKOG: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 43,
		bettype: 4,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	ESportLOL: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 43,
		bettype: 2,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	LIVEcasinoN2Live: { tpId: 28, tpGameType: 45 },
	LIVEcasinoWM: { tpId: 20, gameId: 20, tpGameType: 32 },
	LIVEcasinoAB: { tpId: 12, gameId: 12, tpGameType: 6 },
	LIVEcasinoEB: { tpId: 18, gameId: 18, tpGameType: 28 },
	LIVEcasinoSA: { tpId: 2, gameId: 2, tpGameType: 9 },
	LIVEcasinoAE: { tpId: 15, gameId: 15, tpGameType: 18 },
	LIVEcasinoPP: { tpId: 5, gameId: 101, tpGameType: 16 },
	LIVEcasinoBG: { tpId: 47, gameId: 0, tpGameType: 94 },
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
	Casino_OW: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 208,
		tpGameType: 4
	},
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
	// VirtualSports: {
	// 	// tpId: 1,
	// tpId: 41, // seamless wallet
	// 	gameId: 180,
	// 	tpGameType: 3,
	// 	tpGameType: 71 // seamless wallet
	// },
	Indo4d: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 223,
		tpGameType: 20
	},
	Keno: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 202,
		// tpGameType: 5,
		tpGameType: 73 // seamless wallet
	},
	lottery: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 220,
		// tpGameType: 19,
		tpGameType: 74 // seamless wallet
	},
	NumberGame: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 161,
		// tpGameType: 2,
		tpGameType: 70 // seamless wallet
	},
	oneGame: { tpId: 13, tpGameType: 41 },
	sabaClub: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 171,
		// tpGameType: 59,
		tpGameType: 95 // seamless wallet
	},
	kingMaker: { tpId: 11, tpGameType: 52 },
	amb: { tpId: 30, tpGameType: 50 },
	nineW: { tpId: 31, tpGameType: 51 },
	Casino_Jili: { tpId: 32, tpGameType: 53 },
	TCG: { tpId: 33, tpGameType: 54 },
	tableGame: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 222,
		// tpGameType: 23,
		tpGameType: 75 // seamless wallet
	},
	MPoker: { tpId: 35, tpGameType: 60 },
	MaxGame: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 237,
		tpGameType: 83
	},
	Mega888: { tpId: 22, tpGameType: 34 },
	VirtualGame: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 245,
		tpGameType: 22
	},
	VirtualSports: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 192,
		// tpGameType: 24,
		tpGameType: 72 // seamless wallet
	},
	WorldCup: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 2002,
		tpGameType: 1
	},
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
