import path from "../path";

export const defProductType = {
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	CockFighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8,
	Crypto: 9,
	Games: 10,
	ESports: 11
};

export const defGameInfo = {
	Sports: { tpId: 41, gameId: 1, tpGameType: 69 },
	CryptoSports: { tpId: 45, tpGameType: 87 },
	CockFighting: { tpId: 17, tpGameType: 27 },
	eSports: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 43,
		// tpGameType: 1,
		tpGameType: 69 // seamless wallet
	},
	eSports_TFGaming: { tpId: 48, gameId: 0, tpGameType: 97 },
	eSports_IM: { tpId: 52, gameId: "ESPORTSBULL", tpGameType: 102 },
	LIVEcasinoWM: { tpId: 20, gameId: 20, tpGameType: 32 },
	LIVEcasinoDG: { tpId: 4, gameId: 4, tpGameType: 10 },
	LIVEcasinoPP: { gameId: 101, tpId: 5, tpGameType: 16 },
	LIVEcasinoBG: { tpId: 47, gameId: 0, tpGameType: 94 },
	LIVEcasinoYEEBET: { tpId: 46, gameId: 0, tpGameType: 93 },
	LIVEcasinoAE: { gameId: 15, tpId: 15, tpGameType: 18 },
	LIVEcasinoAG: { gameId: 3, tpId: 3, tpGameType: 8 },
	LIVEcasinoAB: { gameId: 12, tpId: 12, tpGameType: 6 },
	LIVEcasinoSA: { gameId: 2, tpId: 2, tpGameType: 9 },
	LIVEcasinoEB: { gameId: 18, tpId: 18, tpGameType: 28 },
	LIVEcasinoOne789: { tpId: 23, gameId: 2, tpGameType: 37 },
	LIVEcasinoN2: { tpId: 28, tpGameType: 45 },
	LIVEcasinoMGP: { tpId: 34, tpGameType: 58 },
	// 新的 PlayTech (Seamless Wallet)
	LIVEcasinoPlaytech: { tpId: 51, gameId: "0", tpGameType: 101 },
	LIVEcasinoEVO: { tpId: 36, gameId: 0, tpGameType: 63 },
	LIVEcasinoMG: { tpId: 34, gameId: "0", tpGameType: 58 },
	LIVEcasinoSkywind: { tpId: 43, gameId: "0", tpGameType: 84 },
	One789_lottery: { tpId: 23, gameId: 0, tpGameType: 35 },
	One789_lottery_789: { tpId: 23, gameId: 1, tpGameType: 36 },
	Casino_ow: { gameId: 208, tpId: 41, tpGameType: 4 },
	Casino_All: { tpId: 0 },
	Casino_MGP: { tpId: 34, tpGameType: 57 },
	Casino_PP: { tpId: 5, tpGameType: 7 },
	Casino_SG: { tpId: 10, tpGameType: 15 },
	Casino_PG: { tpId: 14, tpGameType: 17 },
	Casino_JOKER: { tpId: 9, tpGameType: 13 },
	Casino_YGG: { tpId: 8, tpGameType: 14 },
	Casino_GPI: { tpId: 6, tpGameType: 11 },
	Casino_CQ9: { tpId: 16, tpGameType: 29 },
	Casino_PNG: { tpId: 54, tpGameType: 105 },

	// 新的 PlayTech (Seamless Wallet)
	Casino_PlayTech: { tpId: 51, gameId: "0", tpGameType: 100 },
	Casino_NetEnt: { tpId: 37, tpGameType: 64 },
	Casino_RedTiger: { tpId: 38, tpGameType: 65 },
	Casino_AdvantPlay: { tpId: 39, tpGameType: 67 },
	Casino_Habanero: { tpId: 40, tpGameType: 68 },
	Casino_Skywind: { tpId: 43, tpGameType: 82 },
	Casino_SimplePlay: { tpId: 44, tpGameType: 86 },
	Casino_Nextspin: { tpId: 50, tpGameType: 99 },
	Casino_Endorphina: { tpId: 49, tpGameType: 98 },
	Casino_SPRIBE: { tpId: 53, tpGameType: 104 },
	Fishing: { gameId: 10, tpId: 7, tpGameType: 12 },
	Fishing_SG: { gameId: "F-SF01", tpId: 10, tpGameType: 31 },
	Fishing_SGW: { gameId: "F-SF02", tpId: 10, tpGameType: 31 },
	Skywind_Ocean_Ruler: { gameId: "sw_or", tpId: 43, tpGameType: 85 },
	Skywind_Cai_Shen_Da_Hai: {
		gameId: "sw_cashdaha",
		tpId: 43,
		tpGameType: 85
	},
	Indo4d: { gameId: 223, tpId: 41, tpGameType: 20 },
	Keno: { gameId: 202, tpId: 41, tpGameType: 73 },
	lottery: { gameId: 220, tpId: 41, tpGameType: 74 },
	tableGame: { gameId: 222, tpId: 41, tpGameType: 75 },
	NumberGame: { gameId: 161, tpId: 41, tpGameType: 70 },
	sabaClub: { tpId: 41, gameId: 171, tpGameType: 95 },
	BTISport: { tpId: 29, tpGameType: 49 },
	casino_ICG: { tpId: 24, tpGameType: 39 },
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001", tpGameType: 40 },
	ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002", tpGameType: 40 },
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0006",
		tpGameType: 40
	},
	V8Poker: { gameId: 0, tpId: 25, tpGameType: 47 },
	Fishing_AB3: { tpId: 16, gameId: "AB3", tpGameType: 44 },
	Fishing_AT05: { tpId: 16, gameId: "AT05", tpGameType: 44 },
	Fishing_AT01: { tpId: 16, gameId: "AT01", tpGameType: 44 },
	Fishing_AT06: { tpId: 16, gameId: "AT06", tpGameType: 44 },
	Fishing_AT04: { tpId: 16, gameId: "AT04", tpGameType: 44 },
	kingMaker: { tpId: 11, tpGameType: 52 },
	Casino_Jili: { tpId: 32, tpGameType: 53 },
	tcg: { tpId: 33, tpGameType: 55 },
	MaxGame: { tpId: 41, gameId: 237, tpGameType: 83 },
	VirtualGame: { tpId: 41, gameId: 245, tpGameType: 22 },
	VirtualSports: { tpId: 41, gameId: 192, tpGameType: 72 },
	IM_Avaitor: {
		tpId: 53,
		gameId: "imgame12001",
		tpGameType: 104
	},
	IM_Mines: {
		tpId: 53,
		gameId: "imgame12002",
		tpGameType: 104
	},
	IM_Goal: {
		tpId: 53,
		gameId: "imgame12003",
		tpGameType: 104
	},
	IM_Dice: {
		tpId: 53,
		gameId: "imgame12004",
		tpGameType: 104
	},
	sportSbo: { tpId: 42, tpGameType: 77 },
	WorldCup: { tpId: 41, gameId: 2002, tpGameType: 69 },
	GPI_VNLottery: { tpId: 6, gameId: "sode", tpGameType: 89 },
	Spaceman: { tpId: 5, tpGameType: 7, gameId: 1302 },
	Crash: { tpId: 39, tpGameType: 67, gameId: "Crash" },
	GoRush: { tpId: 32, tpGameType: 53, gameId: 224 }
};

