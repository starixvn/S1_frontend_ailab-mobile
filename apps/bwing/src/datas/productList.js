import path from "../path";

export const defGameInfo = {
	Sports: { tpId: 1, gameId: 1, tpGameType: 1 },
	CockFighting: { tpId: 17, tpGameType: 27 },
	VirtualSports: { tpId: 1, gameId: 180, tpGameType: 3 },
	eSports: { tpId: 1, gameId: 43, tpGameType: 1 },
	LIVEcasinoWM: { tpId: 20, gameId: 20, tpGameType: 32 },
	LIVEcasinoDG: { tpId: 4, gameId: 4, tpGameType: 10 },
	LIVEcasinoPP: { gameId: 101, tpId: 5, tpGameType: 16 },
	LIVEcasinoAE: { gameId: 15, tpId: 15, tpGameType: 18 },
	LIVEcasinoAG: { gameId: 3, tpId: 3, tpGameType: 8 },
	LIVEcasinoAB: { gameId: 12, tpId: 12, tpGameType: 6 },
	LIVEcasinoSA: { gameId: 2, tpId: 2, tpGameType: 9 },
	LIVEcasinoEB: { gameId: 18, tpId: 18, tpGameType: 28 },
	LIVEcasinoOne789: { tpId: 23, gameId: 2, tpGameType: 37 },
	LIVEcasinoN2: { tpId: 28, tpGameType: 45 },
	LIVEcasinoMGP: { tpId: 34, tpGameType: 58 },
	LIVEcasinoPT: { tpId: 27, gameId: "0", tpGameType: 48 },
	LIVEcasinoEVO: { tpId: 36, gameId: 0, tpGameType: 63 },
	One789_lottery: { tpId: 23, gameId: 0, tpGameType: 35 },
	One789_lottery_789: { tpId: 23, gameId: 1, tpGameType: 36 },
	Casino_ow: { gameId: 208, tpId: 1, tpGameType: 4 },
	Casino_All: { tpId: 0 },
	Casino_MGP: { tpId: 34, tpGameType: 57 },
	Casino_PP: { tpId: 5, tpGameType: 7 },
	Casino_SG: { tpId: 10, tpGameType: 15 },
	Casino_PG: { tpId: 14, tpGameType: 17 },
	Casino_JOKER: { tpId: 9, tpGameType: 13 },
	Casino_YGG: { tpId: 8, tpGameType: 14 },
	Casino_GPI: { tpId: 6, tpGameType: 11 },
	Casino_CQ9: { tpId: 16, tpGameType: 29 },
	Casino_PT: { tpId: 27, gameId: "0", tpGameType: 46 },
	Casino_NetEnt: { tpId: 37, tpGameType: 64 },
	Casino_RedTiger: { tpId: 38, tpGameType: 65 },
	Fishing: { gameId: 10, tpId: 7, tpGameType: 12 },
	Fishing_SG: { gameId: "F-SF01", tpId: 10, tpGameType: 31 },
	Fishing_SGW: { gameId: "F-SF02", tpId: 10, tpGameType: 31 },
	Indo4d: { gameId: 223, tpId: 1, tpGameType: 20 },
	Keno: { gameId: 202, tpId: 1, tpGameType: 5 },
	lottery: { gameId: 220, tpId: 1, tpGameType: 19 },
	NumberGame: { gameId: 161, tpId: 1, tpGameType: 2 },
	sabaClub: { tpId: 1, gameId: 171, tpGameType: 59 },
	// BTISport: { tpId: 29, tpGameType: 49 },
	casino_ICG: { tpId: 24, tpGameType: 39 },
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001", tpGameType: 40 },
	ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002", tpGameType: 40 },
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0003",
		tpGameType: 40
	},
	V8Poker: { gameId: 0, tpId: 25, tpGameType: 42 },
	Fishing_AB3: { tpId: 16, gameId: "AB3", tpGameType: 44 },
	Fishing_AT05: { tpId: 16, gameId: "AT05", tpGameType: 44 },
	Fishing_AT01: { tpId: 16, gameId: "AT01", tpGameType: 44 },
	Fishing_AT06: { tpId: 16, gameId: "AT06", tpGameType: 44 },
	Fishing_AT04: { tpId: 16, gameId: "AT04", tpGameType: 44 },
	kingMaker: { tpId: 11, tpGameType: 52 },
	Casino_Jili: { tpId: 32, tpGameType: 53 },
	tcg: { tpId: 33, tpGameType: 55 }
};

export const slotPlatform = [
	// {
	// 	...defGameInfo.Casino_NetEnt,
	// 	path: path.casino.root,
	// 	imgName: "ne"
	// },
	// {
	// 	...defGameInfo.Casino_RedTiger,
	// 	path: path.casino.root,
	// 	imgName: "rt"
	// },
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		imgName: "pp"
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
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		imgName: "icg"
	},
	{
		...defGameInfo.Casino_PT,
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

export const sportStreamDef = {
	sportSaba: {
		tpId: 1,
		gameId: 1,
		name: "soccer",
		tpGameType: 1
	},
	sabaClub: {
		tpId: 1,
		gameId: 171,
		name: "sabaClub",
		tpGameType: 59
	},
	// sportBti: {
	// 	tpId: 29,
	// 	name: "sportBti",
	// 	tpGameType: 49
	// },
	eSport: {
		tpId: 1,
		gameId: 43,
		name: "eSport",
		tpGameType: 1
	},
	soccer: {
		tpId: 1,
		gameId: 1,
		name: "soccer",
		tpGameType: 1
	},
	basketball: {
		gameId: 2,
		tpId: 1,
		name: "basketball",
		tpGameType: 1
	},
	badminton: {
		gameId: 9,
		tpId: 1,
		name: "badminton",
		tpGameType: 1
	},
	football: {
		gameId: 3,
		tpId: 1,
		name: "football",
		tpGameType: 1
	},
	tennis: {
		gameId: 5,
		tpId: 1,
		name: "tennis",
		tpGameType: 1
	},
	hockey: {
		gameId: 4,
		tpId: 1,
		name: "hockey",
		tpGameType: 1
	},
	baseball: {
		gameId: 8,
		tpId: 1,
		name: "baseball",
		tpGameType: 1
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
