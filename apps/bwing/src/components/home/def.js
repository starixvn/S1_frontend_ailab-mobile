// export const methodList = {};

import { defGameInfo } from "../../datas/productList";

export const HOT_GAME_LIST = [
	{
		displayKey: "lbl_Sports",
		category: "sports",
		...defGameInfo.Sports,
		hasDesktopLink: true
	},
	{ displayKey: "lbl_Jackpot", category: "jackpot", href: "casino" },
	{
		displayKey: "lbl_LiveCasino",
		category: "livecasino",
		href: "liveCasino"
	},
	{ displayKey: "lbl_Vgaming", category: "vgaming", ...defGameInfo.sabaClub },
	{
		displayKey: "lbl_SEDIE",
		category: "sedie",
		...defGameInfo.LIVEcasinoOne789
	},
	{ displayKey: "lbl_Keno", category: "keno", ...defGameInfo.Keno },
	{ displayKey: "lbl_Fishing", category: "fishing", href: "fishing" },
	{ displayKey: "lbl_QuickGames", category: "qgames", href: "ggames" },
	{
		displayKey: "lbl_Lottery",
		category: "lottery",
		...defGameInfo.One789_lottery
	}
];