export const slotPlatform = [
	{
		...defGameInfo.Casino_AdvantPlay,
		path: path.casino.root,
		imgName: "ap"
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		imgName: "pp"
	},
	{
		...defGameInfo.Casino_Skywind,
		path: path.casino.root,
		imgName: "sk"
	},
	{
		...defGameInfo.Casino_Habanero,
		path: path.casino.root,
		imgName: "ho"
	},
	{
		...defGameInfo.Casino_NetEnt,
		path: path.casino.root,
		imgName: "ne"
	},
	{
		...defGameInfo.Casino_SimplePlay,
		path: path.casino.root,
		imgName: "simpleplay"
	},
	{
		...defGameInfo.Casino_RedTiger,
		path: path.casino.root,
		imgName: "rt"
	},
	{
		...defGameInfo.Casino_JOKER,
		path: path.casino.root,
		imgName: "jk"
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		imgName: "gp"
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		imgName: "yg"
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		imgName: "sg"
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		imgName: "pg"
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		imgName: "cq9"
	},

	{
		...defGameInfo.Casino_PNG,
		path: path.casino.root,
		imgName: "png"
	},

	{
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		imgName: "icg"
	},
	// 新的 PlayTech (Seamless Wallet)
	{
		...defGameInfo.Casino_PlayTech,
		path: path.casino.root,
		imgName: "playtech"
	},
	{ ...defGameInfo.Casino_Jili, path: path.casino.root, imgName: "jili" },
	{
		...defGameInfo.Casino_MGP,
		path: path.casino.root,
		imgName: "mg"
	}
];

