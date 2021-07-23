import { defGameInfo, defTpCategoryId } from "../../datas/productList";
import path from "../../path";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		parameter: { ...defGameInfo.Sports },
		imgName: "sabaa",
		tpCategoryId: defTpCategoryId.Sports
	},
	{
		...defGameInfo.BTISport,
		imgName: "btia",
		category: defTpCategoryId.Sports
	},
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "aga",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.LIVEcasinoAE,
		imgName: "aea",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.LIVEcasinoN2,
		imgName: "n2liveb",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PP },
		imgName: "ppb",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_MGP,
		imgName: "mga",
		category: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PT },
		imgName: "playtecha",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PG },
		imgName: "pga",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SG },
		imgName: "sga",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_YGG },
		imgName: "ygb",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_CQ9 },
		imgName: "cq9a",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_Jili,
		imgName: "jilia",
		category: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Fishing,
		imgName: "yla",
		tpCategoryId: defTpCategoryId.Fishing
	},
	{
		...defGameInfo.V8Poker,
		imgName: "v8a",
		tpCategoryId: defTpCategoryId.Poker
	},
	{
		...defGameInfo.kingMaker,
		imgName: "kingmakera",
		category: defTpCategoryId.Poker
	}
];

export default defPlatfrom;
