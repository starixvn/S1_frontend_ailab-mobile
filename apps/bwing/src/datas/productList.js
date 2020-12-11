import { siteInfo } from "../config";

export const defGameInfo = {
	Sports: { tpId: 1, gameId: 1 },
	CockFighting: { tpId: 17 },
	VirtualSports: { tpId: 1, gameId: 180 },
	eSports: { tpId: 1, gameId: 43 },
	LIVEcasinoWM: { tpId: 20, gameId: 20 },
	LIVEcasinoDG: { tpId: 4, gameId: 4 },
	LIVEcasinoPP: { gameId: 101, tpId: 5 },
	LIVEcasinoAE: { gameId: 15, tpId: 15 },
	LIVEcasinoAG: { gameId: 3, tpId: 3 },
	LIVEcasinoAB: { gameId: 12, tpId: 12 },
	LIVEcasinoSA: { gameId: 2, tpId: 2 },
	LIVEcasinoEB: { gameId: 18, tpId: 18 },
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
	Fishing_SG: { gameId: "F-SF01", tpId: 10 },
	Fishing_SGW: { gameId: "F-SF02", tpId: 10 },
	Indo4d: { gameId: 223, tpId: 1 },
	Keno: { gameId: 202, tpId: 1 },
	lottery: { gameId: 220, tpId: 1 },
	NumberGame: { gameId: 161, tpId: 1 },
	sabaClub: {
		tpId: 1,
		gameId: 200
	}
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
				spanTextKey: "lbl_Sports"
			},
			{
				...defGameInfo.VirtualSports,
				icon: "virtual-sports",
				spanTextKey: "lbl_VirtualSports"
			}
		]
	},
	{
		category: "cockFighting",
		categoryIcon: "e-sports",
		translateKey: "lbl_CockFighting",
		items: [
			{
				...defGameInfo.CockFighting,
				icon: "e-sports",
				spanTextKey: "lbl_CockFighting"
			}
		]
	},
	{
		category: "game",
		categoryIcon: "game",
		translateKey: "lbl_Games",
		items: [
			{
				...defGameInfo.sabaClub,
				icon: "game",
				spanTextKey: "lbl_SabaClub"
			},
			{
				...defGameInfo.Fishing,
				icon: "game",
				spanTextKey: "lbl_Fishing"
			},
			{
				...defGameInfo.Keno,
				icon: "keno",
				spanTextKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				icon: "lottery",
				spanTextKey: "lbl_Lottery"
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
				parameter: { tpId: defGameInfo.Casino_All.tpId }
			}
		]
	},
	{
		category: "livecasino",
		categoryIcon: "livecasino",
		className: "casinoList",
		translateKey: "lbl_LiveCasino",
		items: [
			{
				...defGameInfo.LIVEcasinoDG
			},
			{
				...defGameInfo.LIVEcasinoPP
			},
			{
				...defGameInfo.LIVEcasinoAE
			},
			{
				...defGameInfo.LIVEcasinoAG
			},
			{
				...defGameInfo.LIVEcasinoAB
			},
			{
				...defGameInfo.LIVEcasinoSA
			},
			{
				...defGameInfo.LIVEcasinoEB
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
				spanTextKey: "lbl_Affiliates"
			}
		]
	}
];

export default gameList;