export const defSlotTpGameType = {
	Saba: { tpId: 41, tpGameType: 4 },
	PP: { tpId: 5, tpGameType: 7 },
	GPI: { tpId: 6, tpGameType: 11 },
	YGG: { tpId: 8, tpGameType: 14 },
	SG: { tpId: 10, tpGameType: 15 },
	PG: { tpId: 14, tpGameType: 17 },
	CQ9: { tpId: 16, tpGameType: 29 },
	PNG: { tpId: 54, tpGameType: 105 },
	Iconic: { tpId: 24, tpGameType: 39 },
	// 新的 PlayTech (Seamless Wallet)
	PlayTech: { tpId: 51, tpGameType: 100 },
	JILI: { tpId: 32, tpGameType: 53 },
	MG: { tpId: 34, tpGameType: 57 },
	NetEnt: { tpId: 37, tpGameType: 64 },
	RedTiger: { tpId: 38, tpGameType: 65 },
	AdvantPlay: { tpId: 39, tpGameType: 67 },
	Habanero: { tpId: 40, tpGameType: 68 },
	Skywind: { tpId: 43, tpGameType: 82 },
	SimplePlay: { tpId: 44, tpGameType: 86 },
	Nextspin: { tpId: 50, tpGameType: 99 },
	Endorphina: { tpId: 49, tpGameType: 98 },
	SPRIBE: { tpId: 53, tpGameType: 104 }
};

export const sportStreamDef = {
	sportSaba: {
		tpId: 41,
		gameId: 1,
		name: "soccer",
		tpGameType: 69
	},
	sabaClub: {
		tpId: 41,
		gameId: 171,
		name: "sabaClub",
		tpGameType: 95
	},
	sportSbo: {
		tpId: 42,
		name: "sportSbo",
		tpGameType: 77
	},
	sportBti: {
		tpId: 29,
		name: "sportBti",
		tpGameType: 49
	},
	eSport: {
		// tpId: 1,
		tpId: 41, // seamless wallet
		gameId: 43,
		name: "eSport",
		// tpGameType: 1
		tpGameType: 69 // seamless wallet
	},
	soccer: {
		tpId: 41,
		gameId: 1,
		name: "soccer",
		tpGameType: 69
	},
	basketball: {
		gameId: 2,
		tpId: 41,
		name: "basketball",
		tpGameType: 69
	},
	badminton: {
		gameId: 9,
		tpId: 41,
		name: "badminton",
		tpGameType: 69
	},
	football: {
		gameId: 3,
		tpId: 41,
		name: "football",
		tpGameType: 69
	},
	tennis: {
		gameId: 5,
		tpId: 41,
		name: "tennis",
		tpGameType: 69
	},
	hockey: {
		gameId: 4,
		tpId: 41,
		name: "hockey",
		tpGameType: 69
	},
	baseball: {
		gameId: 8,
		tpId: 41,
		name: "baseball",
		tpGameType: 69
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
